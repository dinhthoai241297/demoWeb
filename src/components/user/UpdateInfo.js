import React, { Component } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../actions/UserActions';
import { connect } from 'react-redux';
import CountryOptions from '../common/CountryOptions';
import md5 from 'md5';
import * as func from '../../custom/index';
import { toast } from 'react-toastify';
import UserApi from '../../api/UserApi';

class UpdateInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            name: '',
            city: '',
            nation: 'VN',
            password: '',
            platform: 'web',

            mesName: '',
            mesPassword: ''
        }
    }

    componentDidMount() {
        if (this.props.user === '') {
            this.props.history.push('/login');
        }
        let { name, city, nation } = this.props.user;
        this.setState({ name, city, nation });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user === '') {
            this.props.history.push('/login');
        }
    }

    toggleMenu = () => {
        let { openMenu } = this.state;
        this.setState({ openMenu: !openMenu });
    }

    update = async e => {
        e.preventDefault();
        let { name, city, password, nation, platform } = this.state;
        let check = this.checkName(name) & this.checkPassword(password);
        if (!check) {
            return;
        }
        // update here
        password = password === '' ? this.props.user.password : md5(password);
        let session = this.props.token;
        let data = { name, city, password, nation, platform, session };
        console.log(data);
        data = func.aesEncrypt(data).toString();
        try {
            let res = await UserApi.update(data);
            let result = func.aesDecrypt(res.text);
            console.log(result);
            if (result.code === 1) {
                toast.success('Cập nhật thông tin thành công!', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            } else if (result.code === 101) {
                toast.warn('Cập nhật thông tin thất bại!', {
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
    }

    checkName = name => {
        if (name === '') {
            this.setState({ mesName: 'Tên không được để trống!' });
            return false;
        }
        return true;
    }

    handleChangeInput = e => {
        let { name, value } = e.target;
        if (name === 'phone' && value.match(/\D/)) {
            return;
        }
        this.setState({ [name]: value });
    }

    checkPassword = pass => {
        let mesPassword = '';
        if (pass !== '' && pass.length < 6) {
            mesPassword = 'Mật khẩu phải có tối thiểu 6 kí tự!';
        }
        this.setState({ mesPassword });
        return mesPassword === '';
    }

    render() {

        let { openMenu, name, city, mesName, nation, password, mesPassword } = this.state;

        return (
            <div className={'with-cookie-bar' + (openMenu ? ' menu' : '')}>
                <div className="body-wrapper">
                    <div id="sidebar-nav" className="sidebar-nav-js sticky">
                        <ul id="dashboard-menu">
                            <a href="/">
                                <div className="myob_logo">
                                    <img id="navbar-logo" src="https://redux.js.org/img/redux-logo-landscape.png" />
                                </div>
                            </a>
                            <li className="dashboard-menu-item ">
                                <Link to='/update'>
                                    <span className="sidebar-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30} viewBox="0 0 30 30">
                                        <defs>
                                            <path fill="#767676" id="dashboard_a" d="M15 4C7.278 4 1 10.161 1 17.74c0 3.01.988 5.801 2.665 8.067l1.299-1.067a11.896 11.896 0 0 1-2.267-7C2.697 11.062 8.195 5.665 15 5.665c6.805 0 12.303 5.397 12.303 12.075 0 2.609-.839 5.028-2.267 7l1.3 1.067A13.517 13.517 0 0 0 29 17.74C29 10.16 22.722 4 15 4zm5.682 7.793L13.026 20.5a2.282 2.282 0 0 0 .838 3.11 2.282 2.282 0 0 0 3.11-.837l3.708-10.98z" />
                                        </defs>
                                        <g fill="none" fillRule="evenodd">
                                            <mask id="dashboard_b">
                                                <use xlinkHref="#dashboard_a" />
                                            </mask>
                                            <use fillRule="nonzero" xlinkHref="#dashboard_a" />
                                            <g mask="url(#dashboard_b)">
                                                <path d="M0 0h30v30H0z" />
                                            </g>
                                        </g>
                                    </svg>
                                    </span>
                                    <span className="icon_title">Dashboard</span>
                                </Link>
                            </li>
                            <li className="active" tour-target="nav-venue-settings">
                                <a className="dropdown-toggle" href="#">
                                    <span className="sidebar-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30} viewBox="0 0 30 30">
                                        <defs>
                                            <path fill="#767676" id="settings_a" d="M14.61 20.264c.938 0 1.815-.24 2.633-.72a5.445 5.445 0 0 0 1.947-1.93A5.01 5.01 0 0 0 19.91 15c0-.938-.24-1.815-.721-2.632a5.4 5.4 0 0 0-1.947-1.947A5.104 5.104 0 0 0 14.61 9.7a5.01 5.01 0 0 0-2.615.72 5.445 5.445 0 0 0-1.929 1.948A5.104 5.104 0 0 0 9.347 15c0 .938.24 1.809.72 2.614a5.492 5.492 0 0 0 1.93 1.93 5.01 5.01 0 0 0 2.614.72zm11.215-3.786l3.137 2.452c.144.12.228.277.252.469a.85.85 0 0 1-.108.54l-3.03 5.193a.659.659 0 0 1-.378.325.799.799 0 0 1-.523-.036l-3.713-1.479c-.962.697-1.815 1.19-2.56 1.479l-.541 3.93a.916.916 0 0 1-.27.469.652.652 0 0 1-.452.18h-6.057a.652.652 0 0 1-.451-.18.734.734 0 0 1-.234-.469l-.577-3.93c-1.01-.409-1.851-.902-2.524-1.479l-3.75 1.479c-.385.168-.685.072-.902-.289L.115 19.94a.85.85 0 0 1-.108-.541.701.701 0 0 1 .253-.469l3.173-2.452c-.048-.336-.072-.829-.072-1.478s.024-1.142.072-1.478L.26 11.07a.701.701 0 0 1-.253-.469.85.85 0 0 1 .108-.54l3.03-5.193c.216-.36.516-.457.9-.289l3.75 1.479c.866-.65 1.707-1.142 2.525-1.479l.577-3.93A.734.734 0 0 1 11.13.18a.652.652 0 0 1 .45-.18h6.058c.169 0 .319.06.451.18s.222.277.27.469l.541 3.93c.938.36 1.791.854 2.56 1.479l3.714-1.479a.799.799 0 0 1 .523-.036.659.659 0 0 1 .379.325l3.029 5.192a.85.85 0 0 1 .108.541.701.701 0 0 1-.252.469l-3.137 2.452c.048.336.072.829.072 1.478s-.024 1.142-.072 1.478z" />
                                        </defs>
                                        <g fillRule="evenodd">
                                            <mask id="settings_b">
                                                <use xlinkHref="#settings_a" />
                                            </mask>
                                            <use xlinkHref="#settings_a" />
                                            <g fill="#767676" mask="url(#settings_b)">
                                                <path d="M0 0h30v30H0z" />
                                            </g>
                                        </g>
                                    </svg>
                                    </span>
                                    <span className="icon_title">Cài đặt</span>
                                    <span className="ob-chevron" />
                                </a>
                                <ul className="submenu active">
                                    <li>
                                        <Link className="active" to='/update'>Cập nhật thông tin</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="content content-js">
                        <Header toggleMenu={this.toggleMenu} />
                        <div className="myob-content-wrapper">
                            <div>
                                <div className="row head">
                                    <div className="col-md-12 col-xs-12">
                                        <h4>Cập nhật thông tin cá nhân</h4>
                                    </div>
                                </div>
                                <form form="update_venue_form" action="/venue" method="post" role="form">
                                    <input type="hidden" name="csrfmiddlewaretoken" defaultValue="YP2mqGsDP72jnzY6YlQ326IvyHr6VBKT" />
                                    <div className="row form-holder">
                                        <div className={'form-group col-md-7' + (mesName === '' ? '' : ' has-error')}>
                                            <label htmlFor="id_name" className="control-label">
                                                Họ và Tên
                                            </label>
                                            <input
                                                className="form-control" id="id_name"
                                                maxLength={255} name="name" type="text"
                                                value={name} onClick={() => this.setState({ mesName: '' })}
                                                onChange={this.handleChangeInput}
                                            />
                                            <span className="help-block">{mesName}</span>
                                        </div>
                                    </div>
                                    <div className="row form-holder">
                                        <div className="form-group col-md-7">
                                            <label htmlFor="id_city" className="control-label">
                                                Thành phố
                                            </label>
                                            <input
                                                className="form-control" id="id_city"
                                                maxLength={255} name="city" type="text"
                                                value={city} onChange={this.handleChangeInput}
                                            />
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="row form-holder">
                                        <div className="form-group col-md-7">
                                            <label htmlFor="id_nation" className="control-label">
                                                Quốc gia
                                            </label>
                                            <select
                                                className="form-control" style={{ borderRadius: '4px' }}
                                                id="id_nation" name="nation"
                                                onChange={this.handleChangeInput}
                                                value={nation}
                                            >
                                                <CountryOptions />
                                            </select>
                                            <span className="help-block"></span>
                                        </div>
                                    </div>
                                    <div className="row form-holder">
                                        <div className={'form-group col-md-7' + (mesPassword === '' ? '' : ' has-error')}>
                                            <label htmlFor="id_pass" className="control-label">
                                                Mật khẩu
                                            </label>
                                            <input
                                                className="form-control" id="id_pass"
                                                maxLength={255} name="password" type="password"
                                                value={password} onClick={() => this.setState({ mesPassword: '' })}
                                                onChange={this.handleChangeInput}
                                            />
                                            <span className="help-block">{mesPassword}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-7">
                                            <button className="btn btn-primary btn-sm pull-right" onClick={this.update}>
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
                <noscript>
                    Bạn cần bật javascript để chạy ứng dụng này!
                </noscript>
            </div>
        );
    }
}

UpdateInfo.propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    logout: PropTypes.func,
    update: PropTypes.func
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => dispatch(actions.logoutApi()),
        update: (name, password, city, nation, session, platform) => dispatch(actions.updateApi(name, password, city, nation, session, platform))
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);
