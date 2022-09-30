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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Spineer from "../../components/spineer/spineer";
import styles from "../../components/document/document.module.scss";
import { useDispatch, useSelector } from "react-redux";


import {
  UPDATE_STATUS_FOR_CANDIDATE
} from "../../redux/constants/user";

import { CandidatedocumentAction } from "../../redux/actions/candidateDocumentAction";

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

export default function BasicTable(props) {
  const classes = useStyles();
  const dummy = useRef(null);
  const navigate = useNavigate();
  const {userList, loading} = props;
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!loading){
      setRows(userList?.userList);
    }
  }, [loading,userList?.userList]);
  
  useEffect(() => {
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleChange = useCallback((event, candidateId) => {
    const tempArray = rows;
    const index = tempArray.findIndex((object) =>{
      return object.candidateId == candidateId;
    })

    if (index >= 0) {
      tempArray[index].candidateStatus = event.target.value;
      setRows([...tempArray])
      var userData = {
        candidateId: candidateId,
        candidateStatus: event.target.value
      }
      dispatch(CandidatedocumentAction(UPDATE_STATUS_FOR_CANDIDATE, userData));
    }

    

  },[rows]);

  const requestDocument = useCallback(
    (event) => {
      const candidate = rows.filter(object=>{
        
        return object.candidateId == event
      })
      navigate("/request-documents", {
        state: { candidate: candidate[0] },
      });
    },
    [navigate, rows]
  );

  const viewDocument = useCallback(
    (event) => {
      const candidate = rows.filter(object=>{
        
        return object.candidateId == event
      })
      navigate("/document", {
        state: { candidate: candidate[0] },
      });
    },
    [navigate, rows]
  );

  if(loading){
    return (
      <section className={styles.BgColor}>
        <div className="flex justify-center pt-10">
          <Spineer />
        </div>
      </section>
    );
  }


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
              <TableCell className={classes.tableHead} align="center">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length>0 && rows.map((row) => (
              <TableRow
                key={row.candidateId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  className={classes.tableCell}
                  scope="row"
                >
                  {row.candidateFirstName}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.candidateLastName}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.candidateEmail}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {row.candidatePhoneNumber}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={row.candidateId}
                      value={row.candidateStatus?? "new"}
                      label="Document Status"
                      onChange={(e)=>handleChange(e, row.candidateId)}
                    >
                      <MenuItem key={1} name={row.candidateId} value="new">New</MenuItem>
                      <MenuItem key={2} name={row.candidateId} value="pending">Pending</MenuItem>
                      <MenuItem key={3} name={row.candidateId} value="complete">Complete</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  <Button variant="contained" endIcon={<SendIcon />} 
                        onClick={()=>requestDocument(row.candidateId)} id={row.candidateId}>
                    Request document
                  </Button>
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  <Button variant="contained" endIcon={<SendIcon />} 
                        onClick={()=>viewDocument(row.candidateId)} id={row.candidateId}>
                    View Document
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
