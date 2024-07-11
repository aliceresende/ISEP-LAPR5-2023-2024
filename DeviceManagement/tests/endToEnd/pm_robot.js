
pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Response has the required fields", function () {
  const responseData = pm.response.json();
  
  pm.expect(responseData).to.be.an('object');
  pm.expect(responseData.id).to.exist;
  pm.expect(responseData.code).to.exist;
  pm.expect(responseData.nickname).to.exist;
  pm.expect(responseData.seriesNumber).to.exist;
  pm.expect(responseData.robotType).to.exist;
  pm.expect(responseData.description).to.exist;
  pm.expect(responseData.status).to.exist;
});


pm.test("Id is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.id).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


pm.test("Code is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.code).to.exist.and.to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


pm.test("Nickname is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.nickname).to.exist.and.to.be.a('string').and.to.have.lengthOf.at.least(1, "Nickname should not be empty");
});

