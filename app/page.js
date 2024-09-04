'use client' 
 
import React, { useState } from 'react';
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


function Home() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer} size="lg">
      <List>
        <ListItem button onClick={toggleDrawer}>
          <ListItemIcon>
            {/* Your icon here */}
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={toggleDrawer}>
          <ListItemIcon>
            {/* Your icon here */}
          </ListItemIcon>
          <ListItemText primary="Credits" />
        </ListItem>
      </List>
      <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        ></Box>
    </Drawer>
    </Paper>
  );
}

export default Home;