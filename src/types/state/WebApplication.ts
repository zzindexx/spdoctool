import { ISPConfig } from "./IAppState";
import { BasicEntity } from "./BasicEntity";
import { SiteCollection, SiteCollectionViewModel } from "./SiteCollection";
import { ContentDatabase, ContentDatabaseViewModel } from "./ContentDatabase";
import { ApplicationPool, ApplicationPoolViewModel } from "./ApplicationPool";
import { ServiceAccount } from "./ServiceAccount";
import { ServiceApplicationProxyGroup } from "./ServiceApplicationProxyGroup";
import { FarmSolution } from "./FarmSolution";

export class WebApplication extends BasicEntity {
    url: string;
    applicationPoolId: string;
    addresses: IWebApplicationAddress[];
    resourceThrottlingSettings: {
        listViewThreshold: number;
        listViewThresholdAdmins: number;
        maxLookupColumns: number;
    };
    identityProviders: IIdentityProvider[];
    policies: IWebApplicationPolicy[];
    managedPaths: IManagedPath[];
    outgoingEmailSettings: IWebApplicationOutgoinMailSettings;
    serviceApplicationProxyGroupId: string;

    constructor(props: any) {
        super(props);
        this.url = props.url;
        this.applicationPoolId = props.applicationPoolId;
        this.addresses = props.addresses;
        this.resourceThrottlingSettings = {
            listViewThreshold: props.resourceThrottlingSettings.listViewThreshold,
            listViewThresholdAdmins: props.resourceThrottlingSettings.listViewThresholdAdmins,
            maxLookupColumns: props.resourceThrottlingSettings.maxLookupColumns
        };
        this.identityProviders = props.identityProviders;
        this.policies = props.policies;
        this.managedPaths = props.managedPaths;
        this.outgoingEmailSettings = props.outgoingEmailSettings;
        this.serviceApplicationProxyGroupId = props.serviceApplicationProxyGroupId;
    }
    

    getViewModel(spConfig: ISPConfig): WebApplicationViewModel {
        const contentDatabases = spConfig.contentDatabases.filter((cd: ContentDatabase) => cd.webApplicationId === this.id).map((cd: ContentDatabase) => cd.getViewModel(spConfig));
        const siteCollections = spConfig.siteCollections.filter((sc: SiteCollection) => contentDatabases.map((cd: ContentDatabaseViewModel) => cd.id).includes(sc.contentDatabaseId)).map((sc: SiteCollection) => sc.getViewModel(spConfig))
        const applicationPool = spConfig.webApplicationPools.find((wap: ApplicationPool) => wap.id === this.applicationPoolId).getViewModel(spConfig);
        const totalSize: number = contentDatabases.map((cd: ContentDatabaseViewModel) => cd.size).reduce((totalSize, dbSize) => totalSize + dbSize);
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            addresses: this.addresses,
            resourceThrottlingSettings: this.resourceThrottlingSettings,
            identityProviders: this.identityProviders,
            policies: this.policies,
            managedPaths: this.managedPaths,
            outgoingEmailSettings: this.outgoingEmailSettings,
            applicationPool: applicationPool,
            applicationPoolAccount: applicationPool.account,
            serviceApplicationProxyGroup: spConfig.serviceApplicationProxyGroups.find((sapg: ServiceApplicationProxyGroup) => sapg.id === this.serviceApplicationProxyGroupId),
            contentDatabases: contentDatabases,
            siteCollections: siteCollections,
            siteColNum: siteCollections.length,
            farmSolutions: spConfig.farmSolutions.filter((fs: FarmSolution) => fs.deployedWebApplicationIds.includes(this.id)),
            totalSize: totalSize,
            totalSizeString: totalSize < 1073741824 ? `${(totalSize / 1024 / 1024).toFixed(2)} Mb` : `${(totalSize / 1024 / 1024 / 1024).toFixed(2)} Gb`
        };
    }
}

export class WebApplicationViewModel {
    id: string;
    name: string;
    url: string;
    addresses: IWebApplicationAddress[];
    resourceThrottlingSettings: {
        listViewThreshold: number;
        listViewThresholdAdmins: number;
        maxLookupColumns: number;
    }
    identityProviders: IIdentityProvider[];
    policies: IWebApplicationPolicy[];
    managedPaths: IManagedPath[];
    outgoingEmailSettings: IWebApplicationOutgoinMailSettings;
    serviceApplicationProxyGroup: ServiceApplicationProxyGroup;
    
    applicationPool: ApplicationPoolViewModel;
    applicationPoolAccount: ServiceAccount;

    contentDatabases: ContentDatabaseViewModel[];
    siteCollections: SiteCollectionViewModel[];
    siteColNum: number;

    farmSolutions: FarmSolution[];
    totalSize: number;
    totalSizeString: string;
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