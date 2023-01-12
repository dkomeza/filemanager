import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@Auth/context/AuthContext";

import FileUpload from "./components/FileUpload";

import { useParams } from "react-router-dom";

import { v4 as uuid } from "uuid";

interface User {
  username: string;
  publicKey: string;
}

interface file {
  file: File;
  key: string;
  currentUser: User | undefined;
}

import "@Style/Sidebar/Sidebar.scss";

function Sidebar(props: { callback: any }) {
  const params = useParams();
  console.log(params);
  const { currentUser } = useAuth()!;
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadList, setUploadList] = useState<file[] | null>([]);
  const [path, setPath] = useState<string | null>(null);

  const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const files = fileRef.current?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const currentFile = {
          file: files[i],
          key: uuid(),
          currentUser: currentUser,
        };
        if (uploadList) {
          setUploadList((current) => [...current!, currentFile]);
        } else {
          setUploadList([currentFile]);
        }
      }
    }
    fileRef.current!.value = "";
  };

  const handleUnmount = (componenet: file) => {
    props.callback((state: boolean) => !state);
    setUploadList((current) =>
      current?.filter((item) => item.key !== componenet.key)
        ? current?.filter((item) => item.key !== componenet.key)
        : null
    );
  };

  useEffect(() => {
    handleParams(params);
  }, [params]);

  const handleParams = (params: any) => {
    const paramsArray = params["*"].split("/");
    if (paramsArray[0] === "files") {
      const path: string = paramsArray.slice(1).join("/");
      setPath(path);
    }
  };

  const checkList = () => {
    console.log(uploadList);
  };

  return (
    <aside className="sidebar">
      <h2 onClick={checkList}>OCloud Storage</h2>
      <div className="storage"></div>
      <div className="size"></div>
      <div className="upload">
        <input
          onInput={handleFileUpload}
          type="file"
          name="files"
          id="file-input"
          multiple
          ref={fileRef}
        />
      </div>
      {uploadList && (
        <div className="upload-list">
          {uploadList.map((file) => (
            <div key={file.key}>
              <FileUpload
                file={file.file}
                currentUser={file.currentUser}
                callback={handleUnmount}
                current={file}
                setRefresh={props.callback}
              />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
