import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MuiLink from '@material-ui/core/Link';
import Config from '../../config/urls.json';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        height: 'calc(100vh - 100px)',
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 100px)',
            textAlign: 'center',
        },
        [theme.breakpoints.only('sm')]: {
            height: 'calc(100vh - 100px)',
            textAlign: 'center',
        },
    },
    later: {
        // marginTop: theme.spacing(1),
        fontWeight: 600,
        marginBottom: theme.spacing(1),
    },
    text: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(-2),
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(-10),
        },
        [theme.breakpoints.only('sm')]: {
            marginTop: theme.spacing(-6),
        },
    },
    img: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
    },
    margin: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: 200,
        color: theme.palette.getContrastText(indigo[400]),
        backgroundColor: indigo[400],
        '&:hover': {
            backgroundColor: indigo[700],
        },
    },

}));


function Error401() {

    const classes = useStyles();


    return (
        <Container>
            <Grid
                className={classes.mainContainer}
                container
            >
                <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div className={classes.text}>
                        <Typography
                            className={classes.later}
                            variant='h3'
                        >
                            {'OOPS! You lack the required permission to view this.'}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            color={'textSecondary'}
                        >
                            {'The resources requested by you is restricted and requires authentication.'}<br />
                            {'Please reaccess the content with the required authentication.'}<br />

                            {/* {user? 'Go to dashboard':'Go to the login page'}*/}
                        </Typography>
                        <Button
                            className={classes.margin}
                            component={MuiLink}
                            href={Config.UI_base_uri}
                            variant="contained"
                            color="primary"
                        >
                            {'Return'}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}


export default Error401;
