import * as React from 'react';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { ISQLConfig, ISQLServer } from '../../../../types/state/IAppState';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { CardList } from '../../Shared/CardList/CardList';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

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
                { name: 'id', title: 'Id', show: false, isLink: false },
                { name: 'name', title: 'Server name', show: true, isLink: true, linkPath: '/sqlconfig' },
                { name: 'ipaddresses', title: 'IP Address', show: true, isLink: false }
            ]} />
        </React.Fragment>
    );
}

export const SQLConfigDetails = (props: ISQLConfig) => {
    let { sqlServerId } = useParams();
    const sqlServer: ISQLServer = props.servers.find((sql) => sql.id === sqlServerId);
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