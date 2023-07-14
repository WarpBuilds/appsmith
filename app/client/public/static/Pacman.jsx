/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.7 pacman.glb --transform
Author: Daniel Brück (https://sketchfab.com/daniel.brueck)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/pacman-arcade-animation-0b43f85af5384ea4bac5d6e2d3cbd008
Title: Pacman Arcade + animation
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/pacman-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="RootNode">
          <group name="pacman" position={[7.345, 37.744, -1.735]} rotation={[-0.815, 0, 0]} scale={0.095}>
            <group name="Object_7" position={[0, -0.317, 0]}>
              <mesh name="pacman_pac_&_ghost_0" geometry={nodes['pacman_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
            </group>
            <group name="mouth_top">
              <group name="Object_10" position={[0, -0.317, 0]}>
                <mesh name="mouth_top_pac_&_ghost_0" geometry={nodes['mouth_top_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
              </group>
            </group>
            <group name="mouth_bott">
              <group name="Object_13" position={[0, -0.317, 0]}>
                <mesh name="mouth_bott_pac_&_ghost_0" geometry={nodes['mouth_bott_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
              </group>
            </group>
          </group>
          <group name="ghost1" position={[-0.929, 37.654, -1.616]} rotation={[-0.815, 0, 0]} scale={0.095}>
            <mesh name="ghost1_pac_&_ghost_0" geometry={nodes['ghost1_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
          </group>
          <group name="ghost2" position={[6.745, 41.929, -6.15]} rotation={[-0.815, 0, 0]} scale={0.095}>
            <mesh name="ghost2_pac_&_ghost_0" geometry={nodes['ghost2_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
          </group>
          <group name="ghost3" position={[0.917, 37.645, -1.606]} rotation={[-0.815, 0, 0]} scale={0.095}>
            <mesh name="ghost3_pac_&_ghost_0" geometry={nodes['ghost3_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
          </group>
          <group name="ghost4" position={[-3.883, 37.687, -1.65]} rotation={[-0.815, 0, 0]} scale={0.095}>
            <mesh name="ghost4_pac_&_ghost_0" geometry={nodes['ghost4_pac_&_ghost_0'].geometry} material={materials.pac__ghost} />
          </group>
        </group>
        <mesh name="pac_man_machine_automat_0" geometry={nodes.pac_man_machine_automat_0.geometry} material={materials.automat} rotation={[-Math.PI / 2, 0, 0]} />
        <mesh name="scheibe_scheibe_0" geometry={nodes.scheibe_scheibe_0.geometry} material={materials.scheibe} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/pacman-transformed.glb')