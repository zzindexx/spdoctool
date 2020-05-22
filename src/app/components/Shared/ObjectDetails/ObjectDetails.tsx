import * as React from 'react';
import { PageHeader } from '../PageHeader/PageHeader';
import { Card } from '../Card/Card';
import { SummaryTable, ITableRow } from '../SummaryTable/SummaryTable';
import { IBasicEntity } from '../../../../types/state/IAppState';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface IObjectDetailsProps {
    object: IBasicEntity;
    title: string;
    backLinkTitle: string;
    backLinkUrl: string;
    rows: ITableRow[];
}

export const ObjectDetails = (props: IObjectDetailsProps) => {
    return <ErrorBoundary>
        <ObjectDetailsInternal {...props} />
    </ErrorBoundary>;
}

const ObjectDetailsInternal = (props: IObjectDetailsProps) => {
    return <React.Fragment>
        <PageHeader title={`${props.title} - ${props.object.name}`} />
        <div className="row">
            <div className="col">
                <Link to={props.backLinkUrl}>
                    <i className="fas fa-arrow-left mr-1"></i>
                    {props.backLinkTitle}
                </Link>
                <SummaryTable title={`${props.title} details`} object={props.object} rows={props.rows} />
            </div>
        </div>
    </React.Fragment>;
};