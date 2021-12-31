export class DtoUpdateProfileData{
    constructor(
        public firstName:string,
        public lastName:string,
        public address:string,
        public previousOrganizationName:string,
        public experiance:string
    ){}
}