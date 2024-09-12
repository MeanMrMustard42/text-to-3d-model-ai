'use client' 
 
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from   
 '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';   
import ListItemText from '@mui/material/ListItemText';   
import Box from '@mui/joy/Box';
import { DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios'



function Home() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  //useEffect(() => { document.body.style.backgroundColor = 'gray' }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(query)
    generate(query);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  async function submitPrompt(payload) {
    const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MESHY_API_KEY}` };

    try {
      const response = await axios.post(
          'https://api.meshy.ai/v2/text-to-3d',
          payload,
          { headers }
          );
      console.log("the result should be below me! Like right below")
      console.log(response.data.result)
      const taskID = response.data.result;
      console.log(response.data);
      console.log(taskID)
      console.log("ID is above! hopefully")
      return taskID
      } catch (error) {
      console.error(error);
      }
      
  }

  async function waitForModelGeneration(taskID) {
    console.log("should be in the waiting function now. taskid below in case it's wrong")
    console.log(taskID)
    const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MESHY_API_KEY}` };

      // actually start the process of getting the model
      try {
      const getModel = await axios.get(
        `https://api.meshy.ai/v2/text-to-3d/${taskID}`,
        { headers }
        );
        return new Promise((resolve) => {
          console.log("did get request. full data is below. pweasee work")
          console.log(getModel.data)
          const intervalId = setInterval(() => {
            const currentProgressValue = getModel.data.progress
            console.log("current progress value is below me: ")
            console.log(currentProgressValue)
            console.log("preceding tasks?")
            console.log(getModel.data.preceding_tasks)
      
            if (currentProgressValue === 100) {
              clearInterval(intervalId);
              resolve();
              return getModel
            }
          }, 5000); // 1000ms
        });
      } catch (error) {
        console.error(error);
        }
    
  }

async function getModelInfo(taskID) {
console.log("is the taskID a promise here as well? wtf")
console.log(taskID)
  model = await waitForModelGeneration(taskID);

  try {
    console.log(imageReq.data);
    console.log("the url should be below me!")
    console.log(imageReq.data.thumbnail_url)
    } catch (error) {
    console.log("fucc!")
    console.error(error);
    }
  }

  async function generate(userPrompt) {
    let taskID = '' // leave it empty for now
    //const query = formData.get("query");

    // creating the task
    alert(`You searched for '${userPrompt}'`);
    const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MESHY_API_KEY}` };
    const payload = {
      mode: 'preview',
      prompt: userPrompt,
    art_style: 'realistic',
    negative_prompt: 'low quality, low resolution, low poly, ugly',
};

// submitting task to POST API endpoint (which should start progress on it)
taskID = await submitPrompt(payload)
console.log("is it a promise in the main thing?")
console.log(taskID)

// wait for model to resolve and then we can get the info we need (thumbnail url)
getModelInfo(taskID)
  }
  return (
    <Paper
      component="form" // The form is directly on the Paper component
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter a word or phrase, then press return"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      {/*sidebar stuff*/}
      <Box sx={{ display: 'flex'}}>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} size="lg">
      <DialogTitle>What is this?⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</DialogTitle>
     <DialogContentText>⠀⠀This is an AI-powered text-to-3D </DialogContentText>
     <DialogContentText>⠀⠀model. Simply enter in a word or phrase </DialogContentText>
     <DialogContentText>⠀⠀in the box and press return to get started!</DialogContentText>
     <DialogTitle>Credits</DialogTitle>
     <DialogContentText>⠀⠀Steven Suarez, B.A Applied Computing,</DialogContentText>
     <DialogContentText>⠀⠀University of Washington, Bothell.</DialogContentText>
     <DialogContentText>⠀⠀Model: Meshy Text-to-3D</DialogContentText>
    </Drawer>
    </Box>
    </Paper>
  );
}


export default Home;