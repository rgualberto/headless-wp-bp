///////////////////////////////////////////////////////
// Fetches data from API and renders template
// based on properties passed from router.
// Also handles loading meta data per template.
///////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'qs';

import AsyncChunks from '../../utilities/AsyncLoader';
import canUseDom from '../../../utilities/canUseDom';
import {getDataBySlug} from '../../../reducers/wpDataReducer';
import api from '../../../api';

const AsyncDefault = AsyncChunks.generateChunk(() =>
	import( /* webpackChunkName: "Default" */ '../Default'));

const AsyncHome = AsyncChunks.generateChunk(() =>
	import( /* webpackChunkName: "Home" */ '../Home'));

const AsyncAbout = AsyncChunks.generateChunk(() =>
	import( /* webpackChunkName: "About" */ '../About'));

const AsyncPost = AsyncChunks.generateChunk(() =>
	import( /* webpackChunkName: "Post" */ '../Post'));

const AsyncCampaign = AsyncChunks.generateChunk(() =>
	import( /* webpackChunkName: "Campaign" */ '../Campaign'));

const templates = {
	home: AsyncHome,
	default: AsyncDefault,
	about: AsyncAbout,
	post: AsyncPost,
	campaign: AsyncCampaign
}

class LoadTemplate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			preview: false,
			template: this.props.template ? this.props.template : 'default',

			// Slug will either come from a prop or a URL param from Router
			// Necessary because some slugs come from URL params
			slug: this.props.slug
				? this.props.slug
				: this.props.match.params.slug
		}

		this.fetchData();
	}

	checkForPreview() {
		if (canUseDom) {
			let params = [];

			params = queryString.parse(
				window.location.search,
				{ ignoreQueryPrefix: true }
			);

			if (params.preview === 'true' && params._wpnonce && this.state.preview === false) {
				if (params.id) {
					api.Content.previewDataById( this.props.type, params.id, params._wpnonce).then(
						res => {
							this.setState({ preview: res });
						},
						error => {
							console.warn(error);
							this.props.history.push('/not-found');
						}
					);
				} else {
					api.Content.previewDataBySlug( this.props.type, this.state.slug, params._wpnonce).then(
						res => {
							this.setState({ preview: res })
						},
						error => {
							console.warn(error);
							this.props.history.push('/not-found');
						}
					);
				}
			}
		}
	}

	fetchData() {
		if (!this.props.data[this.props.type] || !this.props.data[this.props.type][this.state.slug]) {
			const dataType = this.props.type === "post" ? "posts" : this.props.type;

			this.props.getDataBySlug(dataType, this.state.slug, this.props.type);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.slug !== this.props.match.params.slug) {
			this.setState({
				slug: this.props.match.params.slug
			})
		}
	}

	render() {
		this.checkForPreview();

		let data = this.state.preview;

		if (!this.state.preview && this.props.data[this.props.type] && this.props.data[this.props.type][this.state.slug]) {
			data = this.props.data[this.props.type][this.state.slug];
		}

		let Meta = () => null;

		const Template = templates[this.state.template];

		if (!Template) {
			return <Redirect to="/not-found"/>;
		}

		if (data) {
			Meta = () => {
				return (
					<Helmet>
						<title>{data.acf.metaTitle}</title>
						<meta name="description" content={data.acf.metaDescription} />
						<meta name="keywords" content={data.acf.metaKeywords} />
					</Helmet>
				)
			}
		}

		return (
			<div className="template-wrap">
				<Meta />

				<Template
					data={data}
					slug={this.state.slug}
					allPosts={this.props.allPosts}
					allPages={this.props.allPages}
					allCampaigns={this.props.allCampaigns}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.wpDataReducer.data
});

const mapDispatchToProps = dispatch => ({
	getDataBySlug: bindActionCreators(getDataBySlug, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadTemplate);
