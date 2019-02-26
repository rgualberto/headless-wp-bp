import {
  call,
  all,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';
import {
  GET_DATA,
  SET_DATA,
  GET_DATA_BY_SLUG,
  SET_DATA_BY_SLUG,
  GET_PAGES_LIST,
  SET_PAGES_LIST,
  GET_POSTS_LIST,
  SET_POSTS_LIST,
  GET_CAMPAIGNS_LIST,
  SET_CAMPAIGNS_LIST,
  GET_MENU,
  SET_MENU
} from '../reducers/wpDataReducer';
import api from '../api';

// WATCHERS
export function* getDataWatch() {
  yield takeLatest(GET_DATA, getDataWorker);
}

export function* getDataBySlugWatch() {
  yield takeLatest(GET_DATA_BY_SLUG, getDataBySlugWorker);
}

export function* getPagesListWatch() {
  yield takeLatest(GET_PAGES_LIST, getPagesListWorker);
}

export function* getPostsListWatch() {
  yield takeLatest(GET_POSTS_LIST, getPostsListWorker);
}

export function* getCampaignsListWatch() {
  yield takeLatest(GET_CAMPAIGNS_LIST, getCampaignsListWorker);
}

export function* getMenuWatch() {
  yield takeLatest(GET_MENU, getMenuWorker);
}

// WORKERS
export function* getDataWorker({dataType}) {
  const apiResponse = yield call(api.Content.data, dataType);

  yield put({
    type: SET_DATA,
    payload: {
      type: dataType,
      data: apiResponse
    }
  });
}

export function* getDataBySlugWorker({dataType, slug, baseType}) {
  const apiResponse = yield call(api.Content.dataBySlug, dataType, slug);

  yield put({
    type: SET_DATA_BY_SLUG,
    payload: {
      type: baseType,
      slug: slug,
      data: apiResponse
    }
  });
}

export function* getPagesListWorker({dataType}) {
  const list = yield call(api.Content.pageList, dataType);

  yield put({
    type: SET_PAGES_LIST,
    payload: list
  });
}

export function* getPostsListWorker({dataType}) {
  const list = yield call(api.Content.postList, dataType);

  yield put({
    type: SET_POSTS_LIST,
    payload: list
  });
}

export function* getCampaignsListWorker({dataType}) {
  const list = yield call(api.Content.campaignList, dataType);

  yield put({
    type: SET_CAMPAIGNS_LIST,
    payload: list
  });
}

export function* getMenuWorker({slug}) {
  const menu = yield call(api.Menus.bySlug, slug);

  yield put({
    type: SET_MENU,
    payload: menu
  });
}

export default function* WpDataSagas() {
  yield all([
    fork(getDataWatch),
    fork(getDataBySlugWatch),
    fork(getPagesListWatch),
    fork(getPostsListWatch),
    fork(getCampaignsListWatch),
    fork(getMenuWatch)
  ]);
}
