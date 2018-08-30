# Decentraland Sprite Helpers

A tiny library that contains helpers for creating and animating sprites using Decentraland's SDK.

This project includes:

- `createAtlas()`: Generates a sprite based on frames from a texture atlas (meant for UIs)
- `createSpriteSheet()`: Generates frames for a spritesheet (meant for animations)

## Getting started

Install the dependency:

`npm i --save dcl-sprites`

Import the library:

`import { createSpriteSheet } from 'dcl-sprites'`

Define a basic material to be used for the sprites:

```jsx
<basic-material
  id="material"
  texture="./spritesheet.png"
  samplingMode={DCL.TextureSamplingMode.TRILINEAR}
/>
```

Basic materials are not affected by light and will allow you to change the texture sampling to render pixelart-like textures.

## Example usage:

To easily animate a sprite based on a spritesheet:

```tsx
// import { createSpriteSheet } from 'dcl-sprites'
// ...
async render() {
    const Sprite = createSpriteSheet({
      material: "#material",
      textureSize: { width: 512, height: 512 },
      cellSize: { width: 128, height: 128 }
    });
    return (
      <scene>
        <entity position={{ x: 5, y: 1, z: 5 }}>
          <basic-material
            id="material"
            texture="./spritesheet.png"
            samplingMode={DCL.TextureSamplingMode.TRILINEAR}
          />
          <Sprite
            frame="frame0"
            position={{ x: 0, y: 0.3, z: -0.01 }}
            scale={{ x: 1, y: 1, z: 1 }}
          />
        </entity>
      </scene>
    );
}
```

The above example can then be animated using `setInterval()` to `setState()` and rerender the sprite with a new frame with a fixed time interval (frames per second).

To easily obtain pieces of a bundled texture atlas:

```tsx
// import { createAtlas } from 'dcl-sprites'
// ...
async render() {
    const Sprite = createAtlas({
      material: "#material",
      textureSize: { width: 512, height: 512 },
      frames: {
        myFrame: { x: 0, y: 0, width: 128, height: 128 }
      }
    });

    return (
      <scene>
        <entity position={{ x: 5, y: 1, z: 5 }}>
          <basic-material
            id="material"
            texture="./spritesheet.png"
            samplingMode={DCL.TextureSamplingMode.TRILINEAR}
          />
          <Sprite
            frame="myFrame"
            position={{ x: 0, y: 0.3, z: -0.01 }}
            scale={{ x: 1, y: 1, z: 1 }}
          />
        </entity>
      </scene>
    );
}
```
