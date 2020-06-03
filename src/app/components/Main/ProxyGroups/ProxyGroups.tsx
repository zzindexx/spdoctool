import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { ISPConfig } from '../../../../types/state/IAppState';
import { ServiceApplicationProxyGroup, ServiceApplicationProxyGroupViewModel } from '../../../../types/state/ServiceApplicationProxyGroup';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { CardList } from '../../Shared/CardList/CardList';

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
        <DetailsTable title="List of proxy groups" collection={proxyGroupsViewModel} columns={[
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
            <div className="col">
                <CardList collection={proxyGroup.webApplications} title="Web applications" />
            </div>
        </div>
    </React.Fragment>;
}