import * as React from 'react';
import { PageHeader } from '../../Shared/PageHeader/PageHeader';
import { IFarmConfig, ISPConfig, IApplicationPool, IBasicEntity } from '../../../../types/state/IAppState';
import { SummaryTable } from '../../Shared/SummaryTable/SummaryTable';
import { CardList } from '../../Shared/CardList/CardList';
import { DetailsTable } from '../../Shared/DetailsTable/DetailsTable';

interface ICentralAdministrationProps {
    farmConfig: IFarmConfig;
    spConfig: ISPConfig;
}

export const CentralAdministration = (props: ICentralAdministrationProps) => {
    const centralAdminViewModel = {
        url: props.farmConfig.centralAdmin.url,
        applicationPool: props.spConfig.webApplicationPools.find((ap: IApplicationPool) => ap.id === props.farmConfig.centralAdmin.applicationPoolId)
    };

    const languagePacksViewModel: IBasicEntity[] = props.farmConfig.languagePacks.map((lang: string) => ({ id: lang, name: lang }));

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
                { name: 'name', title: 'Display name', isLink: false, show: true},
                { name: 'userName', title: 'User name', isLink: false, show: true}
            ]} />
        </React.Fragment>
    );
}