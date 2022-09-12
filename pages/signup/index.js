import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { userRegister } from '../../Endpoint/user/index';
//import { getAllDepartment } from '../../Endpoint/department/index';
import { getUserDepartmentById } from '../../Endpoint/user/index';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  useEffect(() => {
    //getAllDepartment()
  }, [])

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [reportingManagerId, setReportingManagerId] = useState("");
  const [department, setDepartment] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [deptid, setDeptId] = useState("");
  const [repoManagerId, setrepoManagerId] = useState("");

  const handleChange = async (event) => {
    console.warn(event, "event")
    await setDeptId(event.target.value);
    console.log(deptid, "::::::::::::state value")
    getUserDepartmentById(deptid)
  }
  const setUserId = async (event) => {
    console.warn(event, "event")
    await setrepoManagerId(event.target.value);
    console.warn(repoManagerId, "userid");
  }

  function makeUser(event) {
    event.preventDefault();
    userRegister(name, email, password, username, phone, joiningDate, deptid, repoManagerId)
      .then(response => {
        console.log(response);
        alert('User Created Successfully')
      })
      .catch((err) => {
        console.log(err);
        alert('Please Register Again')
        const { response: { data: { message } } } = err;
      });
  }
  // getAllDepartment()
  //   .then(data => {
  //     console.log(data, "ddddddddd1111111");
  //     const departmentdata = data.data
  //     setDepartment(departmentdata)
  //     console.warn(departmentdata, "department")
  //   })

  // getUserDepartmentById(deptid)
  //   .then(data => {
  //     console.log(data, "ddddddddddddddd2222");
  //     const usersdata = data.data
  //     setUserData(usersdata)
  //     console.warn(usersdata, "userdata")
  //   })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone-number"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="department-id">Department</InputLabel>
                <Select
                  labelId="department-id"
                  id="department-id"
                  value={deptid}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Department</em>
                  </MenuItem>
                  {department.map((data, key) => (
                    <MenuItem key={key} value={data._id}>{data.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="reporting-manager-id">Reporting Manager Id</InputLabel>
                <Select
                  labelId="reporting-manager-id"
                  id="reporting-manager-id"
                  value={repoManagerId}
                  onChange={setUserId}
                >
                  <MenuItem value="">
                    <em>Select Reporting ManagerID</em>
                  </MenuItem>
                  {userdata.map((data, key) => (
                    <MenuItem key={key} value={data._id}>{data.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button onClick={makeUser}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up

          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>

      </Box>
    </Container >
  );
}
