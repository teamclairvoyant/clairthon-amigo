import React, { useEffect, useRef, useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./RegisterTable.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function createData(id,fname, lname, email, contact, status) {
  return { id, fname, lname, email, contact, status };
}

const rowsData = [
  createData(
    "1",
    "Rushikesh",
    "Patil",
    "rushikesh.patil@clairvoyantsoft.com",
    1234567891,
    "Active"
  ),
  createData(
    "2",
    "Sandeep",
    "Pawar",
    "sandeep.pawar@clairvoyantsoft.com",
    2345678912,
    "Active"
  ),
  createData(
    "3",
    "Pranali",
    "Chaudhari",
    "pranali.chaudhari@clairvoyantsoft.com",
    3456789123,
    "Pending"
  ),
];

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    borderRadius: "5px",
    paddingBottom: "10px",
  },
  tableHead: {
    fontWeight: "bold",
    backgroundColor: "#d1c4e9",
    color: "#000000",
  },
}));

export default function BasicTable() {
  const classes = useStyles();
  const dummy = useRef(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const [rows, setRows] = useState(rowsData);

  useEffect(() => {
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChange = useCallback((event, id) => {
    const tempArray = rows;
    const index = tempArray.findIndex((object) =>{
      return object.id == id;
    })

    if (index >= 0) {
      tempArray[index].status = event.target.value;
      setRows([...tempArray])
    }
  },[rows]);

  const requestDocument = useCallback(
    (event) => {
      const candidate = rows.filter(object=>{
        return object.id === event.target.id
      })
      navigate("/request-documents", {
        state: { candidate: candidate[0] },
      });
    },
    [navigate]
  );

  console.log("updatedRows:", rows)

  return (
    <Container className={classes.root} ref={dummy}>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>First Name</TableCell>
              <TableCell className={classes.tableHead} align="center">
                Last Name
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Email
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Contact
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
              Status
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  className={classes.tableCell}
                  scope="row"
                >
                  {row.fname}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.lname}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.email}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.contact}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={row.id}
                      value={row.status}
                      label="Document Status"
                      onChange={(e)=>handleChange(e, row.id)}
                    >
                      <MenuItem name={row.id} value="new">New</MenuItem>
                      <MenuItem name={row.id} value="complete">Complete</MenuItem>
                      <MenuItem name={row.id} value="pending">Pending</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  <Button variant="contained" endIcon={<SendIcon />} 
                        onClick={requestDocument} id={row.id}>
                    Request document
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
