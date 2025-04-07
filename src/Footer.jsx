import React from 'react';
import { Box, Grid, Typography, Stack, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', p: 4,  }}>
      <Grid container spacing={4} justifyContent="space-around" alignItems="center">
        <Grid item xs={12} sm={4} textAlign="center">
          <img src="src/assets/images/react.svg" alt="Logo" style={{ width: '200px' }} />
        </Grid>

        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="body1" gutterBottom>React Custom Video Player</Typography>
          <Typography variant="body2" gutterBottom>Created by Prem dev</Typography>
          <Box sx={{ textAlign: 'center', py: 2,  mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="#" target="_blank" rel="noopener" underline="hover" color="inherit">
                Premdev
              </Link>. All rights reserved.
            </Typography>
          </Box>
            </Grid>

        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="h6" gutterBottom>Follow for more</Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton href="https://github.com/M-Premnath" color="primary">
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/premnath-m" color="primary">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://x.com/Premnath_T_M" color="primary">
              <XIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
