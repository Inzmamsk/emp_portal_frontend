import React, { useReducer, useEffect, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer'

import { useSnackbar } from 'notistack';
import {
    makeStyles, Button, Paper, Table, TableBody, TableCell,
    TableHead, TableRow, Typography,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { getAllUser } from '../../../Endpoint/user/index'


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


function employeeData() {
    const classes = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = (key) => (
        <Button onClick={() => { closeSnackbar(key); }}>
            {'Dismiss'}
        </Button>
    );

    const [employee, setEmployees] = React.useState([]);

    const getEpmloyeeData = async () => {
        const data = await getAllUser();
        setEmployees(data.data)
    }

    useEffect(() => {
        getEpmloyeeData()
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
                    Get all employees
      </Button>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Password</TableCell>
                                <TableCell align="right">User Name</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Phone Verified</TableCell>
                                <TableCell align="right">Email Verified</TableCell>
                                <TableCell align="right">Joining Date</TableCell>
                                <TableCell align="right">Department Id</TableCell>
                                <TableCell align="right">Reporting Manager Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.map((row) => (
                                <TableRow key={useReducer.name}>

                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.password}</TableCell>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align="right">{row.phoneVerified}</TableCell>
                                    <TableCell align="right">{row.emailVerified}</TableCell>
                                    <TableCell align="right">{row.joiningDate}</TableCell>
                                    <TableCell align="right">{row.departmentId}</TableCell>
                                    <TableCell align="right">{row.reportingManagerId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(employeeData), {
    ssr: false,
});