import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

interface props {
  folder: {
    name: string;
    path: string;
  };
  editable?: boolean;
  callback?: (name: string) => void;
}

function Folder(props: props) {
  const { editable } = props;
  const folderNameRef = React.createRef<HTMLInputElement>();
  const navigate = useNavigate();
  function handleDoubleClick() {
    navigate(`/files/${props.folder.path}`);
  }
  useEffect(() => {
    if (folderNameRef.current) {
      folderNameRef.current.value = "";
      folderNameRef.current.focus();
      folderNameRef.current.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          if (folderNameRef.current?.value) {
            props.callback && props.callback(folderNameRef.current!.value);
          }
        }
      });
      folderNameRef.current.addEventListener("blur", (e) => {
        if (folderNameRef.current?.value) {
          props.callback && props.callback(folderNameRef.current!.value);
        }
      });
    }
  }, []);
  return (
    <>
      {editable && (
        <div className="folder">
          <img src="/icons/folder.svg" alt="" />
          <input type="text" ref={folderNameRef} />
        </div>
      )}
      {!editable && (
        <div className="folder" onDoubleClick={handleDoubleClick}>
          <img src="/icons/folder.svg" alt="" />
          <h3>
            {props.folder.name.length > 17
              ? props.folder.name.slice(0, 17) + "..."
              : props.folder.name}
          </h3>
        </div>
      )}
    </>
  );
}

export default Folder;
