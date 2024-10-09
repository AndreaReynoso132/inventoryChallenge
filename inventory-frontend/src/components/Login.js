import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Para manejar la visibilidad de la contraseña
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:7140/api/auth/login', {
            username,
            password,
        });
        localStorage.setItem('token', response.data.token);  // Guardar el token en localStorage
        navigate('/products');  // Redirigir a la página de productos
    } catch (error) {
        setError('Usuario o contraseña incorrectos.');
    }
};


  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError(''); // Desactiva el error cuando se borra el campo
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6} // Ocupa la mitad de la pantalla
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E0E0E0',  // Fondo gris claro
        }}
      >
        {/* Imagen del logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img src="/logo.png" alt="Logo" style={{ width: '60%', height: 'auto' }} /> {/* Hacemos el logo más grande */}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6} // Ocupa la mitad de la pantalla
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: '#1A1A2E',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%', // Para que ocupe todo el espacio disponible
        }}
      >
        <Box
          sx={{
            width: '80%', // Ajusta el ancho del formulario
            maxWidth: '400px', // Limita el tamaño máximo del formulario
            textAlign: 'center', // Alinea el contenido al centro
          }}
        >
          <Avatar sx={{ m: '0 auto', bgcolor: '#673AB7' }}> {/* Centramos el avatar */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#FFFFFF' }}> {/* Texto blanco */}
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleFieldChange(setUsername)}
              sx={{
                '& label': { color: '#FFFFFF' }, // Etiquetas en blanco
                '& .MuiInput-underline:before': { borderBottomColor: '#D81B60' }, // Línea neón fucsia
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#D81B60', // Bordes neón fucsia
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF4081', // Bordes al pasar el mouse
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF4081', // Bordes al enfocarse
                  },
                },
                input: { color: '#FFFFFF' }, // Texto en blanco
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleFieldChange(setPassword)}
              sx={{
                '& label': { color: '#FFFFFF' }, // Etiquetas en blanco
                '& .MuiInput-underline:before': { borderBottomColor: '#D81B60' }, // Línea neón fucsia
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#D81B60', // Bordes neón fucsia
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF4081', // Bordes al pasar el mouse
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF4081', // Bordes al enfocarse
                  },
                },
                input: { color: '#FFFFFF' }, // Texto en blanco
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color: '#FFFFFF' }} /> : <Visibility sx={{ color: '#FFFFFF' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundImage: 'linear-gradient(to right, #29B6F6, #673AB7)', // Degradado del botón
                color: '#FFFFFF', // Texto blanco
                '&:hover': {
                  backgroundImage: 'linear-gradient(to right, #2196F3, #512DA8)', // Hover más oscuro
                },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
      </Grid>
      <Footer />
    </Grid>
  );
};

export default Login;
