import * as React from 'react';
import { BasicEntity, IBasicEntity } from '../../../../types/state/BasicEntity';
import { Card } from '../Card/Card';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ICardListProps {
    title: string;
    headerLink?: string;
    collection: BasicEntity[];
    itemLink?: string;
}

interface ICardListInternalProps {
    collection: BasicEntity[];
    itemLink?: string;
    sortOrder: 'asc' | 'desc';
}

interface ICardListState {
    sortOrder: 'asc' | 'desc';
}

interface ICardListInternalState {
    currentPage: number;
    totalPages: number;
}


export class CardList extends React.PureComponent<ICardListProps, ICardListState> {
    constructor(props: ICardListProps) {
        super(props);
        this.state = {
            sortOrder: 'asc'
        }
    }

    setSort = (order: 'asc' | 'desc') => {
        this.setState({
            sortOrder: order
        });
    }

    render() {
        let sortOrder: JSX.Element = null;
        if (typeof (this.props.collection) !== undefined && Array.isArray(this.props.collection) && this.props.collection.length > 1) {
            sortOrder = <React.Fragment>
                <div className="">
                    <div className="form-group" style={{marginBottom: 0}}>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Sort order">
                            <button type="button" onClick={(e) => { e.preventDefault(); this.setSort('asc'); }} className={`btn ${this.state.sortOrder === 'asc' ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}><i className="fas fa-arrow-up"></i></button>
                            <button type="button" onClick={(e) => { e.preventDefault(); this.setSort('desc'); }} className={`btn ${this.state.sortOrder === 'desc' ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}><i className="fas fa-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }
        return <div className="card">
            {this.props.title.length > 0 && <div className="card-header-tab card-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                
                    <div>
                        {this.props.title}
                    </div>
                    {sortOrder}
            </div>}
            <div className="card-body">
                <ErrorBoundary>
                    <CardListInternal {...this.props} sortOrder={this.state.sortOrder} />
                </ErrorBoundary>
            </div>

        </div>;
    }

}

class CardListInternal extends React.PureComponent<ICardListInternalProps, ICardListInternalState> {
    pageSize: number = 15;

    constructor(props: ICardListInternalProps) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1
        }
    }

    componentDidMount() {
        this.setState({
            currentPage: 1,
            totalPages: Math.round(this.props.collection.length / this.pageSize)
        });
    }

    setActivePage = (page: number) => {
        this.setState({
            currentPage: page
        });
    }



    render() {
        if (this.props.collection.length === 0)
            return null;

        const pageItems: BasicEntity[] = this.props.collection.sort((a: IBasicEntity, b: IBasicEntity) => {
            if (this.props.sortOrder === 'asc') {
                return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            }
            else {
                return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
            }
        }).slice((this.state.currentPage - 1) * this.pageSize, (this.pageSize * this.state.currentPage));
        let items: JSX.Element[];

        items = pageItems.map((item: BasicEntity) => (
            <li key={item.id} className="list-group-item">
                {this.props.itemLink ? <Link to={`${this.props.itemLink}/${item.id}`}>{item.name}</Link> : item.name}
            </li>
        ));

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

        return (<React.Fragment>
            <ul className="list-group">
                {items}
            </ul>
            {pagination}
        </React.Fragment>
        );
    }
}