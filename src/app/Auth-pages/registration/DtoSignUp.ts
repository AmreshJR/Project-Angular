export class DtoSignUp{
    constructor(
        public userName: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public dob: string,
        public password: string,
        public address: string
        ){
    
    }
}