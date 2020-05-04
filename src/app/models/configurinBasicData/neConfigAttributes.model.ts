
export class NeConfigAttributes {


    constructor(
        public id:number,
        public parameterId:string,
        public neName:string,
        public location:string,
        public did:string,
        public siteName:string,
        public userLabel:string
    ) { }

    get Command():string{
        let command = 'SET NE:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.neName)
                    command += `NENAME="${this.neName.toUpperCase()}",`;
                if(this.location)
                    command += `LOCATION="${this.location.toUpperCase()}",`;
                if(this.did)
                    command += `DID="${this.did.toUpperCase()}",`;
                if(this.siteName)
                    command += `SITENAME="${this.siteName.toUpperCase()}",`;
                if(this.userLabel)
                    command += `USERLABEL="${this.userLabel.toUpperCase()}"`;
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}