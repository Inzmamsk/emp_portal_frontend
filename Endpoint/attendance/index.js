import EmpAxios from '../EmpAxios';

export const getCurrentDateAttendance = () => EmpAxios
    .get(
        'attendance/getcurrentattendance',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })

export const getAllAttendance = () => EmpAxios
    .get(
        'attendance/getall',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })