
export class Rru {


    constructor(
        public id             :number,
        public parameterId    :string,
        public cn             :number,
        public srn            :number,
        public sn             :number,
        public tp             :string,
        public rnc            :number,
        public ps             :number,
        public rt             :string,
        public rs             :string,
        public rn             :string,
        public rxnum          :number,
        public txnum          :number,
        public almprocsw      :string,
        public almprocthrhld  :number,
        public almthrhld      :number,
        public ifoffset       :number,
        public rfds           :number,
        public lcpsw          :string,
        public flag           :string,
        public ruspec         :string,
        public paeffswitch    :string
    ) { }

    get Command():string{
        let command = 'ADD RRU:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.cn !== null)
                    command += `CN=${this.cn.toString()},`;
                if(this.srn!== null)
                    command += `SRN=${this.srn.toString()},`;
                if(this.sn!== null)
                    command += `SN=${this.sn.toString()},`;
                if(this.tp)
                    command += `TP=${this.tp.toUpperCase()},`;
                if(this.rnc !== null)
                    command += `RNC=${this.rnc.toString()},`; 
                if(this.ps !== null)
                    command += `PS=${this.ps.toString()},`; 
                if(this.rt)
                    command += `RT=${this.rt.toUpperCase()},`;
                if(this.rs)
                    command += `RS=${this.rs.toUpperCase()},`;
                if(this.rn !== null)
                    command += `RN=${this.rn.toString()},`; 
                if(this.rxnum !== null)
                    command += `RXNUM=${this.rxnum.toString()},`; 
                if(this.txnum !== null)
                    command += `TXNUM=${this.txnum.toString()},`;
                if(this.almprocsw)
                    command += `ALMPROCSW=${this.almprocsw.toUpperCase()},`;
                if(this.almprocthrhld !== null)
                    command += `ALMPROCTHRHLD=${this.almprocthrhld.toString()},`;
                if(this.almthrhld !== null)
                    command += `ALMTHRHLD=${this.almthrhld.toString()},`;
                if(this.ifoffset !== null)
                    command += `IFOFFSET=${this.ifoffset.toString()},`;
                if(this.rfds !== null)
                    command += `RFDS=${this.rfds.toString()},`;
                if(this.lcpsw)
                    command += `LCPSW=${this.lcpsw.toUpperCase()},`;
                if(this.flag)
                    command += `FLAG=${this.flag.toUpperCase()},`;   
                if(this.ruspec)
                    command += `RUSPEC=${this.ruspec.toUpperCase()},`;
                if(this.paeffswitch)
                    command += `PAEFFSWITCH=${this.paeffswitch.toUpperCase()},`; 
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