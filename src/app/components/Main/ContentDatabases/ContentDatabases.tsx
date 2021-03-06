import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { ContentDatabase, ContentDatabaseViewModel } from '../../../../types/state/ContentDatabase';
import { ISPConfig } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';

export const ContentDatabasesCompact = (props: ISPConfig) => {
    return <CardList title="Content databases" headerLink="/contentdatabases" collection={props.contentDatabases} />;
}

export const ContentDatabasesTable = (props: ISPConfig) => {
    const contentDatabasesViewModel: ContentDatabaseViewModel[] = props.contentDatabases.map((cd: ContentDatabase) => cd.getViewModel(props));
    return (
        <React.Fragment>
            <DetailsTable title="List of content databases" collection={contentDatabasesViewModel} columns={[
                { name: 'name', title: 'Database name', linkPath: "/contentdatabases", sortable: true },
                { name: 'webApplication', title: 'Web application', linkPath: '/webapplications', sortable: true },
                { name: 'sizeString', title: 'Size', sortable: true, sortPropertyName: 'size' },
                { name: 'siteCollectionCount', title: 'Number of site collections', sortable: true }
            ]} />
        </React.Fragment>
    );
}

export const ContentDatabasesDetails = (props: ISPConfig) => {
    const { contentDatabaseId } = useParams();
    const contentDatabaseViewModel: ContentDatabaseViewModel = props.contentDatabases.find((cd: ContentDatabase) => cd.id === contentDatabaseId).getViewModel(props);

    return <React.Fragment>
        <ObjectDetails
            object={contentDatabaseViewModel}
            backLinkTitle="List of content databases"
            backLinkUrl="/contentdatabases"
            title="Content database"
            rows={[
                { rowTitle: 'Id', rowProperty: 'id' },
                { rowTitle: 'Content databse name', rowProperty: 'name' },
                { rowTitle: 'Web application', rowProperty: 'webApplication', linkUrl: '/webapplications/{id}' },
                { rowTitle: 'Size in Gb', rowProperty: 'sizeString' },
                { rowTitle: 'Number of site collections', rowProperty: 'numberOfSites' }
            ]} />
        <div className="row">
            <div className="col">
                <DetailsTable title="Site collections in database" collection={contentDatabaseViewModel.siteCollections} columns={[
                    { name: 'url', title: 'Url',  linkPath: '/sitecollections', sortable: true },
                    { name: 'sizeString', title: 'Size', sortable: true, sortPropertyName: 'size' },
                    { name: 'owner', title: 'Owner' },
                    { name: 'siteTemplate', title: 'Template' }
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