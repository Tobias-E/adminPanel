import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Imported components
import { isAuthenticated } from '../atoms/Auth';

// Exported Component
const ProtectedRoute = ({ component: Component }) => {
	return (
		<Route
			render={(props) =>
				isAuthenticated() === true ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
};

export default ProtectedRoute;
