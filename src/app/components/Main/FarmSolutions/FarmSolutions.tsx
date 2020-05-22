import * as React from 'react';
import { ISPConfig, IFarmSolution, IBasicEntity } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { IWebApplication } from '../../../../types/state/IWebApplication';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';

export const FarmSolutions = (props: ISPConfig) => {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:farmSoulutionId`}>
                <FarmSolutionsDetails {...props} />
            </Route>
            <Route path={match.path}>
                <PageHeader title='Farm solutions' />
                <ErrorBoundary>
                    <FarmSolutionsTable {...props} />
                </ErrorBoundary>
            </Route>
        </Switch>
    );
}

export const FarmSolutionsCompact = (props: ISPConfig) => {
    return <CardList title="Farm solutions" headerLink="/farmsolutions" collection={props.farmSolutions} />;
}

export const FarmSolutionsTable = (props: ISPConfig) => {
    const columns: ITableColumn[] = [
        {
            name: 'name',
            title: 'Solution name',
            isLink: true,
            linkPath: '/farmsolutions',
            show: true
        },
        {
            name: 'deployed',
            title: 'Is deployed',
            isLink: false,
            show: true
        },
        {
            name: 'globallydeployed',
            title: 'Globally deployed',
            isLink: false,
            show: true
        },
        {
            name: 'deployedWebApplications',
            title: 'Deployed to web applications',
            isLink: true,
            linkPath: '/webapplications',
            show: true
        }

    ];
    const collection: any[] = props.farmSolutions.map((fs: IFarmSolution) => {
        const webapps: IBasicEntity[] = props.webApplications.filter((wa: IWebApplication) => fs.deployedWebApplicationIds.includes(wa.id)).map((wa: IWebApplication) => ({ id: wa.id, name: wa.name }));
        return {
            id: fs.id,
            name: fs.name,
            deployed: fs.deployed,
            globallydeployed: fs.globallydeployed,
            deployedWebApplications: webapps
        };
    });

    return (
        <React.Fragment>
            <DetailsTable title="Farm solutions" collection={collection} columns={columns} />
        </React.Fragment>
    );
}

export const FarmSolutionsDetails = (props: ISPConfig) => {
    const { farmSoulutionId } = useParams();
    const farmSolution: IFarmSolution = props.farmSolutions.find((fs: IFarmSolution) => fs.id === farmSoulutionId);

    return <React.Fragment>
        <ObjectDetails
            object={farmSolution}
            backLinkTitle="List of farm solutions"
            backLinkUrl="/farmsolutions"
            title="Farm solution"
            rows={[
                { rowTitle: 'Id', rowProperty: 'id' },
                { rowTitle: 'Solution name', rowProperty: 'name' },
                { rowTitle: 'Is deployed', rowProperty: 'deployed' },
                { rowTitle: 'Deployed globally', rowProperty: 'globallydeployed' },
                { rowTitle: 'Contains global assembly', rowProperty: 'containsGlobalAssembly' },
                { rowTitle: 'Contains web application resources', rowProperty: 'containsWebApplicationResource' }
            ]} />
        <div className="row">
            <div className="col">
                <CardList title="Deployed to web applications" itemLink="/webapplications" collection={props.webApplications.filter((wa: IWebApplication) => farmSolution.deployedWebApplicationIds.includes(wa.id))} idField="id" displayField="name" />
            </div>
        </div>
    </React.Fragment>;
}