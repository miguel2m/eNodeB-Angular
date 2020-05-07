
export class Cabinet {


    constructor(
        public id:number,
        public parameterId:string,
        public cn:number,
        public type:string,
        public desc:string
    ) { }

    get Command():string{
        let command = 'ADD CABINET:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.cn  !== null)
                    command += `CN=${this.cn.toString()},`;
                if(this.type)
                    command += `TYPE=${this.type.toUpperCase()},`;
                if(this.desc)
                    command += `DESC="${this.desc.toUpperCase()}"`;        
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV CABINET:CN='+this.cn.toString()+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}