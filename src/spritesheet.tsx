import * as DCL from "decentraland-api";

export function createSpriteSheet(opts: {
  material: string;
  textureSize: { width: number; height: number };
  cellSize: { width: number; height: number };
}) {
  const { textureSize, cellSize, material } = opts;
  const horizontalCells = textureSize.width / cellSize.width;
  const verticalCells = textureSize.height / cellSize.height;
  let obj: Record<string, number[]> = {} as any;
  let acc = 0;

  for (let y = 0; y < verticalCells; y++) {
    for (let x = 0; x < horizontalCells; x++) {
      const offsetX = cellSize.width * x;
      const offsetY = cellSize.height * y;
      const _x = offsetX / textureSize.width;
      const _y = offsetY / textureSize.height;
      const _w = cellSize.width / textureSize.width;
      const _h = cellSize.height / textureSize.height;
      let uvs: number[] = [];

      uvs[0] = _x;
      uvs[1] = 1 - _y - _h;
      uvs[2] = _x + _w;
      uvs[3] = 1 - _y - _h;
      uvs[4] = _x + _w;
      uvs[5] = 1 - _y;
      uvs[6] = _x;
      uvs[7] = 1 - _y;
      uvs = uvs.concat(uvs); // back face
      obj[`frame${acc}`] = uvs;
      acc++;
    }
  }

  return function(props: JSX.MaterialEntity & { frame: string }) {
    return <plane {...props} material={material} uvs={obj[props.frame]} />;
  };
}
