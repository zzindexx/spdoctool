import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { ContentDatabase } from '../../../../types/state/ContentDatabase';
import { ISPConfig } from '../../../../types/state/IAppState';
import { SiteCollection } from '../../../../types/state/SiteCollection';
import { WebApplication, WebApplicationViewModel } from '../../../../types/state/WebApplication';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';

export const WebApplicationsCompact = (props: ISPConfig) => {
    return <CardList title="Web applications" headerLink="/webapplications" collection={props.webApplications} />;
}


const WebApplicationsTable = (props: ISPConfig) => {

    const columns: ITableColumn[] = [
        {
            name: 'name',
            title: 'Web application name',
            linkPath: "/webapplications",
            sortable: true
        },
        {
            name: 'url',
            title: 'Url',
            sortable: true
        },
        {
            name: 'siteColNum',
            title: 'Number of site collections',
            sortable: true
        }
    ];

    const collection: any[] = props.webApplications.map((webApplication: WebApplication) => {
        const contentDatabases: string[] = props.contentDatabases.filter((cd: ContentDatabase) => cd.webApplicationId === webApplication.id).map((cd: ContentDatabase) => cd.id);
        const siteColNum: number = props.siteCollections.filter((sc: SiteCollection) => contentDatabases.includes(sc.contentDatabaseId)).length;
        return {
            id: webApplication.id,
            name: webApplication.name,
            url: webApplication.url,
            siteColNum: siteColNum
        };
    });

    return (
        <React.Fragment>
            <DetailsTable title="Web applications" collection={collection} columns={columns} />
        </React.Fragment>
    );
}

const WebApplicationDetails = (props: ISPConfig) => {
    let { webAppId } = useParams();
    const webApp: WebApplicationViewModel = props.webApplications.find((wa: WebApplication) => wa.id === webAppId).getViewModel(props);

    const aamColumns: ITableColumn[] = [
        {
            name: 'publicUrl',
            title: 'Public URL'
        },
        {
            name: 'zone',
            title: 'Zone'
        },
        {
            name: 'incomingUrl',
            title: 'Incoming Url'
        }
    ];


    return (
        <React.Fragment>
            <ObjectDetails
                object={webApp}
                backLinkTitle="List of web application"
                backLinkUrl="/webapplications"
                title="Web application"
                rows={[
                    { rowTitle: 'Web application Id', rowProperty: 'id' },
                    { rowTitle: 'Web application name', rowProperty: 'name' },
                    { rowTitle: 'Url', rowProperty: 'url' },
                    { rowTitle: 'Application pool', rowProperty: 'applicationPool', linkUrl: "/applicationpools/{id}" },
                    { rowTitle: 'Application pool account', rowProperty: 'applicationPoolAccount', linkUrl: '/managedaccounts/{id}' }
                ]}
            />
            <div className="row">
                <div className="col">
                    <div className="card-columns webapp-columns">
                        <DetailsTable title="Managed paths" collection={webApp.managedPaths} columns={[
                            { name: 'name', title: 'Managed path' },
                            { name: 'type', title: 'Type' }
                        ]} />
                        <SummaryTable title="Resource throttling" object={webApp.resourceThrottlingSettings} rows={[
                            { rowTitle: 'List View Threshold', rowProperty: 'listViewThreshold' },
                            { rowTitle: 'List View Threshold for administrators', rowProperty: 'listViewThresholdAdmins' },
                            { rowTitle: 'List View Lookup Threshold', rowProperty: 'maxLookupColumns' }
                        ]} />
                        <SummaryTable title="Outgoing e-mail settings" object={webApp.outgoingEmailSettings} rows={[
                            { rowTitle: 'SMTP Server address', rowProperty: 'smtpServer' },
                            { rowTitle: 'SMTP Server port', rowProperty: 'smtpPort' },
                            { rowTitle: 'Sender address', rowProperty: 'senderAddress' },
                            { rowTitle: 'Reply-to address', rowProperty: 'replyToAddress' }
                        ]} />
                        <DetailsTable title="Web application policies" collection={webApp.policies} columns={[
                            { name: 'displayName', title: 'Display name' },
                            { name: 'username', title: 'Account' },
                            { name: 'rights', title: 'Granted rights' }
                        ]} />
                        <DetailsTable title="Altername Access Mappings" collection={webApp.addresses} columns={aamColumns} />
                        <DetailsTable title="Identity providers" collection={webApp.identityProviders} columns={[
                            { name: 'zone', title: 'Zone' },
                            { name: 'authentication', title: 'Authentication' }
                        ]} />

                        <CardList title="Farm solutions" itemLink='/farmsolutions' collection={webApp.farmSolutions} />

                        <DetailsTable title="Content databases" collection={webApp.contentDatabases} columns={[
                            { name: 'name', title: 'Name', linkPath: '/contentdatabases' },
                            { name: 'server', title: 'Database server' },
                            { name: 'sizeString', title: 'Current size in Gb' }
                        ]} />

                        <DetailsTable title="Site collections" collection={webApp.siteCollections} columns={[
                            { name: 'name', title: 'Site collection title' },
                            { name: 'url', title: 'Url', linkPath: '/sitecollections' },
                            { name: 'sizeString', title: 'Size' }
                        ]} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export const WebApplications = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:webAppId`}>
                <WebApplicationDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='SharePoint Web applications' />
                <ErrorBoundary>
                    <WebApplicationsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}