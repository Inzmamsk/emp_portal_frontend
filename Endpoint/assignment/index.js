import EmpAxios from '../EmpAxios'

export const getAllAssignment = () => EmpAxios
    .get(
        '/assignment/getall',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })
