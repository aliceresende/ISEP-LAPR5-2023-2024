import { Service, Inject } from 'typedi';
import config from "../../config";
import { Floor } from "../domain/floor/floor";
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Result } from "../core/logic/Result";
import IPassageService from './IServices/IPassageService';
import IPassageRepo from '../repos/IRepos/IPassageRepo';
import IPassageDTO from '../dto/IPassageDTO';
import { Passage } from '../domain/passage/passage';
import { PassageMap } from '../mappers/PassageMap';
import { forEach } from 'lodash';


@Service()
export default class PassageService implements IPassageService {
  constructor(
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      @Inject(config.repos.passage.name) private passageRepo: IPassageRepo,
  ) {}


  public async createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    console.log("Chegou ao serviço");
    try {
      let floor1: Floor;
      let floor2: Floor;
      const floorOrError1 = await this.getFloor(passageDTO.floorBuilding1);
      const floorOrError2 = await this.getFloor(passageDTO.floorBuilding2);
      if(floorOrError1.isFailure || floorOrError2.isFailure){
        return Result.fail<IPassageDTO>(floorOrError1.error);
      }else{
        floor1 = floorOrError1.getValue();
        floor2 = floorOrError2.getValue();
      }    
      if(floorOrError1.isFailure){
        //console.log("Erro:", floorOrError1.error);
        return Result.fail<IPassageDTO>(floorOrError1.error);
      }else{
        floor1 = floorOrError1.getValue();
      }
      if(floorOrError2.isFailure){
        //console.log("Erro:", floorOrError2.error);
        return Result.fail<IPassageDTO>(floorOrError2.error);
      }else{
        floor2 = floorOrError2.getValue();
      }
        //console.log(floor1);
        //console.log(floor2);
        const passageOrError = await Passage.create({
          location: passageDTO.location,
          floorBuilding1: floor1,
          floorBuilding2: floor2,
          fb1x:passageDTO.fb1x,
          fb1y:passageDTO.fb1y,
          fb2x:passageDTO.fb2x,
          fb2y:passageDTO.fb2y,
          passageCode:passageDTO.passageCode,
      });


      if (passageOrError.isFailure) {
        return Result.fail<IPassageDTO>(passageOrError.errorValue());
      }
      const passageResult = passageOrError.getValue();

      await this.passageRepo.save(passageResult);
      console.log("guardou")
      const passageDTOResult = PassageMap.toDTO( passageResult ) as IPassageDTO;
      return Result.ok<IPassageDTO>( passageDTOResult )
    } catch (e) {
      console.log("Chegou ao catch");
      throw e;
    }
  }
  public async getFloor(floorId: string): Promise<Result<Floor>> {
    //console.log("Entrou no getFloor");
      const floor = await this.floorRepo.findById(floorId);
      const found= !!floor;
      console.log(found);
      if (found){
        //console.log("Entrou no found if");
        return Result.ok<Floor>(floor);
      } else {
        //console.log("Entrou no found else");
        return Result.fail<Floor>("Couldn't find building by id=" + floorId);
      } 
  }

