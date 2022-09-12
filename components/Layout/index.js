import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import ContainerHeader from '../ContainerHeader';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },

    },
    drawer: {
        width: 240,
        flexShrink: 0
    },
    drawerPaper: {
        height: '98%',
        width: 240,
        backgroundColor: '#ffffff',
        overflowY:'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
        overflowY:'hidden'
    },
    mobileTabs:{
        flexGrow: 1,
        width: '100%',
        marginTop:'15px',
        backgroundColor: '#0f2b46',
        [theme.breakpoints.down('sm')]: {
            marginTop:0,
        },
        [theme.breakpoints.down('xm')]: {
            marginTop:0,
        },
    }
}));

export default function PersistentDrawerLeft(props) {
    const classes = useStyles();

    const { drawerView,drawerMobileView,title,extra } = props;
    return (
        <div className={classes.root}>
            {!!drawerView &&     <Hidden smDown>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {drawerView}
                </Drawer>
            </Hidden>}
            {!!drawerMobileView &&   <Hidden mdUp>
                <Paper className={classes.mobileTabs}>
                    {drawerMobileView}
                </Paper>
            </Hidden>  }
            <main
                className={clsx( {
                    [classes.content]: true
                })}
            >
                <ContainerHeader extra={extra} title={title}/>
                {props.children}
            </main>
        </div>
    );
}
