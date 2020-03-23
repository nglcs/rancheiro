import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { mdiDesktopTower } from '@mdi/js';
import Icon from '@mdi/react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';  
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
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


export default function Host(props) {
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