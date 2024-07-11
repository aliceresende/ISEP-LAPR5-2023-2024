/*import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import Container from 'typedi';
import { Result } from '../core/logic/Result';
import IPassageDTO from '../dto/IPassageDTO';
import PassageController from './passageController';

describe('PassageController', () => {
  const sandbox = sinon.createSandbox();
  let loggerMock;
  let passageServiceMock;

  describe('createPassage', () => {
    beforeEach(() => {
      Container.reset();
      loggerMock = {
        error: sinon.stub(),
      };

      Container.set('logger', loggerMock);

      passageServiceMock = {
        createPassage: sinon.stub(),
      };

      Container.set('PassageService', passageServiceMock);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.restore();
    });

    it('should create a passage successfully', async () => {
      // Arrange
      const requestBody = {
        id: '123',
        location: 'Hallway',
        floorBuilding1: '1st Floor',
        floorBuilding2: '2nd Floor',
      };

      const req: Partial<Request> = {
        body: requestBody,
      };

      const res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      passageServiceMock.createPassage.returns(Result.ok<IPassageDTO>(requestBody));

      const ctrl = new PassageController(passageServiceMock);

      // Act
      await ctrl.createPassage(<Request>req, <Response>res, <NextFunction>(() => {}));

      // Assert
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, sinon.match(requestBody));
    });
  });

  describe('listPassagesBetweenBuildings', () => {
    beforeEach(() => {
      Container.reset();
      loggerMock = {
        error: sinon.stub(),
      };

      Container.set('logger', loggerMock);

      passageServiceMock = {
        listPassagesBetweenBuildings: sinon.stub(),
      };

      Container.set('PassageService', passageServiceMock);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.restore();
    });

    it('should list passages between buildings successfully', async () => {
      // Arrange
      const req: Partial<Request> = {
        params: {
          idBuilding1: 'building1',
          idBuilding2: 'building2',
        },
      };

      const res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      const passageData = [
        {
          id: '123',
          location: 'Hallway',
          floorBuilding1: '1st Floor',
          floorBuilding2: '2nd Floor',
        },
      ];

      passageServiceMock.listPassagesBetweenBuildings.returns(Result.ok(passageData));

      const ctrl = new PassageController(passageServiceMock);

      // Act
      await ctrl.listPassagesBetweenBuildings(<Request>req, <Response>res, <NextFunction>(() => {}));

      // Assert
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, sinon.match(passageData));
    });
  });

  describe('updatePassage', () => {
    beforeEach(() => {
      Container.reset();
      loggerMock = {
        error: sinon.stub(),
      };

      Container.set('logger', loggerMock);

      passageServiceMock = {
        updatePassage: sinon.stub(),
      };

      Container.set('PassageService', passageServiceMock);
    });

    afterEach(() => {
      sandbox.restore();
      sinon.restore();
    });

    it('should update a passage successfully', async () => {
      // Arrange
      const requestBody = {
        id: '123',
        location: 'Updated Hallway',
        floorBuilding1: '1st Floor',
        floorBuilding2: '2nd Floor',
      };

      const req: Partial<Request> = {
        body: requestBody,
      };

      const res: Partial<Response> = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      passageServiceMock.updatePassage.returns(Result.ok<IPassageDTO>(requestBody));

      const ctrl = new PassageController(passageServiceMock);

      // Act
      await ctrl.updatePassage(<Request>req, <Response>res, <NextFunction>(() => {}));

      // Assert
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, sinon.match(requestBody));
    });
  });
});
*/