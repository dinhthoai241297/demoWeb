import request from 'superagent';
import { HOST, APPNAME } from './../contants/index';

class TestApi {

    // static login(data) {
    //     return request.post(`${HOST}login`).send(data);
    // }

    // static update(data) {
    //     return request.post(`${HOST}update`).send(data);
    // }

    // static logout(data) {
    //     return request.post(`${HOST}logout`).send(data);
    // }

    static getInfoUser(data) {
        return request.post(`${HOST}v1/user/get`).field('app', APPNAME).field('data', data);
    }

    static register(data) {
        return request.post(`${HOST}v1/user/add`).field('app', APPNAME).field('data', data);
    }

    static login(data) {
        return request.post(`${HOST}v1/user/login`).field('app', APPNAME).field('data', data);
    }

    static active(data) {
        return request.post(`${HOST}v1/user/active`).field('app', APPNAME).field('data', data);
    }

    static update(data) {
        return request.post(`${HOST}v1/user/update`).field('app', APPNAME).field('data', data);
    }

}

export default TestApi;
