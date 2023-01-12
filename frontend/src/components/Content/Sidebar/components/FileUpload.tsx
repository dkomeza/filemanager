import React, { useEffect, useRef, useState } from "react";

interface props {
  file: File;
  currentUser: User | undefined;
  callback: (element: file) => void;
  current: any;
  setRefresh: any;
}

interface file {
  file: File;
  key: string;
  currentUser: User | undefined;
}

interface User {
  username: string;
  publicKey: string;
}

function FileUpload(props: props) {
  const [progress, setProgress] = useState(0);
  const { file, currentUser, callback, current } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const req = new XMLHttpRequest();
    req.open("POST", "https://filemanager.dawidkomeza.pl/api/upload");
    req.upload.addEventListener("progress", (e) => {
      const percent = Math.round((e.loaded / e.total) * 100);
      setProgress(percent);
    });
    req.upload.addEventListener("load", (e) => {
      callback(current);
    });
    const data = new FormData();
    data.append("file", file);
    data.append("username", currentUser?.username!);
    data.append("publicKey", currentUser?.publicKey!);
    req.send(data);
    buttonRef.current?.addEventListener("click", function () {
      req.abort();
      callback(current);
    });
  }, []);
  return (
    <div>
      <h3>{props.file.name}</h3>
      <progress value={progress} max="100" />
      <button ref={buttonRef}>Cancel</button>
    </div>
  );
}

export default FileUpload;
