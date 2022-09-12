
import React from 'react';
import BookLoader from '../components/Loader';
import redirect from '../Util/redirect';
import config from '../config/urls.json';

const Home = () => <BookLoader />;

Home.getInitialProps = ctx => {
  redirect(ctx,`${config.UI_base_uri}/emp-admin`);
};

export default Home;
