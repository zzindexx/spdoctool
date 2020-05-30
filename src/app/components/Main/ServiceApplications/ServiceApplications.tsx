import * as React from 'react';
import { ISPConfig } from '../../../../types/state/IAppState';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { ApplicationPool } from '../../../../types/state/ApplicationPool';
import { ServiceApplication, ServiceApplicationViewModel } from '../../../../types/state/ServiceApplication';

export const ServiceApplicationsCompact = (props: ISPConfig) => {
    return <CardList title="Service applications" headerLink="/serviceapplications" collection={props.serviceApplications} />;
}

export const ServiceApplications = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:serviceApplicationId`}>
                <ServiceApplicationsDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='SharePoint Service Applications' />
                <ErrorBoundary>
                    <ServiceApplicationsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const ServiceApplicationsTable = (props: ISPConfig) => {
    const columns: ITableColumn[] = [
        {
            name: 'id',
            title: 'Id',
            isLink: false,
            show: false
        },
        {
            name: 'name',
            title: 'Service application name',
            isLink: true,
            show: true,
            linkPath: '/serviceapplications'
        },
        {
            name: 'type',
            title: 'Service application type',
            isLink: false,
            show: true
        }
    ];

    const collection: any[] = props.serviceApplications.map((serviceApplication: ServiceApplication) => {
        return {
            id: serviceApplication.id,
            name: serviceApplication.name,
            type: serviceApplication.typeName
        };
    });

    return (
        <React.Fragment>
            <DetailsTable title="Service applications" collection={collection} columns={columns} />
        </React.Fragment>
    );
}

export const ServiceApplicationsDetails = (props: ISPConfig) => {
    let { serviceApplicationId } = useParams();
    const serviceApplication: ServiceApplicationViewModel = props.serviceApplications.find((sa: ServiceApplication) => sa.id === serviceApplicationId).getViewModel(props);

    return (
        <React.Fragment>
            <ObjectDetails 
                title='Service application'
                backLinkTitle='List of service applications'
                backLinkUrl='/serviceapplications'
                object={serviceApplication}
                rows={[
                    { rowProperty: 'name', rowTitle: 'Service application name' },
                    { rowProperty: 'typeName', rowTitle: 'Service application type' },
                    { rowProperty: 'applicationPool', rowTitle: 'Application pool', linkUrl: '/applicationpools/{id}' },
                    { rowProperty: 'databaseName', rowTitle: 'Database name' },
                    { rowProperty: 'databaseServer', rowTitle: 'Database server', linkUrl: `/sqlconfig/${serviceApplication.databaseServer}` }
                ]}
            />
            <div className="row">
                <div className="col">
                    
                </div>
            </div>
        </React.Fragment>
    );
}