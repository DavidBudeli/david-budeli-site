import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { sources } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

type ResourceType = Texture | GLTF;

class Resources extends EventEmitter<{
  ready: void;
  progress: number;
  error: Error;
}> {
  toLoad = sources.length;
  isReady = false;
  failed = false;
  started = false;
  loaded = 0;
  items: Record<string, any> = {};

  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    fontLoader: FontLoader;
  };

  constructor() {
    super();

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader(),
    };
  }

  startLoading() {
    if (this.started) return;
    this.started = true;
    const onError = () => {
      this.failed = true;
      this.emit("error", new Error("Unable to load an interactive resource"));
    };

    for (const source of sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file);
          },
          undefined,
          onError,
        );
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(
          source.path,
          (file: Texture) => {
            file.colorSpace = SRGBColorSpace;
            this.sourceLoaded(source, file);
          },
          undefined,
          onError,
        );
      }
    }
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    this.items[source.name] = file;

    this.loaded++;

    this.emit("progress", this.loaded / this.toLoad);

    if (this.loaded === this.toLoad) {
      this.isReady = true;
      this.emit("ready");
      this.log("All resources loaded");
    }
  }

  log(message: string) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }
}

export const resources = new Resources();
resources.startLoading();
