import * as React from 'react';
import { ISPConfig } from '../../../../types/state/IAppState';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { WebApplication } from '../../../../types/state/WebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ServiceApplication } from '../../../../types/state/ServiceApplication';
import { ServiceApplicationProxy } from '../../../../types/state/ServiceApplicationProxy';
import { ServiceApplicationProxyGroup, ServiceApplicationProxyGroupViewModel } from '../../../../types/state/ServiceApplicationProxyGroup';

export const ProxyGroups = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:proxyGroupId`}>
                <ErrorBoundary>
                    <ProxyGroupsDetails {...props} />
                </ErrorBoundary>
            </Route>
            <Route path={match.path}>
                <PageHeader title='Proxy groups' />
                <ErrorBoundary>
                    <ProxyGroupsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const ProxyGroupsTable = (props: ISPConfig) => {
    const proxyGroupsViewModel: ServiceApplicationProxyGroupViewModel[] = props.serviceApplicationProxyGroups.map((pg: ServiceApplicationProxyGroup) => pg.getViewModel(props));

    return <React.Fragment>
        <DetailsTable title="List of content databases" collection={proxyGroupsViewModel} columns={[
            { name: 'name', title: 'Proxy group name', linkPath: '/proxygroups', sortable: true },
            { name: 'numberOfProxies', title: 'Number of proxies', sortable: true },
            { name: 'webApplications', title: 'Web applications', linkPath: '/webapplications' }
        ]} />
    </React.Fragment>;
}

export const ProxyGroupsDetails = (props: ISPConfig) => {
    let { proxyGroupId } = useParams();
    const proxyGroup: ServiceApplicationProxyGroupViewModel = props.serviceApplicationProxyGroups.find((pg: ServiceApplicationProxyGroup) => pg.id === proxyGroupId).getViewModel(props);

    return <React.Fragment>
        <ObjectDetails
            object={proxyGroup}
            backLinkTitle="List of proxy groups"
            backLinkUrl="/proxygroups"
            title="Proxy group"
            rows={[
                { rowTitle: 'Id', rowProperty: 'id' },
                { rowTitle: 'Proxy group name', rowProperty: 'name' }
            ]}
        />
        <div className="row">
            <div className="col">
                <DetailsTable title="Service applications in this proxy group" collection={proxyGroup.serviceApplications} columns={[
                    { name: 'name', title: 'Service Application', linkPath:'/serviceapplications' },
                    { name: 'proxyName', title: 'Service Application Proxy' }
                ]} />
            </div>
        </div>
    </React.Fragment>;
}