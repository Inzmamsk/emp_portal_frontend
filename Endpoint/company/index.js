import EmpAxios from '../EmpAxios'

export const getAllCompany = () => EmpAxios

    .get(
        '/company/getall',
        {
            headers: {
                'content-type': 'application/json',
            }
        })
    .then(response => {
        const { data } = response;
        return data;
    })



