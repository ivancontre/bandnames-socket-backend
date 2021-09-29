import { v4 as uuid4} from 'uuid'


export default class Band {
    id: string;
    name: string;
    votes: number;

    constructor(name: string) {
        this.id = uuid4();
        this.name = name;
        this.votes = 0;
    }
}