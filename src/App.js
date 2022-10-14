import "./styles.css";

import { useRef, useState, useEffect } from "react";
import { useControls, button } from "leva";

import ModelEditor from "./ModelEditor";

export default function App() {
  const ref = useRef();
  window.ref = ref;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    function onLoad() {
      setLoaded(true);
    }
    if (ref.current) {
      ref.current.addEventListener("load", onLoad);
      return () => {
        ref.current.removeEventListener("load", onLoad);
      };
    }
  }, [ref]);

  const { src } = useControls({
    src: {
      value: "dress.glb",
      options: ["dress.glb", "pillow.glb", "pillow_uv.glb"],
      onChange() {
        setLoaded(false);
      },
      transient: false,
    },

    Export: button(async (get) => {
      const glTF = await ref.current.exportScene();
      const file = new File([glTF], "export.glb");
      const link = document.createElement("a");
      link.download = file.name;
      link.href = URL.createObjectURL(file);
      link.click();
    }),
  });

  return (
    <div className="App">
      {loaded && <ModelEditor viewer={ref.current} />}
      <model-viewer ref={ref} src={`/${src}`} camera-controls></model-viewer>
    </div>
  );
}
