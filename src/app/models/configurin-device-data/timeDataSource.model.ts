
export class TimeDataSource {


    constructor(
        public id             :number,
        public parameterId    :string,
        public timesrc        :string
        
    ) { }

    get Command():string{
        let command = 'SET TIMESRC:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.timesrc !== null)
                    command += `TIMESRC=${this.timesrc.toUpperCase()}`;
                
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