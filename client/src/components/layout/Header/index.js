import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {getMenu} from '../../../reducers/wpDataReducer';

import './index.css';

class Header extends Component {

	constructor(props) {
		super(props);
		this.props.getMenu('main')
		this.buildMenu = this.buildMenu.bind(this);
	}

	buildMenu() {
		if (this.props.mainMenu) {
			return this.props.mainMenu.map((item, i) => {
				return (
					<Link key={item.ID} to={item.url}>{item.title}</Link>
				);
			})
		}

		return null;
	}

	render() {
		return (
			<header className="header-main">
				<nav>
					{this.buildMenu()}
				</nav>
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	mainMenu: state.wpDataReducer.menus.main
});

const mapDispatchToProps = (dispatch) => ({
	getMenu: bindActionCreators(getMenu, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
