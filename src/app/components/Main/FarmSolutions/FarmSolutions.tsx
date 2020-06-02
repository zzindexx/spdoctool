import * as React from 'react';
import { ISPConfig } from '../../../../types/state/IAppState';
import { CardList } from '../../Shared/CardList/CardList';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { Card } from '../../Shared/Card/Card';
import { DetailsTable, ITableColumn } from '../../Shared/DetailsTable/DetailsTable';
import { WebApplication } from '../../../../types/state/WebApplication';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { ObjectDetails } from '../../Shared/ObjectDetails/ObjectDetails';
import { ErrorBoundary } from '../../Shared/ErrorBoundary/ErrorBoundary';
import { FarmSolution, FarmSolutionViewModel } from '../../../../types/state/FarmSolution';
import { BasicEntity } from '../../../../types/state/BasicEntity';

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
            linkPath: '/farmsolutions',
            sortable: true
        },
        {
            name: 'deployedString',
            title: 'Is deployed',
            sortable: true
        },
        {
            name: 'globallydeployedString',
            title: 'Globally deployed',
            sortable: true
        },
        {
            name: 'deployedWebApplications',
            title: 'Deployed to web applications',
            linkPath: '/webapplications'
        }

    ];
    const collection: FarmSolutionViewModel[] = props.farmSolutions.map((fs: FarmSolution) => fs.getViewModel(props));

    return (
        <React.Fragment>
            <DetailsTable title="Farm solutions" collection={collection} columns={columns} />
        </React.Fragment>
    );
}

export const FarmSolutionsDetails = (props: ISPConfig) => {
    const { farmSoulutionId } = useParams();
    const farmSolution: FarmSolutionViewModel = props.farmSolutions.find((fs: FarmSolution) => fs.id === farmSoulutionId).getViewModel(props);

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
                <CardList title="Deployed to web applications" itemLink="/webapplications" collection={farmSolution.deployedWebApplications}/>
            </div>
        </div>
    </React.Fragment>;
}