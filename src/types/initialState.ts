import { IAppState } from "./state/IAppState";

export const initialState: IAppState = {
    configurationUploaded: false,
    sqlConfig: {
        servers: []
    },
    spConfig: {
        servers: [],
        farmSolutions: [],
        managedAccounts: [],
        webApplicationPools: [],
        serviceApplicationPools: [],
        serviceApplicationProxies: [],
        webApplications: [],
        contentDatabases: [],
        siteCollections: [],
        serviceApplications: [],
        serviceApplicationProxyGroups: [],
        serviceInstances: []
    },
    farmConfig: {
        configurationDatabaseName: null,
        configurationDatabaseServer: null,
        configurationDatabaseVersion: null,
        centralAdmin: {
            applicationPoolId: null,
            farmAdmins: [],
            url: ''
        },
        languagePacks: []
    }
}