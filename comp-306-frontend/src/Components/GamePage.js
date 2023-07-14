import { Box, Typography, Paper, InputBase, IconButton, Divider, Button, MenuList, MenuItem, ListItemIcon, ListItemText, Popover } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState, useEffect } from 'react';


export default function GamePage({ game, handleBuy, isOwned }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [achievement, setAchievement] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/achievement/Game/' + game.game_id)
      .then(response => response.json())
      .then(data => setAchievement(data))
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const open = Boolean(anchorEl);
  const id = open ? 'popup' : undefined;


  return (


    <Box sx={{ width: '100%', height: '80%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
      <Paper sx={{ width: '25%', height: '65%', textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30' }}>
        <Typography sx={{ textAlign: 'right', fontSize: '0.5em', p: '1%' }}>Game ID: {game.game_id}</Typography>
        <Typography sx={{ fontSize: '1em', p: '10%', textAlign: 'center' }}>{game.game_name}</Typography>
        <Typography sx={{ fontSize: '0.7em', p: '2%' }}>{game.game_description}</Typography>
        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Rating: {game.game_rating}</Typography>
        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Category: {game.game_category}</Typography>
        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Release date: {new Date(game.release_date).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit",year: "numeric"})}</Typography>
        <Button onClick={() => handleBuy(game)} disabled={isOwned(game.game_id)} sx={{ width: '50%', background: '#0B131C', m: 'auto', my: '5px', borderRadius: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
          <Typography>{game.game_price}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>{(isOwned(game.game_id)) ? "Owned" : "Buy"}</Typography>
        </Button>
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '49%', height: '60%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ objectFit: 'contain', borderRadius: '15px' }} width={'100%'} height={'100%'} src={game.image} alt="Game Cover" />
        </Box>
      </Box>
      <Button onClick={handleClick}>List of Achievements</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

      >
            {achievement.map(ach => (
              <Box sx={{width: '17vw', textAlign: 'center'}}>
                <Typography sx={{p: '5%'}}>{ach.achievement_name}</Typography>
                <Divider/>
              </Box>
            ))}
      </Popover>
    </Box>


  )
}