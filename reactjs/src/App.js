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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Filter1, Filter2, Filter3, Filter4, Filter5, Filter6, Filter7, Filter8, Filter9, SortByAlpha, Memory, Straighten, Storage } from '@material-ui/icons/';
import Switch from '@material-ui/core/Switch';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import logo from '../src/logo.png';

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
    backgroundColor: "#116e97"
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
    letterSpacing: 5
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: "rgba(0, 0, 0, 0.69)",
    color: "white",
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
    backgroundColor: "#313131"

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
  iconFilter: {
    color: 'white'
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    color: 'white',
    width: 200,
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
  //const [page, setPage] = React.useState(0);
  const [mainHost, setMainHost] = React.useState('Rancher');
  const [selectedIndexEnv, setSelectedIndexEnv] = React.useState(0);
  const [selectedIndexMain, setSelectedIndexMain] = React.useState(0);
  const [input, setInput] = React.useState('');
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [lock, setLock] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [cont, setCont] = React.useState(0);
  const [notFound, setNotFound] = React.useState(false);
  const [stateSwitch, setStateSwitch] = React.useState(false);
  const [stateRadio, stateSetRadio] = React.useState('a');

  const requestAPI = (date) => {
    fetch(window.location.href + "/api/date/" + date, { method: 'GET', redirect: 'follow' })
      .then(response => response.text())
      .then(result => {

        let parse = JSON.parse(result)
        if (parse.status === 'not found')
          setNotFound(true)

        else {
          setNotFound(false)
          setData(parse.data[0].Data)
          setMainHost(parse.data[0].Data[0].name)
        }


      })
      .catch(error => console.log('error', error));
  }
  (() => {
    if (!cont) {
      requestAPI(date)
      setCont(1)
    }
    else
      return
  })()
  const handleChangeRadio = (event) => {
    stateSetRadio(event.target.value);
  };
  const handleChangeDate = (event) => {
    setDate(event.target.value)
    requestAPI(event.target.value)
  }
  const handleChangeSwitch = (event) => {
    setStateSwitch(event.target.checked)
    setInput("")
  }


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
      return (<Filter1 className={classes.iconFilter} />)
    else if (index === 2)
      return (<Filter2 className={classes.iconFilter} />)
    else if (index === 3)
      return (<Filter3 className={classes.iconFilter} />)
    else if (index === 4)
      return (<Filter4 className={classes.iconFilter} />)
    else if (index === 5)
      return (<Filter5 className={classes.iconFilter} />)
    else if (index === 6)
      return (<Filter6 className={classes.iconFilter} />)
    else if (index === 7)
      return (<Filter7 className={classes.iconFilter} />)
    else if (index === 8)
      return (<Filter8 className={classes.iconFilter} />)
    else if (index === 9)
      return (<Filter9 className={classes.iconFilter} />)

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
          <Typography component="h1" variant="h4" color="inherit"  noWrap className={classes.title}>
           RANCHEIRO
          </Typography>

          <SortByAlpha className={classes.iconFilter} />
          <Radio
            checked={stateRadio === 'a'}
            onChange={handleChangeRadio}
            value="a"
            color='white'
            name="radio-button-demo"
          />
          <Memory className={classes.iconFilter} />

          <Radio
            checked={stateRadio === 'b'}
            onChange={handleChangeRadio}
            value="b"
            color='white'
            name="radio-button-demo"
          />
          <Straighten className={classes.iconFilter} />

          <Radio
            checked={stateRadio === 'c'}
            onChange={handleChangeRadio}
            value="c"
            color='white'
            name="radio-button-demo"

          />
          <Storage className={classes.iconFilter} />

          <Radio
            checked={stateRadio === 'd'}
            onChange={handleChangeRadio}
            value="d"
            color='white'
            name="radio-button-demo"

          />
          <div className={classes.search}>
            <InputBase
              id="date"
              type="date"
              defaultValue={date}
              onChange={handleChangeDate}
              iconColor="white"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleChange}
              placeholder={stateSwitch ? "containerv25" : "role-app"}
              value={input}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Switch

              onChange={handleChangeSwitch}
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
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
          {
            data.length === 0 ?
              null
              :
              data.map((mainHost, index) =>
                <ListItem button onClick={handleLinkMenu(mainHost.name, index)}>
                  <ListItemIcon >
                    {getIcon(index + 1)}
                  </ListItemIcon>
                  <ListItemText primary={mainHost.name} />
                </ListItem>
              )}

          <Divider />

          {
            data.length === 0 ?
              null
              :
              data[selectedIndexMain].environment.map((option, index) =>
                <ListItem button onClick={event => handleMenuItemClick(event, index)} selected={index === selectedIndexEnv} >
                  <ListItemIcon >
                    <FolderOpenIcon className={classes.iconFilter} />
                  </ListItemIcon>
                  <ListItemText primary={option.name} />
                </ListItem>
              )}


        </List>


      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          {
            notFound ? <div>no data</div> :
              getStepContent(0, selectedIndexEnv, selectedIndexMain, input, data, stateSwitch, stateRadio)
          }
        </Container>
      </main>
    </div>
  );
}


function getStepContent(step, selectedIndexEnv, selectedIndexMain, input, data, stateSwitch, stateRadio) {

  switch (step) {
    case 0:
      return <Diagram envOption={selectedIndexEnv} mainHost={selectedIndexMain} input={input} data={data} stateSwitch={stateSwitch} stateRadio={stateRadio} />
    case 1:
      return <AddPage />
    default:
      throw new Error('Unknown step')
  }
}
