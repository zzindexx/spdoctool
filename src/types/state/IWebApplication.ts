import { IBasicEntity } from "./IAppState";

export interface IWebApplication extends IBasicEntity {
    url: string;
    //port: number;
    //ssl: boolean;
    applicationPoolId: string;
    addresses: IWebApplicationAddress[];
    resourceThrottlingSettings: {
        listViewThreshold: number;
        listViewThresholdAdmins: number;
        maxLookupColumns: number;
    },
    identityProviders: IIdentityProvider[];
    policies: IWebApplicationPolicy[];
    managedPaths: IManagedPath[];
    outgoingEmailSettings: IWebApplicationOutgoinMailSettings;
    serviceApplicationProxyGroupId: string;
}

export interface IWebApplicationAddress {
    publicUrl: string;
    zone: string;
    incomingUrl: string;
}

export interface IIdentityProvider {
    zone: string;
    authentication: string;
    claimProviderName: string;
    allowAnonymous: boolean;
    disableKerberos: boolean;
    useWindowsIntegratedAuthentication: boolean;
}

export interface IWebApplicationPolicy {
    displayName: string;
    username: string;
    rights: string[];
}

export interface IManagedPath {
    name: string;
    type: 'ExplicitInclusion' | 'WildcardInclusion';
}

export interface IWebApplicationOutgoinMailSettings {
    smtpServer: string;
    smtpPort: number;
    senderAddress: string;
    replyToAddress: string;
    
}