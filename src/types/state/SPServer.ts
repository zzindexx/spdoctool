import { BasicEntity } from "./BasicEntity";

export class SPServer extends BasicEntity {
    ipaddresses: string[];

    constructor(props: any) {
        super(props);
        this.ipaddresses = props.ipaddresses;
    }
}