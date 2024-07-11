// POST Floor
pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


var id = pm.response.json().id;
pm.globals.set("id", id);


//PATCH Floors
pm.test("Response status code is 201", function () {
  pm.response.to.have.status(201);
});


pm.test("Response time is in an acceptable range", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});


   const responseData = pm.response.json();
  
  pm.expect(responseData).to.be.an('object');
  pm.expect(Object.keys(responseData)).to.have.lengthOf(4, "Response body should contain exactly 4 fields");

  pm.test("Verify that the response has the required fields", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.id).to.exist.and.to.be.a('string');
    pm.expect(responseData.description).to.exist.and.to.be.a('string');
    pm.expect(responseData.floorNumber).to.exist.and.to.be.a('number');
    pm.expect(responseData.floorBuilding).to.exist.and.to.be.a('string');
  });

// GET Floors By Building

 // GET Buildings with min and max floors
 pm.test("Response status code is 200", function () {
  pm.response.to.have.status(200);
});

