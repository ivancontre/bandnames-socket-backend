import { v4 as uuid4} from 'uuid'
import Band from './band'


export default class BandList {
    private bands: Band[];

    constructor() {
        this.bands = [
            new Band('Linkin Park'),
            new Band('Slipknot'),
            new Band('The Cure')
        ]
    }

    addBand(name: string) {
        const band = new Band(name);
        this.bands = [...this.bands, band];
        return this.bands;
    }

    removeBand(id: string) {
        this.bands = this.bands.filter((band: Band) => band.id !== id);
    }

    getBands() {
        return this.bands;
    }

    increaseVotes(id: string) {
        return this.bands.map((band: Band) => {
            if (band.id === id) {
                band.votes += 1;
            }

            return band;
        })
    }

    changeBandName(id: string, name: string) {
        return this.bands.map((band: Band) => {
            if (band.id === id) {
                band.name = name;
            }

            return band;
        })
    }

}