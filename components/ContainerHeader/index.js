import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    containerHeader: {
        // padding: '10px 25px 0px 25px',
        paddingBottom: '24px',
        marginBottom: 0,
        backgroundColor: 'transparent',
        lineHeight: '40px',
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    headerTitle: {
        fontSize: '30px',
        margin: 0,
        textTransform: 'capitalize',
        lineHeight: '40px',
        fontFamily: 'Montserrat Medium',
        color: '#252525'
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

}));

export default function ContainerHeader({ title, extra }) {
    const classes = useStyles();
    return (
        title ? <div
            className={
                classes.containerHeader
            }
        >
            <h4 className={classes.headerTitle}>{title} </h4>
            {extra}
        </div> : null
    );

}


