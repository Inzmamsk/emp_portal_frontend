import React, { useReducer, useEffect, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer'
import { useSnackbar } from 'notistack';
import {
    makeStyles, Button, Paper, Table, TableBody, TableCell,
    TableHead, TableRow, Typography,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { getAllNotice } from '../../../Endpoint/notice/index'


const useStyles = makeStyles((theme) => ({
    root: {
        // padding :100,
        marginTop: theme.spacing(2)
    },
    noDataDiv: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    paper: {
        paddingTop: '70px',
        paddingLeft: '95px',
        paddingRight: '15px',
        //   marginTop: theme.spacing(3),
    },
    button: {
        marginLeft: '90px',
        marginTop: '50px'
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    tableHead: {
        fontSize: 30,
        textAlign: 'center',
    },
    align: {
        textAlign: 'center',
    },
}));


function noticeData() {
    const classes = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = (key) => (
        <Button onClick={() => { closeSnackbar(key); }}>
            {'Dismiss'}
        </Button>
    );

    const [notice, setNotice] = React.useState([]);
    const getNoticeData = async () => {
        const data = await getAllNotice();
        setNotice(data.data)
    }
    useEffect(() => {
        getNoticeData()
    }, []);

    return (
        <div>
            <div className={classes.root}>
                <Button
                    className={classes.button}
                    color="secondary"
                    size="large"
                    variant="contained"
                >
                    Get all notice
      </Button>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Body</TableCell>
                                <TableCell align="right">CreatedBy</TableCell>
                                <TableCell align="right">ObjectType</TableCell>
                                <TableCell align="right">ObjectId</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Document</TableCell>
                                <TableCell align="right">UpdatedAt</TableCell>
                                <TableCell align="right">UpdatedeBy</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notice.map((row) => (
                                <TableRow key={useReducer.name}>

                                    <TableCell align="right">{row.body}</TableCell>
                                    <TableCell align="right">{row.createdBy.name}</TableCell>
                                    <TableCell align="right">{row.objectType}</TableCell>
                                    <TableCell align="right">{row.objectId}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.document}</TableCell>
                                    <TableCell align="right">{row.updatedAt}</TableCell>
                                    <TableCell align="right">{row.updatedeBy.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(noticeData), {
    ssr: false,
});





