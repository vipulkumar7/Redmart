import { throttle } from 'redux-saga/effects';
// import * as Effect from 'redux-saga/effects';
import { workGetPostsFetch } from '../aboutPage/actions';
import { ActionType } from '../aboutPage/types';

// function* workGetPostsFetch(): any {
//     // const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts');
//     const response = yield axiosInstance.get('https://jsonplaceholder.typicode.com/posts')
//     .then((result=> getPostsSuccess(result.data)))
//     // const posts = yield response.json();
//     // yield put(getPostsSuccess(posts));
// }

// const takeEvery: any = Effect.takeEvery;

function* mySaga() {
    // yield takeEvery(ActionType.GET_POSTS_FETCH, workGetPostsFetch);
    yield throttle(2000, ActionType.GET_POSTS_FETCH, workGetPostsFetch);
}

export default mySaga;