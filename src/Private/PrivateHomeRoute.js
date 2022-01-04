import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';


export default function PrivateHomeRoute({ component: Component, ...rest }) {
    const authValue = React.useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                return authValue.currentUser ? <Redirect to="/user" /> : <Component {...props} />
            }}
        >
        </Route>
    )
}
