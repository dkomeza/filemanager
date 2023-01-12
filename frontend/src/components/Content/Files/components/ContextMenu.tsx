import React, { MutableRefObject } from "react";

interface props {
  coords: {
    x: number;
    y: number;
  };
  event: React.MouseEvent;
  setContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateFolder: () => void;
  mainRef: MutableRefObject<HTMLElement | null>;
}

function ContextMenu(props: props) {
  const { coords, setContextMenu, handleCreateFolder, event, mainRef } = props;
  const target = getTarget(event);
  function getTranslate() {
    const translate = { x: 0, y: 0 };
    if (coords.y > 200) {
      translate.y = -100;
    }

    if (coords.x > mainRef.current!.getBoundingClientRect().right - 200) {
      translate.x = -100;
    }
    return `translate(${translate.x}%, ${translate.y}%)`;
  }
  function getTarget(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("file")) {
      return "file";
    }
    if (target.classList.contains("folder")) {
      return "folder";
    }
    return;
  }
  function handleContextMenu() {
    // e.preventDefault();
    setContextMenu(false);
    console.log("Supcio");
  }
  return (
    <div className="context-menu-wrapper">
      <div
        className="context-menu"
        style={{
          top: `${coords.y}px`,
          left: `${coords.x}px`,
          transform: getTranslate(),
        }}
        onBlur={() => handleContextMenu}
      >
        <ul>
          {target !== "folder" && target !== "file" && (
            <li>
              <span onClick={handleCreateFolder} className="context-option">
                New Folder
              </span>
            </li>
          )}
          {target !== "folder" && target !== "file" && (
            <li>
              <span className="context-option">New File</span>
            </li>
          )}
          {(target === "folder" || target === "file") && (
            <li>
              <span className="context-option">Download</span>
            </li>
          )}
          {(target === "folder" || target === "file") && (
            <li>
              <span className="context-option">Rename</span>
            </li>
          )}
          {(target === "folder" || target === "file") && (
            <li>
              <span className="context-option">Info</span>
            </li>
          )}
          {(target === "folder" || target === "file") && (
            <li>
              <span className="context-option">Delete</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ContextMenu;
