import { BasicEntity } from "./BasicEntity";

export class ServiceInstance extends BasicEntity {
    serversIds: string[];

    constructor(props: any) {
        super(props);
        this.serversIds = props.serversIds;
    }
}