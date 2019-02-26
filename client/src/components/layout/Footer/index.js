import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './index.css';

class Footer extends Component {

	render() {
		const {
      logo
    } = this.props;

		return (
			<footer className="footer theme--grey">
        <div className="footer__inner">

          <div className="grid">

            <div className="media-links">
              <div className="grid">
                <a href="https://twitter.com/machineq">
                  <img src="http://smartcities.mq.machineq.com/images/icon-twitter.png" alt="twitter icon" />
                </a>

                <a href="https://www.linkedin.com/showcase/machineq/">
                  <img src="http://smartcities.mq.machineq.com/images/icon-linkedin.png" alt="linkedin icon" />
                </a>
              </div>
            </div>

            <div className="terms">
              <p className="para3">© 2019 MachineQ™ - All Rights Reserved - <a className="para3" href="https://www.xfinity.com/corporate/legal/visitorAgreement">Terms of Service</a> - <a className="para3" href="https://www.xfinity.com/corporate/legal/privacyStatement">Privacy Policy</a></p>
            </div>

            <div className="footer__logo-img">
              <img src={logo} alt="mq logo" />
            </div>

          </div>

        </div>
      </footer>
		);
	}
}

Footer.propTypes = {
  logo: PropTypes.string
};

export default Footer;
