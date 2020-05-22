import * as React from 'react';
import { ISPConfig, IContentDatabase, ISiteCollection } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { IWebApplication } from '../../../../types/state/IWebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

export const ContentDatabasesCompact = (props: ISPConfig) => {
    return <CardList title="Content databases" headerLink="/contentdatabases" collection={props.contentDatabases} idField="id" displayField="name" />;
}

export const ContentDatabasesTable = (props: ISPConfig) => {
    const contentDatabasesViewModel: any[] = props.contentDatabases.map((cd: IContentDatabase) => {
        return {
            id: cd.id,
            name: cd.name,
            size: (cd.size / 1024 / 1024 / 1024).toFixed(2),
            siteCollectionCount: props.siteCollections.filter((sc: ISiteCollection) => sc.contentDatabaseId === cd.id).length,
            webapp: props.webApplications.find((wa: IWebApplication) => wa.id === cd.webApplicationId)
        }
    });
    return (
        <React.Fragment>
            <DetailsTable title="List of content databases" collection={contentDatabasesViewModel} columns={[
                { name: 'id', title: 'Id', show: false, isLink: false },
                { name: 'name', title: 'Database name', show: true, isLink: true, linkPath: "/contentdatabases" },
                { name: 'webapp', title: 'Web application', show: true, isLink: true, linkPath: '/webapplications' },
                { name: 'size', title: 'Size in Gb', show: true, isLink: false },
                { name: 'siteCollectionCount', title: 'Number of site collections', show: true, isLink: false }
            ]} />
        </React.Fragment>
    );
}

export const ContentDatabasesDetails = (props: ISPConfig) => {
    const { contentDatabaseId } = useParams();
    const contentDatabase: IContentDatabase = props.contentDatabases.find((cd: IContentDatabase) => cd.id === contentDatabaseId);

    const contentDatabaseViewModel: any = {
        id: contentDatabase.id,
        name: contentDatabase.name,
        size: (contentDatabase.size / 1024 / 1024 / 1024).toFixed(2),
        server: contentDatabase.server,
        webapp: props.webApplications.find((wa: IWebApplication) => wa.id === contentDatabase.webApplicationId),
        numberOfSites: props.siteCollections.filter((sc: ISiteCollection) => sc.contentDatabaseId === contentDatabaseId).length
    }

    const siteCollections = props.siteCollections.filter((sc: ISiteCollection) => sc.contentDatabaseId === contentDatabaseId).map((sc: ISiteCollection) => {
        return {
            id: sc.id,
            name: sc.name,
            size: sc.size < 1073741824 ? `${(sc.size / 1024 / 1024).toFixed(2)} Mb` : `${(sc.size / 1024 / 1024 / 1024).toFixed(2)} Gb`,
            url: sc.url
        }
    });

    return <React.Fragment>
        <ObjectDetails
            object={contentDatabaseViewModel}
            backLinkTitle="List of content databases"
            backLinkUrl="/contentdatabases"
            title="Content database"
            rows={[
                { rowTitle: 'Id', rowProperty: 'id' },
                { rowTitle: 'Content databse name', rowProperty: 'name' },
                { rowTitle: 'Web application', rowProperty: 'webapp', linkUrl: '/webapplications/{id}' },
                { rowTitle: 'Size in Gb', rowProperty: 'size' },
                { rowTitle: 'Number of site collections', rowProperty: 'numberOfSites' }
            ]} />
        <div className="row">
            <div className="col">
                <DetailsTable title="Site collections in database" collection={siteCollections} columns={[
                    { name: 'id', title: '', show: false, isLink: false },
                    { name: 'name', title: '', show: false, isLink: false },
                    { name: 'url', title: 'URL', show: true, isLink: true, linkPath: '/sitecollections' },
                    { name: 'size', title: 'Size in Gb', show: true, isLink: false }
                ]} />
            </div>
        </div>
    </React.Fragment>;
}

export const ContentDatabases = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:contentDatabaseId`}>
                <ErrorBoundary><ContentDatabasesDetails {...props} /></ErrorBoundary>
            </Route>
            <Route path={match.path}>
                <PageHeader title='Content databases' />
                <ErrorBoundary>
                    <ContentDatabasesTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}