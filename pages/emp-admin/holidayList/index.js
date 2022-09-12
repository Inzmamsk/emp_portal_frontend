
import React, { useReducer, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
    makeStyles, Button, Paper, TextField, IconButton, InputAdornment
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import { getAllHolidayList } from '../../../Endpoint/holidayList/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';


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

function HolidayListData() {
    const classes = useStyles();
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = (key) => (
        <Button onClick={() => { closeSnackbar(key); }}>
            {'Dismiss'}
        </Button>
    );

    const localizer = momentLocalizer(moment)

    const [holidayList, setHolidayList] = useState([]);
    
    const getHolidayListData = async () => {
        const data = await getAllHolidayList();
        //setHolidayList(data)

        const events = holidayList.map((rows) => {

            return {
                eventStartDate: new Date(rows.eventStartDate),
                eventType: rows.eventType,
                note: rows.note,
                eventEndDate: new Date(rows.eventEndDate),
            }
        })
        setHolidayList(events)
    }

    useEffect(() => {
        getHolidayListData()
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
                    Get all HolidayList
           </Button>
                <Calendar
                    localizer={localizer}
                    events={holidayList}
                    eventStartDate='startTime'
                    eventEndDate='endTime'
                    views={['month', 'day', 'week']}
                    style={{ height: 450 }}
                />
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(HolidayListData), {
    ssr: false,
});
