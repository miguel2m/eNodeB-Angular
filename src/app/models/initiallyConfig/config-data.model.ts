export class ConfigData {

    constructor (
        public id :number,
        public ne :string,
        public ethernetPortNumber :string,
        public interfazIp :string,
        public maskIp :string,
        public nextHopIp :string,
        public nextHopVlan :string,
    ){}
}