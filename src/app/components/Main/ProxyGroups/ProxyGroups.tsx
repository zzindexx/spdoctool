import * as React from 'react';
import { ISPConfig, IServiceApplicationProxyGroup, IServiceApplication, IServiceApplicationProxy } from '../../../../types/state/IAppState';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { IWebApplication } from '../../../../types/state/IWebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';

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
    const proxyGroupsViewModel: any[] = props.serviceApplicationProxyGroups.map((pg: IServiceApplicationProxyGroup) => {
        return {
            id: pg.id,
            name: pg.name === '' ? '[default]' : pg.name,
            numberOfProxies: pg.proxies.length,
            webApplications: props.webApplications.filter((wa: IWebApplication) => wa.serviceApplicationProxyGroupId === pg.id)
        };
    });

    return <React.Fragment>
        <DetailsTable title="List of content databases" collection={proxyGroupsViewModel} columns={[
            { name: 'id', title: 'Id', show: false, isLink: false },
            { name: 'name', title: 'Proxy group name', show: true, isLink: true, linkPath: '/proxygroups' },
            { name: 'numberOfProxies', title: 'Number of proxies', show: true, isLink: false },
            { name: 'webApplications', title: 'Web applications', show: true, isLink: true, linkPath: '/webapplications' }
        ]} />
    </React.Fragment>;
}

export const ProxyGroupsDetails = (props: ISPConfig) => {
    let { proxyGroupId } = useParams();
    const proxyGroup: IServiceApplicationProxyGroup = props.serviceApplicationProxyGroups.find((pg: IServiceApplicationProxyGroup) => pg.id === proxyGroupId);
    const proxyGroupViewModel = {
        id: proxyGroup.id,
        name: proxyGroup.name === "" ? "[default]" : proxyGroup.name,
        proxies: proxyGroup.proxies
    }

    const serviceApplications = proxyGroup.proxies.map((proxyId: string) => {
        const proxy: IServiceApplicationProxy = props.serviceApplicationProxies.find((sap: IServiceApplicationProxy) => sap.id === proxyId);
        const serviceApplication: IServiceApplication = props.serviceApplications.find((sa: IServiceApplication) => sa.id === proxy.serviceApplicationId);
        return {
            id: serviceApplication.id,
            name: serviceApplication.name,
            proxyName: proxy ? proxy.name : ""
        };
    });

    return <React.Fragment>
        <ObjectDetails
            object={proxyGroupViewModel}
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
                <DetailsTable title="Service applications in this proxy group" collection={serviceApplications} columns={[
                    { name: 'name', title: 'Service Application', show: true, isLink: true, linkPath:'/serviceapplications' },
                    { name: 'proxyName', title: 'Service Application Proxy', show: true, isLink: false }
                ]} />
            </div>
        </div>
    </React.Fragment>;
}