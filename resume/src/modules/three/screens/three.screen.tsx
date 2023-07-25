import React, { useEffect, useState } from 'react';
import * as Three from 'three';

const ThreeContainer = () => {

  const [Mount, SetMount] = useState<HTMLDivElement | null>(null);
  const [Scene, SetScene] = useState<THREE.Scene>(new Three.Scene());

  const HandleWindowResize = (Camera: THREE.PerspectiveCamera, Renderer: THREE.WebGLRenderer )=> {
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
    // Renderer
    const Renderer = new Three.WebGLRenderer();
    Renderer.setSize(window.innerWidth, window.innerHeight);
    Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    Mount?.appendChild(Renderer.domElement);

    // Camera 
    const Camera = new Three.PerspectiveCamera(75, window.innerHeight/window.innerHeight, 0.1, 1000);
    Camera.position.z = 5;

    Renderer.render(Scene, Camera);

    const geometry = new Three.TorusGeometry(.7, .2, 16, 100);
    const Material = new Three.MeshBasicMaterial();
    Material.color = new Three.Color(0xff0000);

    const Sphere = new Three.Mesh(geometry, Material);
    Scene.add(Sphere);

    window.addEventListener('resize', () => HandleWindowResize(Camera, Renderer));

    return () => {
      window.removeEventListener('resize', () => HandleWindowResize(Camera, Renderer))
    }
  }, [Scene]);

  return (
    <div ref={(mount) => {SetMount(mount)}} className='webgl w-full h-full'>

    </div>
  )
}

export default ThreeContainer;