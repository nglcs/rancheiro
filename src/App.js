import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Diagram from './pages/Diagram';
import AddPage from './pages/AddPage'
import data from './config/data.json'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import Filter9Icon from '@material-ui/icons/Filter9';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#CACCCC'

  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 120,
    width: 255
  },
  fixedFontSizeCaption: {
    fontSize: 10,
  },
  tagTypeHost: {
    fontSize: 10,
    color: 'white',
    backgroundColor: 'red',
    paddingLeft: 1.5,
    paddingRight: 1.5,
    borderRadius: 6
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [mainHost, setMainHost] = React.useState(data[0].name);
  const [selectedIndexEnv, setSelectedIndexEnv] = React.useState(0);
  const [selectedIndexMain, setSelectedIndexMain] = React.useState(0);
  const [input, setInput] = React.useState('');
  const [lock, setLock] = React.useState(true);

  const handleChange = (event) => {
    if (!lock && event.target.value !== input)
      setInput(event.target.value);
    else if (lock)
      setLock(false)
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndexEnv(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLinkMenu = (name, index) => {
    return () => {
      setMainHost(name)
      setSelectedIndexMain(index)
      setSelectedIndexEnv(0)
    }
  };
  const getIcon = (index) => {
    if (index === 1)
      return (<Filter1Icon />)
    else if (index === 2)
      return (<Filter2Icon />)
    else if (index === 3)
      return (<Filter3Icon />)
    else if (index === 4)
      return (<Filter4Icon />)
    else if (index === 5)
      return (<Filter5Icon />)
    else if (index === 6)
      return (<Filter6Icon />)
    else if (index === 7)
      return (<Filter7Icon />)
    else if (index === 8)
      return (<Filter8Icon />)
    else if (index === 9)
      return (<Filter9Icon />)

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {mainHost}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List >
          {data.map((mainHost, index) =>
            <ListItem button onClick={handleLinkMenu(mainHost.name, index)}>
              <ListItemIcon >
                {getIcon(index + 1)}
              </ListItemIcon>
              <ListItemText primary={mainHost.name} />
            </ListItem>
          )}

          <Divider />

          {data[selectedIndexMain].environment.map((option, index) =>
            <ListItem button onClick={event => handleMenuItemClick(event, index)} selected={index === selectedIndexEnv} >
              <ListItemIcon >
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItem>
          )}
        </List>


      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {getStepContent(page, selectedIndexEnv, selectedIndexMain, input)}
        </Container>
      </main>
    </div>
  );
}


function getStepContent(step, selectedIndexEnv, selectedIndexMain, input) {

  switch (step) {
    case 0:
      return <Diagram envOption={selectedIndexEnv} mainHost={selectedIndexMain} input={input} />
    case 1:
      return <AddPage />
    default:
      throw new Error('Unknown step')
  }
}
