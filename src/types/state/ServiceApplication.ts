import { BasicEntity } from "./BasicEntity";
import { ISPConfig } from "./IAppState";
import { ServiceApplicationProxy } from "./ServiceApplicationProxy";
import { ApplicationPool } from "./ApplicationPool";

export class ServiceApplication extends BasicEntity {
    typeName: string;
    applicationPoolId: string;
    databaseServer?: string;
    databaseName?: string;
    properties?: any;

    constructor(props: any) {
        super(props);
        this.typeName = props.typeName;
        this.applicationPoolId = props.applicationPoolId;
        this.databaseServer = props.databaseServer;
        this.databaseName = props.databaseName;
        this.properties = props.properties;
    }

    getViewModel(spConfig: ISPConfig): ServiceApplicationViewModel {
        return {
            id: this.id,
            name: this.name,
            typeName: this.typeName,
            applicationPool: spConfig.serviceApplicationPools.find((sap: ApplicationPool) => sap.id === this.applicationPoolId),
            databaseServer: this.databaseServer,
            databaseName: this.databaseName,
            properties: this.properties,
            proxyName: spConfig.serviceApplicationProxies.find((sap: ServiceApplicationProxy) => sap.serviceApplicationId === this.id).name
        }
    }
}

export class ServiceApplicationViewModel {
    id: string;
    name: string;
    typeName: string;
    applicationPool: ApplicationPool;
    databaseServer?: string;
    databaseName?: string;
    properties?: any;
    proxyName: string;
}