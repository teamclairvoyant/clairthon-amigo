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

  const onSubmit = () => {
    //Register
  };
  const onError = useCallback(() => {
    //notificationService.showError(COPY.VALIDATION_ENTER_ALL_FIELDS);
    // setLoader(false);
  }, []);

  const goToRequestDocument = useCallback(() => {}, []);

  return (
    <section className="conatiner mt-8 mb-20 h-full">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div
          className={`flex bg-primary bg-no-repeat bg-cover ${styles.backImg}`}
        >
          <main
            className={`${styles.backgroundColor} mb-20 max-w-md px-12 self-center rounded mx-auto`}
          >
            <h5 className="text-center font-semibold text-main mt-6">
              {COPY.SELCT_DOCS}
            </h5>
            <TreeView
              aria-label="multi-select"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              multiSelect
              sx={{
                height: 200,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
                marginTop: 3,
              }}
            >
              <TreeItem nodeId="1" label="Personal document">
                <TreeItem nodeId="2" label="Pan card"></TreeItem>
                <TreeItem nodeId="3" label="Pan card"></TreeItem>
              </TreeItem>
              <TreeItem nodeId="4" label="Address">
                <TreeItem nodeId="5" label="Adhar card" />
                <TreeItem nodeId="6" label="Voter id" />
              </TreeItem>
              <TreeItem nodeId="7" label="Educational Documents">
                <TreeItem nodeId="8" label="Graduation Certificate" />
                <TreeItem nodeId="9" label="Diploma" />
                <TreeItem nodeId="10" label="HSC" />
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
    </section>
  );
}
export default withHeader(RequestDocuments);
