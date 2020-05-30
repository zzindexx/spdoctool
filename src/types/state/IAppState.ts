import { WebApplication } from "./WebApplication";
import { ContentDatabase } from "./ContentDatabase";
import { SPServer } from "./SPServer";
import { ServiceInstance } from "./ServiceInstance";
import { FarmSolution } from "./FarmSolution";
import { ApplicationPool } from "./ApplicationPool";
import { ServiceApplication } from "./ServiceApplication";
import { ServiceApplicationProxy } from "./ServiceApplicationProxy";
import { ServiceApplicationProxyGroup } from "./ServiceApplicationProxyGroup";
import { ServiceAccount } from "./ServiceAccount";
import { SiteCollection } from "./SiteCollection";
import { SQLServer } from "./SQLServer";

export interface IAppState {
    configurationUploaded: boolean;
    farmConfig: IFarmConfig;
    sqlConfig: ISQLConfig;
    spConfig: ISPConfig;
}

export interface IFarmConfig {
    configurationDatabaseName: string;
    configurationDatabaseServer: string;
    configurationDatabaseVersion: string;
    centralAdmin: ICentralAdminConfig;
    languagePacks: string[];
}

export interface ICentralAdminConfig {
    url: string;
    applicationPoolId: string;
    farmAdmins: IFarmAdmin[];
}

export interface IFarmAdmin {
    name: string;
    userName: string;
}

export interface ISPConfig {
    servers: SPServer[];
    serviceInstances: ServiceInstance[]
    webApplications: WebApplication[];
    contentDatabases: ContentDatabase[];
    farmSolutions: FarmSolution[];
    webApplicationPools: ApplicationPool[];
    serviceApplicationPools: ApplicationPool[];
    serviceApplications: ServiceApplication[];
    serviceApplicationProxies: ServiceApplicationProxy[];
    serviceApplicationProxyGroups: ServiceApplicationProxyGroup[];
    managedAccounts: ServiceAccount[];
    siteCollections: SiteCollection[];
}

export interface ISQLConfig {
    servers: SQLServer[];
}

