
export class SetNodeConfig {


    constructor(
        public id:number,
        public parameterId:string,
        public puductType:string,
        public userLabel:string,
        public nermVersion:string,
        public nodeId:string,
        public nodeName:string,
        public workingMode:string
    ) { }

    get Command():string{
        let command = 'SET NODE:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.puductType)
                    command += `="${this.puductType.toUpperCase()}",`;
                if(this.userLabel)
                    command += `"${this.userLabel.toUpperCase()}",`;
                if(this.nermVersion)
                    command += `"${this.nermVersion.toUpperCase()}",`;
                if(this.nodeId !== null)
                    command += `"${this.nodeId}",`;
                if(this.nodeName )
                    command += `"${this.nodeName.toUpperCase()}",`;
                if(this.workingMode)
                    command += `"${this.workingMode.toUpperCase()}"`;    
                command += ';'  
                break;
            case 'DELETE':
                command = '//RMV';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}