/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Daniel Brück (https://sketchfab.com/daniel.brueck)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/pacman-arcade-animation-0b43f85af5384ea4bac5d6e2d3cbd008
title: Pacman Arcade + animation
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[7.34, 37.74, -1.74]} rotation={[-0.81, 0, 0]} scale={0.09}>
            <group position={[0, -0.32, 0]}>
              <mesh
                geometry={nodes['mouth_top_pac_&_ghost_0'].geometry}
                material={nodes['mouth_top_pac_&_ghost_0'].material}
              />
            </group>
            <group position={[0, -0.32, 0]}>
              <mesh
                geometry={nodes['mouth_bott_pac_&_ghost_0'].geometry}
                material={nodes['mouth_bott_pac_&_ghost_0'].material}
              />
            </group>
            <group position={[0, -0.32, 0]}>
              <mesh
                geometry={nodes['pacman_pac_&_ghost_0'].geometry}
                material={nodes['pacman_pac_&_ghost_0'].material}
              />
            </group>
          </group>
          <group position={[-0.93, 37.65, -1.62]} rotation={[-0.81, 0, 0]} scale={0.09}>
            <mesh geometry={nodes['ghost1_pac_&_ghost_0'].geometry} material={nodes['ghost1_pac_&_ghost_0'].material} />
          </group>
          <group position={[6.75, 41.93, -6.15]} rotation={[-0.81, 0, 0]} scale={0.09}>
            <mesh geometry={nodes['ghost2_pac_&_ghost_0'].geometry} material={nodes['ghost2_pac_&_ghost_0'].material} />
          </group>
          <group position={[0.92, 37.64, -1.61]} rotation={[-0.81, 0, 0]} scale={0.09}>
            <mesh geometry={nodes['ghost3_pac_&_ghost_0'].geometry} material={nodes['ghost3_pac_&_ghost_0'].material} />
          </group>
          <group name="ghost4" position={[-3.88, 37.69, -1.65]} rotation={[-0.81, 0, 0]} scale={0.09}>
            <mesh geometry={nodes['ghost4_pac_&_ghost_0'].geometry} material={nodes['ghost4_pac_&_ghost_0'].material} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.pac_man_machine_automat_0.geometry} material={materials.automat} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.scheibe_scheibe_0.geometry} material={materials.scheibe} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene-transformed.glb')