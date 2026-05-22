import React, { useRef, useLayoutEffect, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { carState } from './Scene';

export default function CarModel(props: any) {
  const { scene, nodes, materials } = useGLTF('/ferrari.glb') as any;
  const group = useRef<THREE.Group>(null);
  
  const wheelFL = useRef<THREE.Object3D | null>(null);
  const wheelFR = useRef<THREE.Object3D | null>(null);
  const wheelRL = useRef<THREE.Object3D | null>(null);
  const wheelRR = useRef<THREE.Object3D | null>(null);
  
  const bodyParts = useRef<THREE.Object3D[]>([]);
  const glassParts = useRef<THREE.Object3D[]>([]);
  const lightParts = useRef<THREE.Object3D[]>([]);
  const brakeParts = useRef<THREE.Object3D[]>([]);
  const interiorParts = useRef<THREE.Object3D[]>([]);
  const engineParts = useRef<THREE.Object3D[]>([]);
  const doorL = useRef<THREE.Object3D[]>([]);
  const doorR = useRef<THREE.Object3D[]>([]);
  const hoodParts = useRef<THREE.Object3D[]>([]);
  const wingParts = useRef<THREE.Object3D[]>([]);

  // Curved blueprint leader line references
  const hoodLineRef = useRef<THREE.Line>(null);
  const leftDoorLineRef = useRef<THREE.Line>(null);
  const rearWingLineRef = useRef<THREE.Line>(null);

  // Floating annotation group references
  const hoodAnnotationRef = useRef<THREE.Group>(null);
  const leftDoorAnnotationRef = useRef<THREE.Group>(null);
  const rearWingAnnotationRef = useRef<THREE.Group>(null);

  const [exploded, setExploded] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [yOffset, setYOffset] = useState(0);

  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    setYOffset(-box.min.y);

    Object.values(materials).forEach((material: any) => {
      const name = material.name ? material.name.toLowerCase() : '';
      
      if (name.includes('body') || name.includes('chassis')) {
        material.roughness = 0.08;
        material.metalness = 0.95;
        material.clearcoat = 1.0;
        material.clearcoatRoughness = 0.02;
        material.envMapIntensity = 2.2;
      }
      if (name.includes('glass')) {
        material.color.set('#030303');
        material.roughness = 0.01;
        material.metalness = 0.1;
        material.transparent = true;
        material.opacity = 0.45;
        material.envMapIntensity = 2.5;
        if (material.ior !== undefined) material.ior = 1.52;
      }
      if (name.includes('rim') || name.includes('chrome')) {
        material.color.set('#ffffff');
        material.metalness = 1.0;
        material.roughness = 0.04;
        material.envMapIntensity = 2.5;
      }
      if (name.includes('brake') || name.includes('caliper')) {
        material.color.set('#cc1100');
        material.metalness = 0.6;
        material.roughness = 0.2;
        material.envMapIntensity = 1.0;
      }
      if (name.includes('tire') || name.includes('rubber')) {
        material.color.set('#0c0c0c');
        material.metalness = 0.0;
        material.roughness = 0.85;
        material.envMapIntensity = 0.4;
      }
      if (name.includes('light') || name.includes('headlight') || name.includes('led')) {
        material.color.set('#ffffff');
        material.emissive.set('#93c5fd');
        material.emissiveIntensity = 4.0;
        material.roughness = 0.05;
        material.metalness = 0.1;
      }
    });

    const bParts: THREE.Object3D[] = [];
    const gParts: THREE.Object3D[] = [];
    const lParts: THREE.Object3D[] = [];
    const brParts: THREE.Object3D[] = [];
    const intParts: THREE.Object3D[] = [];
    const engParts: THREE.Object3D[] = [];
    const dLParts: THREE.Object3D[] = [];
    const dRParts: THREE.Object3D[] = [];
    const hParts: THREE.Object3D[] = [];
    const wParts: THREE.Object3D[] = [];

    scene.traverse((child: any) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        
        // Cache original position on mount
        if (!child.userData.origPos) {
          child.userData.origPos = child.position.clone();
        }

        // Cache original rotation as well
        if (!child.userData.origRot) {
          child.userData.origRot = child.rotation.clone();
        }

        if (name.includes('wheel') || name.includes('rim') || name.includes('tire')) {
          if (name.includes('fl') || (child.position.x > 0.4 && child.position.z > 0.4)) {
            wheelFL.current = child;
          } else if (name.includes('fr') || (child.position.x < -0.4 && child.position.z > 0.4)) {
            wheelFR.current = child;
          } else if (name.includes('rl') || (child.position.x > 0.4 && child.position.z < -0.4)) {
            wheelRL.current = child;
          } else if (name.includes('rr') || (child.position.x < -0.4 && child.position.z < -0.4)) {
            wheelRR.current = child;
          }
        } else if (name.includes('door')) {
          if (name.includes('l') || name.includes('left') || (child.position.x > 0.2)) {
            dLParts.push(child);
          } else {
            dRParts.push(child);
          }
        } else if (name.includes('wing') || name.includes('spoiler')) {
          wParts.push(child);
        } else if (name.includes('hood') || name.includes('bonnet') || name.includes('boot') || name.includes('trunk') || name.includes('fender')) {
          hParts.push(child);
        } else if (name.includes('glass') || name.includes('windshield') || name.includes('window') || name.includes('mirror')) {
          gParts.push(child);
        } else if (name.includes('light') || name.includes('headlight') || name.includes('led') || name.includes('lens')) {
          lParts.push(child);
        } else if (name.includes('brake') || name.includes('caliper') || name.includes('disc') || name.includes('rotor')) {
          brParts.push(child);
        } else if (name.includes('seat') || name.includes('steering') || name.includes('dash') || name.includes('console') || name.includes('interior')) {
          intParts.push(child);
        } else if (name.includes('engine') || name.includes('motor') || name.includes('exhaust') || name.includes('muffler') || name.includes('pipe')) {
          engParts.push(child);
        } else {
          // Default everything else to bodyParts (structural/monocoque)
          bParts.push(child);
        }
      }
    });

    bodyParts.current = bParts;
    glassParts.current = gParts;
    lightParts.current = lParts;
    brakeParts.current = brParts;
    interiorParts.current = intParts;
    engineParts.current = engParts;
    doorL.current = dLParts;
    doorR.current = dRParts;
    hoodParts.current = hParts;
    wingParts.current = wParts;
  }, [scene, materials]);

  useFrame(() => {
    // Dynamic material opacity to support smooth fade-in/out
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        const name = child.name ? child.name.toLowerCase() : '';
        const maxOp = (name.includes('glass') || name.includes('windshield') || name.includes('window')) ? 0.45 : 1.0;
        child.material.opacity = carState.opacity * maxOp;
      }
    });

    if (materials.body) {
      const startColor = new THREE.Color('#7a0000'); // Deep luxurious red
      const midColor = new THREE.Color('#d1d5db');   // Metallic silver
      const endColor = new THREE.Color('#080808');   // Jet black
      
      let currentColor = startColor;
      if (carState.color < 0.5) {
        currentColor = startColor.clone().lerp(midColor, carState.color * 2);
      } else {
        currentColor = midColor.clone().lerp(endColor, (carState.color - 0.5) * 2);
      }
      materials.body.color.copy(currentColor);
    }

    const expand = carState.exploded;

    // Smoothstep mapping function for staggered, cinematic easing
    const mapEase = (val: number, start: number, end: number) => {
      const t = Math.max(0, Math.min(1, (val - start) / (end - start)));
      return t * t * (3 - 2 * t); // Smoothstep
    };

    // Staggered choreography timeline
    const easeDoors = mapEase(expand, 0.0, 0.35);
    const easeCanopy = mapEase(expand, 0.15, 0.50);
    const easeAero = mapEase(expand, 0.35, 0.70);
    const easeChassis = mapEase(expand, 0.50, 0.85);
    const easePowertrain = mapEase(expand, 0.70, 1.0);

    // FL Wheel (Powertrain Phase)
    if (wheelFL.current) {
      const orig = wheelFL.current.userData.origPos || new THREE.Vector3();
      wheelFL.current.position.set(
        orig.x + easePowertrain * 1.6,
        orig.y,
        orig.z + easePowertrain * 0.4
      );
    }
    // FR Wheel
    if (wheelFR.current) {
      const orig = wheelFR.current.userData.origPos || new THREE.Vector3();
      wheelFR.current.position.set(
        orig.x - easePowertrain * 1.6,
        orig.y,
        orig.z + easePowertrain * 0.4
      );
    }
    // RL Wheel
    if (wheelRL.current) {
      const orig = wheelRL.current.userData.origPos || new THREE.Vector3();
      wheelRL.current.position.set(
        orig.x + easePowertrain * 1.6,
        orig.y,
        orig.z - easePowertrain * 0.4
      );
    }
    // RR Wheel
    if (wheelRR.current) {
      const orig = wheelRR.current.userData.origPos || new THREE.Vector3();
      wheelRR.current.position.set(
        orig.x - easePowertrain * 1.6,
        orig.y,
        orig.z - easePowertrain * 0.4
      );
    }

    // Left Doors - open outward and rotate in beautiful soft arcs
    doorL.current.forEach((child) => {
      const orig = child.userData.origPos;
      const origRot = child.userData.origRot;
      if (orig && origRot) {
        child.position.set(
          orig.x + easeDoors * 1.3,
          orig.y + easeDoors * 0.1,
          orig.z + easeDoors * 0.2
        );
        child.rotation.set(
          origRot.x,
          origRot.y + easeDoors * 0.3,
          origRot.z
        );
      }
    });

    // Right Doors
    doorR.current.forEach((child) => {
      const orig = child.userData.origPos;
      const origRot = child.userData.origRot;
      if (orig && origRot) {
        child.position.set(
          orig.x - easeDoors * 1.3,
          orig.y + easeDoors * 0.1,
          orig.z + easeDoors * 0.2
        );
        child.rotation.set(
          origRot.x,
          origRot.y - easeDoors * 0.3,
          origRot.z
        );
      }
    });

    // Glass parts - fly upwards (Canopy Phase)
    glassParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        child.position.set(
          orig.x,
          orig.y + easeCanopy * 1.8,
          orig.z + easeCanopy * 0.1
        );
      }
    });

    // Front Hood Parts (Aero Phase)
    hoodParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        const forwardFactor = orig.z > 0 ? 1 : -1;
        child.position.set(
          orig.x,
          orig.y + easeAero * 1.0,
          orig.z + easeAero * forwardFactor * 1.2
        );
      }
    });

    // Rear Wing Parts (Aero Phase)
    wingParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        child.position.set(
          orig.x,
          orig.y + easeAero * 0.9,
          orig.z - easeAero * 1.3
        );
      }
    });

    // Lights
    lightParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        const forwardFactor = orig.z > 0 ? 1 : -1;
        child.position.set(
          orig.x,
          orig.y + easeAero * 0.25,
          orig.z + easeAero * forwardFactor * 0.95
        );
      }
    });

    // Chassis & Main Body Panels - Lifts UP to reveal powertrain
    bodyParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        child.position.set(
          orig.x,
          orig.y + easeChassis * 0.6,
          orig.z
        );
      }
    });

    // Interior (Chassis Phase)
    interiorParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        child.position.set(
          orig.x,
          orig.y + easeChassis * 0.65,
          orig.z
        );
      }
    });

    // Brakes & Calipers (Powertrain Phase - stay grounded but spread slightly)
    brakeParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        const sideFactor = orig.x > 0 ? 1 : -1;
        child.position.set(
          orig.x + easePowertrain * sideFactor * 0.65,
          orig.y,
          orig.z
        );
      }
    });

    // Engine & Drivetrain (Powertrain Phase - drops to the floor)
    engineParts.current.forEach((child) => {
      const orig = child.userData.origPos;
      if (orig) {
        child.position.set(
          orig.x,
          orig.y - easePowertrain * 0.2,
          orig.z - easePowertrain * 0.4
        );
      }
    });

    // Dynamic 3D stepped/diagonal blueprint callout lines update
    const updateSteppedLine = (
      lineRef: React.RefObject<THREE.Line | null>,
      start: THREE.Vector3,
      end: THREE.Vector3,
      offset: THREE.Vector3,
      easeValue: number
    ) => {
      if (!lineRef.current) return;
      
      const p0 = start.clone();
      const p1 = start.clone().addScaledVector(offset, 0.35);
      const p2 = end.clone().add(offset);
      const p3 = end.clone();
      
      const pts = [p0, p1, p2, p3];
      lineRef.current.geometry.setFromPoints(pts);
      
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.55 * Math.min(1.0, easeValue * 2.0) * opacity;
        mat.visible = easeValue > 0.02 && opacity > 0.1;
      }
    };

    // Calculate real-time coordinates of the annotated parts
    
    // 1. Engine Hood (slides front-right, label curves to the right side of the screen)
    const hoodStart = new THREE.Vector3(0, 0.75, 1.4);
    const hoodEnd = new THREE.Vector3(
      hoodStart.x, 
      hoodStart.y + easeAero * 1.0, 
      hoodStart.z + easeAero * 1.2
    );
    updateSteppedLine(hoodLineRef, hoodStart, hoodEnd, new THREE.Vector3(0.55 * easeAero, 0, 0), easeAero);

    // 2. Left Door Panel
    const leftDoorStart = new THREE.Vector3(0.85, 0.65, 0.1);
    const leftDoorEnd = new THREE.Vector3(
      leftDoorStart.x + easeDoors * 1.3, 
      leftDoorStart.y + easeDoors * 0.1, 
      leftDoorStart.z + easeDoors * 0.2
    );
    updateSteppedLine(leftDoorLineRef, leftDoorStart, leftDoorEnd, new THREE.Vector3(0, 0, 0.45 * easeDoors), easeDoors);

    // 3. Rear Wing
    const rearWingStart = new THREE.Vector3(0, 0.9, -1.7);
    const rearWingEnd = new THREE.Vector3(
      rearWingStart.x, 
      rearWingStart.y + easeAero * 0.9, 
      rearWingStart.z - easeAero * 1.3
    );
    updateSteppedLine(rearWingLineRef, rearWingStart, rearWingEnd, new THREE.Vector3(0.55 * easeAero, 0, 0), easeAero);

    // Update annotation group positions
    if (hoodAnnotationRef.current) {
      hoodAnnotationRef.current.position.copy(hoodEnd).add(new THREE.Vector3(0.4, 0.05, 0.25));
    }
    if (leftDoorAnnotationRef.current) {
      leftDoorAnnotationRef.current.position.copy(leftDoorEnd).add(new THREE.Vector3(0.45, 0.05, -0.1));
    }
    if (rearWingAnnotationRef.current) {
      rearWingAnnotationRef.current.position.copy(rearWingEnd).add(new THREE.Vector3(0.4, 0.05, -0.25));
    }

    if (Math.abs(exploded - carState.exploded) > 0.02) {
      setExploded(carState.exploded);
    }
    if (Math.abs(opacity - carState.opacity) > 0.02) {
      setOpacity(carState.opacity);
    }
  });

  const showAnnotations = exploded > 0.5 && opacity > 0.5;

  return (
    <group ref={group} {...props}>
      <group position={[0, yOffset, 0]}>
        <primitive object={scene} />

        {/* 3D Blueprint Curved Trajectory Lines (thin, sleek, semi-transparent) */}
        <line ref={hoodLineRef as any}>
          <bufferGeometry />
          <lineBasicMaterial 
            color="#4D7CFF" 
            transparent 
            depthWrite={false} 
            linewidth={1} 
            blending={THREE.AdditiveBlending}
          />
        </line>
        <line ref={leftDoorLineRef as any}>
          <bufferGeometry />
          <lineBasicMaterial 
            color="#4D7CFF" 
            transparent 
            depthWrite={false} 
            linewidth={1} 
            blending={THREE.AdditiveBlending}
          />
        </line>
        <line ref={rearWingLineRef as any}>
          <bufferGeometry />
          <lineBasicMaterial 
            color="#4D7CFF" 
            transparent 
            depthWrite={false} 
            linewidth={1} 
            blending={THREE.AdditiveBlending}
          />
        </line>

        {/* Clean Typographic Floating Labels without backgrounds/boxes */}
        <group ref={hoodAnnotationRef}>
          <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div 
              className="whitespace-nowrap select-none"
              style={{
                opacity: showAnnotations ? 0.95 : 0,
                transform: `scale(${showAnnotations ? 1 : 0.8})`,
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-[#a5c0ff] text-[12px] font-sans font-black tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(77,124,255,0.6)]">
                Engine Hood
              </span>
            </div>
          </Html>
        </group>

        <group ref={leftDoorAnnotationRef}>
          <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div 
              className="whitespace-nowrap select-none"
              style={{
                opacity: showAnnotations ? 0.95 : 0,
                transform: `scale(${showAnnotations ? 1 : 0.8})`,
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-[#a5c0ff] text-[12px] font-sans font-black tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(77,124,255,0.6)]">
                Door Panel
              </span>
            </div>
          </Html>
        </group>

        <group ref={rearWingAnnotationRef}>
          <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div 
              className="whitespace-nowrap select-none"
              style={{
                opacity: showAnnotations ? 0.95 : 0,
                transform: `scale(${showAnnotations ? 1 : 0.8})`,
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-[#a5c0ff] text-[12px] font-sans font-black tracking-[0.25em] uppercase drop-shadow-[0_0_8px_rgba(77,124,255,0.6)]">
                Rear Wing
              </span>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/ferrari.glb');
