
export class EnodebFuntion {


    constructor(
        public id:number,
        public parameterId:string,
        public eNodeBFunctionName:string,
        public applicationRef:number,
        public enodebId:number,
        public userLabel:string
    ) { }

    get Command():string{
        let command = 'ADD ENODEBFUNCTION:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.eNodeBFunctionName)
                    command += `eNodeBFunctionName="${this.eNodeBFunctionName.toUpperCase()}",`;
                if(this.applicationRef  !== null)
                    command += `ApplicationRef=${this.applicationRef},`;
                if(this.enodebId  !== null)
                    command += `eNodeBId=${this.enodebId},`;
                if(this.userLabel)
                    command += `USERLABEL="${this.userLabel.toUpperCase()}"`;
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV ENODEBFUNCTION:ENODEBFUNCTIONNAME='+this.eNodeBFunctionName.toUpperCase()+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}