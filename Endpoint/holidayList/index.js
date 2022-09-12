import EmpAxios from '../EmpAxios'

export const getAllHolidayList = () => EmpAxios
    .get(
        '/holidaylist/getall',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })
