import React, { Component } from 'react';
import Footer from '../common/Footer';
import CountryOptions from '../common/CountryOptions';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import UserApi from '../../api/UserApi';
import * as func from '../../custom/index';
import { toast } from 'react-toastify';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            nation: 'VN',
            city: '',
            password: '',
            platform: 'web',

            mesName: '',
            mesEmail: '',
            mesPassword: ''
        }
    }

    checkName = name => {
        if (name === '') {
            this.setState({ mesName: 'Tên không được để trống!' });
            return false;
        }
        return true;
    }

    checkPassword = pass => {
        let mesPassword = '';
        if (pass.length < 6) {
            mesPassword = 'Mật khẩu phải có tối thiểu 6 kí tự!';
        }
        if (pass === '') {
            mesPassword = 'Mật khẩu không được để trống!';
        }
        this.setState({ mesPassword });
        return mesPassword === '';
    }

    checkEmail = email => {
        let mesEmail = '', check = false;
        if (email === '') {
            mesEmail = 'Email không được để trống!';
        } else {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            check = re.test(String(email).toLowerCase());
            if (!check) {
                mesEmail = 'Email không hợp lệ!';
            }
        }
        this.setState({ mesEmail });
        return check;
    }

    register = async e => {
        e.preventDefault();
        let { name, email, password, city, nation, platform } = this.state;
        let check = this.checkEmail(email) & this.checkPassword(password) & this.checkName(name);
        if (!check) {
            return;
        }
        // encrypt password
        password = md5(password);
        console.log(name, email, password, city, nation);
        // register here
        let data = { name, email, password, city, nation, platform };
        data = func.aesEncrypt(data).toString();
        try {
            let res = await UserApi.register(data);
            let result = func.aesDecrypt(res.text);
            console.log(result);
            if (result.code === 1) {
                toast.success('Tạo tài khoản thành công, vui lòng truy cập email để nhận mã kích hoạt tài khoản!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.props.history.push('/active');
            } else if (result.code === 100) {
                toast.warn('Email này đã được sử dụng!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.setState({
                    mesEmail: 'Email này đã được sử dụng!'
                });
            } else {
                toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            // error
            toast.error('Có lỗi xảy ra vui lòng thử lại sau!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    handleChangeInput = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {

        let { name, email, nation, password, city, mesName, mesEmail, mesPassword } = this.state;

        return (
            <div className="with-cookie-bar">
                <div className="body-wrapper">
                    <div className="myob-nosession-content-wrapper">
                        <div className="myob-nosession-header">
                            <img id="navbar-logo" src="https://redux.js.org/img/redux-logo-landscape.png" />
                        </div>
                        <div className="login-wrapper signup-wrapper">
                            <div className="box">
                                <div className="content-wrap">
                                    <div className="myob-login-header">
                                        <img className="login-logo" src="https://redux.js.org/img/redux-logo-landscape.png" />
                                        <h6>Tạo tài khoản</h6></div>
                                    <form id="signup_form" method="post">
                                        <div className={'form-group' + (mesName === '' ? '' : ' has-error')}>
                                            <input
                                                autofocus="true" className="form-control"
                                                id="id_venue_name" name="name"
                                                placeholder="Họ & Tên (*)" type="text"
                                                value={name}
                                                onChange={this.handleChangeInput}
                                                onClick={() => this.setState({ mesName: '' })}
                                            />
                                            <span className="help-block">{mesName}</span>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control" id="id_city"
                                                name="city" placeholder="Thành phố"
                                                type="text" value={city}
                                                onChange={this.handleChangeInput}
                                            />
                                            <span className="help-block" />
                                        </div>
                                        <div className="form-group">
                                            <select
                                                className="form-control c-select"
                                                id="id_nation" name="nation"
                                                onChange={this.handleChangeInput}
                                                value={nation}
                                            >
                                                <CountryOptions />
                                            </select>
                                            <span className="help-block" />
                                        </div>
                                        <hr />
                                        <div className={'form-group' + (mesEmail === '' ? '' : ' has-error')}>
                                            <input
                                                className="form-control" id="id_email"
                                                name="email" placeholder="E-mail (*)"
                                                type="email" value={email}
                                                onChange={this.handleChangeInput}
                                                onClick={() => this.setState({ mesEmail: '' })}
                                            />
                                            <span className="help-block">{mesEmail}</span>
                                        </div>
                                        <div className={'form-group' + (mesPassword === '' ? '' : ' has-error')}>
                                            <input
                                                className="form-control" id="id_password"
                                                name="password" placeholder="Mật khẩu (*)"
                                                type="password" aria-autocomplete="list"
                                                value={password}
                                                onChange={this.handleChangeInput}
                                                onClick={() => this.setState({ mesPassword: '' })}
                                            />
                                            <span className="help-block">{mesPassword}</span>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-width-100" onClick={this.register}>
                                                Đăng ký
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <hr />
                                <div>
                                    <Link to='/login'>Đã có tài khoản</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <noscript>
                    Bạn cần bật javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

export default Register;
