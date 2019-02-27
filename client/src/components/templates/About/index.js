import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import Header from '../../../components/layout/Header';
import Banner1 from '../../../components/layout/banner/Banner1';

import './index.css';

class About extends Component {
	constructor(props) {
    super(props);
  }

	render() {
		const {
      data
    } = this.props;
		const bannerConent = (
				`<p>Name the templates something like:</p>
				<ul>
					<li>Level 1 pages = A1 / A2 / A3</li>
					<li>Level 2 pages = B1 / B2 / B3</li>
					<li>The order of the template is set... and the data builds out the components in a set order</li>
				</ul>`
		);

		if (data) {
			return (
				<article className={`page page--template-default page--name-${data.slug}`}>

					<Header
						name="About Template"
						logo="http://smartcities.mq.machineq.com/images/MachineQ_Black_Logo.png"
						pageName={data.slug}
					/>

					<div data-fade-in={true}>
						<Banner1
							title={data.title.rendered}
							content={bannerConent}
						/>
					</div>

				</article>
			);
		}

		return null;
	}
}

export default About;
