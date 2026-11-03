// Iridescent glass "K" rendered with three.js.
// No textures or HDR files: the "environment" is a few procedural light strips in the
// fragment shader, refracted per colour channel (dispersion) and mixed with a fresnel
// reflection and a thin-film tint. Cheap enough to run on a phone.
import {
  DoubleSide, ExtrudeGeometry, Group, Mesh, PerspectiveCamera, Scene,
  ShaderMaterial, ShapePath, Vector3, WebGLRenderer,
} from 'three';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';
import { K_COMMANDS } from './kGlyph.js';

const VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vP;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vP = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const FRAG = /* glsl */ `
uniform float uDark, uT;
uniform vec3 uBase;
varying vec3 vN;
varying vec3 vP;

mat3 ry(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rx(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
float band(vec3 d, vec3 ax, float off, float w) { float x = dot(d, normalize(ax)) - off; return exp(-x * x * w); }

vec3 env(vec3 d) {
  d = ry(uT * .35) * rx(.15) * d;
  bool dk = uDark > .5;
  vec3 c = uBase + (dk ? vec3(0., .01, .03) : vec3(0.)) * (d.y * .5 + .5);
  vec3 C[6]; C[0] = vec3(1., .72, .22); C[1] = vec3(.98, .24, .45); C[2] = vec3(.2, .42, 1.); C[3] = vec3(.18, .88, .75); C[4] = vec3(.6, .45, 1.); C[5] = vec3(1.);
  vec3 A[6]; A[0] = vec3(0., 1., .25); A[1] = vec3(1., .4, .1); A[2] = vec3(-1., .25, .5); A[3] = vec3(.3, -.5, -1.); A[4] = vec3(.7, -1., .3); A[5] = vec3(-.4, 1., -.7);
  float O[6]; O[0] = .62; O[1] = .55; O[2] = .5; O[3] = .62; O[4] = .45; O[5] = .86;
  float W[6]; W[0] = 32.; W[1] = 40.; W[2] = 34.; W[3] = 48.; W[4] = 40.; W[5] = 160.;
  float I[6]; I[0] = 1.9; I[1] = 1.8; I[2] = 1.5; I[3] = 1.3; I[4] = 1.2; I[5] = 2.4;
  for (int i = 0; i < 6; i++) {
    float b = band(d, A[i], O[i], W[i]) + .35 * band(d, A[i], -O[i] * .8, W[i] * 1.6);
    if (dk) c += C[i] * b * I[i];
    else c = mix(c, (i == 5 ? vec3(1.) : C[i] * .85), clamp(b * .9, 0., 1.));
  }
  if (!dk) {
    c = mix(c, vec3(.16, .19, .24), band(d, vec3(.1, -1., .3), .55, 40.) * .85);
    c = mix(c, vec3(.3, .34, .4), band(d, vec3(1., 0., 0.), -.7, 30.) * .6);
  }
  return c;
}

vec3 exitDir(vec3 V, vec3 N, float ior) {
  vec3 t = refract(V, N, 1. / ior);
  vec3 o = refract(t, -N, ior);
  return dot(o, o) < .01 ? reflect(t, -N) : o;
}

void main() {
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(vP - cameraPosition);
  float ndv = clamp(dot(-V, N), 0., 1.);
  float ior = 1.5, disp = .06;
  // fake thickness: bend the inner normal so bevels sweep across the light strips
  vec3 Nb = normalize(N + (N - vec3(0., 0., 1.) * sign(N.z)) * .9);
  vec3 tr = vec3(env(exitDir(V, Nb, ior - disp)).r, env(exitDir(V, Nb, ior)).g, env(exitDir(V, Nb, ior + disp)).b);
  float F = .04 + .96 * pow(1. - ndv, 5.);
  vec3 refl = env(reflect(V, N));
  vec3 film = .5 + .5 * cos(6.2832 * (vec3(0., .33, .67) + (1. - ndv) * 1.6 + .1));
  vec3 col = mix(tr, refl, F) + film * F * (uDark > .5 ? .25 : .12);
  col = col / (1. + col * .3);
  gl_FragColor = vec4(pow(col, vec3(1. / 1.1)), 1.);
}`;

const BASE = { dark: [0.035, 0.04, 0.05], light: [0.9, 0.91, 0.93] };

let cachedGeometry = null;
function kGeometry() {
  if (cachedGeometry) return cachedGeometry;
  const sp = new ShapePath();
  for (const [t, ...a] of K_COMMANDS) {
    if (t === 'M') sp.moveTo(a[0], a[1]);
    else if (t === 'L') sp.lineTo(a[0], a[1]);
    else if (t === 'Q') sp.quadraticCurveTo(a[0], a[1], a[2], a[3]);
    else if (t === 'C') sp.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
  }
  let shapes = sp.toShapes(true);
  if (!shapes.length) shapes = sp.toShapes(false);
  const raw = new ExtrudeGeometry(shapes, {
    depth: 1.4, bevelEnabled: true, bevelThickness: 1, bevelSize: 0.62, bevelSegments: 12, curveSegments: 10,
  });
  const geo = toCreasedNormals(raw, Math.PI / 5);
  raw.dispose();
  geo.center();
  cachedGeometry = geo;
  return geo;
}

export function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Mount a glass K on a canvas.
 * @param {HTMLCanvasElement} canvas
 * @param {{dark?: boolean, rot?: number[], dist?: number, maxDpr?: number, animate?: boolean, follow?: boolean}} opts
 */
export function mountGlassK(canvas, { dark = true, rot = [-0.1, -0.45, 0.02], dist = 31, maxDpr = 2, animate = true, follow = false } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 200);
  camera.position.set(0, 0, dist);

  const material = new ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, side: DoubleSide,
    uniforms: { uDark: { value: dark ? 1 : 0 }, uT: { value: 0.6 }, uBase: { value: new Vector3(...(dark ? BASE.dark : BASE.light)) } },
  });
  const pivot = new Group();
  pivot.add(new Mesh(kGeometry(), material));
  pivot.rotation.set(...rot);
  scene.add(pivot);

  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
  ro.observe(canvas);
  resize();

  // the cursor only nudges the K; the eased values keep it calm
  let mx = 0, my = 0, ex = 0, ey = 0;
  const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
  if (follow) window.addEventListener('pointermove', onMove, { passive: true });

  const t0 = performance.now();
  function draw(now) {
    const s = (now - t0) / 1000;
    if (animate) {
      ex += (mx - ex) * 0.04;
      ey += (my - ey) * 0.04;
      material.uniforms.uT.value = 0.6 + s * 0.6;
      pivot.rotation.y = rot[1] + Math.sin(s * 0.35) * 0.55 + ex * 0.5;
      pivot.rotation.x = rot[0] + Math.sin(s * 0.27) * 0.12 + ey * 0.3;
    }
    renderer.render(scene, camera);
  }

  let running = false;
  const setActive = (on) => {
    if (!animate) { draw(performance.now()); return; }
    if (on === running) return;
    running = on;
    renderer.setAnimationLoop(on ? draw : null);
  };
  setActive(true);

  return {
    setActive,
    setDark(d) {
      material.uniforms.uDark.value = d ? 1 : 0;
      material.uniforms.uBase.value.set(...(d ? BASE.dark : BASE.light));
      draw(performance.now());
    },
    dispose() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      material.dispose();
      renderer.dispose();
    },
  };
}
