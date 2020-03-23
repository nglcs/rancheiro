import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { mdiDesktopTower, mdiServerNetwork } from '@mdi/js';
import Icon from '@mdi/react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';  
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

// function preventDefault(event) {
//   event.preventDefault();
// }
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
  fixedFontSizeCaption:{
    fontSize: 10,
  },
  tagTypeHost:{
    fontSize:10, 
    color: 'white',
    backgroundColor: 'red', 
    paddingLeft:1.5,
    paddingRight:1.5, 
    borderRadius: 6
  }
}));


function Host(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={fixedHeightPaper}>
      <Grid container>
        <Grid item >
          <Icon path={mdiDesktopTower} title={props.name} size={4} color={'#444'} />

        </Grid>
        <Grid item>
          <Typography variant="subtitle2" gutterBottom>{props.name}</Typography>
          {props.roles.map((role) =>
            <Typography className={classes.fixedFontSizeCaption} variant="caption" display="block" >{role.name}</Typography>
          )}

        </Grid>
        <Grid item>
          <Typography className={classes.tagTypeHost} variant="caption" display="block" >{props.type}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
function RancherHost(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={fixedHeightPaper}>
      <Grid direction="column" alignItems="center" justify="center" container>
        <Grid item>
          <Typography variant="subtitle2" gutterBottom>{props.name}</Typography>
        </Grid>
        <Grid item >
          <Icon path={mdiServerNetwork} title={props.name} size={3} color={'#444'}/>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default function Diagram() {
  // const classes = useStyles();
  const roles = [
    { name: 'role-internal-reverse-1' },
    { name: 'role-internal-reverse-2' },
    { name: 'role-internal-reverse-3' },
    { name: 'role-internal-reverse-4' },
  ];

  const hosts = [
    { name: 'containerc3', roles, type: 'reverse' },
    { name: 'containerv71', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'worker' },
  ];
  return (

    <Grid container alignItems='center' direction="column" justify="center" spacing={3}>
      <Grid item>
        <RancherHost name='rancherserver' />
      </Grid>
      <Grid item>
        <Grid direction="row" container >
          {hosts.map((host) =>
            host.type === 'reverse' ?
              <Grid item>
                <Host name={host.name} roles={host.roles} type={host.type} />
              </Grid>
              :
              null
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Grid direction="row" container >
          {hosts.map((host) =>
            host.type !== 'reverse' ?
              <Grid item>
                <Host name={host.name} roles={host.roles} type={host.type} />
              </Grid>
              :
              null
          )}
        </Grid>
      </Grid>
    </Grid>
  )

}
