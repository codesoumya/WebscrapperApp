import { Typography, Divider, Box, FormControlLabel, Switch, Button } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { websiteDetails } from "../redux/reducers/websiteDetailsReducer"
import HeaderBar from "./HeaderBar"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import MonacoEditor from 'react-monaco-editor';
import MDXMarkdownEditor from "./MDXEditor"
import { useParams } from "react-router-dom"
import { updateSiteDetails } from "../apis/useApi"

interface MdDetailsPropsType {
  siteDetails?: websiteDetails
  status?: "UPDATED" | "UNCHANGED"
  setSelectedSiteDetailsId: React.Dispatch<React.SetStateAction<string | undefined>>
}

const MdDetails = (props: MdDetailsPropsType) => {

  const dispatch = useDispatch()
  const [isEditorMode, setIsEditorMode] = useState(false);
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditorMode(event.target.checked); // Toggle between preview and editor
  };

  const { id } = useParams()

  useEffect(() => {
    props.setSelectedSiteDetailsId(id)
  }, [id])

  const handleEditorChange = (item: string, value: string) => {
    dispatch({
      type: "UPDATE_WEBSITE_DETAILS",
      payload: {
        id: props?.siteDetails?.id,
        item: item,
        value: value
      }
    })
  };

  const handleMesageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_WEBSITE_DETAILS",
      payload: {
        id: props?.siteDetails?.id,
        item: 'displayName',
        value: event.target.value
      }
    })
  }

  const updateSite = ()=>{
    const siteDetails = {
      id: props?.siteDetails?.id,
      displayName: props?.siteDetails?.displayName,
      summarizeMarkdown: props?.siteDetails?.websiteDetailsMD,
      websiteDetails: props?.siteDetails?.shortSummary,
      updatedOn: Date.now()
    }
    updateSiteDetails(siteDetails)
  }

  return (<>
    <HeaderBar message={props.siteDetails?.displayName} handleMesageChange={handleMesageChange} />
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        backgroundColor: 'white',
        boxShadow: 1,
        marginBottom: '10px',
        maxHeight: '20%',
        overflowY: 'auto'
      }}
    >
      <MDXMarkdownEditor
        key={props?.siteDetails?.id}
        mdText={props?.siteDetails?.shortSummary}
        onTextChange={(markdown?: string) => {
          handleEditorChange('shortSummary', markdown ?? '')
        }}
        height={"170px"}
      />
      <ReactMarkdown>{ }</ReactMarkdown>
    </Box>
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: 'white',
        boxShadow: 1,
        height: '60%',
        overflowY: 'auto'
      }}
    >
      <MDXMarkdownEditor
        key={props?.siteDetails?.id}
        mdText={props?.siteDetails?.websiteDetailsMD}
        onTextChange={(markdown?: string) => {
          handleEditorChange('websiteDetailsMD', markdown ?? '')
        }}
        height="350px"
      />
    </Box>
    <Button disabled={props?.status === 'UNCHANGED'} onClick={updateSite}>Update</Button>
  </>)
}

export default MdDetails;