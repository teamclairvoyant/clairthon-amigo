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
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import {
  GET_REQUESTED_DOCUMENT,
  UPLOAD_DOCUMENT,
  VIEW_FILE,
  DOWNLOAD_ALL,
} from "../../redux/constants/user";
import { useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const candidate = location.state?.candidate ?? null;

  const docListsFilter = useMemo(() => {
    return Object.keys(docLists).filter(
      (item) => JSON.parse(docLists[item]) === true
    );
  }, [docLists]);

  const userType = useMemo(() => {
    return user?.["custom:user_type"];
  }, [user]);

  const getDocuments = useCallback(() => {
    if (userType === "Recruiter") {
      const userData = {
        sub: candidate?.candidateId ?? "",
      };
      dispatch(CandidatedocumentAction(GET_REQUESTED_DOCUMENT, userData));
    } else {
      dispatch(CandidatedocumentAction(GET_REQUESTED_DOCUMENT, user));
    }
  }, [dispatch, candidate?.candidateId, user, userType]);

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
  }, []);

  const uploadFile = useCallback(
    async (file, name) => {
      if (file.length > 0) {
        const data = new FormData();
        data.append("file", file[0]);
        data.append("description", name);
        data.append("userId", user?.sub ?? "");

        await dispatch(CandidatedocumentAction(UPLOAD_DOCUMENT, data));
        await getDocuments();
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error("File not supported");
      }
    },
    [dispatch, error, getDocuments, user?.sub]
  );

  const onViewFile = useCallback(
    async (e, fileName) => {
      if (userType === "Recruiter") {
        const userData = {
          sub: candidate?.candidateId ?? "",
        };
        await dispatch(
          CandidatedocumentAction(VIEW_FILE, fileName, userData?.sub ?? "")
        );
      } else {
      await dispatch(CandidatedocumentAction(VIEW_FILE, fileName, user?.sub ?? ""));
      }
    },
    [candidate?.candidateId, dispatch, user?.sub, userType]
  );
  const downloadAll = useCallback(async () => {
    if (userType === "Recruiter") {
      const userData = {
        sub: candidate?.candidateId ?? "",
      };
      dispatch(CandidatedocumentAction(DOWNLOAD_ALL, userData?.sub));
    } else {
      await dispatch(CandidatedocumentAction(DOWNLOAD_ALL, user?.sub ?? ""));
    }
  }, [dispatch, user?.sub, candidate?.candidateId, userType]);

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
        {userType === "Candidate" && (
          <p className="text-center font-bold font-lg text-main">
            {COPY.ACTION_ITEMS}
          </p>
        )}
      </div>
      <div className="font-bold font-lg mx-12">
        <div className="flex justify-start">
          <h1 className="flex justify-start">{COPY.ACTION_REQUIRED}</h1>
        </div>
        <div className="flex justify-end">
          <>
            {docLists !== null && docListsFilter?.length > 0 && (
              <Button
                variant="contained"
                className="text-center"
                size="small"
                component="span"
                onClick={downloadAll}
              >
                {COPY.DOWNLOAD_ALL}
              </Button>
            )}
          </>
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
        {userType === "Candidate" && docLists && docLists !== null && (
          <LinearProgressWithLabel
            value={calculateProgress > 0 ? calculateProgress : 0}
          />
        )}
      </div>

      <Link href="/register">Go back</Link>
      <Toster />
    </section>
  );
}
export default withHeader(Document);
