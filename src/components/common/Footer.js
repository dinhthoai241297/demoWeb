import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="myob-footer myob-footer-js" role="contentinfo">
                <div>
                    <ul className="myob-footer-links">
                        <li>
                            <Link to='/login'>Đăng nhập</Link>
                        </li>
                        <li className="muted"> | </li>
                        <li>
                            <Link to='/register'>Đăng ký</Link>
                        </li>
                        <li className="muted"> | </li>
                        <li>
                            <Link to='/login'>Quên mật khẩu</Link>
                        </li>
                    </ul>
                    <ul className="myob-footer-links language-switch">
                        <li>
                            Vietnam
                        </li>
                    </ul>
                    <div>demo ©</div>
                    <div>2019</div>
                </div>
            </footer>
        );
    }
}

export default Footer;
