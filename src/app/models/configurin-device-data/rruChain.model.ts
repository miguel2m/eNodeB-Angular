
export class RruChain {


    constructor(
        public id:number,
        public parameterId:string,
        public rnc:number,
        public tt:string,
        public bm:string,
        public at:string,
        public hcn:number,
        public hsrn:number,
        public hsn:number,
        public hpn:number,
        public tcn:number,
        public tsrn:number,
        public tsn:number,
        public tpn:number,
        public cr:string,
        
    ) { }

    get Command():string{
        let command = 'ADD RRUCHAIN:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.rnc !== null)
                    command += `RNC=${this.rnc.toString()},`;
                if(this.tt)
                    command += `TT=${this.tt.toUpperCase()},`;
                if(this.bm)
                    command += `BM=${this.bm.toUpperCase()},`;
                if(this.at)
                    command += `AT=${this.at.toUpperCase()},`;
                if(this.hcn !== null)
                    command += `HCN=${this.hcn.toString()},`; 
                if(this.hsrn !== null)
                    command += `HSRN=${this.hsrn.toString()},`; 
                if(this.hsn !== null)
                    command += `HSN=${this.hsn.toString()},`;
                if(this.hpn !== null)
                    command += `HPN=${this.hpn.toString()},`;
                if(this.tcn !== null)
                    command += `TCN=${this.tcn.toString()},`; 
                if(this.tsrn !== null)
                    command += `TSRN=${this.tsrn.toString()},`; 
                if(this.tsn !== null)
                    command += `TSN=${this.tsn.toString()},`;
                if(this.tpn !== null)
                    command += `TPN=${this.tpn.toString()},`;  
                if(this.cr)
                    command += `CR=${this.cr.toUpperCase()}`;      
                command += ';'  
                break;
            case 'DELETE':
                command = `RMV RRUCHAIN:RCN=${this.rnc.toString()};`;
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}