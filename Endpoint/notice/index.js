import EmpAxios from '../EmpAxios'

export const getAllNotice = () => EmpAxios
    .get(
        '/notice/fetchall',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })
