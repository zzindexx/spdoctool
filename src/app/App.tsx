import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


import { Navbar } from './components/Navbar/Navbar';
import { LeftNavigation } from './components/LeftNavigation/LeftNavigation';
import { BasicInfo } from './components/Main/BasicInfo/BasicInfo';
import { CentralAdministration } from './components/Main/CentralAdministration/CentralAdministration';
import { IAppState, ISQLConfig } from '../types/state/IAppState';
import { initialState } from '../types/initialState';
import { SQLServers } from './components/Main/SQLConfig/SQLConfig';
import { Servers } from './components/Main/Servers/Servers';
import { ServiceApplications } from './components/Main/ServiceApplications/ServiceApplications';
import { WebApplications } from './components/Main/WebApplications/WebApplications';
import { FarmSolutions } from './components/Main/FarmSolutions/FarmSolutions';
import { ManagedAccounts } from './components/Main/ManagedAccounts/ManagedAccounts';
import { ApplicationPools } from './components/Main/ApplicationPools/ApplicationPools';
import { ContentDatabases } from './components/Main/ContentDatabases/ContentDatabases';
import { SiteCollections } from './components/Main/SiteCollections/SiteCollections';
import { About } from './components/About/About';
import { UploadConfigDialog } from './components/UploadConfig/UploadConfig';
import { FAQ } from './components/FAQ/FAQ';
import { ProxyGroups } from './components/Main/ProxyGroups/ProxyGroups';
import TelemetryProvider from './TelemetryProvider';
import { getAppInsights } from './TelemetryService';
import { ContentDatabase } from '../types/state/ContentDatabase';
import { SQLServer } from '../types/state/SQLServer';
import { FarmSolution } from '../types/state/FarmSolution';
import { ServiceAccount } from '../types/state/ServiceAccount';
import { SPServer } from '../types/state/SPServer';
import { ApplicationPool } from '../types/state/ApplicationPool';
import { ServiceApplicationProxy } from '../types/state/ServiceApplicationProxy';
import { ServiceApplicationProxyGroup } from '../types/state/ServiceApplicationProxyGroup';
import { ServiceApplication } from '../types/state/ServiceApplication';
import { ServiceInstance } from '../types/state/ServiceInstance';
import { SiteCollection } from '../types/state/SiteCollection';
import { WebApplication } from '../types/state/WebApplication';


export class App extends React.PureComponent<{}, IAppState> {
    configFileInput = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    loadConfiguration = (keepData: boolean) => {
        const fileInput = this.configFileInput.current;
        if (fileInput) {
            fileInput.files[0].text().then((contents: string) => {
                const parsedConfig: any = JSON.parse(contents);
                /*this.setState({
                    configurationUploaded: true,
                    farmConfig: parsedConfig.farmConfig,
                    spConfig: parsedConfig.spConfig,
                    sqlConfig: parsedConfig.sqlConfig
                });*/

                this.setState({
                    configurationUploaded: true,
                    farmConfig: parsedConfig.farmConfig,
                    sqlConfig: {
                        servers: parsedConfig.sqlConfig.servers.map((s: any) => new SQLServer(s))
                    },
                    spConfig: {
                        farmSolutions: parsedConfig.spConfig.farmSolutions.map((parsedJson: any) => new FarmSolution(parsedJson)),
                        managedAccounts: parsedConfig.spConfig.managedAccounts.map((parsedJson: any) => new ServiceAccount(parsedJson)),
                        servers: parsedConfig.spConfig.servers.map((parsedJson: any) => new SPServer(parsedJson)),
                        serviceApplicationPools: parsedConfig.spConfig.serviceApplicationPools.map((parsedJson: any) => new ApplicationPool(parsedJson)),
                        serviceApplicationProxies: parsedConfig.spConfig.serviceApplicationProxies.map((parsedJson: any) => new ServiceApplicationProxy(parsedJson)),
                        serviceApplicationProxyGroups: parsedConfig.spConfig.serviceApplicationProxyGroups.map((parsedJson: any) => new ServiceApplicationProxyGroup(parsedJson)),
                        serviceApplications: parsedConfig.spConfig.serviceApplications.map((parsedJson: any) => new ServiceApplication(parsedJson)),
                        serviceInstances: parsedConfig.spConfig.serviceInstances.map((parsedJson: any) => new ServiceInstance(parsedJson)),
                        siteCollections: parsedConfig.spConfig.siteCollections.map((parsedJson: any) => new SiteCollection(parsedJson)),
                        webApplicationPools: parsedConfig.spConfig.webApplicationPools.map((parsedJson: any) => new ApplicationPool(parsedJson)),
                        webApplications: parsedConfig.spConfig.webApplications.map((parsedJson: any) => new WebApplication(parsedJson)),
                        contentDatabases: parsedConfig.spConfig.contentDatabases.map((cd: any) => new ContentDatabase(cd))
                    }
                });

                localStorage.removeItem('spdoctool-farm');
                localStorage.removeItem('spdoctool-sp');
                localStorage.removeItem('spdoctool-sql');

                if (keepData) {
                    //localStorage.setItem('spdoctool-farm', JSON.stringify(parsedConfig.farmConfig));
                    //localStorage.setItem('spdoctool-sp', JSON.stringify(parsedConfig.spConfig));
                    //localStorage.setItem('spdoctool-sql', JSON.stringify(parsedConfig.sqlConfig));
                }
            });
        }
    }

