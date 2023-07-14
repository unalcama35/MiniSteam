import { Box, Alert, Typography, TextField, InputBase, IconButton, Divider, Button, MenuList, MenuItem, ListItemIcon, ListItemText, Popover } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState, useEffect, useRef } from 'react';


export default function Login({setUser}) {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const [infoMissing, setInfoMissing] = useState(false)
    const [loginMissing, setLoginMissing] = useState(false)

    const [showRegister, setShowRegister] = useState(false);
    const [registerDisabled, setRegisterDisabled] = useState(false);


    function handleLogin(){
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        if(!username || !password){
            setLoginMissing(true)
            return;
        }
        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }), // Add username and password to the request body
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => response.json())
        .then(data => setUser(data.user))
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function handleRegisterClick(){
        setShowRegister(true);
        setLoginMissing(false)
    }

    function handleRegister(){
        setRegisterDisabled(true)
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;

        if(!username || !password || !email || !name || !surname){
            setInfoMissing(true)
            setRegisterDisabled(false)
            return;
        }
        fetch('http://localhost:4000/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, password, email, name, surname }), // Add username and password to the request body
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then(response => response.json())
        .then(data => setUser(data.user))
        .catch(error => {
            console.error('Error:', error);
            setRegisterDisabled(false)
        });
    }

  return (
    <Box sx={{width: '100vw', height: '100vh',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TextField inputRef={usernameRef} sx={{mb: '3vh'}} id="outlined-basic" label="Username" variant="outlined" />
        <TextField type="password" inputRef={passwordRef} sx={{mb: '3vh'}} id="outlined-basic" label="Password" variant="outlined" />
        {showRegister ? (
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <TextField inputRef={emailRef} sx={{mb: '3vh'}} id="outlined-basic" label="Email" variant="outlined" />
                <TextField inputRef={nameRef} sx={{mb: '3vh'}} id="outlined-basic" label="Name" variant="outlined" />
                <TextField inputRef={surnameRef} sx={{mb: '3vh'}} id="outlined-basic" label="Surname" variant="outlined" />
                {infoMissing ? <Alert severity="error">Fill everything please!</Alert> : null}
            </Box>
        ) : (null)}
        <Box>
            {loginMissing ? <Alert severity="error">Fill everything please!</Alert> : null}
            {!showRegister ? <Button onClick={handleLogin}>Login</Button> : null}
            <Button disabled={registerDisabled} onClick={showRegister ? handleRegister : handleRegisterClick}>Register</Button>
        </Box>
    </Box>


  )
}