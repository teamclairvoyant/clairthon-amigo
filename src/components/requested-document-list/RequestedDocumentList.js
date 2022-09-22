import React, { useCallback, useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function RequestedDocumentList({ props }) {
    const [rows, setRows] = useState([]);

    const rowsArray=[]
    const selectedDocuements = props

    function createData(no, documentID, documentName) {
        return { no, documentID, documentName };
    }

    useEffect(() => {
        if (selectedDocuements.length > 0) {
            var i = 0;
            selectedDocuements.map((value) => {
                i++;
                rowsArray.push(createData(i, value, value))
             })
             setRows(rowsArray);
        }
    }, [selectedDocuements]);

    const onSubmit = () => {
        //Register
    };

    const onError = useCallback(() => {
        //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
        // setLoader(false);
    }, []);

    const removeElement = useCallback((event, value) => {
        var id = event?.currentTarget?.value
        const index = rowsArray.findIndex(object => {
            return object.documentID === id;
        });
        console.log("BEfore Delete: "+rowsArray);
        if(index>=0){
            rowsArray.splice(index,1);
            setRows(rowsArray);
        }
        console.log("After Delete: "+rowsArray);
        
    }, [selectedDocuements]);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sr. No</TableCell>
                        <TableCell>Document Id</TableCell>
                        <TableCell>Document Name</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length>0 && rows.map((row) => (
                        <TableRow
                            key={row.documentID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.no}</TableCell>
                            <TableCell align="left">{row.documentID}</TableCell>
                            <TableCell align="left">{row.documentName}</TableCell>
                            <TableCell align="left">
                                <IconButton  aria-label="delete"
                                size="large"
                                onClick={removeElement}
                                value = {row.documentID}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default RequestedDocumentList;
