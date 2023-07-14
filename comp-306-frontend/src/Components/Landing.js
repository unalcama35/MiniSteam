import { Box, Fab, Typography, Paper, InputBase, IconButton, Divider, Button, Popover, TextField, Modal, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import GamePage from "./GamePage";
import ProfilePage from "./ProfilePage";
import CommunityView from "./CommunityView";
import CommPage from "./CommPage";


const GameList = ({ games, setContent, setOpenedGame }) => {
    function handleGameClick(game) {
        setOpenedGame(game);
        setContent("gamePage");
    }



    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {games.map((game, index) => (
                <Button
                    onClick={() => handleGameClick(game)}
                    sx={{ width: "20%" }}
                    key={index}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <img
                            src={game.image}
                            alt={game.title}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                            }}
                        />
                        <Typography
                            sx={{ fontSize: '0.8em', textAlign: 'center', marginTop: '10px' }}
                        >
                            {game.game_name}
                        </Typography>
                    </Box>
                </Button>
            ))}
        </Box>
    );
};




export default function Landing({user, setUser  }) {
    const [games, setGames] = useState([]);
    const [openedGame, setOpenedGame] = useState({})
    const [content, setContent] = useState("landing");
    const [searchValue, setSearchValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [recommendClicked, setRecommendClicked] = useState(false);
    const [isModal, setModal] = useState(false);
    const [items, setItems] = useState([])
    const [returnVal, setReturn] = useState([])
    const [openedComm, setOpenedComm] = useState({})

    function handleCommClick(comm) {
        setOpenedComm(comm);
        setContent("commPage");
    }
    const handleCloseModal = () => {
      setModal(false);
    };

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddBalance = () => {
        console.log('Add ' + inputValue + " to user ID " + user.user_id + " account");


        fetch(`http://localhost:4000/users/${user.user_id}/balance/${inputValue}/add`, {
            method: 'POST',
        }).then(response => response.json())
            .then(data => {
                fetch('http://localhost:4000/users/' + user.user_id)
                    .then(response => response.json())
                    .then(data => setUser(data))
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const FundModal = () => {
        
      
        return (
          <Modal open={isModal} onClose={handleCloseModal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Insufficient Funds</Typography>
              <Typography sx={{ mb: 2 }}>You do not have enough funds to make this purchase.</Typography>
              <Button variant="contained" onClick={handleCloseModal}>Close</Button>
            </Box>
          </Modal>
        );
      };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredGames = games.filter(game =>
        game.game_name.toLowerCase().includes(searchValue.toLowerCase())
    );


    const handlePopClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRecommendClick = () => {
        setRecommendClicked(!recommendClicked);
    };

    const handleBuy = (boughtGame) => {
        let errCheck = false;
        console.log("remove " + boughtGame.game_price + " from user ID " + user.user_id + " balance");
        fetch(`http://localhost:4000/users/${user.user_id}/balance/${boughtGame.game_price}/sub`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {

                    errCheck = true;
                    console.log(errCheck);
                    setModal(true);
                    throw new Error(response.status);

                }

            })
            .then(data => {
                fetch('http://localhost:4000/users/' + user.user_id)
                    .then(response => response.json())
                    .then(data => setUser(data))
                    .catch(error => {
                        console.error('Error:', error);
                        return;
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                return;
            }).then(data => {

                if (!errCheck) {
                    console.log("added game id: " + boughtGame.game_id + " to user ID: " + user.user_id + "  inventory");
        
                    fetch(`http://localhost:4000/inventory/User/${user.user_id}/Game/${boughtGame.game_id}/add`, {
                        method: 'POST',
                    })
                        .then(response => response.json())
                        /*    .then(data => {
                               fetch('https://game-store-gobz.onrender.com/users/' + user.user_id)
                                   .then(response => response.json())
                                   .then(data => setUser(data))
                                   .catch(error => {
                                       console.error('Error:', error);
                                   });
                           }) */
                        .catch(error => {
                            console.error('Error:', error);
                        });
        
                }



            });
        
    };


    const isOwned = (gameID) => {
        fetch(`http://localhost:4000/games/user/${user.user_id}/owned-games`)
        .then(response => response.json())
        .then(data => {
            
            const hasItem = data.some(item => item.game_id === gameID);
            console.log('Has item:', hasItem);
            setReturn(hasItem);
        
        
        }
        
        )
        .catch(error => {
            console.error('Error:', error);
        });

        
        console.log(returnVal);
        return returnVal;
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popup' : undefined;

    useEffect(() => {


        

        if (recommendClicked) {
            console.log("recommend clicked");
            fetch('http://localhost:4000/games/User/' + user.user_id + '/recommended-games')
                .then(response => response.json())
                .then(data => setGames(data))
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            fetch('http://localhost:4000/games')
                .then(response => response.json())
                .then(data => setGames(data))
                .catch(error => {
                    console.error('Error:', error);
                });


        }

    }, [recommendClicked]);

    const contentEvaluator = () => {
        if (content === "landing") {
            return (
                <Box>
                    <GameList games={filteredGames} setContent={setContent} setOpenedGame={setOpenedGame} />
                </Box>
            )
        } else if (content === "profile") {
            console.log(user);
            return <ProfilePage user={user} />
        } else if (content === "gamePage") {
            return <GamePage game={openedGame} handleBuy={handleBuy} isOwned={isOwned} />
        } else if (content === "community") {
            return <CommunityView user={user} handleCommClick={handleCommClick} />
        } else if (content === "commPage"){
            return <CommPage user={user} comm={openedComm}/>
        }

    }
    return (
        <Box sx={{
            width: "100%", height: "100%", display: "flex", flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{ position: "absolute", right: "2%" }}>
                <FundModal/>
                <Button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handlePopClick}
                >
                    <Typography sx={{ fontSize: '1.5em', p: '10%' }}>
                        {(isHovered || anchorEl) ? ('$' + user.user_balance) : 'BALANCE'}
                    </Typography>
                </Button>
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
                    sx={{textAlign: 'center', color: 'black'}}

                >
                    <h3>Add Money</h3>
                    <Box sx={{display: 'flex'}}>
                    <TextField
                        label="$"
                        value={inputValue}
                        onChange={handleTextChange}
                        sx={{}}
                    />
                    <Button variant="outlined" onClick={handleAddBalance} sx={{}}>Submit</Button>
                    </Box>
                    
                </Popover>
                <Button onClick={() => setContent("landing")}>
                    <Typography sx={{ fontSize: "1.5em", p: '10%' }}>Home</Typography>
                </Button>
                <Button onClick={() => setContent("community")}>
                    <Typography sx={{ fontSize: "1.5em", p: '10%' }}>Communities</Typography>
                </Button>
                <Button onClick={() => setContent("profile")}>
                    <Typography sx={{ fontSize: "1.5em", p: '10%' }}>Profile</Typography>
                </Button>
            </Box>
            <Paper component="form" sx={{ p: '2px 4px', mt: "6%", mb: "2%", display: 'flex', alignItems: 'center', width: '45%' }}>
            {(content === "landing") && (
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Games"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchValue}
                    onChange={handleSearchChange}
                /> )}
                {(content === "landing") && (
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                )}
                {(content === "landing") && (
                    <Button variant="contained" onClick={handleRecommendClick} sx={{ ml: '10px' }} color="primary">
                        {(recommendClicked) ? "All Games" : 'Recommend'}
                    </Button>
                )}
            </Paper>
            {contentEvaluator()}
        </Box>
    )
}