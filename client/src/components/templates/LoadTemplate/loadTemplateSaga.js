import {
  call,
  all,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';
import api from '../../../api';

// WATCHERS
export function* getDataBySlugWatch() {
  yield takeLatest("GET_DATA_BY_SLUG", getDataBySlugWorker);
}

// WORKERS
export function* getDataBySlugWorker({dataType, slug, baseType}) {
  const apiResponse = yield call(api.Content.dataBySlug, dataType, slug);

  yield put({
    type: "LOAD_DATA_BY_SLUG",
    payload: {
      type: baseType,
      slug: slug,
      data: apiResponse
    }
  });
}

export default function* LoadTemplateSagas() {
  yield all([
    fork(getDataBySlugWatch),
  ]);
}
