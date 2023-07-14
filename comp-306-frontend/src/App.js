import './App.css';
import Landing from './Components/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Login from './Components/Login';
import { useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#15202C',
    },
    success: {
      main: '#39BF42',
    },
    error: {
      main: '#D61313'
    }

  },
});

function App() {
  const [user, setUser] = useState(null)

  return (
    <Box className="App App-header"> 
      <ThemeProvider theme={theme}>
        {user ? <Landing user={user} setUser={setUser}/> : <Login setUser={setUser}/>}
      </ThemeProvider>
    </Box>
  );
}

export default App;
