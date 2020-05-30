import { BasicEntity } from "./BasicEntity";
import { ApplicationPool } from "./ApplicationPool";
import { ISPConfig } from "./IAppState";

export class ServiceAccount extends BasicEntity {
    autoChangePassword: boolean;

    constructor(props: any) {
        super(props);
        this.autoChangePassword = props.autoChangePassword;
    }

    getViewModel(spConfig: ISPConfig): ServiceAccountViewModel {
        return {
            id: this.id,
            name: this.name,
            autoChangePassword: this.autoChangePassword,
            autoChangePasswordString: this.autoChangePassword ? 'Yes' : 'No',
            webApplicationPools: spConfig.webApplicationPools.filter((sap: ApplicationPool) => sap.accountId === this.id),
            serviceApplicationPools: spConfig.serviceApplicationPools.filter((sap: ApplicationPool) => sap.accountId === this.id)
        };
    }
}

export class ServiceAccountViewModel {
    id: string;
    name: string;
    autoChangePassword: boolean;
    autoChangePasswordString: string;
    webApplicationPools: ApplicationPool[];
    serviceApplicationPools: ApplicationPool[];
}