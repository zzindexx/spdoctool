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

        this.ipaddresses = props.ipaddresses;
        this.sqlname = props.sqlname;
        this.isAlias = props.isAlias;
        this.isAlwayson = props.isAlwayson;
        this.nodes = props.nodes;
        this.databases = props.databases;
    }

    public get databaseCount(): number {
        return this.databases.length;
    }

    public get ipaddressesString(): string {
        return this.ipaddresses.join(', ');
    }
 }