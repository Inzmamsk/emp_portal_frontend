import React, {useReducer, useEffect, useState} from 'react';
import TableContainer from '@material-ui/core/TableContainer'

import { useSnackbar } from 'notistack';
import {
    makeStyles, Button, Paper, Table, TableBody, TableCell,
    TableHead, TableRow, Typography,
  } from '@material-ui/core';
  import dynamic from 'next/dynamic';

import {getAllCompany} from '../../../Endpoint/company/index'


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
    

 function companyData() {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <Button onClick={() => { closeSnackbar(key); }}>
      {'Dismiss'}
    </Button>
  );

  const [company, setCompany] = React. useState([]);

  const getCompanyData = async () => {
    const data = await getAllCompany();
    setCompany(data.data)
  }
  useEffect(() => {
    getCompanyData()
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
        Get all company
      </Button>
      <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Logo</TableCell>
                        <TableCell align="right">About</TableCell>
                        <TableCell align="right">EstablishedOn</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">SecondaryNumber</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Website</TableCell>
                        <TableCell align="right">CompanyUniqueId</TableCell>
                        <TableCell align="right">ZipCode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {company.map((row) => (
                        <TableRow key={useReducer.name}>
                            
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.logo}</TableCell>
                            <TableCell align="right">{row.about}</TableCell>
                            <TableCell align="right">{row.establishedOn}</TableCell>
                            <TableCell align="right">{row.owner.name}</TableCell>
                            <TableCell align="right">{row.location}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.secondaryNumber}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.website}</TableCell>
                            <TableCell align="right">{row.companyUniqueId}</TableCell>
                            <TableCell align="right">{row.zipCode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    </div>
    </div>
);
}

export default dynamic(() => Promise.resolve(companyData), {
    ssr: false,
  });
  




