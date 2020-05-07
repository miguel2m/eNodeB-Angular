
export class TimeDataTz {


    constructor(
        public id             :number,
        public parameterId    :string,
        public zonet          :string,
        public timediff       :string,
        public dst            :string,
        public sm             :string,
        public smonth         :string,
        public sday           :string,
        public swseq          :string,
        public sweek          :string,
        public st             :string,
        public em             :string,
        public emonth         :string,
        public eday           :string,
        public ewseq          :string,
        public eweek          :string,
        public et             :string,
        public to             :string
        
    ) { }

    get Command():string{
        let command = 'SET TZ:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.zonet !== null)
                    command += `ZONET=${this.zonet.toUpperCase()},`;
                if(this.timediff!== null)
                    command += `TIMEDIFF=${this.timediff.toUpperCase()},`;
                if(this.dst!== null)
                    command += `DST=${this.dst.toUpperCase()},`;
                if(this.sm)
                    command += `SM=${this.sm.toUpperCase()},`;
                if(this.smonth !== null)
                    command += `SMONTH=${this.smonth.toString()},`; 
                if(this.sday !== null)
                    command += `SDAY=${this.sday.toString()},`; 
                if(this.swseq)
                    command += `SWSEQ=${this.swseq.toString()},`;
                if(this.sweek)
                    command += `SWEEK=${this.sweek.toString()},`;
                if(this.st !== null)
                    command += `ST=${this.st.toUpperCase()},`; 
                if(this.em !== null)
                    command += `EM=${this.em.toString()},`; 
                if(this.emonth !== null)
                    command += `EMOTH=${this.emonth.toString()},`;
                if(this.eday!== null)
                    command += `EDAY=${this.eday.toString()},`;
                if(this.ewseq !== null)
                    command += `EWSEQ=${this.ewseq.toString()},`;
                if(this.eweek !== null)
                    command += `EWEEK=${this.eweek.toString()},`;
                if(this.et !== null)
                    command += `ET=${this.et.toString()},`;
                if(this.to !== null)
                    command += `TO=${this.to.toString()}`;
                command += ';'  
                break;
            case 'DELETE':
                command = `RMV `;
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}