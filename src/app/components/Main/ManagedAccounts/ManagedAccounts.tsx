import * as React from 'react';
import { ISPConfig, IServiceAccount, IApplicationPool } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import {
    Switch,
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

export const ManagedAccountsCompact = (props: ISPConfig) => {
    return <CardList title="Managed accounts" headerLink="/managedaccounts" collection={props.managedAccounts} />;
}

export const ManagedAccountsTable = (props: ISPConfig) => {
    return (
        <React.Fragment>
            <DetailsTable title="Managed accounts" collection={props.managedAccounts} columns={[
                { name: 'name', title: 'Account', show: true, isLink: true, linkPath: '/managedaccounts' },
                { name: 'autoChangePassword', title: 'Automatically change password?', show: true, isLink: false }
            ]} />
        </React.Fragment>
    );
}

export const ManagedAccountsDetails = (props: ISPConfig) => {
    const { managedAccountId } = useParams();
    const managedAccount: IServiceAccount = props.managedAccounts.find((sa: IServiceAccount) => sa.id === managedAccountId);

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
                        <CardList title="Service application pools" itemLink="/applicationpools" collection={props.serviceApplicationPools.filter((sap: IApplicationPool) => sap.accountId === managedAccountId)} />
                        <CardList title="Web application pools" itemLink="/applicationpools" collection={props.webApplicationPools.filter((sap: IApplicationPool) => sap.accountId === managedAccountId)}
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