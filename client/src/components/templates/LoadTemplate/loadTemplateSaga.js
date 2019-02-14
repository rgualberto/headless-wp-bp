import {
  all,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';


// WATCHERS
export function* getLoadTemplatesWatch() {
  yield takeLatest("TEMP", getLoadTemplatesWorker);
}

// WORKERS
export function* getLoadTemplatesWorker({loaderConfig}) {
  // const data = yield call(requestApplications, 'GET', setLoaderConfig(loaderConfig));
  // const applications = data.Applications || [];

  yield put({
    type: "NOTHING"
  });
}

export default function* LoadTemplateSagas() {
  yield all([
    fork(getLoadTemplatesWatch),
  ]);
}
