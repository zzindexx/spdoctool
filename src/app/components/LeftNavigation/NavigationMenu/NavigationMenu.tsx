import * as React from 'react';
import { NavigationHeader } from './../NavigationHeader/NavigationHeader';
import {
    NavLink
} from "react-router-dom";

interface INavigationLink {
    title: string;
    address: string;
    iconName?: string;
}

interface INavigationMenuProps {
    title: string;
    links: INavigationLink[]
}

export const NavigationMenu = (props: INavigationMenuProps) => {
    return (
        <React.Fragment>
            <NavigationHeader title={props.title} />
            <ul className="nav flex-column">
                {props.links.length > 0 && props.links.map((link: INavigationLink, index: number) => {
                    return <li className="nav-item ml-1" key={index}>
                        <NavLink exact={link.address === '/'} className="nav-link" to={link.address}>
                            {link.iconName && <i className={`mr-1 fas fa-${link.iconName}`}></i>}
                            {link.title}
                        </NavLink>
                    </li>;
                }
                )}
            </ul>
        </React.Fragment>
    );
}