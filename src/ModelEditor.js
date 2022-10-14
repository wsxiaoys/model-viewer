import { useMemo, useEffect } from "react";

import { useControls } from "leva";

export default function ModelEditor({ viewer }) {
  const { model } = viewer;
  for (const x of model.materials) {
    if (x.name.startsWith("Placeholder")) {
      const name = x.name.replace("Placeholder.", "");
      const { [name]: image } = useControls({
        [name]: {
          image: null,
        },
      });

      const texture = useMemo(() => {
        if (image) {
          return viewer.createTexture(image);
        }
      }, [viewer, image]);

      useEffect(() => {
        if (!texture) return;
        texture.then((t) => {
          x.pbrMetallicRoughness["baseColorTexture"].setTexture(t);
        });
      }, [texture]);
    }

    if (x.name.startsWith("object.body.")) {
      const name = x.name;
      const v = x.pbrMetallicRoughness.baseColorFactor;
      const { [name]: color } = useControls({
        [name]: {
          r: v[0] * 255,
          g: v[1] * 255,
          b: v[2] * 255,
          a: v[3],
        },
      });

      useEffect(() => {
        x.pbrMetallicRoughness.setBaseColorFactor([
          color.r / 255,
          color.g / 255,
          color.b / 255,
          color.a,
        ]);
      }, [color]);
    }
  }
  return <></>;
}
