import React, { useReducer, useEffect, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer'
import { useSnackbar } from 'notistack';
import {
    makeStyles, Button, Paper, Table, TableBody, TableCell,
    TableHead, TableRow, Typography,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { getAllAssignment } from '../../../Endpoint/assignment/index'


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


function assignmentData() {
    const classes = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const action = (key) => (
        <Button onClick={() => { closeSnackbar(key); }}>
            {'Dismiss'}
        </Button>
    );

    const [assignment, setAssignment] = React.useState([]);
    const getAssignmentData = async () => {
        const data = await getAllAssignment();
        setAssignment(data.data)
    }
    useEffect(() => {
        getAssignmentData()
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
                    Get all assignment
      </Button>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">AssignmentTo</TableCell>
                                <TableCell align="right">AssignmentBy</TableCell>
                                <TableCell align="right">Document</TableCell>
                                <TableCell align="right">Link</TableCell>
                                <TableCell align="right">Notes</TableCell>
                                <TableCell align="right">Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignment.map((row) => (
                                <TableRow key={useReducer.name}>
                                    <TableCell align="right">{row.assignmentTo.name}</TableCell>
                                    <TableCell align="right">{row.assignmentBy.name}</TableCell>
                                    <TableCell align="right">{row.document}</TableCell>
                                    <TableCell align="right">{row.link}</TableCell>
                                    <TableCell align="right">{row.notes}</TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(assignmentData), {
    ssr: false,
});

























