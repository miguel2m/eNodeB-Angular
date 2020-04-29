export class Dchpsw {

    constructor(
        public id :number,
        public parameterId : string,
        public switchDchpsw :string,
        public vlanScansw :string   
    ){}

    get Command():string{
        let command = 'SET DHCPSW:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.switchDchpsw)
                    command += `SWITCH=${this.switchDchpsw},`;
                if(this.vlanScansw)
                    command += `VLANSCANSW=${this.vlanScansw}`;
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