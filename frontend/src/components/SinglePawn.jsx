import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const SinglePawn = ({ color, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/model/singlePawn.glb");
  const { actions, names } = useAnimations(animations, group);

  // Create a unique material for each pawn
  const uniqueMaterial = useMemo(
    () => new MeshStandardMaterial({ color }),
    [color]
  );

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="uploads_files_948873_Pawn"
          geometry={nodes.uploads_files_948873_Pawn.geometry}
          material={uniqueMaterial}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={-0.122}
        />
      </group>
    </group>
  );
};

export default SinglePawn;
useGLTF.preload("/model/singlePawn.glb");
