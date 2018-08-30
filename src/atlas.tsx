import * as DCL from "decentraland-api";

export type Frame = { width: number; height: number; x: number; y: number };
export type Frames = {
  [key: string]: Frame;
};

export function createAtlas<T extends Frames, K extends keyof T>(opts: {
  material: string;
  textureSize: { width: number; height: number };
  frames: T;
}) {
  const { textureSize, frames, material } = opts;
  let obj: Record<K, number[]> = {} as any;

  Object.keys(frames).forEach(name => {
    const frame = frames[name];
    const sw = textureSize.width;
    const sh = textureSize.height;
    const x = frame.x / sw;
    const y = frame.y / sh;
    const w = frame.width / sw;
    const h = frame.height / sh;
    let uvs: number[] = [];
    uvs[0] = x;
    uvs[1] = 1 - y - h;
    uvs[2] = x + w;
    uvs[3] = 1 - y - h;
    uvs[4] = x + w;
    uvs[5] = 1 - y;
    uvs[6] = x;
    uvs[7] = 1 - y;
    uvs = uvs.concat(uvs); // back face
    obj[name] = uvs;
  });

  return function(props: JSX.MaterialEntity & { frame: K }) {
    return <plane {...props} material={material} uvs={obj[props.frame]} />;
  };
}
