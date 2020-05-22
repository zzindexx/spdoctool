import * as React from 'react';
import { ISPConfig, ISPServer, IServiceInstance } from '../../../../types/state/IAppState';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';


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
            name: 'id',
            title: 'Id',
            isLink: false,
            show: false
        },
        {
            name: 'name',
            title: 'Server name',
            isLink: true,
            show: true,
            linkPath: '/servers'
        },
        {
            name: 'ipaddresses',
            title: 'IP Address',
            isLink: false,
            show: true
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
    const server: ISPServer = props.servers.find((srv: ISPServer) => srv.id === serverId);

    const serverViewModel = {
        id: server.id,
        name: server.name,
        ipaddresses: server.ipaddresses
    }

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
                <CardList title="Service instances" idField="id" displayField="name" collection={props.serviceInstances.filter((si: IServiceInstance) => si.serversIds.includes(serverId))} />
            </div>
        </div>
    </React.Fragment>;
}