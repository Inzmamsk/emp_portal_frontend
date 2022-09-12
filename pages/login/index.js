import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {useSnackbar} from 'notistack';
import {useRouter} from 'next/router';
import Link from '../../components/Link';
import {useStore} from 'laco-react';
import UserStore from '../../store/UserStore';
import Loader from '../../components/Loader';
import {authenticate} from "../../Endpoint/user";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import cookie from 'cookie';
import Config from '../../config/urls.json'
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {

  const classes = useStyles();

  const Router = useRouter();

  const [email, setEmail] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar,closeSnackbar} = useSnackbar();

  const action = (key) => (
    <Button onClick={() => closeSnackbar(key)}>
      {'Dismiss'}
    </Button>
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {user} = useStore(UserStore);

  useEffect(() => {
    if (user) {
      Router.push('/');
    }
  }, []);

  if (user) return <Loader/>;

  const handleLogin = () => {
    setLoading(true);
    authenticate(email, password)
      .then((response) => {
        const {token, userInfo} = response.data;
        document.cookie = cookie.serialize(Config.authToken,token, {
          maxAge:  365 *24 * 60 * 60 * 10,
          path: '/',
          domain: Config.domain
        });
        console.log(document.cookie);
        if (window && window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(userInfo));
          window.localStorage.setItem('token', JSON.stringify(token));
        }
        enqueueSnackbar('Login successfully', {action,variant: 'success'});
        UserStore.set(() => ({token: token, user: userInfo}), 'login');
        Router.push('/');
      })
      .catch(error => {
        enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
        setLoading(false);
      });
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      handleLogin();
    }
  };

  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
            onKeyDown={handleEnter}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleLogin}
            className={classes.submit}
          >
            {loading ? <CircularProgress
              size={24}
            /> : 'Login'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );

};

Login.Layout = null;

export default Login;
