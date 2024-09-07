import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function Game() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Append the renderer's DOM element to the mountRef's current element
        mountRef.current.appendChild(renderer.domElement);

        // Create a block
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const block = new THREE.Mesh(geometry, material);
        scene.add(block);

        // Create a platform
        const platformGeometry = new THREE.BoxGeometry(10, 1, 10);
        const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -1;
        scene.add(platform);

        // Camera initial position
        camera.position.z = 5;
        camera.position.y = 2;

        // Gravity and movement variables
        let velocity = 0;
        let isJumping = false;
        const gravity = -0.02;
        const jumpStrength = 0.5;

        // Keyboard controls
        const keys = {
            left: false,
            right: false,
            jump: false
        };

        const handleKeyDown = (event) => {
            if (event.code === 'ArrowLeft') keys.left = true;
            if (event.code === 'ArrowRight') keys.right = true;
            if (event.code === 'Space') keys.jump = true;
        };

        const handleKeyUp = (event) => {
            if (event.code === 'ArrowLeft') keys.left = false;
            if (event.code === 'ArrowRight') keys.right = false;
            if (event.code === 'Space') keys.jump = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Horizontal movement
            if (keys.left) block.position.x -= 0.05;
            if (keys.right) block.position.x += 0.05;

            // Jumping and gravity
            if (keys.jump && !isJumping) {
                velocity = jumpStrength;
                isJumping = true;
            }

            block.position.y += velocity;
            velocity += gravity;

            // Check if block is on the platform
            if (block.position.y <= 0) {
                block.position.y = 0;
                velocity = 0;
                isJumping = false;
            }

            // Update camera position to follow the block
            camera.position.x = block.position.x;
            camera.position.y = block.position.y + 2;

            camera.lookAt(block.position);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
}

/* I FIGURED IT OUT...
// THIS WILL BE MINECRAFT PARKOUR
// JUST CREATE A FEW FLOATING BLOCKS... MAYBE HAVE THEM RANDOMLY GENERATE BASED ON A CERTAIN TRAJECTORY BASED ON WHERE THE LAST BLOCK IS...
// AND ALLOW THE USER TO MOVE THE CAMERA WITH WASD AND JUMP WITH SPACE
// THEN ALLOW THEM TO JUST DO PARKOUR...
// omg so amazing.
//
// first lets figure out how to do thisw
probably needs to do like a block that the camera follows
the block will have collision factors with the other blocks that spawn
and pretty much whnever it is on the block, it will jsut be on top of the block or whatever
and then after that we can decide how gravity works? kinda just like constantly move our character "block" down by a certain amount and then once it collides it will stop moving
but yea?
how would i make it so that u can jump up and actually go UP and not INSTANTLY down 
*/
