import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ArcCarProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color: string;
  roughness?: number;
  metalness?: number;
}

/**
 * A self-contained Ferrari instance that clones the scene graph so every
 * background car gets its own independent material/color without touching
 * the shared materials used by the hero CarModel.
 */
export default function ArcCarModel({
  position,
  rotation = [0, 0, 0],
  scale = 0.55,
  color,
  roughness = 0.15,
  metalness = 0.85,
}: ArcCarProps) {
  const { scene } = useGLTF('/ferrari.glb') as any;
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // Deep-clone the material so changes are isolated to this instance
        const mat = child.material.clone();
        if (mat.name === 'body') {
          mat.color = new THREE.Color(color);
          mat.roughness = roughness;
          mat.metalness = metalness;
          mat.clearcoat = 1;
          mat.clearcoatRoughness = 0.08;
          mat.envMapIntensity = 1.2;
        }
        if (mat.name === 'glass') {
          mat.color = new THREE.Color('#050505');
          mat.transparent = true;
          mat.opacity = 0.75;
        }
        if (mat.name === 'rim') {
          mat.color = new THREE.Color('#1a1a1a');
          mat.metalness = 1;
          mat.roughness = 0.15;
        }
        child.material = mat;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [scene, color, roughness, metalness]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/ferrari.glb');
