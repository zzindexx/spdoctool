import { BasicEntity } from "./BasicEntity";
import { ContentDatabase } from "./ContentDatabase";
import { ISPConfig } from "./IAppState";
import { ConsumerProps } from "react";
import { WebApplication } from "./WebApplication";

export class SiteCollection extends BasicEntity {
    url: string;
    size: number;
    contentDatabaseId: string;
    owner: string;
    ownerLoginName: string;
    compatibilityLevel: number;
    siteTemplate: string;


    constructor(props: any) {
        super(props);

        this.url = props.url;
        this.size = props.size;
        this.contentDatabaseId = props.contentDatabaseId;
        this.owner = props.owner;
        this.compatibilityLevel = props.compatibilityLevel;
        this.siteTemplate = props.siteTemplate;
    }

    public get sizeString(): string {
        return this.size < 1073741824 ? `${(this.size / 1024 / 1024).toFixed(2)} Mb` : `${(this.size / 1024 / 1024 / 1024).toFixed(2)} Gb`;
    }

    getViewModel(spConfig: ISPConfig): SiteCollectionViewModel {
        const contentDatabase: ContentDatabase = spConfig.contentDatabases.find((cs: ContentDatabase) => cs.id === this.contentDatabaseId);
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            size: this.size,
            sizeString: this.sizeString,
            contentDatabase: contentDatabase,
            webApplication: contentDatabase.getViewModel(spConfig).webApplication,
            owner: this.owner,
            ownerLoginName: this.ownerLoginName,
            compatibilityLevel: this.compatibilityLevel,
            siteTemplate: this.siteTemplate
        };
    }
}

export class SiteCollectionViewModel {
    id: string;
    name: string;
    url: string;
    size: number;
    sizeString: string;
    contentDatabase: ContentDatabase;
    webApplication: WebApplication;
    owner: string;
    ownerLoginName: string;
    compatibilityLevel: number;
    siteTemplate: string;
}