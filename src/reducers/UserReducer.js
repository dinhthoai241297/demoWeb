import * as actions from './../actionTypes/UserActionTypes';
import * as func from '../custom/index';

let session = localStorage.getItem('session');
if (session) {
    session = func.aesDecrypt(session);
} else {
    session = {
        user: '',
        token: ''
    }
}

const intitState = session;

const UserReducer = (state = intitState, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return { user: action.data.user, token: action.data.token }
        }
        case actions.LOGOUT: {
            return { user: '', token: '' }
        }
        case actions.UPDATE_USER: {
            return { user: action.data }
        }
        default: {
            return { ...state };
        }
    }
}

export default UserReducer;
