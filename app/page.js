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


function Home() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { document.body.style.backgroundColor = 'gray' }, []) 

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("pls")
    //generate(query);
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  function generate(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
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
     <DialogContentText>⠀⠀This is an OpenAI-powered text-to-3D </DialogContentText>
     <DialogContentText>⠀⠀model. Simply enter in a word or phrase </DialogContentText>
     <DialogContentText>⠀⠀in the box and press return to get started!</DialogContentText>
     <DialogTitle>Credits</DialogTitle>
     <DialogContentText>⠀⠀Steven Suarez, B.A Applied Computing,</DialogContentText>
     <DialogContentText>⠀⠀University of Washington, Bothell.</DialogContentText>
     <DialogContentText>⠀⠀Model: SHAP-e Text-to-3D, OpenAI.</DialogContentText>
    </Drawer>
    </Box>
    </Paper>
  );

}

export default Home;