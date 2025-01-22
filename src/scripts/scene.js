import * as THREE from 'three';
import  { OrbitControls }  from '/node_modules/three/examples/jsm/controls/OrbitControls';
import gsap from '/node_modules/gsap/index.js';

function getPoint() {
    var u = Math.random();
    var v = Math.random();
    var theta = u * 2.0 * Math.PI;
    var phi = Math.acos(2.0 * v - 1.0);
    var r = Math.cbrt(Math.random());
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);
    var x = r * sinPhi * cosTheta;
    var y = r * sinPhi * sinTheta;
    var z = r * cosPhi;
    return {x: x, y: y, z: z};
}
class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 0); 

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );

   
    this.camera.position.set(0, 0, 3);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.mouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    this.addMouseEvents();
    this.animateParticles();

  }

  lerp(start, end, alpha) {
    return start + (end - start) * alpha;
  }


  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      'https://threejs.org/examples/textures/sprites/spark1.png'
    );

    this.material = new THREE.PointsMaterial({
        size: 0.01,
        sizeAttenuation: true,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0,
    });
      
    

    this.geometry = new THREE.BufferGeometry();
      let vertices = [];
      const colors = [];
      const scales = [];
      
      for ( let i = 0; i < 10000; i ++ ) {

					let p = getPoint();

					vertices.push( 4*p.x, 4*p.y, 4*p.z );
                    colors.push(Math.random(), Math.random(), Math.random());

                    scales.push(0); 

				}

				this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.geometry.setAttribute(
                    'color',
                    new THREE.Float32BufferAttribute(colors, 3)
                  );
                  this.geometry.setAttribute(
                    'scale',
                    new THREE.Float32BufferAttribute(scales, 1)
                  );


    this.plane  = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  

  addMouseEvents() {
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / this.width) * 2 - 1; 
      this.mouse.y = -(event.clientY / this.height) * 2 + 1; 

      this.targetRotation.x = this.mouse.y * Math.PI;
      this.targetRotation.y = this.mouse.x * Math.PI;
    });
  }

  animateParticles() {
    // Анимация появления частиц
    const scales = this.geometry.attributes.scale.array;

    for (let i = 0; i < scales.length; i++) {
      scales[i] = 0;
    }

    this.geometry.attributes.scale.needsUpdate = true;

    gsap.to(this.material, {
      duration: 3,
      opacity: 1,
      ease: "power2.out",
    });

    gsap.to(scales, {
      duration: 2,
      stagger: 0.001,
      onUpdate: () => {
        this.geometry.attributes.scale.needsUpdate = true;
      },
      ease: "power2.out",
      endArray: new Array(scales.length).fill(1),
    });
  }

  render() {

    this.time += 0.05;

    this.currentRotation.x = this.lerp(
        this.currentRotation.x,
        this.targetRotation.x,
        0.1 
      );
  
      this.currentRotation.y = this.lerp(
        this.currentRotation.y,
        this.targetRotation.y,
        0.01
      );
  
      this.plane.rotation.x = this.currentRotation.x;
      this.plane.rotation.y = this.currentRotation.y;
    
  
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

new Sketch({
  dom: document.getElementById('scene')
});
