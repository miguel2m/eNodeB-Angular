
export class Ntpc {


    constructor(
        public id                 :number,
        public parameterId        :string,
        public mode               :string,
        public ip                 :string,
        public ipv6               :string,
        public port               :string,
        public synccycle          :string,
        public authmode           :string,
        public key                :string,
        public keyid              :string,
    ) { }

    get Command():string{
        let command = 'ADD NTPC:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.mode !== null)
                    command += `MODE=${this.mode.toUpperCase()},`;
                if(this.ip !== null)
                    command += `IP="${this.ip.toUpperCase()}",`;
                if(this.ipv6 !== null)
                    command += `IPV6="${this.ipv6.toUpperCase()}",`;
                if(this.port !== null)
                    command += `PORT=${this.port.toString()},`;
                if(this.synccycle !== null)
                    command += `SYNCCYCLE=${this.synccycle.toString()},`;
                if(this.authmode !== null)
                    command += `AUTHMODE=${this.authmode.toUpperCase()},`;
                if(this.key !== null)
                    command += `KEY=${this.key.toString()},`;
                if(this.keyid !== null)
                    command += `KEYID=${this.keyid.toString()}`;
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