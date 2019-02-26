// import './card.scss';
import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Card extends Component {
  render() {
    const {className} = this.props;
    const cardClassNames = classNames({
      "card": true,
      ...className && {[`${className}`]: true}
    });
    const passthroughProps = _.omit(this.props, ['className', 'children']);

    return (
      <div className={cardClassNames} {...passthroughProps}>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default Card;
