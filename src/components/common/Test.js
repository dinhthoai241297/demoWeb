import React, { Component } from 'react';
import * as func from '../../custom/index';
import UserApi from '../../api/UserApi';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
        this.data = {
            platform: 'web',
            session: 'FrOY+5aA4QX9DhMuxRJwPH/EROHLK3y3+WSv3yrgw89WCAmzCUjajLSiEPYSU1og'
        }
    }

    encrypt = () => {
        let data = func.aesEncrypt(this.data);
        data = data.toString();
        this.setState({ data });
    }

    decrypt = () => {
        let { data } = this.state;
        try {
            data = func.aesDecrypt(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        // this.setState({ data });
    }

    getInfo = async () => {
        let { data } = this.state;
        let res = await UserApi.getInfoUser(data);
        // console.log(func.aesDecrypt(res.text));
        console.log(func.aesDecrypt(res.text));
    }

    render() {
        return (
            <div>
                <h2>
                    Test encrypt
                </h2>
                <div>
                    <button onClick={this.encrypt}>
                        encrypt
                    </button>
                    <button onClick={this.decrypt}>
                        decrypt
                    </button>
                    <button onClick={this.getInfo}>
                        getInfo
                    </button>
                </div>
                <div>
                    {this.state.data}
                </div>
            </div>
        );
    }
}

export default Test;
