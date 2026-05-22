import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export type CarType = 'rolls' | 'porsche' | 'gwagon' | 'urus' | 'bentley';

interface Props {
  type: CarType;
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export default function ProceduralCarModel({ type, color = '#0a0a0c', position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: Props) {
  // Load the actual .glb file for each specific car type
  const { scene, materials } = useGLTF(`/${type}.glb`) as any;

  useLayoutEffect(() => {
    if (materials && materials.body) {
      materials.body = materials.body.clone();
      materials.body.color.set(color);
      materials.body.roughness = 0.15;
      materials.body.metalness = 0.7;
      materials.body.clearcoat = 0.4;
      materials.body.clearcoatRoughness = 0.1;
      materials.body.envMapIntensity = 1.2;
    }

    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const name = child.material.name ? child.material.name.toLowerCase() : '';
        const childName = child.name ? child.name.toLowerCase() : '';

        if (name.includes('body') || childName.includes('body') || childName.includes('chassis')) {
          if (child.material.name === 'body' && materials.body) {
             child.material = materials.body;
          } else {
             child.material = child.material.clone();
             child.material.color.set(color);
             child.material.roughness = 0.15;
             child.material.metalness = 0.7;
             child.material.clearcoat = 0.4;
             child.material.clearcoatRoughness = 0.1;
             child.material.envMapIntensity = 1.2;
          }
        }
        
        if (name.includes('glass')) {
          child.material.color.set('#0a0a0a');
          child.material.roughness = 0.05;
          child.material.metalness = 0.8;
          child.material.transparent = true;
          child.material.opacity = 0.9;
          child.material.envMapIntensity = 1.5;
          if (child.material.ior !== undefined) child.material.ior = 1.5;
        }
        
        if (name.includes('rim') || name.includes('chrome')) {
          child.material.color.set('#cccccc');
          child.material.metalness = 0.9;
          child.material.roughness = 0.2;
          child.material.envMapIntensity = 1.5;
        }

        if (name.includes('brake') || name.includes('caliper')) {
          child.material.color.set('#cc1100');
          child.material.metalness = 0.4;
          child.material.roughness = 0.3;
          child.material.envMapIntensity = 0.5;
        }

        if (name.includes('tire') || name.includes('rubber')) {
          child.material.color.set('#050505');
          child.material.metalness = 0.0;
          child.material.roughness = 0.9;
          child.material.envMapIntensity = 0.2;
        }

        if (name.includes('light') || name.includes('headlight') || name.includes('led')) {
          child.material.color.set('#ffea8c');
          child.material.emissive.set('#ffddaa');
          child.material.emissiveIntensity = 1.0;
          child.material.roughness = 0.2;
          child.material.metalness = 0.1;
        }
      }
    });
  }, [scene, materials, color]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/rolls.glb');
useGLTF.preload('/urus.glb');
useGLTF.preload('/bentley.glb');
useGLTF.preload('/gwagon.glb');
useGLTF.preload('/porsche.glb');
