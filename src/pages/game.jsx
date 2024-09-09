import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Game() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -100,
            window.innerWidth / 100,
            window.innerHeight / 100,
            window.innerHeight / -100,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create a player block
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const player = new THREE.Mesh(geometry, material);
        scene.add(player);

        // Create a platform
        const platformGeometry = new THREE.BoxGeometry(10, 1, 1);
        const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -1;
        scene.add(platform);

        // Camera initial position
        camera.position.z = 10;

        // Gravity and movement variables
        let velocityY = 0;
        let isJumping = false;
        const gravity = -0.01;
        const jumpStrength = 0.2;

        // Keyboard controls
        const keys = {
            left: false,
            right: false,
            jump: false
        };

        const handleKeyDown = (event) => {
            if (event.code === 'KeyA') keys.left = true;
            if (event.code === 'KeyD') keys.right = true;
            if (event.code === 'Space') keys.jump = true;
        };

        const handleKeyUp = (event) => {
            if (event.code === 'KeyA') keys.left = false;
            if (event.code === 'KeyD') keys.right = false;
            if (event.code === 'Space') keys.jump = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Horizontal movement
            if (keys.left) player.position.x -= 0.05;
            if (keys.right) player.position.x += 0.05;

            // Jumping and gravity
            if (keys.jump && !isJumping) {
                velocityY = jumpStrength;
                isJumping = true;
            }

            player.position.y += velocityY;
            velocityY += gravity;

            // Check if player is on the platform
            const onPlatform = player.position.y <= 0 && player.position.x >= platform.position.x - platformGeometry.parameters.width / 2
                && player.position.x <= platform.position.x + platformGeometry.parameters.width / 2;

            if (onPlatform) {
                player.position.y = 0;
                velocityY = 0;
                isJumping = false;
            }

            // Update camera position
            camera.position.x = player.position.x;
            camera.position.y = player.position.y + 2;

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.left = window.innerWidth / -100;
            camera.right = window.innerWidth / 100;
            camera.top = window.innerHeight / 100;
            camera.bottom = window.innerHeight / -100;
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