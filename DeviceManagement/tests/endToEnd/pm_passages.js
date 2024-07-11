//POST Passage

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  
  pm.test("Response has required fields", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData).to.have.property('id');
    pm.expect(responseData).to.have.property('location');
    pm.expect(responseData).to.have.property('floorBuilding1');
    pm.expect(responseData).to.have.property('floorBuilding2');
  });
  
  
  pm.test("Verify that the 'id' field is a non-empty string", function () {
      const responseData = pm.response.json();
      
      pm.expect(responseData).to.be.an('object');
      pm.expect(responseData.id).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
  });
  
  
  pm.test("Verify that the 'location' field is a non-empty string", function () {
      const responseData = pm.response.json();
      
      pm.expect(responseData.location).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
  });
  
  
  