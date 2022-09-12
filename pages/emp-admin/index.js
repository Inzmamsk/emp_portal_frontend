import React, { useState, useEffect } from 'react';
// import {Container} from '@material-ui/core';
import dynamic from 'next/dynamic';
import {
  makeStyles, Button, Paper, Table, TableBody, TableCell,
  TableHead, TableRow, Typography, Avatar, Card, CardContent, Grid,
} from '@material-ui/core';

import { useSnackbar } from 'notistack';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { green } from '@material-ui/core/colors';
import { getAllUser } from '../../Endpoint/user/index';
import { getCurrentDateAttendance } from '../../Endpoint/attendance';


const useStyles = makeStyles(theme => ({
  root: {
    // padding :100,
    // marginTop: theme.spacing(2)
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
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    paddingTop: '70px',
    paddingLeft: '95px',
    paddingRight: '15px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left'
  },
}));


function ProductCategory() {
  const classes = useStyles();

  const [userdata, setUserData] = useState(0);
  const [todaysattendance, setTodaysAttendance] = useState(0);

  const getData = async () => {
    const userdata = await getAllUser();
    console.log(userdata,"userdata")
    setUserData(userdata.data.length)
  }

  const getAttendance = async () => {
    const data = await getCurrentDateAttendance();
    setTodaysAttendance(data.data.length);
  }

  // useEffect( () => {
  //      getData(),
  //      getAttendance()
  // }, [])

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <Button onClick={() => { closeSnackbar(key); }}>
      {'Dismiss'}
    </Button>
  );

  return (
    <div>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  Total Users
          </Typography>
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  {userdata ? userdata : 0}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: green[600],
                    height: 56,
                    width: 56
                  }}
                >
                  <PeopleIcon />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  Attendance
          </Typography>
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  {todaysattendance ? todaysattendance : 0}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: green[600],
                    height: 56,
                    width: 56
                  }}
                >
                  <PeopleIcon />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button
          className={classes.button}
          color="secondary"
          size="large"
          variant="contained"
        >
          Create New User
        </Button>

        <Paper className={classes.paper}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>
                  Category Name
                  </TableCell>
                <TableCell>
                  Description
                  </TableCell>
                <TableCell>
                  Service
                  </TableCell>
                <TableCell>
                  CreatedAt
                  </TableCell>
                <TableCell>
                  CreatedBy
                  </TableCell>
                <TableCell>
                  Activated
                  </TableCell>
                {/*<TableCell>*/}
                {/*    Approved*/}
                {/*</TableCell>*/}
                <TableCell>
                  Deleted
                  </TableCell>
                <TableCell>
                  Edit
                  </TableCell>
                <TableCell>
                  Product
                  </TableCell>
              </TableRow>
            </TableHead>


          </Table>
        </Paper>

      </div>
    </div>
  );

}


export default dynamic(() => Promise.resolve(ProductCategory), {
  ssr: false,
});

