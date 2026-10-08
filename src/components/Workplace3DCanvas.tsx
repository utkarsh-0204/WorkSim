import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WorkplaceCanvasProps {
  mouseX: number;
  mouseY: number;
}

export const Workplace3DCanvas: React.FC<WorkplaceCanvasProps> = ({ mouseX, mouseY }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d11, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // ==========================================
    // LIGHTING: Calm restrained studio desk lighting
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x181c24, 0.8);
    scene.add(ambientLight);

    // Warm desk light - gentle and focused
    const deskWarmLight = new THREE.PointLight(0xffeedd, 1.2, 10, 2.0);
    deskWarmLight.position.set(2.5, 0.5, 2.0);
    scene.add(deskWarmLight);

    // Subtle cool fill light
    const coolFillLight = new THREE.DirectionalLight(0x2d3748, 0.8);
    coolFillLight.position.set(-3, 2, 3);
    scene.add(coolFillLight);

    // ==========================================
    // 3D OBJECTS (Calm, realistic desk environment)
    // ==========================================
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // 1. Sleek Laptop (Base + Screen)
    const laptopGroup = new THREE.Group();
    
    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(2.0, 0.05, 1.4);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x181b22,
      metalness: 0.6,
      roughness: 0.4,
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopGroup.add(laptopBase);

    // Keyboard recess
    const keyboardGeo = new THREE.BoxGeometry(1.6, 0.015, 0.8);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e12,
      roughness: 0.9,
    });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, 0.03, 0.1);
    laptopGroup.add(keyboard);

    // Laptop Screen Lid (open at ~115 degrees)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.025, -0.7);
    lidGroup.rotation.x = -Math.PI / 1.7; // Tilted back

    const lidGeo = new THREE.BoxGeometry(2.0, 1.3, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, metalMat);
    lidMesh.position.set(0, 0.65, 0);
    lidGroup.add(lidMesh);

    // Screen display (matte IDE display)
    const screenGeo = new THREE.PlaneGeometry(1.86, 1.16);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      emissive: 0x121722,
      emissiveIntensity: 0.3,
      roughness: 0.5,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.65, 0.025);
    lidGroup.add(screenMesh);

    laptopGroup.add(lidGroup);
    laptopGroup.position.set(3.2, -1.2, 0.8);
    laptopGroup.rotation.set(0.15, -0.4, 0);
    objectsGroup.add(laptopGroup);

    // 3. Professional Desk Lamp Archetype (Minimalist arc / bar)
    const lampStemCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(3.8, -1.8, 1.2),
      new THREE.Vector3(3.6, 0.8, 1.6),
      new THREE.Vector3(2.6, 0.5, 2.2)
    );
    const lampTubeGeo = new THREE.TubeGeometry(lampStemCurve, 20, 0.03, 8, false);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.9, roughness: 0.2 });
    const lampStem = new THREE.Mesh(lampTubeGeo, lampMat);
    objectsGroup.add(lampStem);

    // Lamp Head Bar
    const lampHeadGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12);
    const lampHead = new THREE.Mesh(lampHeadGeo, lampMat);
    lampHead.position.set(2.4, 0.45, 2.3);
    lampHead.rotation.z = Math.PI / 2;
    lampHead.rotation.y = 0.5;
    objectsGroup.add(lampHead);

    // 4. Subtle Floating Professional ID Badge / Token
    const badgeGeo = new THREE.BoxGeometry(0.7, 1.0, 0.02);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x151922,
      roughness: 0.4,
      metalness: 0.4,
    });
    const badge = new THREE.Mesh(badgeGeo, badgeMat);
    badge.position.set(3.4, 1.4, -0.2);
    badge.rotation.set(-0.15, -0.3, 0.1);
    objectsGroup.add(badge);

    // Subtle lanyard clip
    const clipGeo = new THREE.TorusGeometry(0.08, 0.02, 8, 16);
    const clipMesh = new THREE.Mesh(clipGeo, metalMat);
    clipMesh.position.set(0, 0.55, 0);
    badge.add(clipMesh);

    // ==========================================
    // ANIMATION & PARALLAX LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let targetRotX = 0;
    let targetRotY = 0;

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      if (!prefersReducedMotion) {
        targetRotX = (mouseY - 0.5) * 0.15;
        targetRotY = (mouseX - 0.5) * 0.25;

        objectsGroup.rotation.x += (targetRotX - objectsGroup.rotation.x) * 0.04;
        objectsGroup.rotation.y += (targetRotY - objectsGroup.rotation.y) * 0.04;

        // Subtle organic floating for secondary objects
        badge.position.y = 1.4 + Math.sin(elapsedTime * 0.8 + 1.2) * 0.04;
        badge.rotation.y = -0.3 + Math.sin(elapsedTime * 0.5) * 0.03;

        laptopGroup.position.y = -1.2 + Math.sin(elapsedTime * 0.4) * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run on mount

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
};
