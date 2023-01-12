import React, { useEffect, useState } from "react";

import logo from "@Assets/Navbar/logo.webp";

interface props {
  file: {
    name: string;
    size: number;
    modified: string;
    icon: string;
  };
}

function File(props: props) {
  function getIcon() {
    return "";
  }
  return (
    <div className="file">
      <img src={`/icons/${props.file.icon}`} alt="" />
      <h3>
        {props.file.name.length > 18
          ? props.file.name.slice(0, 18) + "..."
          : props.file.name}
      </h3>
    </div>
  );
}

export default File;
