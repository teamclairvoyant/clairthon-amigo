import React, { useCallback, useState } from 'react';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./RequestDocument.module.scss";
import Button from "@mui/material/Button";
import { COPY } from "../../constant";
import withHeader from "../HOCS/withHeader";

function RequestDocuments() {

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

      const onSubmit = () => {
        //Register
      };
      const onError = useCallback(() => {
        //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
        // setLoader(false);
      }, []);

      const goToRequestDocument=useCallback(()=>{
      },[]);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={`h-screen flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}>
            <main
              className={`${styles.backgroundColor} max-w-md px-12 self-center rounded mx-auto`}
            >
              <TreeView
                   aria-label="multi-select"
                   defaultCollapseIcon={<ExpandMoreIcon />}
                   defaultExpandIcon={<ChevronRightIcon />}
                   multiSelect
                   sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="1" label="Personal document">
                        <TreeItem nodeId="2" label="Pan card" ></TreeItem>
                        <TreeItem nodeId="3" label="Pan card" ></TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="4" label="Address">
                        <TreeItem nodeId="5" label="Adhar card" />
                        <TreeItem nodeId="6" label="Voter id"/>
                    </TreeItem>
                    <TreeItem nodeId="7" label="Educational Documents">
                        <TreeItem nodeId="8" label="Graduation Certificate"  />
                        <TreeItem nodeId="9" label="Diploma"/>
                        <TreeItem nodeId="10" label="HSC"/>
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
      );
}
export default withHeader(RequestDocuments);