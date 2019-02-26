import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {getMenu} from '../../../reducers/wpDataReducer';
import classNames from 'classnames';
import _ from 'lodash';

import './index.css';

class Header extends Component {

	constructor(props) {
		super(props);
		this.props.getMenu('main')
		this.buildMenu = this.buildMenu.bind(this);
	}

	buildMenu() {
		const {
      pageName,
			mainMenu,
			customInnerMenu
    } = this.props;

		if (mainMenu && !customInnerMenu) {
			return mainMenu.map((item, i) => {
				const liClasses = classNames({
          "nav__item": true,
					"para2": true,
          "nav__item--current": _.toLower(pageName) === _.toLower(item.title)
        });

				return (
					<li key={item.object_id} className={liClasses}>
						<Link key={item.ID} to={item.url}>
							{item.title}
						</Link>
					</li>
				);
			})
		} else if (customInnerMenu) {
			return customInnerMenu.map((item, index) => {
        return (
          <li key={`label-${index}`} className="nav__item">
            <a className="para2" href={item.link}>{item.label}</a>
          </li>
        );
      });
		}

		return null;
	}

	render() {
		const {
      logo,
      name
    } = this.props;

		return (
			<header className="header">
        <div className="header__inner">

          <div className="grid">
            <div className="header__logo grid">
              <div className="header__logo-img">
								<Link to="/">
									<img src={logo} alt="mq logo" />
								</Link>
              </div>

              <span className="para2">{name}</span>
            </div>

            <nav className="nav">
              <ul className="grid">
                {this.buildMenu()}
              </ul>
            </nav>
          </div>

        </div>
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

Header.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string,
  customInnerMenu: PropTypes.array,
  pageName: PropTypes.string
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
