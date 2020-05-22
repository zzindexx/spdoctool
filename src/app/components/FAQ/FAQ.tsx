import * as React from 'react';
import { PageHeader } from '../Shared/PageHeader/PageHeader';

export const FAQ = () => {
    return (
        <React.Fragment>
            <PageHeader title="Frequently asked questions" />
            <h5>Do you collect anything about me?</h5>
            <p>
                We are not storing any data about you or your farm.
                We only use <a href="https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview" target="_blank">Azure Application Insights</a> to collect web anaytics.
            </p>
            <h5>Do you collect any data about my SharePoint farm?</h5>
            <p>
                We do not store data about your farm in any cloud service. You have an option to store it inside your browser on your computer (<a href='https://en.wikipedia.org/wiki/Web_storage' target="_blank">Local storage</a>) for your convenience.
            </p>
            <h5>When I select to keep my data in browser, where do you store it?</h5>
            <p>
                We do not store or send it anywhere. If you select an option to keep data in browser while loading a file with your SharePoint farm configuration, it will be stored on your computer in <a href='https://en.wikipedia.org/wiki/Web_storage' target="_blank">Local storage</a> of your browser.
            </p>
        </React.Fragment>
    );
}