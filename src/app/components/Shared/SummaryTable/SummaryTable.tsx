import * as React from 'react';
import { Link } from "react-router-dom";
import { Card } from '../Card/Card';

export interface ITableRow {
    rowTitle: string;
    rowProperty: string;
    linkUrl?: string;
}

interface ISummaryTableProps {
    rows: ITableRow[];
    object: any;
    title: string;
}

const changeUrlTokens = (item: any, url: string) => {
    let returnUrl = url;
    const regexp = /{[a-z]+}/g;
    const foundTokens = url.match(regexp);
    foundTokens.forEach((token: string) => {
        const propertyName: string = token.replace('{', '').replace('}', '');
        if (typeof item[propertyName] !== undefined) {
            returnUrl = returnUrl.replace(token, item[propertyName].toString());
        }
    });
    return returnUrl;
}

export const SummaryTable = (props: ISummaryTableProps) => {
    return (
        <Card title={props.title}>
            <table className="table">
                <tbody>
                    {props.object && props.rows.length > 0 && props.rows.map((tr: ITableRow) => {
                        const propValue = props.object[tr.rowProperty];
                        if (propValue === undefined || propValue === null)
                            return null;

                        let rowValue: JSX.Element;
                        let displayName: string;

                        //TODO: no ckeck for name field



                        switch (typeof (propValue)) {
                            case 'string':
                                displayName = propValue;
                                rowValue = tr.linkUrl ? <Link to={tr.linkUrl}>{displayName}</Link> : <React.Fragment>{displayName}</React.Fragment>;
                                break;
                            case 'boolean':
                                displayName = (propValue as boolean) ? 'Yes' : 'No';
                                rowValue = tr.linkUrl ? <Link to={tr.linkUrl}>{displayName}</Link> : <React.Fragment>{displayName}</React.Fragment>;
                                break;
                            case 'number':
                                displayName = propValue.toString();
                                rowValue = tr.linkUrl ? <Link to={tr.linkUrl}>{displayName}</Link> : <React.Fragment>{displayName}</React.Fragment>;
                                break;
                            case 'object':
                                if (Array.isArray(propValue)) {
                                    rowValue = <React.Fragment>
                                        {(propValue as Array<any>).length > 0 && (propValue as Array<any>).map((v: any) => <div key={v} className="row"><div className="col">{v}</div></div>)}
                                    </React.Fragment>;
                                } else {
                                    displayName = Object.keys(propValue).includes('name') ? propValue.name : propValue;
                                    rowValue = tr.linkUrl ? <Link to={changeUrlTokens(propValue, tr.linkUrl)}>{displayName}</Link> : <React.Fragment>{displayName}</React.Fragment>;
                                }

                                break;
                        }

                        return <tr key={tr.rowProperty}>
                            <th scope="row">{tr.rowTitle}</th>
                            <td>{rowValue}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </Card>
    );
}