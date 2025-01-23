import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Button, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import MdDetails from "../components/MdDetails";
import { Route, Routes, useNavigate } from "react-router-dom";
import ScrapePage, { scrapeWebsiteDetails } from "../components/ScrapePage";
import { deleteSite, fetchWebsiteDetails } from "../apis/useApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Delete, Edit } from '@mui/icons-material';
import { websiteDetails } from "../redux/reducers/websiteDetailsReducer";
import { useSnackbar } from 'notistack';

const HomeDetails = (): JSX.Element=>{
    const [selectedSiteDetailsId, setSelectedSiteDetailsId] = useState<string>();
    const auth = useSelector((state: RootState)=> state.auth)
    const siteDetails = useSelector((state: RootState)=> state.websiteDetails)
    const navigate = useNavigate()
  // Sample list of markdown files
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    useEffect(()=>{
        auth.emailId && auth.password && 
        fetchWebsiteDetails(auth.emailId, auth.password).then((res)=>{
            console.log(res, 'its response');
            res?.details?.map((item: scrapeWebsiteDetails)=>{
                dispatch({
                    type: 'ADD_WEBSITE_DETAILS',
                    payload: {
                        siteDetails: {
                            id: item?.id,
                            displayName: item?.displayName,
                            createdOn: item?.createdOn,
                            updatedOn: item?.updatedOn,
                            url: item?.webUrl,
                            websiteDetailsMD: item?.summarizeMarkdown,
                            shortSummary: item?.websiteDetails
                        }
                    }
                })
            })
            
        })
    },[])

    const [deletingSite, setDeteingSite] =useState<string[]>([])
    const onDeleteClick = (id: string)=>{
        setDeteingSite([...deletingSite, id])
        deleteSite(id).then(()=>{
            dispatch({
                type: "DELETE_WEBSITE_DETAILS",
                payload: {
                    id: id
                }
            })
            enqueueSnackbar("Site Deleted Successfully", {variant: "success"});
        }).finally(()=>{
            setDeteingSite(deletingSite?.filter(item=> item!==id))
        })
    }

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Browser Panel */}
      <Box
        sx={{
          width: '25vw',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          p: 2
        }}
      >
        <Typography variant="h6" sx={{fontWeight: 900}} gutterBottom>
          ScrapeMate
        </Typography>
        <Divider />
        <List>
        {Object.values(siteDetails?.allWebsites).map((file, index) => (
  <ListItem key={index} disablePadding divider>
    <ListItemButton
      onClick={() => {
        navigate(`/details/${file?.websiteDetails.id}`);
        if (file?.websiteDetails?.websiteDetailsMD) {
          setSelectedSiteDetailsId(file?.websiteDetails?.id);
        }
      }}
    >
      {/* Display name and created on */}
      <ListItemText
        primary={
          <>
            <Typography variant="subtitle1" noWrap>
              {file?.websiteDetails?.displayName || 'Untitled Website'}
            </Typography>
          </>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {file?.websiteDetails?.createdOn
              ? new Date(file?.websiteDetails?.createdOn).toLocaleString()
              : 'Unknown Date'}
          </Typography>
        }
      />
    </ListItemButton>

    {/* Edit and Delete buttons */}
    <div style={{display: 'flex'}}>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering ListItemButton click
            onDeleteClick(file?.websiteDetails?.id)
          }}
        >
          {deletingSite?.includes(file?.websiteDetails?.id)?<CircularProgress size={24} color="inherit" /> :<Delete />}
        </IconButton>
      </Tooltip>
    </div>
  </ListItem>
))}

        </List>
        <Button 
            sx={{position: 'absolute', bottom: '10px', width: '300px'}} 
            variant="contained"
            color="primary"
            fullWidth
            onClick={()=>{navigate("/")}}
        >New Site</Button>
      </Box>

      {/* Right Markdown Renderer Panel */}
      <Box
        sx={{
          p: 2,
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
          width: '75vw'
        }}
      >
        <Routes>
            <Route path="*" element={<ScrapePage setSelectedMarkdown={setSelectedSiteDetailsId}/>} />
            <Route path="/details/:id" element={<>{
                <div style={{boxShadow: siteDetails?.allWebsites?.[selectedSiteDetailsId ?? '']?.status === 'UPDATED' ? '0px 2px 4px #FFC107' : '0px 2px 4px transparent', padding: '10px'}}>
                    <MdDetails 
                        siteDetails={siteDetails?.allWebsites?.[selectedSiteDetailsId ?? '']?.websiteDetails}
                        status={siteDetails?.allWebsites?.[selectedSiteDetailsId ?? '']?.status}
                        setSelectedSiteDetailsId={setSelectedSiteDetailsId}
                    />
                </div>
                }</>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default HomeDetails;