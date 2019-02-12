import React, { Component } from 'react';

import ContentBlock from '../../utilities/ContentBlock';

import './index.css';

class Campaign extends Component {

	render() {

		if (this.props.data) {

			const data = this.props.data;

			return (
				<article className={`${this.props.slug}`}>
					<h1>{data.title.rendered}</h1>
					<ContentBlock content={data.content.rendered} />
				</article>
			);
		}

		return null;
	}
}

export default Campaign;
