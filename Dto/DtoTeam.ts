export class DtoTeam{
    constructor(
        public userId:number,
        public assignedTOUser:string,
        public statusId:number,
        public teamTypeId:number
    ) {
        
    }
}