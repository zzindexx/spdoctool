import { IWebApplication } from "./IWebApplication";

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
    servers: ISPServer[];
    serviceInstances: IServiceInstance[]
    webApplications: IWebApplication[];
    contentDatabases: IContentDatabase[];
    farmSolutions: IFarmSolution[];
    webApplicationPools: IApplicationPool[];
    serviceApplicationPools: IApplicationPool[];
    serviceApplications: IServiceApplication[];
    serviceApplicationProxies: IServiceApplicationProxy[];
    serviceApplicationProxyGroups: IServiceApplicationProxyGroup[];
    managedAccounts: IServiceAccount[];
    siteCollections: ISiteCollection[];
}

export interface IBasicEntity {
    id: string;
    name: string;
}

export interface ISQLConfig {
    servers: ISQLServer[];
}

interface IServer extends IBasicEntity {
    ipaddresses: string[];
}



export interface IContentDatabase extends IBasicEntity {
    server: string;
    currentSiteCount: number;
    maximumSiteCount: number;
    size: number;
    webApplicationId: string;
}

export interface ISPServer extends IServer {
    
}

export interface ISQLServer extends IServer {
    sqlname: string;
    isAlias: boolean;
    isAlwayson: boolean
    ipaddresses: string[];
    nodes: string[];
    databases: string[]
}

export interface IServiceInstance extends IBasicEntity {
    serversIds: string[]
}

export interface IFarmSolution extends IBasicEntity {
    deployed: boolean;
    deployedWebApplicationIds: string[];
    containsGlobalAssembly: boolean
    containsWebApplicationResource: boolean;
    globallydeployed: boolean;
}

export interface IApplicationPool extends IBasicEntity {
    accountId: string;
}

export interface IServiceApplication extends IBasicEntity {
    typeName: string;
    applicationPoolId: string;
    databaseServer?: string;
    databaseName?: string;
    properties?: any;
}

export interface IServiceApplicationProxy extends IBasicEntity {
    typeName: string;
    serviceApplicationId: string;
}

export interface IServiceApplicationProxyGroup extends IBasicEntity {
    proxies: string[];
}

export interface IServiceAccount extends IBasicEntity {
    autoChangePassword: boolean;
}

export interface ISiteCollection extends IBasicEntity {
    url: string;
    size: number;
    contentDatabaseId: string;
}