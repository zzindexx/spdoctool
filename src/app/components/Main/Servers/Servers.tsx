import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { ISPConfig } from '../../../../types/state/IAppState';
import { ServiceInstance } from '../../../../types/state/ServiceInstance';
import { SPServer } from '../../../../types/state/SPServer';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';


export const Servers = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:serverId`}>
                <ServersDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='Farm Servers' />
                <ErrorBoundary>
                    <ServersTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const ServersCompact = (props: ISPConfig) => {
    return <CardList title="Servers" headerLink="/servers" collection={props.servers} />;
}

export const ServersTable = (props: ISPConfig) => {
    const columns: ITableColumn[] = [
        {
            name: 'name',
            title: 'Server name',
            linkPath: '/servers',
            sortable: true
        },
        {
            name: 'ipaddresses',
            title: 'IP Address',
            sortable: false
        }
    ];
    return (
        <React.Fragment>
            <DetailsTable collection={props.servers} columns={columns} title="SharePoint Servers" />
        </React.Fragment>

    );
}

export const ServersDetails = (props: ISPConfig) => {
    const { serverId } = useParams();
    const server: SPServer = props.servers.find((srv: SPServer) => srv.id === serverId);

    return <React.Fragment>
        <ObjectDetails
            object={server}
            backLinkTitle="List of SharePoint servers"
            backLinkUrl="/servers"
            title="Server"
            rows={[
                { rowTitle: 'Id', rowProperty: 'id' },
                { rowTitle: 'Server name', rowProperty: 'name' },
                { rowTitle: 'IP address', rowProperty: 'ipaddresses' }
            ]} />
        <div className="row">
            <div className="col">
                <CardList title="Service instances" collection={props.serviceInstances.filter((si: ServiceInstance) => si.serversIds.includes(serverId))} />
            </div>
        </div>
    </React.Fragment>;
}