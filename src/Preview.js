import React from "react";
import { Navbar, Button } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";

import { throttle } from "underscore";
import Jimp from "jimp/es";

const Preview = observer(({ store }) => {
  const [previewVisible, setPreviewVisible] = React.useState(true);
  const [content, setContent] = React.useState("");

  const updateContent = throttle(async () => {
    const imageUrl = await store.toDataURL();
    const image = await Jimp.read(imageUrl);
    image.contain(512, 512, Jimp.VERTICAL_ALIGN_TOP);
    setContent(await image.getBase64Async("image/png"));
  }, 300);

  React.useEffect(() => {
    // when loading for all fonts
    store.waitLoading().then(updateContent);
    store.on("change", updateContent);

    const id = setInterval(updateContent, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const modelViewerRef = React.useRef();
  const [modelLoaded, setModelLoaded] = React.useState(false);
  React.useEffect(() => {
    function onLoad() {
      setModelLoaded(true);
    }
    if (modelViewerRef.current) {
      modelViewerRef.current.addEventListener("load", onLoad);
      return () => {
        modelViewerRef.current.removeEventListener("load", onLoad);
      };
    }
  }, [modelViewerRef]);

  React.useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer || !modelLoaded) return;
    const { model } = viewer;
    const texture = viewer.createTexture(content);
    for (const x of model.materials) {
      if (x.name.startsWith("Placeholder")) {
        texture.then((t) => {
          x.pbrMetallicRoughness["baseColorTexture"].setTexture(t);
        });
        break;
      }
    }
  }, [modelViewerRef, content, modelLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: 0,
        zIndex: 10,
        zIndex: 10000,
        transformOrigin: "top left",
        background: "white",
        border: "1px solid rgba(16, 22, 26, 0.2)",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <Navbar>
        <Navbar.Group align="right">
          {previewVisible && (
            <Button
              icon="eye-off"
              minimal
              onClick={() => {
                setPreviewVisible(false);
              }}
            >
              Hide preview
            </Button>
          )}
          {!previewVisible && (
            <Button
              icon="eye-on"
              minimal
              onClick={() => {
                setPreviewVisible(true);
              }}
            >
              Show preview
            </Button>
          )}
        </Navbar.Group>
      </Navbar>
      <div
        className="preview-container"
        style={{
          display: previewVisible ? "" : "none",
          position: "relative",
          width: "300px",
          height: "300px",
        }}
      >
        <model-viewer
          ref={modelViewerRef}
          src="/pillow_uv.glb"
          camera-controls
        />
      </div>
    </div>
  );
});

export default Preview;
