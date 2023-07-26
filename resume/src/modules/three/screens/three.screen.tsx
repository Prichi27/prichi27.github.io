import React, { useEffect, useState } from 'react';
import * as Three from 'three';
import { Euler } from 'three';
import tsds from "../../../assets/textures/Player_Projectile_Particles.png"
const ThreeContainer = () => {

  const [Mount, SetMount] = useState<HTMLDivElement | null>(null);
  // const [Scene, SetScene] = useState<THREE.Scene>(new Three.Scene());

  const HandleWindowResize = (Camera: THREE.PerspectiveCamera, Renderer: THREE.WebGLRenderer, Scene: THREE.Scene) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update Camera
    Camera.aspect = width / height;
    Camera.updateProjectionMatrix();

    // Update renderer
    Renderer.setSize(width, height);
    Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Renderer.render(Scene, Camera);
  }

  useEffect(() => {
    console.log("Initializing Three JS");

    const Scene = new Three.Scene();

    // Renderer
    const Renderer = new Three.WebGLRenderer({
      // alpha: true,
    });
    
    Renderer.setClearColor(new Three.Color("#39386b"))

    // Camera 
    const Camera = new Three.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);
    Camera.position.z = 5;
    // Update Camera
    Camera.aspect =  window.innerWidth /  window.innerHeight;
    Camera.updateProjectionMatrix();

    const geometry = new Three.SphereGeometry(1, 100, 100, 20);
    const Material = new Three.MeshStandardMaterial();
    Material.color = new Three.Color(0xd19a97);
    
    const Sphere = new Three.Mesh(geometry, Material);
    Sphere.setRotationFromEuler(new Euler(0, 90, 20));
    Scene.add(Sphere);
    
    const DirectionalLight = new Three.DirectionalLight(0xffffff, 0.5);
    Scene.add(DirectionalLight);
    
    // Points
    const PointsVertices = [];
    
    for (let Index = 0; Index < 50000; Index++) {
      const x = Three.MathUtils.randFloatSpread(500);
      const y = Three.MathUtils.randFloatSpread(500);
      const z = Three.MathUtils.randFloatSpread(500);
      
      PointsVertices.push(x, y, z);
    }
    
    const PointsGeometry = new Three.BufferGeometry();
    PointsGeometry.setAttribute('position', new Three.Float32BufferAttribute(PointsVertices, 3));

    const loader = new Three.TextureLoader();
    const assignSRGB = ( texture: THREE.Texture ) => {

      texture.colorSpace = Three.SRGBColorSpace;

    };
    const particleSprite = loader.load(tsds, assignSRGB);

    const PointsMaterial = new Three.PointsMaterial({ size: 2, color: 0xedebdf, map: particleSprite, transparent: true });
    const Points = new Three.Points(PointsGeometry, PointsMaterial);
    Scene.add(Points);
    
    Renderer.setSize(window.innerWidth, window.innerHeight);
    Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    Mount?.appendChild(Renderer.domElement);

    Renderer.render(Scene, Camera);
    
    const Clock = new Three.Clock();

    // Mouse 
    let mouseX = 0;
    let mouseY = 0;
    
    const animatePoints = (event: MouseEvent) => {
      mouseX = event.clientX - (window.innerWidth / 2);
      mouseY = event.clientY  - (window.innerHeight / 2);
    }

    document.addEventListener('mousemove', animatePoints);


    const tick = () => {
      const elapsedTime = Clock.getElapsedTime();

      Sphere.rotation.x = 0.9 * elapsedTime;

      Points.rotation.y = mouseX * elapsedTime * 0.0003;
      Points.rotation.x = -mouseY * elapsedTime * 0.0003;

      Renderer.render(Scene, Camera);

      window.requestAnimationFrame(tick);
    }

    tick();
    
    window.addEventListener('resize', () => HandleWindowResize(Camera, Renderer, Scene));

    
    return () => {
      window.removeEventListener('resize', () => HandleWindowResize(Camera, Renderer, Scene))
    }
  });
  
  return (
    <div ref={(mount) => { SetMount(mount) }} className='webgl w-full h-full'>

    </div>
  )
}

export default ThreeContainer;