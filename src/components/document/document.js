import React, { useCallback, useState } from "react";
import { COPY } from "../../constant";
import withHeader from "../HOCS/withHeader";
import DocumentCard from "../document/documentCard";
import styles from "../document/document.module.scss";
import LinearProgressWithLabel from "../common/ProgressBar";
import Toster from "../common/Toster";
import { toast } from "react-toastify";

function Document() {
  const handleFileSelection = async (files) => {};
  const [isStudent, setIsStudent] = useState(true);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileArray, setFileArray] = useState(null);

  const uploadFile = useCallback(async (file, name) => {
    console.log(file, name);
    if (file.length > 0) {
      setFileName(file[0]?.name);
      setFileArray(file);
      setIsComplete(true);
      toast.success("Successfully uploaded");
    } else {
      toast.error("File not supported");
    }
  }, []);

  console.log(fileArray);
  return (
    <section className={styles.BgColor}>
      <div>
      <h1 className="text-center font-bold font-lg text-main">
        {COPY.WELCOME} {"Sandeep Pawar"}
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
          <DocumentCard
            text={COPY.ADHAR}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.PAN}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            className="mb-6"
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.SSC_MARKSHEET}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            className="mb-6"
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.HSC_MARKSHEET}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.GRADUATION}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.EXPERIANCE}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
          <DocumentCard
            text={COPY.PHOTO}
            subText={fileName}
            buttonText={COPY.UPLOAD}
            viewFile={COPY.VIEW_FILE}
            isStudent={isStudent}
            isRecruiter={isRecruiter}
            isComplete={isComplete}
            handleFileSelection={uploadFile}
          />
        </div>
        {isStudent && (
          <LinearProgressWithLabel value={fileArray?.length > 0 ? 100 : 0} />
        )}
      </div>
      <Toster />
    </section>
  );
}
export default withHeader(Document);
