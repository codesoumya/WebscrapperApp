import React, { useState } from "react";
import { Box, Button, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { scrapeWebsite } from "../apis/useApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useNavigate } from "react-router-dom";
import { websiteDetails } from "../redux/reducers/websiteDetailsReducer";
import HeaderBar from "./HeaderBar";

export interface scrapeWebsiteDetails {
  contentDetails?: string
  createdByUserId?: string
  id?: string
  summarizeMarkdown?: string
  webUrl?: string
  websiteDetails?: string
  displayName?: string
  createdOn?: number
  updatedOn?: number
}

interface ScrapePagePropsType {
  setSelectedMarkdown: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ScrapePage = (props: ScrapePagePropsType) => {
  const [url, setUrl] = useState("");
  const auth = useSelector((state: RootState)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [scrapping, setScrapping] = useState<boolean>(false)
  const handleScrape = () => {
    setScrapping(true)
    auth.emailId && auth.password && 
    scrapeWebsite(auth.emailId, auth.password, url).then((res: scrapeWebsiteDetails)=>{

      const siteDetails: websiteDetails = {
        id: res?.id ?? '',
        url: res?.webUrl,
        websiteDetailsMD: res?.summarizeMarkdown,
        shortSummary: res?.websiteDetails,
        displayName: res?.displayName,
        createdOn: res?.createdOn,
        updatedOn: res?.updatedOn
    }
      dispatch({
        type: 'ADD_WEBSITE_DETAILS',
        payload: {
            siteDetails: siteDetails
        }
    })
    siteDetails && props.setSelectedMarkdown(siteDetails?.id)
    navigate(`/details/${res?.id}`)
    }).finally(()=>{
      setScrapping(false)
    })
  };

  return (<>
    <HeaderBar/>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Website Scraper
      </Typography>

      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleScrape();
        }}
      >
        <TextField
          label="Enter Website URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleScrape}
          disabled={!url}
        >
          {scrapping ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        'Scrape Website'
      )}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default ScrapePage;
