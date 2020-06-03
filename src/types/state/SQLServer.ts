import { BasicEntity } from "./BasicEntity";

export class SQLServer extends BasicEntity {
    ipaddresses: string[];
    sqlname: string;
    isAlias: boolean;
    isAlwayson: boolean;
    nodes: string[];
    databases: string[];

    constructor(props: any) {
        super(props);

        this.id = props.id;
        this.name = props.name;
        this.ipaddresses = props.ipaddresses;
        this.sqlname = props.sqlname;
        this.isAlias = props.isAlias;
        this.isAlwayson = props.isAlwayson;
        this.nodes = props.nodes;
        this.databases = props.databases;
    }
}