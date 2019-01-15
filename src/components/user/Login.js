import React, { Component } from 'react';
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import * as func from '../../custom/index';
import UserApi from '../../api/UserApi';
import md5 from 'md5';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '../../actions/UserActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            platform: 'web',
            mesEmail: '',
            mesPass: ''
        }
    }

    componentDidMount() {
        if (this.props.user !== '') {
            this.props.history.push('/update');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== '') {
            this.props.history.push('/update');
        }
    }

    handleInputChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
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

    checkPassword = pass => {
        if (pass === '') {
            this.setState({ mesPass: 'Mật khẩu không được để trống' });
            return false;
        }
        return true;
    }

    login = async e => {
        e.preventDefault();
        let { email, password, platform } = this.state;
        let check = this.checkEmail(email) & this.checkPassword(password);
        if (!check) {
            return;
        }
        password = md5(password);
        try {
            let rs = await this.props.login(email, password, platform);
            console.log(rs);
            if (rs.code === 1) {
                toast.success('Đăng nhập thành công!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else if (rs.code === 101) {
                toast.error('Tài khoản hoặc mật khẩu không đúng!', {
                    position: toast.POSITION.BOTTOM_RIGHT
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
        // submit here
    }

    render() {

        let { email, password, mesEmail, mesPass } = this.state;

        return (
            <div className="with-cookie-bar">
                <div className="body-wrapper">
                    <div className="myob-nosession-content-wrapper">
                        <div className="myob-nosession-header">
                            <img id="navbar-logo" src="https://redux.js.org/img/redux-logo-landscape.png" />
                        </div>
                        <div className="login-wrapper">
                            <div className="box">
                                <div className="content-wrap">
                                    <div className="myob-login-header">
                                        <img className="login-logo" src="https://redux.js.org/img/redux-logo-landscape.png" />
                                    </div>
                                    <form id="login_form" method="post" role="form">
                                        <div className="row form-holder">
                                            <div className={'form-group md-col-12' + (mesEmail === '' ? '' : ' has-error')}>
                                                <input
                                                    autofocus="true" className="form-control"
                                                    id="id_email" name="email" placeholder="E-mail"
                                                    type="email" value={email} onChange={this.handleInputChange}
                                                    onClick={() => this.setState({ mesEmail: '' })}
                                                />
                                                <span class="help-block">{mesEmail}</span>
                                            </div>
                                        </div>
                                        <div className="row form-holder">
                                            <div className={'form-group md-col-12' + (mesPass === '' ? '' : ' has-error')}>
                                                <input
                                                    className="form-control" id="id_password"
                                                    name="password" placeholder="Mật khẩu" type="password"
                                                    value={password} onChange={this.handleInputChange}
                                                    onClick={() => this.setState({ mesPass: '' })}
                                                />
                                                <span class="help-block">{mesPass}</span>
                                            </div>
                                        </div>
                                        <div className="row form-holder">
                                            <div className="form-group remember">
                                                <label htmlFor="id_keep_logged_in" className="control-label">
                                                    <input id="id_keep_logged_in" name="keep_logged_in" type="checkbox" />
                                                    Lưu đăng nhập
                                                </label>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-width-100" onClick={this.login}>
                                            Đăng nhập
                                        </button>
                                    </form>
                                    <a className="restore-password-link" href="/forgotPassword">Quên mật khẩu?</a>
                                </div>
                                <hr />
                                <div className="extra-info">Bạn chưa có tài khoản?</div>
                                <Link to='/register' >Đăng ký</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <noscript>
                    Bạn cần javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (email, password, platform) => dispatch(actions.loginApi(email, password, platform))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
