import { BasicEntity } from "./BasicEntity";
import { ServiceApplication, ServiceApplicationViewModel } from "./ServiceApplication";
import { ISPConfig } from "./IAppState";
import { WebApplication } from "./WebApplication";
import { ServiceApplicationProxy } from "./ServiceApplicationProxy";

export class ServiceApplicationProxyGroup extends BasicEntity {
    proxies: string[];

    constructor(props: any) {
        super(props);
        this.proxies = props.proxies;
    }

    getViewModel(spConfig: ISPConfig): ServiceApplicationProxyGroupViewModel {
        const serviceApplicationsIds: string[] = spConfig.serviceApplicationProxies.filter((sap: ServiceApplicationProxy) => this.proxies.includes(sap.id)).map((sap: ServiceApplicationProxy) => sap.serviceApplicationId);
        return {
            id: this.id,
            name: this.name === "" ? "[default]" : this.name,
            proxies: this.proxies,
            numberOfProxies: this.proxies.length,
            serviceApplications: spConfig.serviceApplications.filter((sa: ServiceApplication) => serviceApplicationsIds.includes(sa.id)).map((sa: ServiceApplication) => sa.getViewModel(spConfig)),
            webApplications: spConfig.webApplications.filter((wa: WebApplication) => wa.serviceApplicationProxyGroupId === this.id)
        }
    }
}

export class ServiceApplicationProxyGroupViewModel {
    id: string;
    name: string;
    proxies: string[];
    numberOfProxies: number;
    serviceApplications: ServiceApplicationViewModel[];
    webApplications: WebApplication[];
}