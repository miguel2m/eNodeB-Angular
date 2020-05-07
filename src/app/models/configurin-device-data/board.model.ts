
export class Board {


    constructor(
        public id:number,
        public parameterId:string,
        public cn:number,
        public srn:number,
        public sn:number,
        public bt:string,
        public sbt:string,
        public bbws:string,
        public hce:string,
        public cpriex:string,
        public brdspec:string,
        public ccne:string,
    ) { }

    get Command():string{
        let command = 'ADD BRD:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.cn  !== null )
                    command += `CN=${this.cn.toString()},`;
                if(this.srn  !== null)
                    command += `SRN=${this.srn.toString()},`;
                if(this.sn  !== null)
                    command += `SN=${this.sn.toString()},`;
                if(this.bt)
                    command += `BT=${this.bt.toUpperCase()},`;
                if(this.sbt)
                    command += `SBT=${this.sbt.toUpperCase()},`; 
                if(this.bbws)
                    command += `BBWS=${this.bbws.toUpperCase()},`; 
                if(this.hce)
                    command += `HCE=${this.hce.toUpperCase()},`;
                if(this.cpriex)
                    command += `CPRIEX=${this.cpriex.toUpperCase()},`; 
                if(this.brdspec)
                    command += `BRDSPEC=${this.brdspec.toUpperCase()},`; 
                if(this.ccne)
                    command += `CCNE=${this.ccne.toUpperCase()}`;        
                command += ';'  
                break;
            case 'DELETE':
                command = `RMV BRD:CN=${this.cn?.toString()},SRN=${this.srn?.toString()},SN=${this.sn?.toString()};`;
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}