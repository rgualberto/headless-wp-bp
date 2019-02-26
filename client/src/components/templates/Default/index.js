import React, { Component } from 'react';
import _ from 'lodash';
import Header from '../../../components/layout/Header';
import Banner1 from '../../../components/layout/banner/Banner1';

import './index.css';

class Default extends Component {
	constructor(props) {
    super(props);
  }

	render() {
		const {
      data
    } = this.props;

		if (data) {
			return (
				<article className={`page page--template-default page--name-${data.slug}`}>

					<Header
						name="IoT"
						logo="http://smartcities.mq.machineq.com/images/MachineQ_Black_Logo.png"
						pageName={data.slug}
					/>

					<div data-fade-in={true}>
						<Banner1
							title={data.title.rendered}
							content={data.content.rendered}
						/>
					</div>

				</article>
			);
		}

		return null;
	}
}

export default Default;
