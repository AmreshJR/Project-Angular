export class DtoUpdateRole{
    constructor(
        public oldRole:string,
        public newRole:string,
        public userName:string
    ){

    }
}