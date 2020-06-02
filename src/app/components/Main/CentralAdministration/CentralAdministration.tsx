import * as React from 'react';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { IFarmConfig, ISPConfig } from '../../../../types/state/IAppState';
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';
import { BasicEntity } from '../../../../types/state/BasicEntity';
import { ApplicationPool } from '../../../../types/state/ApplicationPool';

interface ICentralAdministrationProps {
    farmConfig: IFarmConfig;
    spConfig: ISPConfig;
}

export const CentralAdministration = (props: ICentralAdministrationProps) => {
    const centralAdminViewModel = {
        url: props.farmConfig.centralAdmin.url,
        applicationPool: props.spConfig.webApplicationPools.find((ap: ApplicationPool) => ap.id === props.farmConfig.centralAdmin.applicationPoolId)
    };

    const languagePacksViewModel: BasicEntity[] = props.farmConfig.languagePacks.map((lang: string) => ({ id: lang, name: lang }));

    return (
        <React.Fragment>
            <PageHeader title='Central administration configuration' />
            <SummaryTable 
                title="Central administration web application"
                object={centralAdminViewModel}
                rows={[
                    { rowProperty: 'url', rowTitle: 'Url' },
                    { rowProperty: 'applicationPool', rowTitle: 'Central administration web application pool', linkUrl: '/applicationpools/{id}'}
                ]}
            />
            <CardList collection={languagePacksViewModel} title="Installed language packs"  />
            <DetailsTable collection={props.farmConfig.centralAdmin.farmAdmins} title="Farm administrators" columns={[
                { name: 'name', title: 'Display name' },
                { name: 'userName', title: 'User name' }
            ]} />
        </React.Fragment>
    );
}