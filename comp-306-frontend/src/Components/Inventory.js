import { Box, Typography, Paper, InputBase, IconButton, Divider, Button, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

export default function Inventory(props) {

    return (

        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',

            }}
        >
            
            <Paper component="form" sx={{ p: '2px 4px', mt: "4%", mb: "2%", display: 'flex', alignItems: 'center', width: '45%' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Games"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Box
                sx={{
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                }}
            >
                <Paper
                    sx={{
                        width: '20%',
                        height: '65%',
                        textAlign: 'left',
                        borderRadius: '15px 15px 15px 15px',
                        fontSize: '30',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <img
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: '15px 0px 0px 15px',
                                aspectRatio: '1/1',
                                border: '2px solid #FFFF',
                            }}
                            width={'35%'}
                            height={'35%'}
                            src="https://i.imgur.com/nyS7EUD.jpg" // add user.profile_url
                            alt="Profile Picture"
                        />
                        <div style={{ marginLeft: '10px' }}>
                            <Typography sx={{ fontSize: '0.3em', textAlign: 'right' }}>User ID: 10000</Typography>
                            <Typography sx={{ fontSize: '0.8em' }}>Username</Typography>

                        </div>
                    </div>

                    <div style={{ marginLeft: '10px' }}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>Name Surname</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Country</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>User Level</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Age</Typography>
                        <Typography sx={{ fontSize: '0.5em', p: '2%' }}>Email@email.com</Typography>
                    </div>


                </Paper>



                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        width: '35%',
                        height: '60%',

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <Box
                            sx={{
                                background: '#15202C',
                                width: '30%',
                                height: '100%',
                                textAlign: 'left',
                                borderRadius: '0px 15px 15px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                fontSize: '17px'
                            }}
                        >
                            <Typography sx={{ fontSize: '1.2em', p: '10%' }}>Dota 2</Typography>
                            <Divider orientation="horizontal" flexItem />

                            <Typography sx={{ fontSize: '0.7em', p: '10%', pt: '0' }}>
                                Items
                            </Typography>

                        </Box>
                    </Box>

                </Box>
                <Box
                sx={{
                    background: '#15202C',
                                width: '10%',
                                height: '100%',
                                textAlign: 'left',
                                borderRadius: '0px 15px 15px 0px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',

                }}
                >

                    <Button
                        sx={{
                            width: '100%',
                            background: '#15202C',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Typography>Profile Page</Typography>

                    </Button>
                </Box>
            </Box>
        </Box>
    )
}