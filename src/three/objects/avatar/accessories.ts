import {
  CatmullRomCurve3,
  Color,
  ExtrudeGeometry,
  Group,
  Mesh,
  ShaderMaterial,
  Shape,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import type { Object3D } from "three";
import vertexShader from "../../shaders/avatar-accessories/vertex.glsl";
import fragmentShader from "../../shaders/avatar-accessories/fragment.glsl";

interface AvatarUniforms {
  uProgress: { value: number };
  uAmbientStrength: { value: number };
}

// Head-local coordinates keep these details attached to every existing animation.
export const attachAvatarAccessories = (model: Object3D, uniforms: AvatarUniforms) => {
  const head = model.getObjectByName("headBone");
  if (!head || head.getObjectByName("david-accessories")) return;

  const accessories = new Group();
  accessories.name = "david-accessories";

  const makeMaterial = (color: string) => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: { uColor: { value: new Color(color) }, ...uniforms },
  });

  const frameMaterial = makeMaterial("#b5a17d");
  const hairMaterial = makeMaterial("#28221f");

  const addMesh = (geometry: TorusGeometry | TubeGeometry | ExtrudeGeometry, material: ShaderMaterial, parent = accessories) => {
    const part = new Mesh(geometry, material);
    // The animated eye sprite renders at 25. Frames must render afterward,
    // while retaining depth testing so they cannot show through the head.
    part.renderOrder = 26;
    part.frustumCulled = false;
    parent.add(part);
    return part;
  };

  const addTube = (points: Vector3[], radius: number, parent = accessories) =>
    addMesh(new TubeGeometry(new CatmullRomCurve3(points), 24, radius, 8, false), frameMaterial, parent);

  const glasses = new Group();
  glasses.name = "round-glasses";
  glasses.position.set(0.031, 0.213, 0.492);
  accessories.add(glasses);

  const rimGeometry = new TorusGeometry(0.16, 0.0105, 8, 48);
  for (const side of [-1, 1]) {
    const rim = addMesh(rimGeometry, frameMaterial, glasses);
    rim.position.set(side * 0.202, 0, -0.008);
    rim.rotation.y = side * 0.1;

    addTube([
      new Vector3(side * 0.36, 0.035, -0.025),
      new Vector3(side * 0.53 - 0.031, 0.012, -0.20),
      new Vector3(side * 0.63 - 0.031, 0.007, -0.53),
      new Vector3(side * 0.635 - 0.031, -0.043, -0.60),
    ], 0.0105, glasses);
  }

  addTube([
    new Vector3(-0.044, 0.018, 0),
    new Vector3(-0.024, 0.047, 0.009),
    new Vector3(0.024, 0.047, 0.009),
    new Vector3(0.044, 0.018, 0),
  ], 0.009, glasses);

  // A short, gently tapered mustache, rather than a curled caricature.
  const shape = new Shape();
  shape.moveTo(0, 0.013);
  shape.bezierCurveTo(-0.035, 0.038, -0.105, 0.028, -0.166, -0.018);
  shape.bezierCurveTo(-0.117, -0.034, -0.047, -0.018, 0, -0.012);
  shape.bezierCurveTo(0.047, -0.018, 0.117, -0.034, 0.166, -0.018);
  shape.bezierCurveTo(0.105, 0.028, 0.035, 0.038, 0, 0.013);
  shape.closePath();

  const mustache = addMesh(new ExtrudeGeometry(shape, {
    depth: 0.014,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.007,
    bevelThickness: 0.006,
    curveSegments: 12,
  }), hairMaterial);
  mustache.name = "short-mustache";
  mustache.position.set(0.041, 0.045, 0.495);
  mustache.scale.x = 0.84;

  head.add(accessories);
};
