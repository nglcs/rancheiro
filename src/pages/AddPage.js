import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import { encode } from "base-64"

// function preventDefault(event) {
//     event.preventDefault();
// }
// const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    TextField: {
        width: 350,
        marginLeft: 20
    },
    ReverseRole: {
        width: 1100,
        marginLeft: 20
    },
    gridTitle: {
        marginBottom: 25,
        marginLeft: 20,
        marginTop: 10
    },
    MarginButton: {
        marginLeft: 20
    }
}));

export default function AddPage() {
    const classes = useStyles();
    // const [disabled, setDisabled] = React.useState(true);
    const [disabled,] = React.useState(true);
    // const [ACCESS_KEY, setACCESS_KEY] = React.useState();
    const [, setACCESS_KEY] = React.useState();
    // const [ACCESS_SECRET, setACCESS_SECRET] = React.useState();
    const [, setACCESS_SECRET] = React.useState();
    // const [name, setNAME] = React.useState();
    const [, setNAME] = React.useState();
    const [value, setValue] = React.useState('16');

    const handleChange = event => {
        setValue(event.target.value);
    };
    const handleACCESS_KEY = event => {
        setACCESS_KEY(event.target.value);
    };
    const handleACCESS_SECRET = event => {
        setACCESS_SECRET(event.target.value);
    };
    const handleNAME = event => {
        setNAME(event.target.value);
    };


    const getTest = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic MEE2RUJGRDY1N0Q0Njg1NzQ3QUE6RUc0RHhjaFhvMUc1U3YyR3gydlNVY0NYV3dNR2g5c3ZEQVE5dm5GdA==");
        myHeaders.append("Accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("/rancher/1a22x", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (

        <Grid container direction='column' spacing={3}>
            <Grid className={classes.gridTitle} item>
                <Typography variant="h4" >Adicione o envirionment</Typography>

            </Grid>
            <Grid item>
                <TextField
                    id="outlined-helperText"
                    label="Nome do environment"
                    variant="outlined"
                    className={classes.TextField}
                    onChange={handleNAME}
                    required
                />
                <TextField
                    id="outlined-helperText"
                    label="Acess Key "
                    variant="outlined"
                    onChange={handleACCESS_KEY}
                    className={classes.TextField}
                    required
                />
                <TextField
                    id="outlined-helperText"
                    label="Secret Key "
                    variant="outlined"
                    className={classes.TextField}
                    onChange={handleACCESS_SECRET}
                    required
                />
            </Grid>
            <Grid item>
                <TextField
                    id="outlined-helperText"
                    label="Roles de Proxy Reverso "
                    placeholder="role-app,role-plone,role-midpoint"
                    className={classes.ReverseRole}
                    fullWidth

                />
            </Grid>
            <Grid style={{ marginLeft: 30, marginTop: 25, marginBottom: 25 }} >
                <FormControl component="fieldset">
                    <FormLabel component="legend" required>Ambiente</FormLabel>
                    <RadioGroup aria-label="gender" name="ambiente" value={value} onChange={handleChange}>
                        <FormControlLabel value="16" control={<Radio />} label="Rancher 1.6" />
                        <FormControlLabel value="2" control={<Radio />} label="Rancher 2" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid style={{ marginTop: 10 }} item>
                <Button className={classes.MarginButton} onClick={getTest} variant="contained" color="primary">
                    Testar
                </Button>
                <Button disabled={disabled} className={classes.MarginButton} variant="contained" >
                    salvar
                </Button>
            </Grid>

        </Grid>
    )

}
