import React from 'react';
// import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// Assets
// import { theme } from './utils';

// Imported Components
import { GlobalStyle } from './utils';
import Login from './organisms/Login';
import ProtectedRoute from './molecules/ProtectedRoute';
import Panel from './organisms/Panel';

// Exported Component
function App() {
	return (
		<div className='App'>
			<RecoilRoot>
				<Router>
					<GlobalStyle />
					<Switch>
						<Route exact path='/'>
							<Link to='/login'>Link to login</Link>
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<React.Suspense fallback={<h2>Loading...</h2>}>
							<ProtectedRoute
								path='/protected'
								exact
								component={Panel}
							/>
						</React.Suspense>
					</Switch>
				</Router>
			</RecoilRoot>
		</div>
	);
}

export default App;
