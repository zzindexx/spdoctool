import * as React from 'react';
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import { ISPConfig } from '../../../../types/state/IAppState';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { ApplicationPoolsDetails, ApplicationPoolsTable } from '../ApplicationPools/ApplicationPools';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { WebApplication } from '../../../../types/state/WebApplication';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ContentDatabase } from '../../../../types/state/ContentDatabase';
import { SiteCollection, SiteCollectionViewModel } from '../../../../types/state/SiteCollection';

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
    const collection: SiteCollectionViewModel[] = props.siteCollections.map((sc: SiteCollection) => sc.getViewModel(props));
    return (
        <React.Fragment>
            <DetailsTable title="Site collections" collection={collection} columns={[
                { name: 'id', title: '', show: false, isLink: false },
                { name: 'name', title: '', show: false, isLink: false },
                { name: 'url', title: 'Url', show: true, isLink: true, linkPath: '/sitecollections' },
                { name: 'contentDatabase', title: 'Content database', show: true, isLink: true, linkPath: '/contentdatabases' },
                { name: 'sizeString', title: 'Size', show: true, isLink: false }
            ]} />
        </React.Fragment>
    );
};

export const SiteCollectionsDetails = (props: ISPConfig) => {
    let { siteCollectionId } = useParams();
    const siteCollection: SiteCollectionViewModel = props.siteCollections.find((sc: SiteCollection) => sc.id === siteCollectionId).getViewModel(props);

    return (
        <React.Fragment>
            <ObjectDetails
                object={siteCollection}
                backLinkTitle="List of site collections"
                backLinkUrl="/sitecollections"
                title="Site collection"
                rows={[
                    { rowTitle: 'Site collection Id', rowProperty: 'id' },
                    { rowTitle: 'Site collection name', rowProperty: 'name' },
                    { rowTitle: 'Url', rowProperty: 'url' },
                    { rowTitle: 'Size', rowProperty: 'sizeString' },
                    { rowTitle: 'Content database', rowProperty: 'contentDatabase', linkUrl: '/contentdatabases/{id}' },
                    { rowTitle: 'Web application', rowProperty: 'webApplication', linkUrl: '/webapplications/{id}' }
                ]}
            />
        </React.Fragment>
    );
};