import { Box, Typography, Paper, InputBase, IconButton, Divider, Button, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState, useEffect } from "react"

export default function ProfilePage({user}) {
    const [achievements, setAchievements] = useState([])
    const [items, setItems] = useState([])

    useEffect(() => {


        fetch(`http://localhost:4000/Achievement/User/${user.user_id}`)
        .then(response => response.json())
        .then(data => setAchievements(data))
        .catch(error => {
            console.error('Error:', error);
        });

        fetch(`http://localhost:4000/games/user/${user.user_id}/owned-games`)
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => {
            console.error('Error:', error);
        });

    }, []);
    
    return (
        <Box sx={{ width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Paper sx={{ width: '60%', height: '65%', textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex',  width: '100%' }}>
                    <img style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '15px 0px 0px 15px', aspectRatio: '1/1', border: '2px solid #FFFF' }} width={'35%'} height={'35%'} src="https://i.imgur.com/nyS7EUD.jpg" alt="Profile Picture" />
                    <Box sx={{ml: "3vw", mt: "5vh", width: "50%"}}>
                        <Typography sx={{ fontSize: '0.5em', pl: '2%'}}>User ID: {user.user_id}</Typography>
                        <Typography sx={{ fontSize: '0.8em', p: '2%'  }}>Username: {user.username}</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>{user.user_name} {user.user_surname}</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Country: {user.user_country}</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>User Level: {user.user_level}</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Age: {user.user_age}</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Email: {user.user_email}</Typography>
                    </Box>
                </div>
            </Paper>
            <Paper sx={{ width: '60%', height: '65%', mt: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex',  width: '100%' }}>
                    <Box sx={{width: "100%"}}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>Achievements</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            {achievements.map((achievement, index) => (
                                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>* {achievement.achievement_name}</Typography>
                            ))}
                        </Box>
                    </Box>
                </div>
            </Paper>
            <Paper sx={{ width: '60%', height: '65%', my: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex',  width: '100%' }}>
                    <Box sx={{width: "100%"}}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>Inventory</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            {items.map((item, index) => (
                                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>* {item.game_name}</Typography>
                            ))}
                        </Box>
                    </Box>
                </div>
            </Paper>
        </Box>

    )
}