/*
  // US 260 - Listar passagem entre 2 edifícios ---------------------------------------------------------------------------
  public async getFloorsByBuilding(buildingId: string): Promise<Result<Floor[]>>{
    var floors = await this.floorRepo.listFloorByBuilding(buildingId);
    if (floors !== null) {
      return Result.ok<Floor[]>(floors);
    } else {
      console.log("Entrou no found else");
      return Result.fail<Floor[]>("Couldn't find floors in this building =" + buildingId);
    } 
  }

  public async passagesTwoBuildings(allPassages: Passage[], floorsA: Floor[], floorsB: Floor[]): Promise<Passage[]> {
    const passagesBetweenBuildings: Passage[] = [];
  
    for (const passage of allPassages) {
      const passageFloorIds = new Set([passage.floorBuilding1, passage.floorBuilding2]);
      console.log(passage.floorBuilding1)
      // Check if floorsA contains at least one floor with a domain id in passageFloorIds
      if (floorsA.some(floor => console.log("|||",floor.id,"||/n"))) {
        // Check if floorsB also contains at least one floor with a domain id in passageFloorIds
        if (floorsB.some(floorB => passageFloorIds.has(floorB))) {
          passagesBetweenBuildings.push(passage);
        }
      }
    }
  
    return passagesBetweenBuildings;
  }
  

  public async listPassagesBetweenBuildings(idBuilding1:string,idBuilding2:string): Promise<Result<IPassageDTO[]>>{
    let floorsBuilding1:Floor[] = [];
    let floorsBuilding2:Floor[] = [];
    console.log("List By Buildings Service");
    
    const floorsOrError1 = await this.getFloorsByBuilding(idBuilding1);
    const floorsOrError2 = await this.getFloorsByBuilding(idBuilding2);

    const passages =  await this.passageRepo.findAll();

    console.log(passages.length);
    console.log("cheguei")

  
    if(floorsOrError1.isFailure || floorsOrError2.isFailure){
      console.log("Erro 1:", floorsOrError1.error)
      console.log("Erro 2:",floorsOrError2.error)
      return Result.fail<IPassageDTO[]>(floorsOrError1.error && floorsOrError2.error);
    }else{
      floorsBuilding1 = floorsOrError1.getValue();
      floorsBuilding2 = floorsOrError2.getValue();

      if (!passages) {
        return Result.fail<IPassageDTO[]>("Couldn't find passages");
      }else{
        console.log(floorsBuilding1.length,"|||",floorsBuilding2.length);
        console.log("inicio ELSE");

        const passagesAB = await this.passagesTwoBuildings(passages,floorsBuilding1,floorsBuilding2);
        console.log(passagesAB.length);
        const passagesABDTOSpassagesAB = passagesAB.map((passage)=> PassageMap.toDTO(passage));
        return Result.ok<IPassageDTO[]>(passagesABDTOSpassagesAB);
      }
    }
  }
*/
  //--------------------------------------------------------------------------------------------
  public async updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>> {
    try {
      const passage = await this.passageRepo.findById(passageDTO.id);
      console.log("Update passage service ", passageDTO.id);
      let floor1: Floor;
      let floor2: Floor;
      const floorOrError1 = await this.getFloor(passageDTO.floorBuilding1);
      const floorOrError2 = await this.getFloor(passageDTO.floorBuilding2);
      if(floorOrError1.isFailure){
        //console.log("Erro:", FloorOrError1.error);
        return Result.fail<IPassageDTO>(floorOrError1.error);
      }else{
        floor1 = floorOrError1.getValue();
      }
      if(floorOrError2.isFailure){
        //console.log("Erro:", FloorOrError1.error);
        return Result.fail<IPassageDTO>(floorOrError2.error);
      }else{
        floor2 = floorOrError2.getValue();
      }
      
      if (passage === null) {
        return Result.fail<IPassageDTO>("Passage not found");
      }
      else {
        console.log("Floor1:",floor1);
        console.log("Floor2:",floor2);
        passage.props.location=passageDTO.location;
        passage.props.floorBuilding1=floor1;
        passage.props.floorBuilding2=floor2;
        console.log("Passagem",passage);
        await this.passageRepo.save(passage);
        
        const passageDTOResult = PassageMap.toDTO(passage) as IPassageDTO;
        
        console.log("DTO result: ", passageDTOResult);
        return Result.ok<IPassageDTO>( passageDTOResult )
        }
    } catch (e) {
      console.error("Error in updatePassage: ", e);
      throw e;
    }
  }
  public async getPassagesBetweenBuildings(building1: string, building2: string): Promise<Result<IPassageDTO[]>> {
    try {
      
      let passageListDto: IPassageDTO[] = [];
      const passageList: string[] = await this.passageRepo.findAllByBuilding(building1,building2);

      console.log(passageList);
    
      if (passageList != null) {
        for (let i = 0; i < passageList.length; i++) {
          console.log("passagemList[i]", passageList[i]);
          const passagemResult = await (this.passageRepo.findByDomainId(passageList[i]));

          passageListDto.push(PassageMap.toDTO(passagemResult));

        }
        return Result.ok<IPassageDTO[]>(passageListDto);
      }

      return Result.fail<IPassageDTO[]>("Não existem passagens para listar.");
    } catch (e) {
      throw e;
    }
  } 

  public async listPassages(): Promise<Result<IPassageDTO[]>> {
    let values: IPassageDTO[] = [];

    console.log("Serviço pré-repo")
		const passages = await this.passageRepo.findAll();

    console.log(passages.length)

    console.log("serviço pós-repo")

    let cont=0;
		passages.forEach((passage) => {
      cont++;
      console.log(passage ,"----- CONT:", cont);
			values.push(PassageMap.toDTO(passage));
		});

		return Result.ok<IPassageDTO[]>(values);
  }

}



//=============================================================

