import EmpAxios from '../EmpAxios'

export const authenticate = (email, password) => EmpAxios
  .post(
    '/users/authenticate',
    {
      email: email,
      password: password
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

export const userRegister = (name, email, password, username, phone, joiningDate, deptid, repoManagerId) => EmpAxios
  .post(
    '/users/register',
    {
      name: name,
      phone: phone,
      email: email,
      joiningDate: joiningDate,
      departmentId: deptid,
      reportingManagerId: repoManagerId,
      password: password,
      username: username
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

// export const getUserDepartmentById = (deptid) => EmpAxios
//   .get(
//     'users/fetchuserbydeptid', { params: { deptid },
//     {} 
//       headers: {
//         'content-type': 'application/json',
//       }
//     })
//   .then(response => {
//     const { data } = response;
//     return data;
//   })

export const getAllUser = () => EmpAxios
  .get(
    'users/fetchall',
    {
      headers: {
        'content-type': 'application/json',
      }
    })
  .then(response => {
    const { data } = response;
    return data;
  })
