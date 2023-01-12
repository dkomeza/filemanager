import React, { useEffect, useRef, useState } from "react";
import getCurrentIcon from "../helpers/getCurrentIcon";
import File from "./components/File";
import Folder from "./components/Folder";
import ContextMenu from "./components/ContextMenu";

import { useAuth } from "@Auth/context/AuthContext";

import { useParams, useNavigate } from "react-router-dom";

import "@Style/Files/Files.scss";

function Files(props: { update: boolean }) {
  const params = useParams();
  const path = params["*"];
  const navigate = useNavigate();
  const { currentUser } = useAuth()!;
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [createFolder, setCreateFolder] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const [contextMenu, setContextMenu] = useState(false);
  const [contextMenuCoords, setContextMenuCoords] = useState({ x: 0, y: 0 });
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    console.log("Loaded");
    document.title = "Files";
    getCurrentIcon("files");
    fetchData(path);
  }, [params, props.update]);

  async function fetchData(path?: string) {
    let url = "https://filemanager.dawidkomeza.pl/api/files";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser!.username,
        publicKey: currentUser!.publicKey,
        directory: path,
      }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error("Invalid username or password");
    }
    setFiles(data.files);
    setFolders(data.folders);
  }

  // function handleLeftClick(e: React.MouseEvent<HTMLElement>) {
  //   // setContextMenu(false);
  //   console.log("Left click");
  // }

  function handleRightClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setContextMenuCoords({ x: e.clientX, y: e.clientY });
    setContextMenu(true);
    setEvent(e);
  }

  function handleScroll(e: React.UIEvent<HTMLElement>) {
    setContextMenu(false);
  }

  function hoverBreadCrumbs(index: number) {
    const breadcrumbs = document.querySelectorAll(".breadcrumbs");
    breadcrumbs.forEach((breadcrumb, i) => {
      if (i < index) {
        breadcrumb.classList.add("hover");
      } else {
        breadcrumb.classList.remove("hover");
      }
    });
  }

  function handleBreadCrumbs(index: number) {
    const finalPath =
      "/files/" +
      path
        ?.split("/")
        .slice(0, index + 1)
        .join("/");
    navigate(finalPath);
  }

  async function handleCreateFolder(name: string) {
    let url = "https://filemanager.dawidkomeza.pl/api/createFolder";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser!.username,
        publicKey: currentUser!.publicKey,
        directory: path,
        folderName: name,
      }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error("Invalid username or password");
    }
    setCreateFolder(false);
    fetchData(path);
  }

  return (
    <main
      className="files"
      onClick={() => setContextMenu(false)}
      onContextMenu={(e) => handleRightClick(e)}
      onScroll={(e) => handleScroll(e)}
      ref={mainRef}
    >
      {path && (
        <div className="path">
          <span
            className="breadcrumbs"
            onClick={() => handleBreadCrumbs(-1)}
            onMouseEnter={() => hoverBreadCrumbs(1)}
            onMouseLeave={() => hoverBreadCrumbs(0)}
          >
            Home
          </span>
          {path.split("/").map((folder, index) => (
            <span
              className="breadcrumbs"
              key={index}
              onClick={() => handleBreadCrumbs(index)}
              onMouseEnter={() => hoverBreadCrumbs(index + 2)}
              onMouseLeave={() => hoverBreadCrumbs(0)}
            >
              /{folder}
            </span>
          ))}
        </div>
      )}
      <div className="files-container" onClick={() => setContextMenu(false)}>
        {folders && (
          <div
            className="folders-wrapper main-wrapper"
            onClick={() => setContextMenu(false)}
          >
            <h2>Folders</h2>
            <div
              className="flex-container"
              onClick={() => setContextMenu(false)}
            >
              {folders.map((folder, index) => (
                <div key={index}>
                  <Folder folder={folder} />
                </div>
              ))}
              {createFolder && (
                <Folder
                  folder={{ name: "", path: "" }}
                  editable={true}
                  callback={handleCreateFolder}
                />
              )}
            </div>
          </div>
        )}
        {files && (
          <div
            className="files-wrapper main-wrapper"
            onClick={() => setContextMenu(false)}
          >
            <h2>Files</h2>
            <div
              className="flex-container"
              onClick={() => setContextMenu(false)}
            >
              {files.map((file, index) => (
                <div key={index}>
                  <File key={index} file={file} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {contextMenu && (
        <ContextMenu
          coords={contextMenuCoords}
          setContextMenu={setContextMenu}
          event={event}
          handleCreateFolder={() => setCreateFolder(true)}
          mainRef={mainRef}
        />
      )}
    </main>
  );
}

export default Files;
