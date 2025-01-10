// Create the scene, renderer, and camera
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(11.73, 3.7167, -3.7167);  // Set camera position

// Add a single directional light from the top-right
const directionalLight = new THREE.DirectionalLight(0xffffff, 0); // White light with full intensity
directionalLight.position.set(5, 5, 5);  // Position light from the top-right
scene.add(directionalLight);

// Add ambient light to soften dark faces
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft ambient light (gray with 50% intensity)
scene.add(ambientLight);

// Enable shadow calculations on the renderer
renderer.shadowMap.enabled = true;

// Load the panoramic texture (equirectangular image)
const textureLoader = new THREE.TextureLoader();
const panoramicTexture = textureLoader.load('./th-929681110.jpg'); // Path to the panoramic image

// Set the panoramic texture as the background
scene.background = panoramicTexture;

// Load the glTF/GLB model with animation
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('./untitled.gltf', function(gltf) {
    // Add the loaded scene to our main scene
    scene.add(gltf.scene);

    // Handle animations in the model
    const mixer = new THREE.AnimationMixer(gltf.scene);

    // Play all animations (if any)
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    // Start animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();  // Get time passed for animations
        mixer.update(delta);  // Update animation
        controls.update();  // Update controls
        renderer.render(scene, camera);  // Render the scene with camera
    }

    animate();
}, undefined, function(error) {
    console.error('Error loading model:', error);
});

// Adjust for window resizing to make the canvas responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add OrbitControls for mouse interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds damping (inertia) to the controls
controls.dampingFactor = 0.05;

// Create the text geometry and material for the billboard
const loader = new THREE.FontLoader();
loader.load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry('Billboard Text', {
        font: font,
        size: 50,
        height: 10,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);

    // Position the text
    textMesh.position.set(0, 1, -5);  // Position text in front of the camera

    // Start the animation loop for the text
    function animateText() {
        requestAnimationFrame(animateText);

        // Update text rotation to always face the camera (billboard effect)
        textMesh.lookAt(camera.position);

        renderer.render(scene, camera);  // Render the scene with camera
    }

    animateText();
});
