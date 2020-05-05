
export class OperatorTrackingArea {


    constructor(
        public id:number,
        public parameterId:string,
        public trackingAreaId:number,
        public cnOperatorId:number,
        public tac:number
    ) { }

    get Command():string{
        let command = 'ADD CNOPERATORTA:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.trackingAreaId)
                    command += `TrackingAreaId=${this.trackingAreaId},`;
                if(this.cnOperatorId)
                    command += `CnOperatorId=${this.cnOperatorId},`;
                if(this.tac)
                    command += `Tac=${this.tac}`;        
                command += ';'  
                break;
            case 'DELETE':
                command = 'RMV CNOPERATORTA:TRACKINGAREAID='+this.trackingAreaId+';';
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}