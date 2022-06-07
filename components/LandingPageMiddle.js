import React from 'react';
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const useStyles = makeStyles(theme => ({


  
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="AppBar">
        <Toolbar>
          <div className="drop-shadow-cl">
           <Image src={Logo} alt="logo" className={classes.logo}/>
          </div>
          <Typography variant="h6" className={classes.title}>         
          </Typography>
          <Button color="inherit" >Login</Button>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}