import * as React from 'react';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { IFarmConfig, ISPConfig } from '../../../../types/state/IAppState';
import { Link } from "react-router-dom";
import { Card } from '../../Shared/Card/Card';
import { ServersCompact } from '../Servers/Servers';
import { ServiceApplicationsCompact } from '../ServiceApplications/ServiceApplications';
import { WebApplicationsCompact } from '../WebApplications/WebApplications';
import { FarmSolutionsCompact } from '../FarmSolutions/FarmSolutions';
import { SummaryTable, ITableRow } from '../../Shared/SummaryTable/SummaryTable';
import { ManagedAccountsCompact } from '../ManagedAccounts/ManagedAccounts';
import { ApplicationPoolsCompact } from '../ApplicationPools/ApplicationPools';
import { ContentDatabasesCompact } from '../ContentDatabases/ContentDatabases';

interface IBasicInfoProps {
    farmConfig: IFarmConfig;
    spConfig: ISPConfig
}

export const BasicInfo = (props: IBasicInfoProps) => {
    const rows: ITableRow[] = [
        {
            rowProperty: 'configurationDatabaseName',
            rowTitle: 'Configuration database name'
        },
        {
            rowProperty: 'configurationDatabaseServer',
            rowTitle: 'Configuration database server'
        },
        {
            rowProperty: 'configurationDatabaseVersion',
            rowTitle: 'Configuration database varsion'
        }
    ];


    return (
        <React.Fragment>
            <PageHeader title='SharePoint farm configuration' />
            <div className="row">
                <div className="col">
                    <SummaryTable title="Farm version and database" rows={rows} object={props.farmConfig} />
                </div>
            </div>

            <div className="card-columns webapp-columns">
            <ContentDatabasesCompact {...props.spConfig} />
                <WebApplicationsCompact {...props.spConfig} />
                <ServersCompact {...props.spConfig} />
                <FarmSolutionsCompact {...props.spConfig} />
                <ManagedAccountsCompact {...props.spConfig} />
                <ApplicationPoolsCompact {...props.spConfig} />
                <ServiceApplicationsCompact {...props.spConfig} />
                
            </div>
        </React.Fragment>
    );
}