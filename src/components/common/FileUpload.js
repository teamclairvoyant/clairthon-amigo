import React, { useRef, useState } from "react";
import { COPY } from "../../constant";
import Button from "@mui/material/Button";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";

const formatString = (source, ...formatParams) => {
  let formattedString = source;
  formatParams?.forEach((value, index) => {
    formattedString = formattedString.replace(
      new RegExp(`\\{${index}\\}`, "gu"),
      String(value)
    );
  });
  console.log(formattedString);
  return formattedString;
};

const fileExtension = (file) => {
  const extensionSplit = file.name.split(".");
  if (extensionSplit.length > 1) {
    return extensionSplit[extensionSplit.length - 1];
  } else {
    return "";
  }
};

const filterInvalidFileTypes = (files, validFileTypes) => {
  return files.filter(
    (file) =>
      validFileTypes.includes(file.type) ||
      validFileTypes.includes("." + fileExtension(file))
  );
};

function FileUploader(props) {
  const {
    children,
    name,
    allowMultipleFiles,
    disabled,
    restrictFileTypes,
    onSelection,
    text,
    ...inputProps
    
  } = props;
  const [id] = useState(() => Math.random());
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length < 1) {
      return;
    }

    const validatedFiles = restrictFileTypes
      ? filterInvalidFileTypes(files, restrictFileTypes)
      : files;

    const placeholder = formatString(
      COPY.UPLOADED_FILE_PLACEHOLDER,
      String(validatedFiles.length)
    );
    inputRef.current?.setAttribute("placeholder", placeholder);

    if (onSelection) {
      onSelection(validatedFiles,text);
      event.target.value = "";
    }
  };

  const relayTrigger = (event) => {
    event.preventDefault();

    if (!inputRef.current) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      inputRef.current.click();
    }
  };

  return (
    <>
        <div className="text-white mx-auto hover:bg-secondary py-2 md:my-4 px-4 sm:mb-0">
          <input
            aria-hidden="true"
            type="file"
            className="sr-only"
            autoComplete="off"
            readOnly
            placeholder={COPY.UPLOAD_FILE_PLACEHOLDER}
            ref={inputRef}
            name={name}
            id={id}
            disabled={disabled}
            accept={restrictFileTypes?.join(",")}
            multiple={allowMultipleFiles}
            onChange={handleChange}
            {...inputProps}
            tabIndex={-1}
          />
          <label
            htmlFor={id}
            className={`${disabled && "cursor-not-allowed"}`}
          >
            <Button
              variant="contained"
              className="text-center"
              size="small"
              aria-controls={id}
              component="span"
              disabled={disabled}
              onKeyUp={relayTrigger}
            >
               <Icon path={mdiUpload} size={0.7}/>
              {children ?? COPY.UPLOAD_FILES}
            </Button>
          </label>
        </div>
    </>
  );
}
export default FileUploader;
