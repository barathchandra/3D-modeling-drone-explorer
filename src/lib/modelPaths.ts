/** GLB assets served from /public/models — add files here when uploading new parts. */
export const MODEL_PATHS = {
  propeller: "/models/propeller.glb",
  motor: "/models/motor.glb",
  arm: "/models/arm.glb",
  battery: "/models/battery.glb",
  esc: "/models/esc.glb",
  fc: "/models/fc.glb",
  pixhawk: "/models/pixhawk.glb",
  pdb: "/models/pdb.glb",
  remote: "/models/remote.glb",
  stand: "/models/stand.glb",
  frame: "/models/frame.glb",
  overview: "/models/overview-textured.glb",
  camera: "/models/camera.glb",
  gps: "/models/gp.glb",
} as const;

export const ALL_MODEL_PATHS = Object.values(MODEL_PATHS);
