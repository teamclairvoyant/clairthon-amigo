import React, { useCallback, useState, useMemo, useEffect } from "react";
import { COPY } from "../../constant";
import withHeader from "../HOCS/withHeader";
import DocumentCard from "../document/documentCard";
import styles from "../document/document.module.scss";
import LinearProgressWithLabel from "../common/ProgressBar";
import Toster from "../common/Toster";
import { toast } from "react-toastify";
import User from "../Hooks/useAuth";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_REQUESTED_DOCUMENT,
  UPLOAD_DOCUMENT,
  VIEW_FILE,
  DOWNLOAD_ALL,
} from "../../redux/constants/user";
import { CandidatedocumentAction } from "../../redux/actions/candidateDocumentAction";
import Spineer from "../../components/spineer/spineer";

function Document() {
  const [isStudent, setIsStudent] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const user = User();
  const docLists = useSelector((state) => state.documentList.documents ?? []);
  const loading = useSelector((state) => state.documentList.loading);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.documentList.error);

  const userType = useMemo(() => {
    return user?.["custom:user_type"];
  }, [user]);

  const getDocuments = useCallback(() => {
    dispatch(CandidatedocumentAction(GET_REQUESTED_DOCUMENT, user));
  }, [dispatch]);

  const calculateProgress = useMemo(() => {
    const length = Object.keys(docLists).length;
    const fileUploaded = Object.keys(docLists).filter(
      (item) => JSON.parse(docLists[item]) === true
    );

    const calculatePercentage = Math.round(
      (fileUploaded.length / length) * 100
    );
    return calculatePercentage;
  }, [docLists]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const uploadFile = useCallback(
    async (file, name) => {
      if (file.length > 0) {
        const data = new FormData();
        data.append("file", file[0]);
        data.append("description", name);
        data.append("userId", "32bd9e35-9217-4631-85a2-9229ad1e96e1");

        await dispatch(CandidatedocumentAction(UPLOAD_DOCUMENT, data));
        await getDocuments();
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error("File not supported");
      }
    },
    [dispatch, error, getDocuments]
  );

  const onViewFile = useCallback(
    async (e, fileName) => {
      await dispatch(CandidatedocumentAction(VIEW_FILE, fileName));
      // await getDocuments();
    },
    [dispatch]
  );
  const downloadAll = useCallback(async () => {
    await dispatch(CandidatedocumentAction(DOWNLOAD_ALL, "232323"));
    await getDocuments();
  }, [dispatch, getDocuments]);


  if (loading) {
    return (
      <section className={styles.BgColor}>
        <div className="flex justify-center pt-10">
          <Spineer />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.BgColor}>
      <div>
        <h1 className="text-center font-bold font-lg text-main">
          {COPY.WELCOME} {user?.given_name} {user?.family_name}
        </h1>
        <p className="text-center font-bold font-lg text-main">
          {COPY.ACTION_ITEMS}
        </p>
      </div>
      <div className="font-bold font-lg mx-12">
        <div className="flex justify-start">
          <h1 className="flex justify-start">{COPY.ACTION_REQUIRED}</h1>
        </div>
        <div className="flex justify-end">
          <Button
            variant="contained"
            className="text-center"
            size="small"
            component="span"
            onClick={downloadAll}
          >
            {COPY.DOWNLOAD_ALL}
          </Button>
        </div>
      </div>
      <div className="container my-4 mx-auto rounded-lg shadow-lg bg-white rounded-t rounded-b">
        <div
          className={`${styles.cardDivWidth} flex xs:flex-wrap md:flex-wrap lg:mx-4 sm:flex-nowrap sm:items-stretch`}
        >
          {Object.keys(docLists).map((key, index) => (
            <>
              <DocumentCard
                key={key}
                text={key}
                subText={JSON.parse(docLists[key]) && key}
                buttonText={COPY.UPLOAD}
                viewFile={COPY.VIEW_FILE}
                isStudent={userType === "Candidate" ? true : false}
                isRecruiter={userType === "Recruiter" ? true : false}
                isComplete={JSON.parse(docLists[key])}
                handleFileSelection={uploadFile}
                onViewFile={onViewFile}
              />
            </>
          ))}
        </div>
        {userType === "Candidate" && (
          <LinearProgressWithLabel
            value={calculateProgress > 0 ? calculateProgress : 0}
          />
        )}
      </div>
      <Toster />
    </section>
  );
}
export default withHeader(Document);
