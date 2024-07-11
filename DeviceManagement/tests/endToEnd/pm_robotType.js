pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Each element in the typeOfTasks array has an id property", function () {
    pm.response.json().typeOfTasks.forEach(function(task) {
        pm.expect(task).to.be.an('object').that.has.property('id');
    });
});
pm.test("Response is an object with brand property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('brand');
});

pm.test("Response is an object with model property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('model');
});

pm.test("Response is an object with typeOfTasks property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('typeOfTasks');
});
pm.test("Response is an object with id property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('id');
});

pm.test("Response is an object with robotType property", function () {
    pm.expect(pm.response.json()).to.be.an('object').that.has.property('robotType');
});