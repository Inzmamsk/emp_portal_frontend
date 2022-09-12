import EmpAxios from '../EmpAxios'

export const createDepartment = (name, description, location) => EmpAxios
  .post(
    '/departments/create',
    {
      name: name,
      description: description,
      location: location,
      companyId: ''
    },
    {
      headers: {
        'content-type': 'application/json',
      }
    })
  .then(response => {
    const { data } = response;
    return data;
  });

export const getAllDepartment = () => EmpAxios

  .get(
    '/departments/fetchall',
    {
      headers: {
        'content-type': 'application/json',
      }
    })
  .then(response => {
    const { data } = response;
    return data;
  })

export const deleteDepartment = (id) => EmpAxios

  .delete(
    `/departments/delete?id=` + id,
    {
      headers: {
        'content-type': 'application/json',
      }
    })
  .then(response => {
    const { data } = response;
    return data;
  })


