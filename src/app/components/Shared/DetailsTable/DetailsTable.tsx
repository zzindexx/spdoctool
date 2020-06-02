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
    headerLink?: string;
}
interface IDetailsTableIntenralProps {
    title: string;
    collection: any[];
    columns: ITableColumn[];
    sortColumn: string;
    sortOrder: 'asc' | 'desc';
    pageSize: number;

}

interface IDetailsTableState {
    sortColumn: string;
    sortOrder: 'asc' | 'desc';
    pageSize: number;
}

interface IDetailsTableInternalState {
    currentPage: number;
    totalPages: number;
}

export class DetailsTable extends React.PureComponent<IDetailsTableProps, IDetailsTableState> {
    constructor(props: IDetailsTableProps) {
        super(props);

        this.state = {
            sortColumn: 'name',
            sortOrder: 'asc',
            pageSize: 50
        }
    }

    setSort = (sortColumn: string, sortOrder: 'asc' | 'desc') => {
        this.setState({
            sortColumn: sortColumn,
            sortOrder: sortOrder
        });
    }

    setPageSize = (size: number) => {
        this.setState({
            pageSize: size
        });
    }

    render() {
        const pageSizeSelector: JSX.Element = this.props.collection.length <= 25 ? null : <React.Fragment>
            <div className="dropdown">
                <button className="btn btn-light dropdown-toggle btn-sm" type="button" id="pageSizeDropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-align-right mr-1">
                    </i>
                            Page Size
                    </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="pageSizeDropDownMenu">

                    <button className={`dropdown-item ${this.state.pageSize === 25 ? 'active' : ''}`} type="button" onClick={(e) => this.setPageSize(25)}>25</button>
                    <button className={`dropdown-item ${this.state.pageSize === 50 ? 'active' : ''}`} type="button" onClick={(e) => this.setPageSize(50)}>50</button>
                    <button className={`dropdown-item ${this.state.pageSize === 100 ? 'active' : ''}`} type="button" onClick={(e) => this.setPageSize(100)}>100</button>
                    <button className={`dropdown-item ${this.state.pageSize === 250 ? 'active' : ''}`} type="button" onClick={(e) => this.setPageSize(250)}>250</button>
                </div>
            </div>
        </React.Fragment>;

        const sortingSelector: JSX.Element = this.props.columns.filter((col: ITableColumn) => col.sortable).length === 0 ? null : <React.Fragment>
            <div className="dropdown ml-1">
                <button className="btn btn-light dropdown-toggle btn-sm" type="button" id="sortDropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-align-right mr-1">
                    </i>
                        Sorting
                    </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sortDropDownMenu">
                    {this.props.columns.filter((col: ITableColumn) => col.sortable).map((col: ITableColumn) => {
                        const sortColumnName: string = col.sortPropertyName ? col.sortPropertyName : col.name;
                        return <React.Fragment key={col.title}>
                            <button className={`dropdown-item ${this.state.sortColumn === sortColumnName && this.state.sortOrder === 'asc' ? 'active' : ''}`} type="button" onClick={(e) => this.setSort(sortColumnName, 'asc')}>Ascending: {col.title}</button>
                            <button className={`dropdown-item ${this.state.sortColumn === sortColumnName && this.state.sortOrder === 'desc' ? 'active' : ''}`} type="button" onClick={(e) => this.setSort(sortColumnName, 'desc')}>Descending: {col.title}</button>
                        </React.Fragment>;
                    })}
                </div>
            </div>
        </React.Fragment>;

        return <div className="card">
            {this.props.title.length > 0 && <div className="card-header-tab card-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <div>
                    {this.props.headerLink ? <Link to={this.props.headerLink}>{this.props.title}</Link> : this.props.title}
                </div>
                <div className="btn-group">
                    {pageSizeSelector}
                    {sortingSelector}
                </div>
            </div>}
            <div className="card-body">
                <ErrorBoundary>
                    <DetailsTableInternal {...this.props} sortColumn={this.state.sortColumn} sortOrder={this.state.sortOrder} pageSize={this.state.pageSize} />
                </ErrorBoundary>
            </div>
        </div>;
    }
}

class DetailsTableInternal extends React.PureComponent<IDetailsTableIntenralProps, IDetailsTableInternalState> {
    constructor(props: IDetailsTableIntenralProps) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1
        }
    }

    componentDidMount() {
        this.setState({
            currentPage: 1,
            totalPages: Math.floor(this.props.collection.length / this.props.pageSize) + 1
        });
    }

    componentDidUpdate(prevProps: IDetailsTableIntenralProps, prevState: IDetailsTableInternalState) {
        if (this.props.pageSize !== prevProps.pageSize) {
            this.setState({
                currentPage: 1,
                totalPages: Math.floor(this.props.collection.length / this.props.pageSize) + 1
            });
        }

    }

    setActivePage = (page: number) => {
        this.setState({
            currentPage: page
        });
    }

    render() {
        if (this.props.collection.length === 0 || this.props.columns.length === 0)
            return null;

        const pageItems: any[] = this.props.collection.sort((a: any, b: any) => {
            if (this.props.sortOrder === 'asc') {
                return a[this.props.sortColumn] > b[this.props.sortColumn] ? 1 : -1;
            }
            else {
                return a[this.props.sortColumn] > b[this.props.sortColumn] ? -1 : 1;
            }
        }).slice((this.state.currentPage - 1) * this.props.pageSize, (this.props.pageSize * this.state.currentPage));

        if (pageItems.length === 0)
            return null;


        const tableHeader: JSX.Element = <tr>
            {
                this.props.columns.map((col: ITableColumn) => <th scope="col" key={col.name}>
                    {col.title}
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


        return (
            <React.Fragment>
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