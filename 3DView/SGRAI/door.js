import * as THREE from "three";
import * as TWEEN from 'three/addons/libs/tween.module.js';

/*
 * parameters = {
 *  textureUrl: String
 * }
 */

export default class Door extends THREE.Object3D{
    constructor(parameters) {
        super();
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        /* To-do #8 - Load the wall texture image
            - image location: this.textureUrl
        */
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        /* To-do #9 - Configure the magnification and minification filters:
            - magnification filter: linear
            - minification filter: mipmapping and trilinear
        */
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        // Create a wall (seven faces) that casts and receives shadows

        // Create a group of objects
        const door = new THREE.Group();

        // Create the front face (a rectangle)
        let geometry = new THREE.PlaneGeometry(0.95, 3.0);
        /* To-do #10 - Assign the texture to the material's color map:
            - map: texture */
        let material = new THREE.MeshPhongMaterial({ color: 0xffffff , map: texture });
        let face = new THREE.Mesh(geometry, material);
        face.position.set(0.0, 1.0, 0.025);
        /* To-do #34 - Set the front face to cast and receive shadows*/
        face.castShadow = true;
        face.receiveShadow = true;
        door.add(face);

        // Create the rear face (a rectangle)
        face = new THREE.Mesh().copy(face, false);
        face.rotation.y = Math.PI;
        face.position.set(0.0, 1.0, -0.025);
        door.add(face);

        // Create the two left faces (a four-triangle mesh)
       let points = new Float32Array([
            -0.475, -0.5, 0.025,
            -0.475, 0.5, 0.025,
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,

            -0.5, 0.5, 0.0,
            -0.475, 0.5, -0.025,
            -0.475, -0.5, -0.025,
            -0.5, -0.5, 0.0
        ]);
        let normals = new Float32Array([
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,

            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707
        ]);
        let indices = [
            0, 1, 2,
            2, 3, 0,
            4, 5, 6,
            6, 7, 4
        ];/*
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        material = new THREE.MeshPhongMaterial({ color: 0x6b554b });
        face = new THREE.Mesh(geometry, material);*/
        /* To-do #35 - Set the left faces to cast and receive shadows*/
        face.castShadow = true;
        face.receiveShadow = true;
        door.add(face);

        // Create the two right faces (a four-triangle mesh)
        face = new THREE.Mesh().copy(face, false);
        face.rotation.y = Math.PI;
        door.add(face);

        // To-do #7: Create the top face (a four-triangle mesh)
        points = new Float32Array([
            -0.475, 0.5, -0.025,
            -0.5, 0.5, 0.0,
            -0.475, 0.5, 0.025,
            0.475, 0.5, 0.025,
            0.5, 0.5, 0.0,
            0.475, 0.5, -0.025,
        ]);
        normals = new Float32Array([
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
        ]);
        indices = [
            0, 1, 2,
            0, 2, 3,
            3, 4, 5,
            3, 5, 0
        ];
        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3)); // itemSize = 3 because there are 3 values (X, Y and Z components) per vertex
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        face = new THREE.Mesh(geometry, material);
        /* To-do #36 - Set the top face to cast and receive shadows*/
        face.castShadow = true;
        face.receiveShadow = true;
        door.add(face);
        
        TWEEN.update();
        this.add(door);
        this.object = door;
        this.state = "close";
        this.tween = new TWEEN.Tween(door.rotation);
        this.actions = {
            open: () => {
                    this.state = "open";
                    console.log("open");
                    this.tween.stop();
                    this.tween.to({ rotation: { y: Math.PI / 2.0 } }, 1000);
                    this.tween.start();

            },
            stop: () => {
                this.state = "stop";
                this.tween.stop();
            },
            close: () => {
                    this.state = "close";
                    this.tween.stop();
                    this.tween.to({ rotation: { y: 0.0 } }, 1000);
                    this.tween.start();
            },
            getState:()=>{
                return this.state
            }
        };
    }
}