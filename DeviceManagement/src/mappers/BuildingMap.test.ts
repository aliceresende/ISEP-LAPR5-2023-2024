import { expect } from 'chai';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Building } from '../domain/building/building';
import { IBuildingDTO } from '../dto/IBuildingDTO';


describe('Building', function () {
  describe('create', function () {
    it('should create a valid Building', function () {
      // Define a valid building DTO
      const buildingDTO: IBuildingDTO = {
        id: 'your_unique_id', // Use the same id as provided in the UniqueEntityID
        code: 'B001',
        name: 'Building A',
        description: 'Test Building',
        x: 100,
        y: 200,
      };

      // Create a Building instance using the create method
      const result = Building.create(buildingDTO, new UniqueEntityID('your_unique_id'));

      // Expect the result to be successful
      expect(result.isSuccess).to.equal(true);

      // Get the created Building
      const building = result.getValue();

      // Check the properties of the created Building
      expect(building.id.toString()).to.equal(buildingDTO.id);
      expect(building.code).to.equal(buildingDTO.code);
      expect(building.name).to.equal(buildingDTO.name);
      expect(building.description).to.equal(buildingDTO.description);
      expect(building.x).to.equal(buildingDTO.x);
      expect(building.y).to.equal(buildingDTO.y);
    });

    it('should fail to create a Building without a name', function () {
      // Define a building DTO with a missing name
      const buildingDTO: IBuildingDTO = {
        id: 'your_unique_id', // Use the same id as provided in the UniqueEntityID
        code: 'B001',
        name: '', // Missing name
        description: 'Test Building',
        x: 100,
        y: 200,
      };

      // Attempt to create a Building without a name
      const result = Building.create(buildingDTO, new UniqueEntityID('your_unique_id'));

      // Expect the result to be a failure
      expect(result.isFailure).to.equal(true);

      // Check the failure message (you may want to customize this in your implementation)
      expect(result.error).to.equal('Must provide a building name');
    });
  });
});