import * as React from 'react';
import { Link } from "react-router-dom";

interface ICardProps {
    title: string;
    headerLink?: string;
    children: any;
}

export const Card = (props: ICardProps) => {
    const title: JSX.Element = props.headerLink ? <Link to={props.headerLink}>{props.title}</Link> : <React.Fragment>{props.title}</React.Fragment>;
    return (
        <div className="card">
            {props.title.length > 0 && <div className="card-header-tab card-header">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    {title}
                </div>
            </div>}
            <div className="card-body">
                {props.children}
            </div>
            
        </div>
    );
}

//<div className="card-body">
//<h5 className="card-title"></h5>
                
//</div>
//<div className="btn-actions-pane-right text-capitalize">
//<button className="btn-wide btn-outline-2x mr-md-2 btn btn-outline-focus btn-sm">View All</button>
//</div>