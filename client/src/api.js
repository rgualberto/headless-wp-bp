import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_URL;

const responseBody = res => res.body;

const requests = {
	get: url =>
		superagent.get(`${API_ROOT}${url}`).then( responseBody ),
	getWithCredentials: url =>
		superagent.get(`${API_ROOT}${url}`).withCredentials().then( responseBody )
}

const Menus = {
	bySlug: (slug) =>
		requests.get(`/wp-json/react-wp-rest/menus/${slug}`)
}

const Content = {
	data: type =>
		requests.get(`/wp-json/wp/v2/${type}?_embed`),
	dataBySlug: (type, slug) =>
		requests.get(`/wp-json/wp/v2/${type}?slug=${slug}&_embed`),
	previewDataBySlug: (type, slug, wpnonce) =>
		requests.getWithCredentials(`/wp-json/react-wp-rest/preview?type=${type}&slug=${slug}&_wpnonce=${wpnonce}&_embed`),
	previewDataById: (type, id, wpnonce) =>
		requests.getWithCredentials(`/wp-json/react-wp-rest/preview?type=${type}&id=${id}&_wpnonce=${wpnonce}&status=draft&_embed`),
	pageList: () =>
		requests.get('/wp-json/react-wp-rest/pages/list'),
	postList: () =>
		requests.get('/wp-json/react-wp-rest/posts/list'),
	campaignList: () =>
		requests.get('/wp-json/react-wp-rest/campaigns/list')
}

export default {
	Menus,
	Content
}
