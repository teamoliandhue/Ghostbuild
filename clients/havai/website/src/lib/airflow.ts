import * as THREE from "three";

export type AirflowHandle = {
  dispose: () => void;
};

/**
 * Airflow Streams — long thin horizontal curves drifting left-to-right
 * at varying speeds and Y offsets. Reads as visible air movement.
 * Used on dark hero backgrounds only. Opacity ~0.18 so it never competes
 * with the headline.
 */
export function mountAirflow(host: HTMLElement): AirflowHandle {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const aspect = host.clientWidth / host.clientHeight;
  const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.pointerEvents = "none";

  type Stream = {
    line: THREE.Line;
    speed: number;
    offset: number;
    amp: number;
    freq: number;
    yBase: number;
    width: number;
  };

  const streams: Stream[] = [];
  const STREAM_COUNT = reduced ? 0 : 22;
  const SEGMENTS = 80;

  for (let i = 0; i < STREAM_COUNT; i++) {
    const positions = new Float32Array(SEGMENTS * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const isAccent = i % 5 === 0;
    const mat = new THREE.LineBasicMaterial({
      color: isAccent ? 0x8a96d6 : 0xffffff,
      transparent: true,
      opacity: isAccent ? 0.32 : 0.18,
    });
    const line = new THREE.Line(geo, mat);
    scene.add(line);

    streams.push({
      line,
      speed: 0.08 + Math.random() * 0.18,
      offset: Math.random() * 4,
      amp: 0.015 + Math.random() * 0.04,
      freq: 1.2 + Math.random() * 2.4,
      yBase: -0.95 + Math.random() * 1.9,
      width: 0.45 + Math.random() * 0.6,
    });
  }

  const clock = new THREE.Clock();
  let frameId = 0;
  let lastFrame = 0;
  const targetFps = 30;
  const frameInterval = 1000 / targetFps;

  function render(now: number) {
    frameId = requestAnimationFrame(render);
    if (now - lastFrame < frameInterval) return;
    lastFrame = now;

    const t = clock.getElapsedTime();

    for (const s of streams) {
      const positions = (s.line.geometry.attributes.position as THREE.BufferAttribute)
        .array as Float32Array;
      const head = ((t * s.speed + s.offset) % 3) - 1.5;
      for (let j = 0; j < SEGMENTS; j++) {
        const u = j / (SEGMENTS - 1);
        const x = head - u * s.width;
        const y =
          s.yBase + Math.sin((x + s.offset) * s.freq + t * 0.4) * s.amp;
        positions[j * 3 + 0] = x * aspect;
        positions[j * 3 + 1] = y;
        positions[j * 3 + 2] = 0;
      }
      (s.line.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
    renderer.render(scene, camera);
  }

  if (!reduced) frameId = requestAnimationFrame(render);
  else renderer.render(scene, camera);

  function onResize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    const a = w / h;
    camera.left = -a;
    camera.right = a;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", onResize);

  return {
    dispose() {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      streams.forEach((s) => {
        s.line.geometry.dispose();
        (s.line.material as THREE.Material).dispose();
        scene.remove(s.line);
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    },
  };
}
