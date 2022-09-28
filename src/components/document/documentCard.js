import React, { useEffect, useRef } from "react";
import styles from "./documentCard.module.scss";
import FileUploader from "../common/FileUpload";
import Button from "@mui/material/Button";

const supportedMimeTypes = [".png", ".jpg", ".jpeg", ".pdf", ".docx"];
//  Displays the Test Drive Card
function DocumentCard(props) {
  const {
    text,
    subText,
    className,
    viewFile,
    onViewFile,
    // isRecruiter = false,
    isStudent = false,
    isComplete = false,
    handleFileSelection,
  } = props;
  const dummy = useRef(null);

  useEffect(() => {
    dummy?.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  return (
    <div
      className={`my-1 px-1 w-full sm:w-1/5 md:w-1/5 md:my-4 md:px-4 lg:w-1/4 flex xs:px-4 ${styles.parentDiv}`}
    >
      <article className="w-full sm:w-auto md:w-full overflow-hidden rounded-lg shadow-lg bg-white rounded-t rounded-b sm:flex sm:flex-col sm:justify-between">
        <div
          className={`flex sm:flex sm:flex-col ${styles.maxHeight} ${styles.padding}`}
        >
          <header className="flex items-center justify-start leading-tight p-2 md:p-2 xs:justify-center xs:items-center sm:text-center">
            <h1 className="text-center font-semibold text-main">{text}</h1>
          </header>
        </div>
        <footer
          className={`md:text-center xs:text-start p-2 md:pb-2 sm:justify-center sm:flex sm:flex-col sm:justify-between sm:flex-grow ${styles.footerPadding}`}
        >
          <p
            className={`${styles.imgSubText} md:${className} xl:mb-0 sm:text-center`}
          >
            {subText}
          </p>
          {isStudent && !isComplete && (
            <div className="flex justify-between">
              <>
                <FileUploader
                  disabled={isComplete}
                  allowMultipleFiles
                  restrictFileTypes={supportedMimeTypes}
                  onSelection={handleFileSelection}
                  text={text}
                ></FileUploader>
              </>
            </div>
          )}
          {isComplete && (
            <div className="flex justify-center pt-2">
              <Button
                variant="contained"
                className="text-center w-32 h-8"
                size="small"
                component="span"
                onClick={(e) => {
                  onViewFile(e, text);
                }}
              >
                {viewFile}
              </Button>
            </div>
          )}
        </footer>
        <span className={isComplete ? styles.bgGren : styles.bgRed}></span>
      </article>
    </div>
  );
}

export default DocumentCard;
