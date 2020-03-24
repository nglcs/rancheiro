import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { mdiServerNetwork } from "@mdi/js";
import Icon from "@mdi/react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 120,
    width: 255
  }
}));

export default function RancherHost(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={fixedHeightPaper}>
      <Grid direction="column" alignItems="center" justify="center" container>
        <Grid item>
          <Typography variant="subtitle2" gutterBottom>
            {props.name}
          </Typography>
        </Grid>
        <Grid item>
          <Icon
            path={mdiServerNetwork}
            title={props.name}
            size={3}
            color={"#444"}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
