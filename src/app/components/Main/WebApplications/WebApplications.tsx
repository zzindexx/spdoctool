import * as React from 'react';
import { ISPConfig, IApplicationPool, IServiceAccount, IFarmSolution, IContentDatabase, ISiteCollection } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';
import { IWebApplication } from '../../../../types/state/IWebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

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

    const collection: any[] = props.webApplications.map((webApplication: IWebApplication) => {
        const contentDatabases: string[] = props.contentDatabases.filter((cd: IContentDatabase) => cd.webApplicationId === webApplication.id).map((cd: IContentDatabase) => cd.id);
        const siteColNum: number = props.siteCollections.filter((sc: ISiteCollection) => contentDatabases.includes(sc.contentDatabaseId)).length;
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
    const webApp: IWebApplication = props.webApplications.find((wa: IWebApplication) => wa.id === webAppId);
    const applicationPool: IApplicationPool = props.webApplicationPools.find((wap: IApplicationPool) => wap.id === webApp.applicationPoolId);
    const applicationPoolAccount: IServiceAccount = props.managedAccounts.find((sa: IServiceAccount) => sa.id === applicationPool.accountId);

    const webAppViewModel = {
        id: webApp.id,
        name: webApp.name,
        url: null, //webApp.url,
        ssl: null, //.ssl,
        appPool: applicationPool,
        appPoolAccount: applicationPoolAccount
    }

    const webAppContentDatabasesIds: string[] = props.contentDatabases.filter((cd: IContentDatabase) => cd.webApplicationId === webAppId).map((cd: IContentDatabase) => cd.id);

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

    const siteCollections = props.siteCollections.filter((sc: ISiteCollection) => webAppContentDatabasesIds.includes(sc.contentDatabaseId)).map((sc: ISiteCollection) => ({
        id: sc.id,
        name: sc.name,
        url: sc.url,
        size: sc.size < 1073741824 ? `${(sc.size / 1024 / 1024).toFixed(2)} Mb` : `${(sc.size / 1024 / 1024 / 1024).toFixed(2)} Gb`
    }));


    return (
        <React.Fragment>
            <ObjectDetails
                object={webAppViewModel}
                backLinkTitle="List of web application"
                backLinkUrl="/webapplications"
                title="Web application"
                rows={[
                    { rowTitle: 'Web application Id', rowProperty: 'id' },
                    { rowTitle: 'Web application name', rowProperty: 'name' },
                    { rowTitle: 'Url', rowProperty: 'url' },
                    { rowTitle: 'Uses SSL?', rowProperty: 'ssl' },
                    { rowTitle: 'Application pool', rowProperty: 'appPool', linkUrl: "/applicationpools/{id}" },
                    { rowTitle: 'Application pool account', rowProperty: 'appPoolAccount', linkUrl: '/managedaccounts/{id}' }
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

                        <CardList title="Farm solutions" itemLink='/farmsolutions' collection={props.farmSolutions.filter((fs: IFarmSolution) => fs.deployedWebApplicationIds.includes(webAppId))} idField="id" displayField="name" />

                        <DetailsTable title="Content databases" collection={props.contentDatabases.filter((cd: IContentDatabase) => cd.webApplicationId === webAppId).map((cd: IContentDatabase) => ({ id: cd.id, name: cd.name, server: cd.server, size: (cd.size / 1024 / 1024 / 1024).toFixed(2) }))} columns={[
                            { name: 'name', title: 'Name', show: true, isLink: true, linkPath: '/contentdatabases' },
                            { name: 'server', title: 'Database server', show: true, isLink: false },
                            { name: 'size', title: 'Current size in Gb', show: true, isLink: false }
                        ]} />

                        <DetailsTable title="Site collections" collection={siteCollections} columns={[
                            { name: 'name', title: 'Site collection title', show: false, isLink: false },
                            { name: 'url', title: 'Url', show: true, isLink: true, linkPath: '/sitecollections' },
                            { name: 'size', title: 'Size', show: true, isLink: false }
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