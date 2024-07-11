
pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  
  pm.test("Response has the required fields", function () {
      const responseData = pm.response.json();
  
      pm.expect(responseData).to.be.an('object');
      pm.expect(responseData.floors).to.have.lengthOf.at.least(1);
  });
  
  pm.test("The id field should be a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.id).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
  });
  
  
  pm.test("The 'building' field is a non-empty string", function () {
    const responseData = pm.response.json();
    pm.expect(responseData.floors).to.have.lengthOf.at.least(1);
  });
  
    