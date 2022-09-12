import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useGridApiRef, XGrid } from '@material-ui/x-grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { getAllDepartment, deleteDepartment, } from '../../../Endpoint/department/index'

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      justifyContent: 'center',
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  { defaultTheme },
);


function EditToolbar(props) {
  const { selectedCellParams, apiRef, setSelectedCellParams } = props;
  const classes = useStyles();

  const handleClick = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field, cellMode } = selectedCellParams;
    if (cellMode === 'edit') {
      const editedCellProps = apiRef.current.getEditCellPropsParams(id, field);
      apiRef.current.commitCellChange(editedCellProps);
      apiRef.current.setCellMode(id, field, 'view');
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
    } else {
      apiRef.current.setCellMode(id, field, 'edit');
      setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
    }
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        color="primary"
      >
        {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
  selectedCellParams: PropTypes.any.isRequired,
  setSelectedCellParams: PropTypes.func.isRequired,
};

export default function StartEditButtonGrid() {
  const apiRef = useGridApiRef();
  const [selectedCellParams, setSelectedCellParams] = React.useState(null);

  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);


  const getDepartmentData = async () => {
    const data = await getAllDepartment();
    setRows(data.data)
  }


  const deleteDepartmentData = async () => {
    const data = await deleteDepartment();
    setDeletedRows(data.data)
  }



  useEffect(() => {
    getDepartmentData()
  }, []);


  const handleCellClick = React.useCallback((params) => {
    setSelectedCellParams(params);
    setSelectedRows(params.rows);
  }, []);

  const handleDoubleCellClick = React.useCallback((params, event) => {
    event.stopPropagation();
  }, []);

  // Prevent from rolling back on escape
  const handleCellKeyDown = React.useCallback((params, event) => {
    if (['Escape', 'Delete', 'Backspace', 'Enter'].includes(event.key)) {
      event.stopPropagation();
    }
  }, []);

  // Prevent from committing on blur
  const handleCellBlur = React.useCallback((params, event) => {
    if (params.cellMode === 'edit') {
      event?.stopPropagation();
    }
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <XGrid
        rows={rows}
        columns={columns}
        getRowId={(rows) => rows._id}
        getCellActions={deleteDepartmentData}
        apiRef={apiRef}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleDoubleCellClick}
        onCellBlur={handleCellBlur}
        onCellKeyDown={handleCellKeyDown}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedCellParams,
            apiRef,
            setSelectedCellParams,
          },
        }}
      />
    </div>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'description', headerName: 'Description', editable: true },
  {
    field: 'location',
    headerName: 'Location',
    width: 180,
    editable: true,
  },
  {
    field: 'companyId.name',
    headerName: 'Company Name',
    width: 180,
    editable: false,
  },
];



// import React, { useReducer, useEffect, useState } from 'react';
// import TableContainer from '@material-ui/core/TableContainer'

// import { useSnackbar } from 'notistack';
// import {
//   makeStyles, Button, Paper, Table, TableBody, TableCell,
//   TableHead, TableRow, Typography,
// } from '@material-ui/core';
// import dynamic from 'next/dynamic';

// import { getAllDepartment } from '../../../Endpoint/department/index'




// const useStyles = makeStyles((theme) => ({
//   root: {
//     // padding :100,
//     marginTop: theme.spacing(2)
//   },
//   noDataDiv: {
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//   },
//   paper: {
//     paddingTop: '70px',
//     paddingLeft: '95px',
//     paddingRight: '15px',
//     //   marginTop: theme.spacing(3),
//   },
//   button: {
//     marginLeft: '90px',
//     marginTop: '50px'
//   },
//   textField: {
//     marginBottom: theme.spacing(2)
//   },
//   tableHead: {
//     fontSize: 30,
//     textAlign: 'center',
//   },
//   align: {
//     textAlign: 'center',
//   },
// }));


// function departmentData() {
//   const classes = useStyles();

//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

//   const action = (key) => (
//     <Button onClick={() => { closeSnackbar(key); }}>
//       {'Dismiss'}
//     </Button>
//   );

//   const [department, setDepartment] = React.useState([]);

//   const getDepartmentData = async () => {
//     const data = await getAllDepartment();
//     setDepartment(data.data)
//   }
//   useEffect(() => {
//     getDepartmentData()
//   }, []);

//   return (
//     <div>
//       <div className={classes.root}>
//         <Button
//           className={classes.button}
//           color="secondary"
//           size="large"
//           variant="contained"
//         >
//           Get all department
//       </Button>
//         <TableContainer component={Paper}>
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="right">Name</TableCell>
//                 <TableCell align="right">Description</TableCell>
//                 <TableCell align="right">Location</TableCell>
//                 <TableCell align="right">Company Name</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {department.map((row) => (
//                 <TableRow key={useReducer.name}>

//                   <TableCell align="right">{row.name}</TableCell>
//                   <TableCell align="right">{row.description}</TableCell>
//                   <TableCell align="right">{row.location}</TableCell>
//                   <TableCell align="right">{row.companyId}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//         </TableContainer>
//       </div>
//     </div>
//   );
// }

// export default dynamic(() => Promise.resolve(departmentData), {
//   ssr: false,
// });





