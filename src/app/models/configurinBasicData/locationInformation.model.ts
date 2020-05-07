
export class LocationInformation {


    constructor(
        public id:number,
        public parameterId:string,
        public locationName:string,
        public gcdf:string,
        public latitudeGFormat:number,
        public longitudeGFormat:number,
        public latitudeSecFormat:number,
        public longitudeSecFormat:number,
        public locationId:number,
        public altitude:number,
        public range:number,
        public city:string,
        public region:string,
        public address:string,
        public office:string,
        public contact:string,
        public telephone:string,
        public userLabel:string,
        public precise:number,
    ) { }

    get Command():string{
        let command = 'ADD LOCATION:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.locationName)
                    command += `LOCATIONNAME="${this.locationName.toUpperCase()}",`;
                if(this.gcdf )
                    command += `GCDF=${this.gcdf.toUpperCase()},`;
                if(this.latitudeGFormat !== null)
                    command += `LATITUDEDEGFORMAT=${this.latitudeGFormat},`;
                if(this.longitudeGFormat !== null)
                    command += `LONGITUDEDEGFORMAT=${this.longitudeGFormat},`;
                if(this.latitudeSecFormat)
                    command += `LATITUDESECFORMAT=${this.latitudeSecFormat},`;
                if(this.longitudeSecFormat !== null)
                    command += `LONGITUDESECFORMAT=${this.longitudeSecFormat},`; 
                if(this.locationId !== null)
                    command += `LOCATIONID=${this.locationId},`;
                if(this.altitude !== null)
                    command += `ALTITUDE=${this.altitude},`;
                if(this.range !== null)
                    command += `RANGE=${this.range},`;
                if(this.city)
                    command += `CITY="${this.city.toUpperCase()}",`;
                if(this.region)
                    command += `REGION="${this.region.toUpperCase()}",`;
                if(this.address)
                    command += `ADDRESS="${this.address.toUpperCase()}",`;
                if(this.office)
                    command += `OFFICE="${this.office.toUpperCase()}",`;
                if(this.office)
                    command += `OFFICE="${this.office.toUpperCase()}",`;
                if(this.telephone)
                    command += `TELEPHONE="${this.telephone.toUpperCase()}",`;
                if(this.userLabel)
                    command += `USERLABEL="${this.userLabel.toUpperCase()}",`;
                if(this.precise !== null)
                    command += `PRECISE=${this.precise}`;              
                command += ';'  
                break;
            case 'DELETE':
                command = `RMV LOCATION:LOCATIONNAME="${this.locationName.toUpperCase()}";`;
                break;
            default:
                command = '//';
                break;
        }
        return command;
    }
}