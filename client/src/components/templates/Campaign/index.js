import React, { Component } from 'react';
import Header from '../../../components/layout/Header';
import Heros from '../../../components/layout/hero/Heros';
import UseCases from '../../../components/layout/use-case/UseCases';

import './index.css';

class Campaign extends Component {

	render() {

		if (this.props.data) {

			const data = this.props.data;

			return (
				<article className={`page page--template-campaign page--name-${data.slug}`}>

					<Header
						name="Smart City"
						logo="http://smartcities.mq.machineq.com/images/MachineQ_Black_Logo.png"
						pageId={data.id}
						customInnerMenu={[
							{
								label: "Use Cases",
								link: "#use-cases"
							},
							{
								label: "Starter Kit",
								link: "#starter-kit"
							},
							{
								label: "Contact Us",
								link: "#contact-us"
							}
						]}
					/>

					<div data-fade-in={true}>
						{data.acf.heros &&
							<Heros
								heros={data.acf.heros}
							/>
						}

						{data.acf.use_cases &&
							<UseCases
								useCases={data.acf.use_cases}
							/>
						}
					</div>

				</article>
			);
		}

		return null;
	}
}

export default Campaign;
