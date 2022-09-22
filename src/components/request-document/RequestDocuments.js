import React, { useCallback, useState } from "react";
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

function RequestDocuments() {
  const userList = useSelector((state) => state.userList);
  console.log('docs',userList);
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

  const onSubmit = () => {
    //Register
  };
  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  const goToRequestDocument = useCallback(() => {}, []);

      const handleSelect = (event, nodeIds) => {
        const updatedArr = selectedDocuements.map((val) => val)
        if (!selectedDocuements.includes(nodeIds[0])) {
          updatedArr.push(nodeIds[0])
        }
        setSelectedDocuments(updatedArr)
      }

    return (
      <section className="conatiner flex mt-8 mb-20 h-full">
        <form onSubmit={handleSubmit(onSubmit, onError)} className ={`${styles.width}`} >
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
                   sx={{ height: 200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' ,marginTop: 5 }}
                >
                    <TreeItem nodeId="PD" label="Personal document" >
                        <TreeItem nodeId="PD_PAN-CARD" label="Pan card" ></TreeItem>
                        <TreeItem nodeId="PD_ADHAR-CARD" label="Adhar Card" ></TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="ADD" label="Address">
                        <TreeItem nodeId="ADD_ADHAR-CARD" label="Adhar card" />
                        <TreeItem nodeId="ADD_VOTER-ID" label="Voter id"/>
                    </TreeItem>
                    <TreeItem nodeId="ED" label="Educational Documents">
                        <TreeItem nodeId="ED_GRADUATION-CART" label="Graduation Certificate"  />
                        <TreeItem nodeId="ED_DIPLOMA" label="Diploma"/>
                        <TreeItem nodeId="ED_HSC" label="HSC"/>
                    </TreeItem>
                    <TreeItem nodeId="EXP" label="Experiance">
                    </TreeItem>
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
          {/* Selected docs list:
          {selectedDocuements} */}
          <RequestedDocumentList props={selectedDocuements}></RequestedDocumentList>
          </div>
        </section>
      );
}
export default withHeader(RequestDocuments);
