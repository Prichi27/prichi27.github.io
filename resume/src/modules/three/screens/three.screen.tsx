import React, { useEffect, useState } from 'react';
import * as Three from 'three';
import { Euler } from 'three';
import { GUI } from 'dat.gui';

import tsds from "../../../assets/textures/Player_Projectile_Particles.png"
import SphereAlbedo from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_albedo.png";
import SphereNormal from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_normal.png";
import SphereHeight from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_height.png";
import SphereMetallic from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_metallic.png";
import SphereRoughness from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_roughness.png";
import SphereAO from "../../../assets/textures/TexturesCom_Various_AcousticFoam_4K_ao.png";

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

  const PlanetInit = async (Scene: THREE.Scene) => {
    const geometry = new Three.SphereGeometry(1, 16, 16, 20);
    const Material = new Three.MeshStandardMaterial();

    const Loader = new Three.TextureLoader();
    const Albedo = await Loader.loadAsync(SphereAlbedo);
    const Normal = await Loader.loadAsync(SphereNormal);
    const Height = await Loader.loadAsync(SphereHeight);
    const AO = await Loader.loadAsync(SphereAO);
    const Metallic = await Loader.loadAsync(SphereMetallic);
    const Roughness = await Loader.loadAsync(SphereRoughness);

    Material.map = Albedo;
    Material.normalMap = Normal;
    Material.aoMap = AO;
    Material.aoMapIntensity = 10;
    Material.displacementMap = Height;
    Material.displacementScale = 0.6;
    Material.metalnessMap = Metallic;
    Material.roughnessMap = Roughness;

    Material.color = new Three.Color(0xffffff);

    return new Three.Mesh(geometry, Material);
  }

  useEffect(() => {
    console.log("Initializing Three JS");

    const Scene = new Three.Scene();

    // Renderer
    const Renderer = new Three.WebGLRenderer({
      alpha: true,
    });

    Renderer.setClearColor(new Three.Color("#000"), 0);

    // Camera 
    const Camera = new Three.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);
    Camera.position.z = 5;
    // Update Camera
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();

    let Planet: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
    PlanetInit(Scene).then(result => {
      Planet = result
      Planet.setRotationFromEuler(new Euler(0, 90, 20));
      Scene.add(Planet);
    });

    // const DirectionalLight = new Three.DirectionalLight(0xffffff, 0.5);
    // Scene.add(DirectionalLight);

    const light = new Three.PointLight(0xfff, 1, 100);
    light.position.set(2, 2, 0);
    Scene.add(light);

    // Points
    const PointsVertices = [];
    const spread = 50;
    for (let Index = 0; Index < 50000; Index++) {
      const x = Three.MathUtils.randFloatSpread(spread);
      const y = Three.MathUtils.randFloatSpread(-10);
      const z = Three.MathUtils.randFloatSpread(spread);

      PointsVertices.push(x, y, z);
    }

    const PointsGeometry = new Three.BufferGeometry();
    PointsGeometry.setAttribute('position', new Three.Float32BufferAttribute(PointsVertices, 3));
    PointsGeometry.setAttribute('rotation', new Three.Float32BufferAttribute(PointsVertices, 3))

    const loader = new Three.TextureLoader();
    const assignSRGB = (texture: THREE.Texture) => {

      texture.colorSpace = Three.SRGBColorSpace;

    };
    const particleSprite = loader.load(tsds, assignSRGB);

    const PointsMaterial = new Three.PointsMaterial({ size: 0.05, color: 0xedebdf, map: particleSprite, transparent: true, blending: Three.AdditiveBlending });
    const Points = new Three.Points(PointsGeometry, PointsMaterial);
    Points.position.z = -10
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
      mouseY = event.clientY - (window.innerHeight / 2);
    }

    const animatePointsTouch = (event: TouchEvent) => {
      mouseX = event.touches[0].clientX - (window.innerWidth / 2);
      mouseY = event.touches[0].clientY - (window.innerHeight / 2);
    }

    document.addEventListener('mousemove', animatePoints);
    document.addEventListener('touchmove', animatePointsTouch);


    const tick = () => {
      const elapsedTime = Clock.getElapsedTime();

      if (Planet)
        Planet.rotation.x = 0.9 * elapsedTime;

      Points.rotation.y = mouseX * 0.0003;
      Points.rotation.x = -mouseY * 0.0003;

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
    <div ref={(mount) => { SetMount(mount) }} className='absolute top-0 left-0 w-full h-full'>

    </div>
  )
}

export default ThreeContainer;