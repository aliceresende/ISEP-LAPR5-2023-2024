/* global use, db */

// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.
db.getCollection('floors').insertOne({
  _id: ObjectId('658d8c637967c361b85f00f1'),
  domainId: 'e780e58e-cc4d-4823-9106-bd6111fd8ac5',
  description: 'Andar 1 Edifício C',
  floorNumber: '1',
  floorBuilding: 'db38f61b-ddb3-4070-ace6-bb68903d84ef',
  map: '{"groundTextureUrl":"./textures/newGround.jpg","wallTextureUrl":"./textures/yellowWall.jpg","doorTextureUrl":"./textures/door_original.jpg","elevatorTextureUrl":"./textures/elevator.webp","passageTextureUrl":"./textures/passage.jpg","floorCode":"Andar 1 Edifício C","buildingCode":"A","size":{"width":10,"height":10},"map":[[3,2,2,2,3,2,3,2,2,2,1],[1,0,0,0,1,0,1,0,0,0,1],[1,0,0,0,"poW",0,"poW",0,0,0,1],[1,0,0,0,1,0,1,0,0,0,1],[1,0,0,0,1,0,1,0,0,0,1],[3,2,2,2,0,0,2,2,2,2,"elW"],[3,2,"poN",2,1,0,3,2,"poN",2,1],[1,0,0,0,1,0,1,0,0,0,1],[1,0,0,0,1,0,1,0,0,0,1],[1,0,0,0,1,0,1,0,0,0,1],[2,2,2,2,2,"pass",2,2,2,2,0]]}',
  createdAt: ISODate('2023-12-28T14:55:31.736Z'),
  updatedAt: ISODate('2023-12-28T15:03:08.582Z'),
  __v: 0
});
