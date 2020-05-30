import { ISPConfig } from "./IAppState";
import { WebApplication } from "./WebApplication";
import { BasicEntity } from "./BasicEntity";
import { SiteCollection, SiteCollectionViewModel } from "./SiteCollection";

export class ContentDatabase extends BasicEntity {
    server: string;
    currentSiteCount: number;
    maximumSiteCount: number;
    size: number;
    webApplicationId: string;

    constructor(props: any) {
        super(props);
        this.server = props.server;
        this.currentSiteCount = props.currentSiteCount;
        this.maximumSiteCount = props.maximumSiteCount;
        this.size = props.size;
        this.webApplicationId = props.webApplicationId;
    }

    public get sizeString(): string {
        return this.size < 1073741824 ? `${(this.size / 1024 / 1024).toFixed(2)} Mb` : `${(this.size / 1024 / 1024 / 1024).toFixed(2)} Gb`;
    }

    getViewModel(spConfig: ISPConfig): ContentDatabaseViewModel {
        const siteCollections: SiteCollection[] = spConfig.siteCollections.filter((sc: SiteCollection) => sc.contentDatabaseId === this.id);
        return {
            id: this.id,
            name: this.name,
            size: this.size,
            server: this.server,
            sizeString: this.sizeString,
            siteCollections: siteCollections,
            siteCollectionCount: siteCollections.length,
            webApplication: spConfig.webApplications.find((wa: WebApplication) => wa.id === this.webApplicationId)
        }
    }
}

export class ContentDatabaseViewModel extends BasicEntity {
    id: string;
    name: string;
    size: number;
    server: string;
    sizeString: string;
    siteCollections: SiteCollection[];
    siteCollectionCount: number;
    webApplication: WebApplication;
}