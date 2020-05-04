
export class LocationInformation {


    constructor(
        public id:number,
        public parameterId:string,
        public locationName:string,
        public gcdf:string,
        public latitudeGFormat:string,
        public longitudeGFormat:string,
        public latitudeSecFormat:string,
        public longitudeSecFormat:string,
        public locationId:string,
        public altitude:string,
        public range:string,
        public city:string,
        public region:string,
        public address:string,
        public office:string,
        public contact:string,
        public telephone:string,
        public userLabel:string,
        public precise:string,
    ) { }

    get Command():string{
        let command = 'ADD LOCATION:';
        switch (this.parameterId) {
            case 'CREATE':
                if(this.locationName)
                    command += `LOCATIONNAME="${this.locationName.toUpperCase()}",`;
                if(this.gcdf)
                    command += `GCDF=${this.gcdf.toUpperCase()},`;
                if(this.latitudeGFormat)
                    command += `LATITUDEDEGFORMAT=${this.latitudeGFormat},`;
                if(this.longitudeGFormat)
                    command += `LONGITUDEDEGFORMAT=${this.longitudeGFormat},`;
                if(this.latitudeSecFormat)
                    command += `LATITUDESECFORMAT=${this.latitudeSecFormat},`;
                if(this.longitudeSecFormat)
                    command += `LONGITUDESECFORMAT=${this.longitudeSecFormat},`; 
                if(this.locationId)
                    command += `LOCATIONID=${this.locationId},`;
                if(this.altitude)
                    command += `ALTITUDE=${this.altitude},`;
                if(this.range)
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
                if(this.precise)
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