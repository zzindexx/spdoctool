import * as React from 'react';
import { Link } from "react-router-dom";
import { BasicEntity, IBasicEntity } from '../../../../types/state/BasicEntity';
import { Card } from '../Card/Card';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export interface ITableColumn {
    name: string;
    title: string;
    linkPath?: string;
    sortable?: boolean;
    sortPropertyName?: string;
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
    sortColumn: string;
    sortOrder: 'asc' | 'desc';
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
            pageSize: 50,
            sortColumn: 'name',
            sortOrder: 'asc'
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

    setSort = (col: ITableColumn) => {
        if (this.state.sortColumn === col.name || this.state.sortColumn === col.sortPropertyName) {
            this.setState({
                sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
            });
        } else {
            this.setState({
                sortColumn: col.sortPropertyName ? col.sortPropertyName : col.name,
                sortOrder: 'asc'
            });
        }
        
    }

    render() {
        if (this.props.collection.length === 0 || this.props.columns.length === 0)
            return null;

        const pageItems: any[] = this.props.collection.sort((a: any, b: any) => {
            if (this.state.sortOrder === 'asc') {
                return a[this.state.sortColumn] > b[this.state.sortColumn] ? 1 : -1;
            }
            else {
                return a[this.state.sortColumn] > b[this.state.sortColumn] ? -1 : 1;
            }
        }).slice((this.state.currentPage - 1) * this.state.pageSize, (this.state.pageSize * this.state.currentPage));
        
        if (pageItems.length === 0)
            return null;


        const tableHeader: JSX.Element = <tr>
            {
                this.props.columns.map((col: ITableColumn) => <th scope="col" key={col.name}>
                    {col.title}
                    {
                        typeof (col.sortable) !== undefined && col.sortable && <span className="ml-3">
                            {(this.state.sortColumn === col.name || this.state.sortColumn === col.sortPropertyName) && this.state.sortOrder === 'asc' && <a href='#' onClick={(e) => { e.preventDefault(); this.setSort(col) }}><i className="fas fa-sort-alpha-up"></i></a>}
                            {(this.state.sortColumn === col.name || this.state.sortColumn === col.sortPropertyName) && this.state.sortOrder === 'desc' && <a href='#' onClick={(e) => { e.preventDefault(); this.setSort(col) }}><i className="fas fa-sort-alpha-down"></i></a>}
                            {(this.state.sortColumn !== col.name && this.state.sortColumn !== col.sortPropertyName) && <a href='#' onClick={(e) => { e.preventDefault(); this.setSort(col) }}><i className="fas fa-sort-alpha-up text-secondary"></i></a>}
                        </span>
                    }
                </th>)
            }
        </tr>;

        const itemRows: JSX.Element[] = pageItems.map((item: any) => {
            const itemCells: JSX.Element[] = this.props.columns.map((col: ITableColumn) => {
                const itemCellValue = item[col.name];
                let itemCellValueElement: JSX.Element = null;

                if (typeof (itemCellValue) !== undefined && itemCellValue !== null) {
                    switch (typeof (itemCellValue)) {
                        case 'string':
                        case 'number':
                            itemCellValueElement = col.linkPath ? <Link to={`${col.linkPath}/${item.id}`}>{itemCellValue.toString()}</Link> : <React.Fragment>{itemCellValue.toString()}</React.Fragment>;
                            break;
                        case 'boolean':
                            itemCellValueElement = col.linkPath ? <Link to={`${col.linkPath}/${item.id}`}>{itemCellValue.toString()}</Link> : <React.Fragment>{itemCellValue.toString()}</React.Fragment>;
                            break;
                        case 'object':
                            if (Array.isArray(itemCellValue)) {
                                itemCellValueElement = <React.Fragment>
                                    {(itemCellValue as Array<any>).length > 0 && (itemCellValue as Array<any>).map((v: any) => <div key={v} className="row"><div className="col">{v}</div></div>)}
                                </React.Fragment>;
                            } else {
                                itemCellValueElement = col.linkPath ? <Link to={`${col.linkPath}/${itemCellValue.id}`}>{itemCellValue.name}</Link> : <React.Fragment>{itemCellValue.name}</React.Fragment>;
                            }
                            break;
                    }
                }
                return <td key={`item${item.id}-${col.name}`}>
                    {itemCellValueElement}
                </td>
            })
            return <tr key={item.id}>
                {itemCells}
            </tr>
        });

        const pagination: JSX.Element = this.state.totalPages === 1 ? null : <React.Fragment>
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
                <table className="table" >
                    <thead>
                        {tableHeader}
                    </thead>
                    <tbody>
                        {itemRows}
                    </tbody>
                </table>
                {pagination}
            </React.Fragment >
        );
    }
}