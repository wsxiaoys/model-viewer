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

store.openSidePanel("background");
store.activePage.set({
  background:
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTY5OTZ8MHwxfHNlYXJjaHw4fHxwYXR0ZXJufGVufDB8fHx8MTY2NTk1ODU3Mg",
});

store.activePage.addElement({
  type: "text",
  text: "YOUR LOGO HERE",
  x: 350,
  y: 120,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amiko",
  fill: "pink",
});

store.activePage.addElement({
  type: "text",
  text: "YOUR LOGO HERE",
  x: 50,
  y: 120,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amiko",
  fill: "white",
});

import { DEFAULT_SECTIONS } from "polotno/side-panel";
const sections = DEFAULT_SECTIONS.filter((x) => {
  return !["templates", "size"].includes(x.name);
});

export default function ImageEditor() {
  React.useEffect(() => {
    store.openSidePanel("");
  }, []);

  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection="background"
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled={false} />
        <Workspace store={store} components={{ PageControls: () => null }} />
        <Preview store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}
