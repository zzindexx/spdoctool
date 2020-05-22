import * as React from 'react';
import { NavigationMenu } from './NavigationMenu/NavigationMenu';

export const LeftNavigation = () => {
    const farmConfigMenu = {
        title: 'Farm configuration',
        links: [
            {title: 'Configuration overview', address: '/', iconName: 'question-circle'},
            {title: 'Central administration', address: '/ca', iconName: 'user-cog'}
        ]
    };

    const sqlConfigMenu = {
        title: 'SQL configuration',
        links: [
            {title: 'SQL servers', address: '/sqlconfig', iconName: 'database'}
        ]
    };

    const spConfigMenu = {
        title: 'SharePoint configuration',
        links: [
            {title: 'Servers', address: '/servers', iconName: 'server'},
            {title: 'Farm solutions', address: '/farmsolutions', iconName: 'smog'},
            {title: 'Managed accounts', address: '/managedaccounts', iconName: 'user'},
            {title: 'Application pools', address: '/applicationpools', iconName: 'cog'},
            {title: 'Service applications', address: '/serviceapplications', iconName: 'cogs'},
            {title: 'Proxy groups', address: '/proxygroups', iconName: 'layer-group'},
            {title: 'Web applications', address: '/webapplications', iconName: 'sitemap'},
            {title: 'Content databases', address: '/contentdatabases', iconName: 'database'},
            {title: 'Site collections', address: '/sitecollections', iconName: 'file'}
        ]
    };

    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                
                <NavigationMenu {...farmConfigMenu} />
                <NavigationMenu {...sqlConfigMenu} />
                <NavigationMenu {...spConfigMenu} />
                <div className="mt-3 pl-3 pr-3">
                    <p> © SharePoint Documentation Tool - 2020. This site is not related to Microsoft. It was completely done by individuals to help people work with their SharePoint farms. </p>
                </div>
            </div>
        </nav>
    );
}