import * as THREE from "three";

export function createGlobeScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 4.5;

  // Wireframe globe — mirrors the logo mark
  const geoSphere = new THREE.SphereGeometry(1.8, 28, 28);
  const matWire = new THREE.MeshBasicMaterial({
    color: 0x1b6ac9,
    wireframe: true,
    transparent: true,
    opacity: 0.13,
  });
  const globe = new THREE.Mesh(geoSphere, matWire);
  scene.add(globe);

  // Particle dots at vertices for depth
  const positions = geoSphere.attributes.position;
  const particleGeo = new THREE.BufferGeometry();
  const verts: number[] = [];
  for (let i = 0; i < positions.count; i += 3) {
    verts.push(positions.getX(i), positions.getY(i), positions.getZ(i));
  }
  particleGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x1b6ac9,
    size: 0.025,
    transparent: true,
    opacity: 0.35,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Ambient glow — large dim sphere behind the globe
  const geoGlow = new THREE.SphereGeometry(2.4, 16, 16);
  const matGlow = new THREE.MeshBasicMaterial({
    color: 0x1b6ac9,
    transparent: true,
    opacity: 0.04,
  });
  scene.add(new THREE.Mesh(geoGlow, matGlow));

  let animId: number;
  let scrollY = 0;

  const onScroll = () => { scrollY = window.scrollY; };
  window.addEventListener("scroll", onScroll, { passive: true });

  const onResize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  const animate = () => {
    animId = requestAnimationFrame(animate);
    globe.rotation.y += 0.0008;
    globe.rotation.x += 0.0002;
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0002;
    // Subtle scroll parallax — globe drifts as user scrolls
    camera.position.y = -scrollY * 0.0008;
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
  };
}
