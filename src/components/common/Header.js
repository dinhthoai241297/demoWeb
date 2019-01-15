import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions/UserActions';
import { connect } from 'react-redux';

class Header extends Component {

    toggleMenu = e => {
        e.preventDefault();
        this.props.toggleMenu();
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <header className="navbar navbar-inverse navbar-js sticky" role="banner">
                <div className="navbar-header">
                    <button className="navbar-toggle" type="button" onClick={this.toggleMenu}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <div id="venue_profile">
                        <div className="profile_image" />
                        <div className="profile_name">{this.props.user.name}</div>
                    </div>
                    <a className="button-logout" href="/logout" onClick={this.logout}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={30} height={30} viewBox="0 0 30 30">
                            <defs>
                                <path fill="#fff" id="logout_a" d="M21.214 3c4.9 2.275 8.286 7.16 8.286 12.817C29.5 23.65 23.008 30 15 30S.5 23.65.5 15.817C.5 10.16 3.887 5.275 8.786 3v4.713c-2.517 1.848-4.143 4.79-4.143 8.104 0 5.596 4.636 10.13 10.357 10.13 5.721 0 10.357-4.534 10.357-10.13 0-3.315-1.626-6.256-4.143-8.104V3zM16.5 14.006a2.005 2.005 0 0 1-2 1.994c-1.112 0-2-.892-2-1.994V1.994C12.5.906 13.394 0 14.5 0c1.112 0 2 .892 2 1.994v12.012z" />
                            </defs>
                            <g fill="none" fillRule="evenodd">
                                <mask id="logout_b">
                                    <use xlinkHref="#logout_a" />
                                </mask>
                                <use fillRule="nonzero" xlinkHref="#logout_a" />
                                <g mask="url(#logout_b)">
                                    <path d="M0 0h30v30H0z" />
                                </g>
                            </g>
                        </svg>
                        <span className="icon_title">Đăng xuất</span>
                    </a>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => dispatch(actions.logoutState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);;
