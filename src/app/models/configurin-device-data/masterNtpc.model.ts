
export class MasterNtpc {


    constructor(
        public id                 :number,
        public parameterId        :string,
        public mode               :string,
        public ip                 :string,
        public ipv6               :string
       
    ) { }

    get Command():string{
        let command = 'SET MASTERNTPS:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.mode !== null)
                    command += `MODE=${this.mode.toUpperCase()},`;
                if(this.ip !== null)
                    command += `IP="${this.ip.toUpperCase()}",`;
                if(this.ipv6 !== null)
                    command += `IPV6="${this.ipv6.toUpperCase()}"`;
                
                command += ';'  
                break;
            case 'DELETE':
                command = `RMV NTPC:MODE=${this.mode.toUpperCase()},IP=${this.ip.toUpperCase()};`;
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}