import * as React from 'react';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { ISQLConfig } from '../../../../types/state/IAppState';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { CardList } from '../../Shared/CardList/CardList';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { SQLServer } from '../../../../types/state/SQLServer';

export const SQLServers = (props: ISQLConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:sqlServerId`}>
                <ErrorBoundary>
                    <SQLConfigDetails {...props} />
                </ErrorBoundary>
            </Route>
            <Route path={match.path}>
                <PageHeader title="SQL Servers in farm" />
                <ErrorBoundary>
                    <SQLServersTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const SQLServersTable = (props: ISQLConfig) => {
    return (
        <React.Fragment>
            <DetailsTable title="Servers" collection={props.servers} columns={[
                { name: 'name', title: 'Server name', linkPath: '/sqlconfig' },
                { name: 'ipaddressesString', title: 'IP Address' },
                { name: 'databaseCount', title: 'Number of databases', sortable: true}
            ]} />
        </React.Fragment>
    );
}

export const SQLConfigDetails = (props: ISQLConfig) => {
    let { sqlServerId } = useParams();
    const sqlServer: SQLServer = props.servers.find((sql) => sql.id === sqlServerId);
    return (
        <React.Fragment>
            <ObjectDetails
                title='SQL Server'
                backLinkTitle='List of SQL Servers'
                backLinkUrl='/sqlconfig'
                object={sqlServer}
                rows={[
                    { rowProperty: 'name', rowTitle: 'Server name (as visible in Central Administration)' },
                    { rowProperty: 'isAlias', rowTitle: 'Is SQL client alias?' },
                    { rowProperty: 'sqlname', rowTitle: 'Actual name' },
                    { rowProperty: 'isAlwayson', rowTitle: 'Is SQL Server Always On cluster?' },
                    { rowProperty: 'ipaddresses', rowTitle: 'IP Address' },
                    { rowProperty: 'nodes', rowTitle: 'Nodes' }
                ]}
            />
            <div className="row">
                <div className="col">
                    <CardList title="Databases on this server" collection={sqlServer.databases.map((db: string) => ({ id: db, name: db }))} />
                </div>
            </div>
        </React.Fragment>
    );
}