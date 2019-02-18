import { arrayToObject } from '../utilities/convertData';
import postTypes from '../post-types';

export const GET_DATA = 'wp_data/GET_DATA';
export const SET_DATA = 'wp_data/SET_DATA';
export const GET_DATA_BY_SLUG = 'wp_data/GET_DATA_BY_SLUG';
export const SET_DATA_BY_SLUG = 'wp_data/SET_DATA_BY_SLUG';
export const GET_PAGES_LIST = 'wp_data/GET_PAGES_LIST';
export const SET_PAGES_LIST = 'wp_data/SET_PAGES_LIST';
export const GET_MENU = 'wp_data/GET_MENU';
export const SET_MENU = 'wp_data/SET_MENU';
export const CLEAR_API_CONTENT = 'wp_data/CLEAR_API_CONTENT';
export const CLEAR_API_DATA_BY_SLUG = 'wp_data/CLEAR_API_DATA_BY_SLUG';

const postTypeDefaultState = arrayToObject(postTypes);

export const initialState = {
	data: {
		...postTypeDefaultState
	},
	menus: {},
	lists: {
		pages: []
	}
}

export const wpDataReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_DATA:
        return {
					...state,
					data: {
						...state.data,
						[action.payload.type]: arrayToObject(action.payload.data, 'slug')
					}
				}
			case SET_DATA_BY_SLUG:
				return {
					...state,
					data: {
						...state.data,
						[action.payload.type]: {
							...state.data[action.payload.type],
							[action.payload.slug]: action.payload.data[0]
						}
					}
				};

			case SET_PAGES_LIST:
				return {
					...state,
					lists: {
						...state.lists,
						pages: action.payload
					}
				};

			case SET_MENU:

				return {
					...state,
					menus: {
						...state.menus,
						[action.payload.slug] : action.payload.menu
					}
				};

			case CLEAR_API_CONTENT:

				return {
					...initialState
				}

			case CLEAR_API_DATA_BY_SLUG:

				if (state.data[action.payload.type] && state.data[action.payload.type][action.payload.slug]) {

					let newState = { ...state};
					delete newState.data[action.payload.type][action.payload.slug];

					return newState;
				}

				return state;
      default:
        return state;
    }
};

export const getData = () => ({
  type: GET_DATA
});

export const getDataBySlug = (dataType, slug, baseType) => ({
	type: GET_DATA_BY_SLUG,
	dataType,
	slug,
	baseType
});

export const getPagesList = () => ({
	type: GET_PAGES_LIST
});

export const getMenu = (slug) => ({
	type: GET_MENU,
	slug
});

export const clearApiContent = () => ({
	type: CLEAR_API_CONTENT
});

export const clearApiDataBySlug = (type, slug) => ({
	type: CLEAR_API_DATA_BY_SLUG,
	payload: {
		type,
		slug
	}
});

export default wpDataReducer;
