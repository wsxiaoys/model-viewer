import React from "react";
import ReactDOM from "react-dom";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";

import { Toolbar } from "polotno/toolbar/toolbar";
import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel";
import { createStore } from "polotno/model/store";

import Preview from "./Preview";

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.com/cabinet
  key: "_AZce51Xm9jht3Y8_VYv",
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

// make global for debug
// window.store = store;

store.setSize(600, 300);

store.addPage();
store.activePage.addElement({
  type: "text",
  text: "Polotno tips",
  x: 50,
  y: 100,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC",
});

store.activePage.addElement({
  type: "text",
  text: "by Anton Lavrenov",
  x: 50,
  y: 350,
  fontSize: 20,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC",
});

export default function ImageEditor() {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <Preview store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}
