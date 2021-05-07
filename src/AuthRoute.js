
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { auth } from './Firebase/config';

const AuthRoute = ({ component: Component, ...rest }) => {
	const user = auth.currentUser

	if (!Component) {
		return null;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect to={'/'} />
				)
			}
		/>
	);
};

export default AuthRoute;