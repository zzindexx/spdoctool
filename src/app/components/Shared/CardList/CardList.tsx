import * as React from 'react';
import { BasicEntity } from '../../../../types/state/BasicEntity';
import { Card } from '../Card/Card';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

interface ICardListProps {
    title: string;
    headerLink?: string;
    collection: BasicEntity[];
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

        const pageItems: BasicEntity[] = this.props.collection.sort().slice((this.state.currentPage - 1) * this.pageSize, (this.pageSize * this.state.currentPage));
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