import './button.scss';
import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import isRequiredIf from 'react-proptype-conditional-require';

const { string } = PropTypes;

export class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipActive: false
    };
  }

  toggleTooltip(isActive) {
    this.setState({tooltipActive: isActive});
  }

  swallowAnchorEvent(event) {
    event.preventDefault();
  }

  render() {
    const {
      a11yText,
      ariaExpanded,
      ariaOwns,
      action,
      disabled,
      icon,
      id,
      link,
      onClick,
      orientation,
      displayType,
      text,
      tooltipAction,
      tooltip,
      type
    } = this.props;
    const { tooltipActive } = this.state;
    const tooltipExists = !_.isUndefined(tooltip);

    const buttonClasses = classNames({
      "button": true,
      "button--primary": displayType === "primary",
      "button--secondary": displayType === "secondary",
      "button--tertiary": displayType === "tertiary",
      "button--text": displayType === "text",
      "button--disabled": disabled,
      "button--has-icon": icon && displayType !== "icon",
      "button--icon-only": displayType === "icon",
      "button--vertical": orientation === "vertical",
      "_has-tooltip": tooltipExists,
      "_open-tooltip": tooltipActive
    });

    const contentClasses = classNames({
      "button__content": true,
      "grid": displayType !== "text"
    });

    let Tooltip = tooltipExists ? React.cloneElement(tooltip, {toggled: tooltipActive}) : null;

    const buttonContents = (
      <Fragment>
        <span className={contentClasses}>
          {icon &&
            <svg className={`ui-icon ui-icon--${icon}`} aria-hidden="true">
              <use xlinkHref={'/assets/images/svg/mqIcons.svg#' + _.toLower(icon)}/>
            </svg>
          }

          {(text && displayType !== 'icon') &&
            <span className="button__text caption1"><b>{text}</b> </span>
          }

          {a11yText &&
            <span className="vh"> {a11yText}</span>
          }
        </span>

        {Tooltip}

      </Fragment>
    );

    return (
      <Fragment>
        {(type === "button") &&
          <button
            id={id}
            aria-owns={ariaOwns}
            aria-expanded={ariaExpanded}
            disabled={disabled}
            onClick={onClick}
            type={action ? action : 'button'}
            className={buttonClasses}
            {...(tooltipExists && tooltipAction === "hover") && {
              onMouseEnter: this.toggleTooltip.bind(this, true),
              onMouseLeave: this.toggleTooltip.bind(this, false)
            }}
            {...(tooltipExists && tooltipAction === "click") && {
              onClick: tooltipActive ? this.toggleTooltip.bind(this, false) : this.toggleTooltip.bind(this, true)
            }}
          >

            {buttonContents}

          </button>
        }

        {(type === "anchor") &&
          <a
            id={id}
            aria-owns={ariaOwns}
            aria-expanded={ariaExpanded}
            href={link}
            className={buttonClasses}
            onClick={ariaOwns ? this.swallowAnchorEvent.bind(this) : onClick}
            {...(tooltipExists && tooltipAction === "hover") && {
              onMouseEnter: this.toggleTooltip.bind(this, true),
              onMouseLeave: this.toggleTooltip.bind(this, false)
            }}
          >

            {buttonContents}

          </a>
        }
      </Fragment>
    );
  }
}

Button.defaultProps = {
  tooltipAction: "hover",
  onClick: _.noop(),
  orientation: "horizontal"
};

Button.propTypes = {
  a11yText: PropTypes.string,
  action: PropTypes.oneOf(['submit']),
  ariaExpanded: PropTypes.bool,
  ariaOwns: PropTypes.string,
  disabled: PropTypes.bool,
  displayType: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text', 'icon']).isRequired,
  icon: isRequiredIf(string, props => props.displayType === 'icon'),
  id: PropTypes.string,
  link: isRequiredIf(string, props => props.type === 'anchor'),
  onClick: PropTypes.func,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  text: isRequiredIf(string, props => props.displayType !== 'icon'),
  tooltip: PropTypes.element,
  tooltipAction: PropTypes.oneOf(['hover', 'click']),
  type: PropTypes.oneOf(['button', 'anchor']).isRequired
};

export default Button;
