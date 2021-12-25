export class DtoLoginResponse{
    constructor(
        public token:string,
        public  tokenExp:string
    ){}
}