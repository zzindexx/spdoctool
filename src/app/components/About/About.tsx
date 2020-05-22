import * as React from 'react';
import { PageHeader } from '../Shared/PageHeader/PageHeader';

export const About = () => {
    return <React.Fragment>
        <PageHeader title="SharePoint Documentation tool" subtitle="Understand your SharePoint environment easily" />
        <p>
            SharePoint Central Administration and PowerShell are great tools to work with your farm and get all the info regarding it.
            But sometimes there is a need of a more handy and friendly and easy way to get an overview of configuration.
            This tool can be great when
        </p>
        <ul>
            <li>
                You want to quickly understand connections between different farm objects. For example:
                    <ul>
                    <li>Web applications</li>
                    <li>Application pools</li>
                    <li>Managed accounts</li>
                </ul>
            </li>
            <li>
                You are working with a customer who cannot provide remote access and sharing a screen to get all the details is time consuming.
                </li>
            <li>
                You are planning your migration and do not want to use RDP all the time.
                </li>
            <li>
                You are to upgrade your farm and want to quickly estimate
                    <ul>
                    <li>
                        How long your migration will take?
                        </li>
                    <li>
                        How much disk space will you need?
                        </li>
                    <li>
                        Are there any custom solutions that can influence your migration?
                        </li>
                    <li>
                        What is the current farm architecture?
                        </li>
                </ul>
            </li>
        </ul>
        <div>
            <a href="https://github.com/zzindexx/spdoctool" target="_blank">Find project on GitHub</a>
        </div>
    </React.Fragment>;
}