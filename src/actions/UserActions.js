import * as types from './../actionTypes/UserActionTypes';
import UserApi from './../api/UserApi';
import * as func from '../custom/index';

export const loginApi = (email, password, platform) => {
    let data = func.aesEncrypt({ email, password, platform }).toString();
    return dispatch => UserApi.login(data).then(res => {
        let rs = func.aesDecrypt(res.text);
        let session = func.aesEncrypt({
            token: rs.token,
            user: rs.user
        }).toString();
        localStorage.setItem('session', session);
        if (rs.code === 1) {
            dispatch(loginState(rs));
        }
        return rs;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const loginState = data => {
    return {
        type: types.LOGIN,
        data
    }
}

export const updateApi = (name, password, city, nation, session, platform) => {
    let data = func.aesEncrypt({ name, password, city, nation, session, platform }).toString();
    return dispatch => UserApi.update(data).then(res => {
        let rs = func.aesDecrypt(res.text);
        console.log(rs);
        // if (rs.code === 1) {
        //     dispatch(updateState(rs));
        // }
        return rs;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const updateState = data => {
    return {
        type: types.UPDATE_USER,
        data
    }
}

export const logoutApi = (data) => {
    return dispatch => UserApi.logout({ data }).then(res => {
        if (res.body.code === 200) {
            dispatch(logoutState(res.body.data));
        }
        return res;
    }).catch(error => {
        // error
        console.log(error);
    });
}

export const logoutState = () => {
    localStorage.setItem('session', '');
    return {
        type: types.LOGOUT
    }
}

