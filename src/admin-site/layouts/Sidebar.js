/*
SIDEBAR COMPONENT COMPONENT
SIDE NAV LINKS TO DIFFERENT PAGES
*/

import {
  FilePdfOutlined,
  SolutionOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../../services/AuthService";
import "./assets/Sidebar.css";
const menuSelectedTileStyle = {
  highligh: { color: "red" },
};
const SideNav = (props) => {
  const history = useHistory();
  // const [collapse, setCollapse] = useState([false]);
  const OPEN_KEYS = [];
  const [openKeys, setOpenKeys] = useState(OPEN_KEYS);
  const [selectedMenu, setSelectedMenu] = useState(1);

  const isAdmin = () => {
    return AuthService.validateAuthAdmin();
  };

  const handleDocumentClick = (e) => {
    setSelectedMenu(1);
    history.push("/admin");
  };
  const handleUploadClick = () => {
    history.push("/admin/upload");
    setSelectedMenu(2);
  };
  const handleFileClick = () => {
    setSelectedMenu(3);
    history.push("/admin/files");
  };
  const handleTrainingClick = () => {
    setSelectedMenu(4);
    history.push("/admin/training");
  };
  const handleRequestClick = () => {
    setSelectedMenu(5);
    history.push("/admin/request");
  };
  const handleKeyEvent = (e, path, key) => {
    setSelectedMenu(key);
    if (e.code === "Enter") {
      history.push(path);
    }
  };

  return (
    <React.Fragment>
      <div style={{ height: "55px", margin: "8px" }}>
        {props.collapse ? (
          <img
            src="/img/logo-graph.png"
            alt="disability wiki logo full width"
            style={{
              marginTop: "-2.6rem",
              height: "9.5rem",
              marginLeft: "-2.2rem",
            }}
          />
        ) : (
          <img
            src="/img/dis-logo2.png"
            alt="disability wiki logo half width"
            style={{ marginTop: "-4rem", height: "11rem" }}
          />
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["6"]}
        openKeys={openKeys}
      >
        <Menu.Item
          key="1"
          aria-label="document side link"
          className={selectedMenu == 1 ? "selectedMenuItem" : null}
          tabIndex="0"
          onClick={handleDocumentClick}
          onKeyPress={(e) => handleKeyEvent(e, "/admin", 1)}
        >
          <FilePdfOutlined />
          <span> Documents</span>
        </Menu.Item>
        <Menu.Item
          key="2"
          aria-label="document upload link"
          className={selectedMenu == 2 ? "selectedMenuItem" : null}
          tabIndex="0"
          onKeyPress={(e) => handleKeyEvent(e, "/admin/upload", 2)}
          onClick={handleUploadClick}
        >
          <UploadOutlined />
          <span> Upload</span>
        </Menu.Item>
        <Menu.Item
          key="3"
          aria-label="classification result side link"
          className={selectedMenu == 3 ? "selectedMenuItem" : null}
          b
          tabIndex="0"
          onKeyPress={(e) => handleKeyEvent(e, "/admin/files", 3)}
          onClick={handleFileClick}
        >
          <SolutionOutlined />
          <span> Classification</span>
        </Menu.Item>

        {isAdmin() ? (
          <Menu.Item
            key="4"
            aria-label="training data side link"
            className={selectedMenu == 4 ? "selectedMenuItem" : null}
            tabIndex="0"
            onKeyPress={(e) => handleKeyEvent(e, "/admin/training", 4)}
            onClick={handleTrainingClick}
          >
            <SolutionOutlined />
            <span> Training Data</span>
          </Menu.Item>
        ) : null}
        {isAdmin() ? (
          <Menu.Item
            key="5"
            aria-label="request wikidata upload side link"
            className={selectedMenu == 5 ? "selectedMenuItem" : null}
            tabIndex="0"
            onKeyPress={(e) => handleKeyEvent(e, "/admin/request", 5)}
            onClick={handleRequestClick}
          >
            <SolutionOutlined />
            <span> Upload Request </span>
          </Menu.Item>
        ) : null}
      </Menu>
    </React.Fragment>
  );
};

export default SideNav;
