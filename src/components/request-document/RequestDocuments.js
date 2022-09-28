import React, { useCallback, useState, useEffect, useMemo } from "react";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./RequestDocument.module.scss";
import Button from "@mui/material/Button";
import { COPY } from "../../constant";
import withHeader from "../HOCS/withHeader";
import { useDispatch, useSelector } from "react-redux";
import RequestedDocumentList from '../requested-document-list/RequestedDocumentList'
import { documentAction } from "../../redux/actions/documentAction";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import transformTreeData from '../../services/dmservice';

import {
  GET_ALL_DOCUMENTS,
  ADD_REQUESTED_DOCUMENT
} from "../../redux/constants/user";

function RequestDocuments() {
  const userList = useSelector((state) => state.userList);
  const [documentList, setDocumentList] = useState(userList.documents);
  const [isLoading, setIsLoading] = useState(userList.isLoading);

  const documentListMemo = useMemo(() => {
    return userList.documents
  }, [userList]);

  const selectedCandidateName = "fname lname"
  const selectedCandidateEmail = "email@gmail.com"

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const [selectedDocuements, setSelectedDocuments] = useState([]);
  const [rowsArray, setRowsArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(documentAction(GET_ALL_DOCUMENTS));
  }, [dispatch]);

  const onSubmit = () => {
    let docs = undefined;
    selectedDocuements.map(value=>{
      docs={
        ...docs,
        [value]:false
      }
    })
    
    let data={
      candidateId: "dummy_1234",  //need to take from /register page, forwarded when candidate selected from list
      recruiterId: "dummy_3456",  //needs to take recruiterId from token/ localstorage user object
      documents:docs
    }
    dispatch(documentAction(ADD_REQUESTED_DOCUMENT, data));
  };

  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  function createData(no, documentID, documentName) {
    return { no, documentID, documentName };
  }

  const onRemove = useCallback((event) => {
    var id = event?.currentTarget?.value
    var tempArray = rowsArray;
    const index = tempArray.findIndex(object => {
      return object.documentID === id;
    });

    if (index >= 0) {
      tempArray.splice(index, 1)
      setRowsArray([...tempArray])

    }

    var tempSelectedArray = selectedDocuements;
    const index2 = tempSelectedArray.findIndex(object => {
      return object === id;
    });

    if (index2 >= 0) {
      tempSelectedArray.splice(index2, 1)
      setSelectedDocuments([...tempSelectedArray])
    }

  }, [rowsArray]);


  const handleSelect = useCallback((event, nodeIds) => {
    const updatedArr = selectedDocuements.map((val) => val)
    if (nodeIds[0].startsWith("disabled")) {
      return
    }
    if (!selectedDocuements.includes(nodeIds[0])) {
      updatedArr.push(nodeIds[0])
    }
    setSelectedDocuments(updatedArr)
    let tempArray = [];
    if (selectedDocuements.length > 0) {
      var i = 0;
      selectedDocuements.map((value) => {
        i++;
        tempArray.push(createData(i, value, value))
      })
    }
    setRowsArray(tempArray)
  }, [selectedDocuements, rowsArray])


  const getTreeItemsFromData = useCallback((documentList) => {
    return transformTreeData(documentList);
    
  },[documentList]);

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <section className="conatiner mt-8 mb-20 h-full">
      <div className={`${styles.width100}`}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <PersonIcon></PersonIcon> {selectedCandidateName} <EmailIcon></EmailIcon> {selectedCandidateEmail}
          </CardContent>
        </Card>
      </div>
      <div className="conatiner flex mt-8 mb-20 h-full">
        <form onSubmit={handleSubmit(onSubmit, onError)} className={`${styles.width}`} >
          <div className={`flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}>
            <main
              className={`${styles.backgroundColor} mb-20 max-w-md px-12 self-center rounded mx-auto`}
            >
              <TreeView
                aria-label="multi-select"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={handleSelect}
                multiSelect
                sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto', marginTop: 5 }}
              >

              {!isLoading && getTreeItemsFromData(documentListMemo)}

              </TreeView>
              <div className="flex w-full justify-center pb-4">
                <span className={styles.gradeButtonWrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={styles.loginButton}
                    onClick={handleSubmit(onSubmit, onError)}
                  >
                    {COPY.SUBMIT}
                  </Button>
                </span>
              </div>
            </main>
          </div>
        </form>
        <div className={` backgroundColor ${styles.width}`}>
          <RequestedDocumentList rows={rowsArray} onRemoveElement={onRemove}></RequestedDocumentList>
        </div>
      </div>

    </section>
  );
}
export default withHeader(RequestDocuments);
