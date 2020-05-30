import { BasicEntity } from "./BasicEntity";
import { WebApplication } from "./WebApplication";
import { ISPConfig } from "./IAppState";


export class FarmSolution extends BasicEntity {
    deployed: boolean;
    deployedWebApplicationIds: string[];
    containsGlobalAssembly: boolean
    containsWebApplicationResource: boolean;
    globallydeployed: boolean;

    constructor(props: any) {
        super(props);
        this.deployed = props.deployed;
        this.deployedWebApplicationIds = props.deployedWebApplicationIds;
        this.containsGlobalAssembly = props.containsGlobalAssembly;
        this.containsWebApplicationResource = props.containsWebApplicationResource;
        this.globallydeployed = props.globallydeployed;
    }

    getViewModel(spConfig: ISPConfig): FarmSolutionViewModel {
        return {
            id: this.id,
            name: this.name,
            deployed: this.deployed,
            globallydeployed: this.globallydeployed,
            deployedWebApplications: spConfig.webApplications.filter((wa: WebApplication) => this.deployedWebApplicationIds.includes(wa.id))
        }
    }
}

export class FarmSolutionViewModel {
    id: string;
    name: string;
    deployed: boolean;
    globallydeployed: boolean;
    deployedWebApplications: WebApplication[];
}