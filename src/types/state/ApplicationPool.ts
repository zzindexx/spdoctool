import { BasicEntity } from "./BasicEntity";
import { ServiceAccount } from "./ServiceAccount";
import { ISPConfig } from "./IAppState";
import { ServiceApplication } from "./ServiceApplication";
import { WebApplication } from "./WebApplication";

export class ApplicationPool extends BasicEntity {
    accountId: string;

    constructor(props: any) {
        super(props);
        this.accountId = props.accountId; 
    }

    getViewModel(spConfig: ISPConfig): ApplicationPoolViewModel {
        return {
            id: this.id,
            name: this.name,
            account: spConfig.managedAccounts.find((sa: ServiceAccount) => sa.id === this.accountId),
            webApplications: spConfig.webApplications.filter((wap: WebApplication) => wap.applicationPoolId === this.id),
            serviceApplications: spConfig.serviceApplications.filter((sa: ServiceApplication) => sa.applicationPoolId === this.id)
        };
    }
}

export class ApplicationPoolViewModel {
    id: string;
    name: string;
    account: ServiceAccount;
    serviceApplications: ServiceApplication[];
    webApplications: WebApplication[];
}