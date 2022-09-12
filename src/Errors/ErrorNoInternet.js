import React from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Config from '../../config/urls.json';
import { indigo } from '@material-ui/core/colors';
import useTheme from '@material-ui/styles/useTheme';


function ErrorNoInternet() {

    const theme = useTheme();

    const reLoad = () => {
        window.location.reload();
    };

    return (
        <Container>
            <Grid
                container
                style={
                    {
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
                    }
                }
            >
                <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                >
                    <div
                        style={
                            {
                                padding: theme.spacing(1),
                                marginTop: theme.spacing(8),
                                [theme.breakpoints.down('xs')]: {
                                    marginTop: theme.spacing(1),
                                },
                                [theme.breakpoints.only('sm')]: {
                                    marginTop: theme.spacing(-6),
                                },
                            }
                        }
                    >
                        <Typography
                            style={
                                {
                                    fontWeight: 600,
                                    marginBottom: theme.spacing(1),
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: 24
                                    },
                                }
                            }
                            variant='h3'
                        >
                            {'OOPS! Your Internet is not'} <br /> {'working or too slow!'}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            color={'textSecondary'}
                        >
                            {'Your device is currently not connected to the internet.'}<br />
                            {'Please hit refresh after checking internet connectivity.'}
                        </Typography>
                        <Button
                            style={
                                {
                                    margin: theme.spacing(1),
                                    marginTop: theme.spacing(2),
                                    width: 200,
                                    color: theme.palette.getContrastText(indigo[400]),
                                    backgroundColor: indigo[400],
                                    '&:hover': {
                                        backgroundColor: indigo[700],
                                    },
                                }
                            }
                            component={MuiLink}
                            onClick={reLoad}
                            variant="contained"
                            color="primary"
                        >
                            {'Refresh'}
                        </Button>
                        <Button
                            style={
                                {
                                    margin: theme.spacing(1),
                                    marginTop: theme.spacing(2),
                                    width: 200,
                                    color: theme.palette.getContrastText(indigo[400]),
                                    backgroundColor: indigo[400],
                                    '&:hover': {
                                        backgroundColor: indigo[700],
                                    },
                                }
                            }
                            component={MuiLink}
                            href={Config.UI_base_uri}
                            variant="contained"
                            color="primary"
                        >
                            {'Go to dashboard'}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}


export default ErrorNoInternet;



