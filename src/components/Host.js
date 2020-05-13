import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from '@material-ui/core/Grid';

import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { PRIMARY_COLOR } from '../config/theme';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 220,
    height: 200,
    margin: 10,

  },
  avatarRed: {
    backgroundColor: red[500]
  },
  avatarBlue: {
    backgroundColor: PRIMARY_COLOR
  },
  btn: {
    fontSize: 10,
    paddingLeft: 10,
    opacity: 0.8
  }
}));


export default function Host(props) {
  const stringToColour = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('99' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  const classes = useStyles();
  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={props.type == 'reverse' ? classes.avatarRed : classes.avatarBlue}>
            {props.type.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={props.name}
        subheader={props.type}
        titleTypographyProps={{ fontWeight: 'bold' }}

      />
      <Grid direction="column" alignItems="flex-start" container>
        {
          props.roles.map((role) =>
          
            <Button className={classes.btn} style={{ color: stringToColour(role) }} size="small" >{role}</Button>
          )
        }
      </Grid>


    </Card >
  )
}