import { Box, Typography, Paper, InputBase, IconButton, Divider, Button, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState, useEffect } from "react"

export default function CommunityView({ user, handleCommClick }) {
    const [communities, setCommunities] = useState([])
    const [myCommunities, setMyCommunities] = useState([])


    useEffect(() => {
        fetch(`http://localhost:4000/community`)
            .then(response => response.json())
            .then(data => setCommunities(data))
            .catch(error => {
                console.error('Error:', error);
            });

        fetch(`http://localhost:4000/community/user/${user.user_id}`)
            .then(response => response.json())
            .then(data => setMyCommunities(data))
            .catch(error => {
                console.error('Error:', error);
            });


    }, []);

    function checkCommunityExists(communityName) {
        return myCommunities.some(community => community.community_name === communityName);
    }

    function handleLeave(community_id) {
        fetch(`http://localhost:4000/community/${community_id}/User/${user.user_id}/leave`, {
            method: 'POST',
        }).then(response => response.json())
            .then(data => {
                fetch(`http://localhost:4000/community/user/${user.user_id}`)
                    .then(response => response.json())
                    .then(data => setMyCommunities(data))
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleJoin(community_id) {
        fetch(`http://localhost:4000/community/${community_id}/User/${user.user_id}/join`, {
            method: 'POST',
        }).then(response => response.json())
            .then(data => {
                fetch(`http://localhost:4000/community/user/${user.user_id}`)
                    .then(response => response.json())
                    .then(data => setMyCommunities(data))
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Paper sx={{ width: '60%', height: '65%', mt: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>My Communities</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {myCommunities.map((community, index) => (
                                <Button onClick={() => handleCommClick(community)} sx={{ justifyContent: "flex-start"}}>
                                    <Typography sx={{ color: 'white', p: '2%' }}>* {community.community_name}</Typography>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </div>
            </Paper>
            <Paper sx={{ width: '60%', height: '65%', my: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>Communities</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {communities.map((community, index) => (
                                <Box>
                                    <Box sx={{ display: "flex", position: "relative" }}>
                                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>* {community.community_name}</Typography>
                                        {checkCommunityExists(community.community_name) ? <Button onClick={() => handleLeave(community.community_id)} sx={{ position: "absolute", right: "0px", top: "2%" }}>Leave</Button> : <Button onClick={() => handleJoin(community.community_id)} sx={{ position: "absolute", right: "0px", top: "2%" }}>Join</Button>}
                                    </Box>
                                    {index !== communities.length - 1 && <Divider />}
                                </Box>

                            ))}
                        </Box>
                    </Box>
                </div>
            </Paper>
        </Box>

    )
}