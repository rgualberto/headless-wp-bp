import React, { Component } from 'react';

import ContentBlock from '../../utilities/ContentBlock';
import Button from '../../base/button/Button.jsx';

import './index.css';

class Default extends Component {

	render() {

		if (this.props.data) {

			let data = this.props.data;

			return (
				<article className={`${this.props.slug} default-template test`}>
					<h1>{data.title.rendered}</h1>

						<Button
							type="button"
							onClick={() => console.log('testtttt')}
							displayType="primary"
							text="Test"
						/>

					<ContentBlock content={data.content.rendered} />
				</article>
			);
		}

		return null;
	}
}

export default Default;
