import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',  
        color: '#FFFFFF', 
        py: 2, 
        width: '100%', 
        position: 'absolute',
        bottom: 0, 
      }}
    >
      <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
        © {new Date().getFullYear()} Inventory - Todos los dechos reservados{' '}
      </Typography>
    </Box>
  );
};

export default Footer;
