export class AllUserDto{
    constructor(
        public userId:number,
        public userName:string,
        public role:string,
        public statusName:string,
        public email:string,
        public authId:string
    ) {
        
    }
}