export class IpNodebRelated{

    constructor(
        public id :number,
        public m2000IpAddr: string,
        public sgwNameId: string,
        public sgwIp: string[],
        public mmeName: string,
        public mmeIp: string[],
        public ipClockServer: string,
        public nextHoopClockServer: string,
        public nextHoopVlanClockServer: string,
    ){}
}