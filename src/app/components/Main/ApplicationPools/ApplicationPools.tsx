import * as React from 'react';
import { ISPConfig } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { useRouteMatch, Switch, Route, useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';
import { WebApplication } from '../../../../types/state/WebApplication';
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { BasicEntity } from '../../../../types/state/BasicEntity';
import { ApplicationPool, ApplicationPoolViewModel } from '../../../../types/state/ApplicationPool';
import { ServiceApplication } from '../../../../types/state/ServiceApplication';
import { ServiceAccount } from '../../../../types/state/ServiceAccount';

export const ApplicationPoolsCompact = (props: ISPConfig) => {
    return <CardList title="Application pools" headerLink="/applicationpools" collection={[...props.serviceApplicationPools, ...props.webApplicationPools]} />;;
};

export const ApplicationPools = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:applicationPoolId`}>
                <ErrorBoundary>
                    <ApplicationPoolsDetails {...props} />
                </ErrorBoundary>
            </Route>
            <Route path={match.path}>
                <PageHeader title='Application pools' />
                <ErrorBoundary>
                    <ApplicationPoolsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
};

export const ApplicationPoolsTable = (props: ISPConfig) => {
    const webAppPools: ApplicationPoolViewModel[] = props.webApplicationPools.map((wap: ApplicationPool) => wap.getViewModel(props));
    const saPools: ApplicationPoolViewModel[] = props.serviceApplicationPools.map((wap: ApplicationPool) => wap.getViewModel(props));
    return (
        <React.Fragment>
            <DetailsTable title="Web application pools" collection={webAppPools} columns={[
                { name: 'id', title: 'Id', show: false, isLink: true },
                { name: 'name', title: 'Application pool name', show: true, isLink: true, linkPath: '/applicationpools' },
                { name: 'account', title: 'Service account', show: true, isLink: true, linkPath: '/managedaccounts' }
            ]} />
            <DetailsTable title="Service application pools" collection={saPools} columns={[
                { name: 'id', title: 'Id', show: false, isLink: true },
                { name: 'name', title: 'Application pool name', show: true, isLink: true, linkPath: '/applicationpools' },
                { name: 'account', title: 'Service account', show: true, isLink: true, linkPath: '/managedaccounts' }
            ]} />
        </React.Fragment>
    );
};

export const ApplicationPoolsDetails = (props: ISPConfig) => {
    const { applicationPoolId } = useParams();
    const applicationPool: ApplicationPoolViewModel = [...props.webApplicationPools, ...props.serviceApplicationPools].find((ap: ApplicationPool) => ap.id === applicationPoolId).getViewModel(props);

    return (
        <React.Fragment>
            <ObjectDetails
                object={applicationPool}
                backLinkTitle="List of application pools"
                backLinkUrl="/applicationpools"
                title="Application pool"
                rows={[
                    { rowTitle: 'Id', rowProperty: 'id' },
                    { rowTitle: 'Application pool name', rowProperty: 'name' },
                    { rowTitle: 'Application pool account', rowProperty: 'account', linkUrl: '/managedaccounts/{id}' }
                ]} />
            <div className="row">
                <div className="col">
                    <div className="card-deck">
                        <CardList title="Web applications using this pool" itemLink="/webapplications" collection={applicationPool.webApplications} />
                        <CardList title="Service applications using this pool" itemLink="/serviceapplications" collection={applicationPool.serviceApplications} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};