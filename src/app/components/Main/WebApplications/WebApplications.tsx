import * as React from 'react';
import { ISPConfig } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';
import { WebApplication, WebApplicationViewModel } from '../../../../types/state/WebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ContentDatabase } from '../../../../types/state/ContentDatabase';
import { FarmSolution } from '../../../../types/state/FarmSolution';
import { ApplicationPool } from '../../../../types/state/ApplicationPool';
import { ServiceAccount } from '../../../../types/state/ServiceAccount';
import { SiteCollection } from '../../../../types/state/SiteCollection';

export const WebApplicationsCompact = (props: ISPConfig) => {
    return <CardList title="Web applications" headerLink="/webapplications" collection={props.webApplications} />;
}


const WebApplicationsTable = (props: ISPConfig) => {

    const columns = [
        {
            name: 'id',
            title: 'Id',
            isLink: false,
            show: false
        },
        {
            name: 'name',
            title: 'Web application name',
            isLink: true,
            show: true,
            linkPath: "/webapplications"
        },
        {
            name: 'url',
            title: 'Url',
            isLink: false,
            show: true
        },
        {
            name: 'siteColNum',
            title: 'Number of site collections',
            isLink: false,
            show: true
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

    const aamColumns = [
        {
            name: 'publicUrl',
            title: 'Public URL',
            isLink: false,
            show: true
        },
        {
            name: 'zone',
            title: 'Zone',
            isLink: false,
            show: true
        },
        {
            name: 'incomingUrl',
            title: 'Incoming Url',
            isLink: false,
            show: true
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
                            { name: 'name', title: 'Managed path', show: true, isLink: false },
                            { name: 'type', title: 'Type', show: true, isLink: false }
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
                            { name: 'displayName', title: 'Display name', show: true, isLink: false },
                            { name: 'username', title: 'Account', show: true, isLink: false },
                            { name: 'rights', title: 'Granted rights', show: true, isLink: false }
                        ]} />
                        <DetailsTable title="Altername Access Mappings" collection={webApp.addresses} columns={aamColumns} />
                        <DetailsTable title="Identity providers" collection={webApp.identityProviders} columns={[
                            { name: 'zone', title: 'Zone', show: true, isLink: false },
                            { name: 'authentication', title: 'Authentication', show: true, isLink: false }
                        ]} />

                        <CardList title="Farm solutions" itemLink='/farmsolutions' collection={webApp.farmSolutions} />

                        <DetailsTable title="Content databases" collection={webApp.contentDatabases} columns={[
                            { name: 'name', title: 'Name', show: true, isLink: true, linkPath: '/contentdatabases' },
                            { name: 'server', title: 'Database server', show: true, isLink: false },
                            { name: 'sizeString', title: 'Current size in Gb', show: true, isLink: false }
                        ]} />

                        <DetailsTable title="Site collections" collection={webApp.siteCollections} columns={[
                            { name: 'name', title: 'Site collection title', show: false, isLink: false },
                            { name: 'url', title: 'Url', show: true, isLink: true, linkPath: '/sitecollections' },
                            { name: 'sizeString', title: 'Size', show: true, isLink: false }
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