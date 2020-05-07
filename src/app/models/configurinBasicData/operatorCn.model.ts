
export class OperatorCn {


    constructor(
        public id:number,
        public parameterId:string,
        public cnOperatorId:number,
        public cnOperatorName:string,
        public cnOperatorType:string,
        public mcc:number,
        public mnc:number
    ) { }

    get Command():string{
        let command = 'ADD CNOPERATOR:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.cnOperatorId !== null)
                    command += `CnOperatorId=${this.cnOperatorId},`;
                if(this.cnOperatorName)
                    command += `CnOperatorName="${this.cnOperatorName.toUpperCase()}",`;
                if(this.cnOperatorType)
                    command += `CnOperatorType=${this.cnOperatorType.toUpperCase()},`;
                if(this.mcc !== null)
                    command += `Mcc="${this.mcc}",`;
                if(this.mnc !== null)
                    command += `Mnc="${this.mnc}"`;
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV CNOPERATOR:CnOperatorId='+this.cnOperatorId+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}