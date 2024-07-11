export default interface IMapaDTO {
    groundTextureUrl:string,
    wallTextureUrl:string,
    doorTextureUrl:string,
    elevatorTextureUrl:string,
    floorCode: string,
    buildingCode: string,
    map: {
        size : { width:number, height:number},
        map: number[][]
    }

}