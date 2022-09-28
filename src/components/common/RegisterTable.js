import React, { useEffect, useRef } from "react";
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

function createData(fname, lname, email, contact, status) {
  return { fname, lname, email, contact, status };
}

const rows = [
  createData(
    "Rushikesh",
    "Patil",
    "rushikesh.patil@clairvoyantsoft.com",
    1234567891,
    "Active"
  ),
  createData(
    "Sandeep",
    "Pawar",
    "sandeep.pawar@clairvoyantsoft.com",
    2345678912,
    "Active"
  ),
  createData(
    "Pranali",
    "Chaudhari",
    "pranali.chaudhari@clairvoyantsoft.com",
    3456789123,
    "Pending"
  ),
];

const useStyles = makeStyles(() => ({
  root: {
    width: "940px",
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

  useEffect(() => {
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
