import * as React from 'react';
import { Link } from "react-router-dom";
import { IBasicEntity } from '../../../../types/state/IAppState';
import { Card } from '../Card/Card';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export interface ITableColumn {
    name: string;
    title: string;
    isLink: boolean;
    linkPath?: string;
    show: boolean;
}

interface IDetailsTableProps {
    title: string;
    collection: any[];
    columns: ITableColumn[];
}

interface IDetailsTableState {
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

export const DetailsTable = (props: IDetailsTableProps) => {
    return <Card title={props.title}>
        <ErrorBoundary>
            <DetailsTableInternal {...props} />
        </ErrorBoundary>
    </Card>;
}

class DetailsTableInternal extends React.PureComponent<IDetailsTableProps, IDetailsTableState> {
    constructor(props: IDetailsTableProps) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1,
            pageSize: 50
        }
    }

    componentDidMount() {
        this.setState({
            currentPage: 1,
            totalPages: Math.floor(this.props.collection.length / this.state.pageSize) + 1
        });
    }

    setActivePage = (page: number) => {
        this.setState({
            currentPage: page
        });
    }

    setPageSize = (size: number) => {
        this.setState({
            pageSize: size,
            totalPages: Math.floor(this.props.collection.length / size) + 1,
            currentPage: 1
        });
    }

    render() {
        const pageItems: any[] = this.props.collection.slice((this.state.currentPage - 1) * this.state.pageSize, (this.state.pageSize * this.state.currentPage));
        const pagination: JSX.Element = this.props.collection.length <= 25 ? null : <React.Fragment>
            <div className="d-flex justify-content-center mt-3">
                <nav>
                    <ul className="pagination pagination-sm flex-wrap justify-content-center">
                        {Array.from({ length: this.state.totalPages }, (v, k) => k + 1).map((pageNum: number) => {
                            const isActive: string = pageNum === this.state.currentPage ? "active" : "";
                            return <li key={pageNum} className={`page-item ${isActive}`}>
                                <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); this.setActivePage(pageNum); }} >{pageNum}</a>
                            </li>;
                        })}
                    </ul>
                </nav>
            </div>
        </React.Fragment>;
        const pageSizeSelection: JSX.Element = this.props.collection.length <= 25 ? null : <React.Fragment>
            <div className="d-flex justify-content-end">
                <div className="form-group">
                    <span className="align-middle mr-3">Page size:</span>
                    <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                        <button type="button" onClick={(e) => { e.preventDefault(); this.setPageSize(25); }} className={`btn ${this.state.pageSize === 25 ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}>25</button>
                        <button type="button" onClick={(e) => { e.preventDefault(); this.setPageSize(50); }} className={`btn ${this.state.pageSize === 50 ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}>50</button>
                        <button type="button" onClick={(e) => { e.preventDefault(); this.setPageSize(100); }} className={`btn ${this.state.pageSize === 100 ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}>100</button>
                        <button type="button" onClick={(e) => { e.preventDefault(); this.setPageSize(250); }} className={`btn ${this.state.pageSize === 250 ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}>250</button>
                    </div>
                </div>
            </div>
        </React.Fragment>;


        return (
            <React.Fragment>
                {pageSizeSelection}
                < table className="table" >
                    <thead>
                        <tr>
                            {this.props.columns.length > 0 && this.props.columns.filter((col: ITableColumn) => col.show).map((col: ITableColumn) => <th scope="col" key={col.name}>{col.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.columns.length > 0 && pageItems.length > 0 && pageItems.map((item: any) => {
                            return (
                                <tr key={item.id ?? item[this.props.columns[0].name]}>
                                    {this.props.columns.filter((col: ITableColumn) => col.show).map((col: ITableColumn) => {
                                        const itemValue = item[col.name];

                                        if (typeof itemValue === undefined)
                                            return null;

                                        let displayValue: JSX.Element = <React.Fragment></React.Fragment>;
                                        switch (typeof (itemValue)) {
                                            case 'string':
                                            case 'number':
                                                if (col.isLink) {
                                                    displayValue = <Link to={`${col.linkPath}/${item.id}`}>{itemValue.toString()}</Link>
                                                } else {
                                                    displayValue = <React.Fragment>{itemValue.toString()}</React.Fragment>
                                                }
                                                break;
                                            case 'boolean':
                                                if (col.isLink) {
                                                    displayValue = <Link to={`${col.linkPath}/${item.id}`}>{itemValue ? 'Yes' : 'No'}</Link>
                                                } else {
                                                    displayValue = <React.Fragment>{itemValue ? 'Yes' : 'No'}</React.Fragment>
                                                }
                                                break;
                                            case 'object':
                                                if (itemValue === null) {
                                                    displayValue = <React.Fragment></React.Fragment>;
                                                }
                                                else if (Array.isArray(itemValue) && itemValue.length > 0) {
                                                    if (itemValue[0].id && itemValue[0].name) {
                                                        displayValue = <React.Fragment>
                                                            {!col.isLink && (itemValue as Array<IBasicEntity>).map((s: IBasicEntity) => <div key={s.id} className="row">{s.name}</div>)}
                                                            {col.isLink && (itemValue as Array<IBasicEntity>).map((s: IBasicEntity) => <div key={s.id} className="row"><div className="col"><Link to={`${col.linkPath}/${s.id}`}>{s.name}</Link></div></div>)}
                                                        </React.Fragment>;
                                                    } else {
                                                        displayValue = <React.Fragment>
                                                            {!col.isLink && (itemValue as Array<any>).map((s: any) => <div key={s} className="row">{s}</div>)}
                                                            {col.isLink && (itemValue as Array<any>).map((s: any) => <div key={s} className="row"><div className="col"><Link to={`${col.linkPath}/${s}`}>{s}</Link></div></div>)}
                                                        </React.Fragment>
                                                    }
                                                } else {
                                                    //TODO os IBasicEntity
                                                    if (Object.keys(itemValue).includes('name')) {
                                                        if (col.isLink && Object.keys(itemValue).includes('id')) {
                                                            displayValue = <Link to={`${col.linkPath}/${itemValue.id}`}>{itemValue.name}</Link>;
                                                        } else {
                                                            displayValue = <React.Fragment>{itemValue.name}</React.Fragment>
                                                        }

                                                    } else {
                                                        displayValue = <React.Fragment>{itemValue}</React.Fragment>
                                                    }
                                                }
                                                break;
                                            default:
                                                displayValue = <React.Fragment>{itemValue}</React.Fragment>;
                                                break
                                        }

                                        return <td key={`${item.id ?? item[this.props.columns[0].name]}-${col.name}`}>
                                            {displayValue}
                                        </td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table >
                {pagination}
            </React.Fragment >
        );
    }
}