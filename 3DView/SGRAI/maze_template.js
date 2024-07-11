import * as THREE from "three";
import Ground from "./ground_template.js";
import Wall from "./wall_template.js";
import Door from "./door.js";
import Elevator from "./elevator.js";
import Passage from "./passage.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        let description;

        function fetchDataFromDatabase(floorID) {
            return new Promise((resolve, reject) => {
                fetch(`http://localhost:3000/api/floors/listFloors/`)
                    .then(response => response.json())
                    .then(floorData => {
                        // Dynamically create actions for each floor
                        floorData.forEach(floor => {
                            console.log(floor);
                            if (floor.id === floorID) {
                                const jsonMap = JSON.parse(floor.map);
                                resolve(jsonMap); // Resolve the promise with the map data
                            }
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
        this.onLoad = function () {
            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            const floorID = urlParams.get('floor');
            console.log(floorID);

            // Call the new method to fetch data from the database
            fetchDataFromDatabase(floorID)
                .then(jsonMap => {
                    console.log(jsonMap);
                    description = jsonMap;

                    // Continue with the rest of your code...
                    console.log("description",description);
                    // Store the maze's map and size
                    this.map = description.map;
                    this.size = description.size;

                    this.passageCode=description.passageCode;
                    this.floorCode=description.floorCode;
                    // Store the player's initial position and direction
                    //this.initialPosition = this.cellToCartesian(description.initialPosition);
                    this.initialPosition=this.cellToCartesian([0,5]);
                    //this.initialDirection = description.initialDirection;
                    this.initialDirection = 0.0;
                    // Store the maze's exit location
                    //this.exitLocation = this.cellToCartesian(description.exitLocation);
                    this.exitLocation =this.cellToCartesian([-0.5, 6]);
                    // Create a group of objects
                    this.object = new THREE.Group();

                    // Create the ground
                    this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
                    this.object.add(this.ground.object);

                    // Create a wall
                    this.wall = new Wall({ textureUrl: description.wallTextureUrl });
                    this.door = new Door({ textureUrl: description.doorTextureUrl });
                    this.elevator = new Elevator({ textureUrl: description.elevatorTextureUrl });
                    this.passage= new Passage({ textureUrl: description.passageTextureUrl });
                    // Build the maze
                    let wallObject;
                    let doorObject;
                    let ElevatorObject;
                    let passageObject
                    for (let i = 0; i <= description.size.width; i++) {
                        for (let j = 0; j <= description.size.height; j++) {
                            if (this.map[j][i] == 2 || this.map[j][i] == 3) {
                                wallObject = this.wall.object.clone();
                                wallObject.position.set(i - description.size.width / 2 + 0.5, 0.5, j - description.size.height / 2);
                                this.object.add(wallObject);
                            }
                            if (this.map[j][i] == 1 || this.map[j][i] == 3) {
                                wallObject = this.wall.object.clone();
                                wallObject.rotateY(Math.PI / 2.0);
                                wallObject.position.set(i - description.size.width / 2, 0.5, j - description.size.height / 2 + 0.5);
                                this.object.add(wallObject);
                            }
                            if (this.map[j][i] == "poN") {
                                doorObject = this.door.object.clone();
                                doorObject.position.set(i - description.size.width / 2 + 0.5, 0.5, j - description.size.height / 2);
                                this.object.add(doorObject);
                            }
                            if (this.map[j][i] == "poW") {
                                doorObject = this.door.object.clone();
                                doorObject.rotateY(Math.PI / 2.0);
                                doorObject.position.set(i - description.size.width / 2, 0.5, j - description.size.height / 2 + 0.5);
                                this.object.add(doorObject);
                            }
                            if (this.map[j][i] == "elW") {
                                ElevatorObject = this.elevator.object.clone();
                                ElevatorObject.rotateY(Math.PI / 2.0);
                                ElevatorObject.position.set(i - description.size.width / 2, 0.5, j - description.size.height / 2 + 0.5);
                                this.object.add(ElevatorObject);
                            }
                            if (this.map[j][i] == "elN") {
                                ElevatorObject = this.elevator.object.clone();
                                ElevatorObject.position.set(i - description.size.width / 2 + 0.5, 0.5, j - description.size.height / 2);
                                this.object.add(ElevatorObject);
                            }
                            if (this.map[j][i] == "pass") {
                                passageObject = this.passage.object.clone();
                                passageObject.position.set(i - description.size.width / 2 + 0.5, 0.5, j - description.size.height / 2);
                                this.object.add(passageObject);
                            }
                        }
                    }

                    this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
                    this.loaded = true;
                })

        };

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    
    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.height / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.width / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.width / 2.0), Math.floor(position.x / this.scale.x + this.size.height / 2.0)];
    }

    /* To-do #23 - Measure the player’s distance to the walls
        - player position: position*/
    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToWestDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == "poW") {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToWestElevator(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == "elW") {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return -position.x + this.cellToCartesian(indices).x - this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToNorthDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == "poN") {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToNorthElevator(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == "elN") {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return -position.z + this.cellToCartesian(indices).z - this.scale.z / 2.0;
        }
        return Infinity;
    }
    distanceToPassage(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == "pass") {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    

    foundExit(position) {
        /* To-do #42 - Check if the player found the exit
            - assume that the exit is found if the distance between the player position and the exit location is less than (0.5 * maze scale) in both the X- and Z-dimensions
            - player position: position
            - exit location: this.exitLocation
            - maze scale: this.scale
            - remove the previous instruction and replace it with the following one (after completing it)*/
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z;
    };

  /*  keyChange(event, isKeyDown,door) {
        if (event.key === "e"){
            console.log(door);
            door.actions.open();
        }
        if (event.key === "c"){
            door.actions.close();
        }
    }*/

    keyChange(event, isKeyDown, door) {
        if (event.key === "e" && isKeyDown) {
            if(this.door){
            console.log("teste if");
            this.door.actions.open();
            console.log(this.door);
            }
        }
        if (event.key === "c" && isKeyDown){
            this.door.actions.close();
            console.log("close")
            console.log(this.door);
        }
        
        //  this.door.rotation.y = this.door.tween._valuesEnd.y;
        //console.log(this.door.tween._valuesEnd.y);
        //console.log("teste");
        // Add other key handling logic as needed
    }
}