    componentDidMount() {
        if (localStorage.getItem('spdoctool-farm')) {
            this.setState({
                configurationUploaded: true,
                farmConfig: JSON.parse(localStorage.getItem('spdoctool-farm')),
            });
        }
        if (localStorage.getItem('spdoctool-sql')) {
            this.setState({
                configurationUploaded: true,
                sqlConfig: JSON.parse(localStorage.getItem('spdoctool-sql')),
            });
        }
        if (localStorage.getItem('spdoctool-sp')) {
            this.setState({
                configurationUploaded: true,
                spConfig: JSON.parse(localStorage.getItem('spdoctool-sp')),
            });
        }
    }

    render() {
        const mainContent: JSX.Element = <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/faq">
                <FAQ />
            </Route>

            <Route path="/ca">
                <CentralAdministration farmConfig={this.state.farmConfig} spConfig={this.state.spConfig} />
            </Route>
            <Route path="/sqlconfig">
                <SQLServers {...this.state.sqlConfig} />
            </Route>
            <Route path="/servers">
                <Servers {...this.state.spConfig} />
            </Route>
            <Route path="/farmsolutions">
                <FarmSolutions {...this.state.spConfig} />
            </Route>
            <Route path="/managedaccounts">
                <ManagedAccounts {...this.state.spConfig} />
            </Route>
            <Route path="/applicationpools">
                <ApplicationPools {...this.state.spConfig} />
            </Route>
            <Route path="/serviceapplications">
                <ServiceApplications {...this.state.spConfig} />
            </Route>
            <Route path="/proxygroups">
                <ProxyGroups {...this.state.spConfig} />
            </Route>
            <Route path="/webapplications">
                <WebApplications {...this.state.spConfig} />
            </Route>
            <Route path="/contentdatabases">
                <ContentDatabases {...this.state.spConfig} />
            </Route>
            <Route path="/sitecollections">
                <SiteCollections {...this.state.spConfig} />
            </Route>

            <Route path="/">
                <BasicInfo farmConfig={this.state.farmConfig} spConfig={this.state.spConfig} />
            </Route>
        </Switch>;

        const noConfigContent: JSX.Element = <React.Fragment>
            <About />
        </React.Fragment>;

        return (
            <React.Fragment>
                <Router>

                    <Navbar />
                    <div className="container-fluid">
                        <div className="row">
                            <LeftNavigation />
                            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                                <TelemetryProvider after={() => { const appInsights = getAppInsights(); }}>
                                    {this.state.configurationUploaded ? mainContent : noConfigContent}
                                </TelemetryProvider>

                            </main>
                        </div>
                    </div>
                    <UploadConfigDialog fileRef={this.configFileInput} loadConfiguration={this.loadConfiguration} />
                </Router>
            </React.Fragment >
        );
    }
}