export class DtoResetPassword{
    constructor(
        public password:string,
        public confirmPassword:string,
        public email:string,
        public token:string
    ) {
        
    }
}