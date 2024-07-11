
/*
import { expect } from 'chai';
import sinon from 'sinon';
import { Container } from 'typedi';
import { FloorMap } from './FloorMap';
import BuildingRepo from '../repos/buildingRepo';
import { Floor } from '../domain/floor/floor';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Building } from '../domain/building/building';

describe('FloorMap', function () {

  describe('toDTO', function () {
    it('should map a Floor to IFloorDTO', function () {
      const buildingData = {
        id: 'B001',
        code: 'B001',
        description: 'Test Building',
        name: 'Building A',
        x: 100,
        y: 200,
      };

      const building = Building.create(buildingData, new UniqueEntityID("123gbnjkiuy")).getValue();

      const floorData = {
        floorNumber: '1',
        description: 'Test Floor',
        floorBuilding:building,
      };

      const floor = Floor.create(floorData, new UniqueEntityID("124567890asdfghj")).getValue();

      const result = FloorMap.toDTO(floor);

      const expected = {
        id: floor.id.toString(),
        description: floor.description,
        floorNumber: floor.floorNumber,
        floorBuilding: floor.floorBuilding.id.toString(),
      };

      expect(result).to.deep.equal(expected);
    });
  });
  });


  describe('toDomain', function () {
    it('should map a DTO to a Floor domain object', async function () {
      // Stub the BuildingRepo
      const repo = {
        findById: sinon.stub().resolves({
          id: '3',
        }),
      };

      // Create a sample DTO object
      const dto = {
        floorNumber: 2,
        description: 'Sample Floor',
        floorBuilding: '3',
      };

      // Set up the Container with the stubbed repo
      sinon.stub(Container, 'get').withArgs(BuildingRepo).returns(repo);

      // Call the toDomain method
      const result = await FloorMap.toDomain(dto);

      // Define the expected output
      const expected = {
        floorNumber: 2,
        description: 'Sample Floor',
        floorBuilding: {
          id: '3',
        },
      };

      // Use Chai to make assertions
      expect(result).to.deep.include(expected);

      // Restore the stub
      sinon.restore();
    });
    describe('toPersistence', function () {
    it('should map a Floor to a persistence object', function () {

       const buildingData = {
        id: 'B001',
        code: 'B001',
        description: 'Test Building',
        name: 'Building A',
        x: 100,
        y: 200,
      };

      const building = Building.create(buildingData, new UniqueEntityID("123gbnjkiuy")).getValue();

      const floorData = {
        floorNumber: '1',
        description: 'Test Floor',
        floorBuilding:building,
      };

      const floor = Floor.create(floorData, new UniqueEntityID("124567890asdfghj")).getValue();

      const result = FloorMap.toPersistence(floor);

      const expected = {
        domainId: floor.id.toString(),
        description: floor.description,
        floorNumber: floor.floorNumber,
        floorBuilding: floor.floorBuilding.id.toValue(),
      };

      expect(result).to.deep.equal(expected);
  });
});
  });*/
  

  