import React, { useCallback, useState, useMemo, useEffect } from "react";
import { COPY } from "../../constant";
import withHeader from "../HOCS/withHeader";
import DocumentCard from "../document/documentCard";
import styles from "../document/document.module.scss";
import LinearProgressWithLabel from "../common/ProgressBar";
import Toster from "../common/Toster";
import { toast } from "react-toastify";
import User from "../Hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_REQUESTED_DOCUMENT,
  UPLOAD_DOCUMENT,
} from "../../redux/constants/user";
import { CandidatedocumentAction } from "../../redux/actions/candidateDocumentAction";
import Spineer from "../../components/spineer/spineer";

function Document() {
  const handleFileSelection = async (files) => {};
  const [isStudent, setIsStudent] = useState(true);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileArray, setFileArray] = useState(null);
  const user = User();
  const docLists = useSelector((state) => state.documentList.documents ?? []);
  const loading = useSelector((state) => state.documentList.loading);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.documentList.error);


  const getDocuments = useCallback(() => {
    dispatch(CandidatedocumentAction(GET_REQUESTED_DOCUMENT, user));
  }, [dispatch]);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const uploadFile = useCallback(
    async (file, name) => {
      if (file.length > 0) {
        setFileName(file[0]?.name);
        setFileArray(file);
        setIsComplete(true);
        const data = new FormData();
        data.append("file", file[0]);
        const fileData = {
          file: data,
          type: "Document",
          description: file[0]?.name,
          candidateId: user?.id,
        };

        dispatch(CandidatedocumentAction(UPLOAD_DOCUMENT, fileData));
        if(error)
        {
          console.log(error);
          toast.error(error);
          dispatch(CandidatedocumentAction(GET_REQUESTED_DOCUMENT, user));
        }
       
      } else {
        toast.error("File not supported");
      }
    },
    [dispatch]
  );

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
      <div className="flex font-bold font-lg mx-12">
        <h1>{COPY.ACTION_REQUIRED}</h1>
      </div>
      <div className="container my-4 mx-auto rounded-lg shadow-lg bg-white rounded-t rounded-b">
        <div
          className={`${styles.cardDivWidth} flex xs:flex-wrap md:flex-wrap lg:mx-4 sm:flex-nowrap sm:items-stretch`}
        >
          {Object.keys(docLists).map((key,index) => (
            <>
              <DocumentCard
                key={key}
                text={key}
                subText={fileName}
                buttonText={COPY.UPLOAD}
                viewFile={COPY.VIEW_FILE}
                isStudent={isStudent}
                isRecruiter={isRecruiter}
                isComplete={JSON.parse(docLists[key])}
                handleFileSelection={uploadFile}
              />
            </>
          ))}
        </div>
        {isStudent && docLists.length > 0 && (
          <LinearProgressWithLabel value={fileArray?.length > 0 ? 100 : 0} />
        )}
      </div>
      <Toster />
    </section>
  );
}
export default withHeader(Document);
