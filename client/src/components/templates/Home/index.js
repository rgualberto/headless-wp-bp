import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Header from '../../../components/layout/Header';
import Banner1 from '../../../components/layout/banner/Banner1';
import Card from "../../../components/base/cards/Card.js";

import './index.css';

class Home extends Component {
	constructor(props) {
    super(props);
  }

	cardLinks(linkType) {
		return linkType.map((item, index) => {
			let path;

	    switch (item.type) {
	      case "post":
	        path = `post/${item.path}`;
	        break;
	      case "campaign":
	        path = `campaign/${item.path}`;
	        break;
	      default:
	        path = item.path;
	    }

			return (
				<li key={`${item.path}--${index}`}>
					<Link to={path}>
						{item.slug}
					</Link>
				</li>
			);
		});
	}

	render() {
		const {
      data
    } = this.props;

		if (data) {
			return (
				<article className={`component-base page page--template-home page--name-${data.slug}`}>

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

						<div className="cards-wrap grid">
							<Card>
								<h2>Posts</h2>
								<ul>
									{this.cardLinks(this.props.allPosts)}
								</ul>
							</Card>

							<Card>
								<h2>Pages</h2>
								<ul>
									{this.cardLinks(this.props.allPages)}
								</ul>
							</Card>

							<Card>
								<h2>Campaigns</h2>
								<ul>
									{this.cardLinks(this.props.allCampaigns)}
								</ul>
							</Card>
						</div>

					</div>

				</article>
			);
		}

		return null;
	};
};

export default Home;
