import * as React from 'react';
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import { ISPConfig, ISiteCollection, IContentDatabase } from '../../../../types/state/IAppState';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { ApplicationPoolsDetails, ApplicationPoolsTable } from '../ApplicationPools/ApplicationPools';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { IWebApplication } from '../../../../types/state/IWebApplication';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

export const SiteCollections = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:siteCollectionId`}>
                <SiteCollectionsDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='List of site collections' />
                <ErrorBoundary>
                    <SiteCollectionsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const SiteCollectionsTable = (props: ISPConfig) => {
    const collection: any[] = props.siteCollections.map((sc: ISiteCollection) => {
        const contentDatabase: IContentDatabase = props.contentDatabases.find((cd: IContentDatabase) => cd.id === sc.contentDatabaseId);

        return {
            id: sc.id,
            name: sc.name,
            size: sc.size < 1073741824 ? `${(sc.size / 1024 / 1024).toFixed(2)} Mb` : `${(sc.size / 1024 / 1024 / 1024).toFixed(2)} Gb`,
            contentDatabase: contentDatabase,
            url: sc.url
        }
    });
    return (
        <React.Fragment>
            <DetailsTable title="Site collections" collection={collection} columns={[
                { name: 'id', title: '', show: false, isLink: false },
                { name: 'name', title: '', show: false, isLink: false },
                { name: 'url', title: 'Url', show: true, isLink: true, linkPath: '/sitecollections' },
                { name: 'contentDatabase', title: 'Content database', show: true, isLink: true, linkPath: '/contentdatabases' },
                { name: 'size', title: 'Size', show: true, isLink: false }
            ]} />
        </React.Fragment>
    );
};

export const SiteCollectionsDetails = (props: ISPConfig) => {
    let { siteCollectionId } = useParams();
    const siteCollection: ISiteCollection = props.siteCollections.find((sc: ISiteCollection) => sc.id === siteCollectionId);

    const contentDatabase: IContentDatabase = props.contentDatabases.find((cd: IContentDatabase) => cd.id === siteCollection.contentDatabaseId);
    const webApplication: IWebApplication = props.webApplications.find((wa: IWebApplication) => wa.id === contentDatabase.webApplicationId);

    const siteCollectionViewModel = {
        id: siteCollection.id,
        name: siteCollection.name,
        size: siteCollection.size < 1073741824 ? `${(siteCollection.size / 1024 / 1024).toFixed(2)} Mb` : `${(siteCollection.size / 1024 / 1024 / 1024).toFixed(2)} Gb`,
        contentDatabase: contentDatabase,
        webapp: webApplication,
        url: siteCollection.url
    }

    return (
        <React.Fragment>
            <ObjectDetails
                object={siteCollectionViewModel}
                backLinkTitle="List of site collections"
                backLinkUrl="/sitecollections"
                title="Site collection"
                rows={[
                    { rowTitle: 'Site collection Id', rowProperty: 'id' },
                    { rowTitle: 'Site collection name', rowProperty: 'name' },
                    { rowTitle: 'Url', rowProperty: 'url' },
                    { rowTitle: 'Size in Gb', rowProperty: 'size' },
                    { rowTitle: 'Content database', rowProperty: 'contentDatabase', linkUrl: '/contentdatabases/{id}' },
                    { rowTitle: 'Web applications', rowProperty: 'webapp', linkUrl: '/webapplications/{id}' }
                ]}
            />
        </React.Fragment>
    );
};