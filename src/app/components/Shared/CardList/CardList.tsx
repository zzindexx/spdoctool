import * as React from 'react';
import { IBasicEntity } from '../../../../types/state/IAppState';
import { Card } from '../Card/Card';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ICardListProps {
    title: string;
    headerLink?: string;
    collection: IBasicEntity[] | any[];
    idField?: string;
    displayField?: string;
    itemLink?: string;
}

interface ICardListState {
    currentPage: number;
    totalPages: number;
}

export const CardList = (props: ICardListProps) => {
    return <Card title={props.title} headerLink={props.headerLink ? props.headerLink : undefined}>
        <ErrorBoundary>
            <CardListInternal {...props} />
        </ErrorBoundary>
    </Card>
}

class CardListInternal extends React.PureComponent<ICardListProps, ICardListState> {
    pageSize: number = 15;

    constructor(props: ICardListProps) {
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

        const pageItems: any[] = this.props.collection.slice((this.state.currentPage - 1) * this.pageSize, (this.pageSize * this.state.currentPage));

        let { idField, displayField } = this.props;
        let items: JSX.Element[];
        if (idField && displayField) {
            items = (pageItems as any[]).map((item: IBasicEntity) => (
                <li key={item[idField]} className="list-group-item">
                    {this.props.itemLink ? <Link to={`${this.props.itemLink}/${item[idField]}`}>{item[displayField]}</Link> : item[displayField]}
                </li>
            ));
        } else {
            items = (pageItems as IBasicEntity[]).map((item: IBasicEntity) => (
                <li key={item.id} className="list-group-item">
                    {this.props.itemLink ? <Link to={`${this.props.itemLink}/${item.id}`}>{item.name}</Link> : item.name}
                </li>
            ));
        }

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