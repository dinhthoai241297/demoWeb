import React, { Component } from 'react';
import * as func from '../../custom/index';
import { toast } from 'react-toastify';
import UserApi from '../../api/UserApi';
import { Link } from 'react-router-dom';
import Footer from '../common/Footer';

class ActiveUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            platform: 'web',
            hash: '',
            mesHash: ''
        }
    }

    handleInputChange = e => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    checkHash = hash => {
        if (hash === '') {
            this.setState({
                mesHash: 'Mã kích hoạt không được để trống!'
            });
            return false;
        }
        return true;
    }

    active = async e => {
        e.preventDefault();
        let { hash, platform } = this.state;
        let check = this.checkHash(hash);
        if (!check) {
            return;
        }
        // active
        let data = { hash, platform };
        data = func.aesEncrypt(data).toString();
        try {
            let res = await UserApi.active(data);
            let result = func.aesDecrypt(res.text);
            console.log(result);
            if (result.code === 1) {
                toast.success('Tài khoản kích hoạt thành công, từ bây giờ bạn đã có thể đăng nhập bằng tài khoản mới!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.props.history.push('/login');
            } else if (result.code === 101) {
                toast.warn('Mã kích hoạt không hợp lệ!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                this.setState({
                    mesHash: 'Mã kích hoạt không hợp lệ!'
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

    render() {

        let { hash, mesHash } = this.state;

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
                                            <div className={'form-group md-col-12' + (mesHash === '' ? '' : ' has-error')}>
                                                <input
                                                    autofocus="true" className="form-control"
                                                    id="id_hash" name="hash" placeholder="Mã kích hoạt"
                                                    type="text" value={hash} onChange={this.handleInputChange}
                                                    onClick={() => this.setState({ mesHash: '' })}
                                                />
                                                <span class="help-block">{mesHash}</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-width-100" onClick={this.active}>
                                            Kích hoạt
                                        </button>
                                    </form>
                                </div>
                                <hr />
                                <div className="extra-info">bạn muốn đăng ký mới?</div>
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

export default ActiveUser;
