
export class NeMaintenaceMode {


    constructor(
        public id:number,
        public parameterId:string,
        public mntMode:string,
        public st:number,
        public et:number,
        public mmSetRemark:string
    ) { }

    get Command():string{
        let command = 'SET MNTMODE:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.mntMode)
                    command += `MNTMODE=${this.mntMode.toUpperCase()},`;
                if(this.st !== null)
                    command += `ST=${this.st},`;
                if(this.et !== null)
                    command += `ET=${this.et},`;
                if(this.mmSetRemark)
                    command += `MMSETREMARK="${this.mmSetRemark.toUpperCase()}"`;
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV MNTMODE:MNTMODE='+this.mntMode.toUpperCase()+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}