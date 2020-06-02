import * as React from 'react';
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom';
import { ISPConfig } from '../../../../types/state/IAppState';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
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
                { name: 'url', title: 'Url',  linkPath: '/sitecollections', sortable: true },
                { name: 'contentDatabase', title: 'Content database', linkPath: '/contentdatabases', sortable: true },
                { name: 'sizeString', title: 'Size', sortable: true, sortPropertyName: 'size' }
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