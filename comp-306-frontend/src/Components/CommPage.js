import { Box, Typography, Paper, InputBase, IconButton, Divider, Button, Popover, TextField, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState, useEffect } from "react"

export default function CommPage({ comm, user }) {
    const [posts, setPosts] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const [openedPost, setOpenedPost] = useState({})
    const [post_name, setInputValue] = useState('');
    const [post_text, setInputValue2] = useState('');






    const handleClick = (event, post) => {
        setAnchorEl(event.currentTarget);
        setOpenedPost(post);

    };
    const handleAddClick = (event) => {
        setAnchorEl2(event.currentTarget);

    };
    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTextChange2 = (event) =>{

        setInputValue2(event.target.value);

    }

    const handleAddPost = () => {
        // console.log(post_name);
        // console.log(post_text);

        fetch(`http://localhost:4000/posts/User/${user.user_id}/Community/${comm.community_id}/addPost`, {
            method: 'POST',
            body: JSON.stringify({ post_name, post_text }),
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => response.json())
        .then(data => {
            fetch(`http://localhost:4000/posts/Community/${comm.community_id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                console.error('Error:', error);
            });


        })
        .catch(error => {
            console.error('Error:', error);
        });

        handleClose2();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open = Boolean(anchorEl);
    
    const open2 = Boolean (anchorEl2)
    const id = open ? 'popup' : undefined;
    const id2 = open2 ? 'popup' : undefined;



    useEffect(() => {
        fetch(`http://localhost:4000/posts/Community/${comm.community_id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);




    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Paper sx={{ width: '60%', height: '65%', mt: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ width: "100%" }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>


                            <Button onClick={(event) => handleAddClick(event)} >
                                <Typography sx={{ color: "white", p: '2%' }}>Add Post</Typography>
                            </Button>

                            <Popover
                                id={id2}
                                open={open2}
                                anchorEl={anchorEl2}
                                onClose={handleClose2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >

                                <Paper sx={{ width: '1000px', height: '100%', textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                    <h3>Post Name</h3>
                                    <TextField
                                        label="Title"
                                        value={post_name}
                                        onChange={handleTextChange}
                                        sx={{ width: '30%', height: '10%' }}
                                    />
                                    <h3>Post Body</h3>
                                    <TextField
                                        label="Body Text"
                                        value={post_text}
                                        onChange={handleTextChange2}
                                        sx={{ width: '80%', height: '10%' }}
                                    />
                                    <Button variant="contained" onClick={handleAddPost} sx={{ width: '30%', height: '10%'}}>
                                        Submit
                                    </Button>
                                </Paper>
                            </Popover>
                        </Box>
                    </Box>
                </div>
            </Paper>



            <Paper sx={{ width: '60%', height: '65%', mt: "5vh", textAlign: 'left', borderRadius: '15px 15px 15px 15px', fontSize: '30', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={{ fontSize: '0.8em', p: '2%' }}>{comm.community_name} Posts</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {posts.map((post, index) => (

                                <Button onClick={(event) => handleClick(event, post)} sx={{ justifyContent: "flex-start" }}>
                                    <Typography sx={{ color: "white", p: '2%' }}>* {post.post_name}</Typography>
                                </Button>


                            ))}
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >

                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <Box sx={{ ml: "3vw", mt: "5vh", width: "50%" }}>
                                            <Typography sx={{ fontSize: '0.5em', pl: '2%' }}>Post ID: {openedPost.post_id}</Typography>
                                            <Typography sx={{ fontSize: '1.5em', p: '2%' }}> {openedPost.post_text}</Typography>
                                            <Typography sx={{ fontSize: '0.7em', p: '2%' }}> Author ID: {openedPost.author_id}, Date Posted: {new Date(openedPost.post_date).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit",year: "numeric"})}</Typography>
                                        </Box>
                                    </div>
                            </Popover>
                        </Box>
                    </Box>
                </div>
            </Paper>

        </Box>

    )
}