import * as React from 'react';
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { ISPConfig } from '../../../../types/state/IAppState';
import { ServiceAccount, ServiceAccountViewModel } from '../../../../types/state/ServiceAccount';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';

export const ManagedAccountsCompact = (props: ISPConfig) => {
    return <CardList title="Managed accounts" headerLink="/managedaccounts" collection={props.managedAccounts} />;
}

export const ManagedAccountsTable = (props: ISPConfig) => {
    return (
        <React.Fragment>
            <DetailsTable title="Managed accounts" collection={props.managedAccounts.map((ma: ServiceAccount) => ma.getViewModel(props))} columns={[
                { name: 'name', title: 'Account', linkPath: '/managedaccounts', sortable: true },
                { name: 'autoChangePasswordString', title: 'Automatically change password?', sortable: true }
            ]} />
        </React.Fragment>
    );
}

export const ManagedAccountsDetails = (props: ISPConfig) => {
    const { managedAccountId } = useParams();
    const managedAccount: ServiceAccountViewModel = props.managedAccounts.find((sa: ServiceAccount) => sa.id === managedAccountId).getViewModel(props);

    return (
        <React.Fragment>
            <ObjectDetails
                object={managedAccount}
                backLinkTitle="List of managed accounts"
                backLinkUrl="/managedaccounts"
                title="Managed account"
                rows={[
                    { rowTitle: 'Id', rowProperty: 'id' },
                    { rowTitle: 'Account', rowProperty: 'name' },
                    { rowTitle: 'Automatically change password', rowProperty: 'autoChangePassword' }
                ]} />
            <div className="row">
                <div className="col">
                    <div className="card-deck">
                        <CardList title="Service application pools" itemLink="/applicationpools" collection={managedAccount.serviceApplicationPools} />
                        <CardList title="Web application pools" itemLink="/applicationpools" collection={managedAccount.webApplicationPools}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export const ManagedAccounts = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:managedAccountId`}>
                <ManagedAccountsDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='Managed accounts' />
                <ErrorBoundary>
                    <ManagedAccountsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}