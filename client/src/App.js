import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AsyncChunks from './components/utilities/AsyncLoader';
import NotFound from './components/templates/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadTemplate from './components/templates/LoadTemplate';
import {getPagesList} from './reducers/wpDataReducer';
import stylesheet from './globals/page.css'

class App extends Component {

	constructor(props) {
		super(props);

		this.buildRoutes = (pages) => {

			if (this.props.pageList && this.props.pageList.length > 0) {
				return [
					<Route
						key="posts"
						render={(props)=>
							<LoadTemplate
							{...props}
							template="post"
							type="post" />
						}
						exact
						path="/post/:slug"/>,
					<Route
						key="campaign"
						render={(props)=>
							<LoadTemplate
							{...props}
							template="campaign"
							type="campaign" />
						}
						exact
						path="/campaign/:slug"/>,

					pages.map((route, i) => {
						// If home, set path to empty string, = '/'
						if (route.slug === 'home') {
							route.path = '';
						}

						// If template is blank, set to default
						if (route.template === '') {
							route.template = 'default'
						}

						// Default WP REST API expects /pages/ and /posts/ formatting
						// Custom post types are all singular (sigh)
						route.type = route.type === 'page'
							? 'pages'
							: route.type === 'post'
							? 'posts'
							: route.type;

						return (
							<Route
								render={ (props)=>
									<LoadTemplate
									{...props}
									template={route.template}
									slug={route.slug}
									type={route.type} />
								}
								exact
								key={i}
								path={`/${decodeURIComponent(route.path)}`}/>
						)
					}),

					<Route exact key="wp-draft" page="/wp-draft" render={props =>
						<LoadTemplate {...props} slug={'wp-draft'} type={'pages'} />} />,

					<Route key="not-found" component={NotFound} />
				]
			}
		}
	}

	componentDidMount() {
		this.props.getPagesList()

		// Over-eager load code split chunks
		// Two seconds after App mounts (wait for more important resources)
		setTimeout(AsyncChunks.loadChunks, 2 * 1000);
	}

	render() {
		return (
			<div className={`app`}>
				<Header />
				<Switch>
					{ this.buildRoutes(this.props.pageList) }
				</Switch>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	pageList: state.wpDataReducer.lists.pages
});

const mapDispatchToProps = (dispatch) => ({
	getPagesList: bindActionCreators(getPagesList, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
