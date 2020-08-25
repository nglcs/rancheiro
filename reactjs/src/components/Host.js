import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import { red, green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { Memory, Straighten, Storage } from '@material-ui/icons';
import { CardActions } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  rootReverse: {
    width: 215,
    height: 235,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    border: "solid 1px #8bd0d5",
    color: 'white',
  },
  rootNormal: {
    width: 185,
    height: 220,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    border: "solid 1px #8bd0d5",
    color: 'white',
  },
  bottomReverse: {
    fontSize: 12, alignItems: "center", alignContent: "center", color: "gray", paddingLeft: 18
  },
  bottomNormal: {
    fontSize: 12, alignItems: "center", alignContent: "center", color: "gray", paddingLeft: 2.5
  },
  heightReverse: {
    height: 200
  },
  heightNormal: {
    height: 185
  },
  avatarGreen: {
    backgroundColor: green[500]
  },
  avatarRed: {
    backgroundColor: red[500]
  },
  avatarBlue: {
    backgroundColor: '#116e97',
  },
  btn: {
    fontSize: 10,
    paddingLeft: 10,
    opacity: 0.8
  },

}));


export default function Host(props) {
  const stringToColour = (str) => {

    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 3) - hash);
    }
    var color = Math.abs(hash).toString(16).substring(0, 6);

    return "#" + '00000'.substring(0, 1 - color.length) + color;
  }

  const classes = useStyles();
  return (
    <Card className={props.type === 'reverse' ? classes.rootReverse : classes.rootNormal} >
      <Grid className={props.type === 'reverse' ? classes.heightReverse : classes.heightNormal}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={props.type === 'reverse' ? classes.avatarRed : props.type === 'worker' ? classes.avatarBlue : classes.avatarGreen}>
              {props.type.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={props.name}
          subheader={props.type}
          titleTypographyProps={{ fontWeight: 'bold' }}
        />
        < Grid direction="column" alignItems="flex-start" container >
          {
            props.roles.map((role) =>
              <Button className={classes.btn} style={{ color: stringToColour(role), fontSize: 11, fontWeight: 'bold' }} size="small" >{role}</Button>
            )
          }
        </Grid>
      </Grid>
      <CardActions className={props.type === 'reverse' ? classes.bottomReverse : classes.bottomNormal}>
        <Memory fontSize="12" /> {props.annotation.cpu}
        <Straighten fontSize="11" /> {Math.round(props.annotation.memory)}GiB
        <Storage fontSize="10" /> {Math.round(props.annotation.storage)}GiB
      </CardActions>
    </Card >
  )
}
