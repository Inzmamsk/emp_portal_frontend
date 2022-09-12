import React from 'react';
import PropTypes from 'prop-types';
import Error400 from '../src/Errors/Error400';
import Error401 from '../src/Errors/Error401';
import Error403 from '../src/Errors/Error403';
import Error404 from '../src/Errors/Error404';
import Error408 from '../src/Errors/Error408';
import Error500 from '../src/Errors/Error500';
import Error502 from '../src/Errors/Error502';
import Error503 from '../src/Errors/Error503';
import ErrorDefault from '../src/Errors/ErrorDefault';

Error.propTypes = {
    statusCode: PropTypes.number,
};


function  Error ({statusCode}) {



    const selectErrorPage = (errorCode) => {
        switch(errorCode) {
        case 400:
            return <Error400/>;
        case 401:
            return <Error401/>;
        case 403:
            return <Error403/>;
        case 404:
            return <Error404/>;
        case 408:
            return <Error408/>;
        case 500:
            return <Error500/>;
        case 502:
            return <Error502/>;
        case 503:
            return <Error503/>;
        default :
            return <ErrorDefault/>;
        }
    };

    return(
        <div>
            {
                selectErrorPage(statusCode)
            }
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};


export default Error;
