
export class Subrack {


    constructor(
        public id:number,
        public parameterId:string,
        public cn:number,
        public srn:number,
        public type:string,
        public desc:string
    ) { }

    get Command():string{
        let command = 'ADD SUBRACK:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.cn  !== null)
                    command += `CN=${this.cn},`;
                if(this.srn  !== null)
                    command += `SRN=${this.srn},`;
                if(this.type)
                    command += `TYPE=${this.type.toUpperCase()},`;
                if(this.desc)
                    command += `DESC="${this.desc.toUpperCase()}"`;        
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV CABINET:CN='+this.cn+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}