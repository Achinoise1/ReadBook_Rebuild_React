import '../../css/bootstrap.css';
import '../../css/ion.rangeSlider.min.css';
import '../../css/responsive.css';
import '../../css/style.css'
import '../../css/style.css.map';
import '../../../node_modules/font-awesome/less/font-awesome.less';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import { faFacebook, faGithub, faQq } from '@fortawesome/fontawesome-free-brands'
import axios from 'axios';
import { subscribe, justifyTextStyle, LeftTextStyle, saveUser, getUser, goBack } from '../utils.js';
import { Spin, Button, Image, Input, Space, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { runes } from 'runes2';


function LoginRegister() {
    const { Option } = Select;
    const [regRes, setRegRes] = useState();

    // 用户ID相关操作
    const [id, setId] = useState();
    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    // 用户密码相关操作
    const [password, setPassword] = useState();
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // 用户重新输入密码相关操作
    const [passwordAgain, setPasswordAgain] = useState();
    const handlePasswordAgainChange = (event) => {
        setPasswordAgain(event.target.value);
    };

    const [reg, setReg] = useState({ val: 0 });     // 是否为注册页，默认为Login-0
    const [err, setErr] = useState({ val: 0 });     // 是否出错，默认没出错-0

    // 登录页面跳注册页面
    const toRegister = () => {
        setReg({ val: 1 })
        setErr({ val: 0 })
    }

    // 注册页面跳登录页面
    const toLogin = () => {
        setReg({ val: 0 })
        setErr({ val: 0 })
    }

    //如果注册时两次输入的密码不一致，返回错误2
    const checkRegInfo = (pwd, pwd2) => {
        if (pwd != pwd2) {
            setErr({ val: 2 })
        }
    }

    // 存储登录信息
    const [loginRes, setLoginRes] = useState();

    //与后端通信，判断密码是否与账户匹配
    const checkLoginInfo = (id, pwd) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pwd', pwd)
        axios.post('/api/validation', formData)
            .then(response => {
                setLoginRes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //如果成功获取到了数据，存储并跳转回上一个页面
    //loginRes改变了意味着获取到了数据，因此可以跳转
    useEffect(() => {
        if (loginRes) {
            saveUser(loginRes.data);
            goBack();
        }
    }, [loginRes])

    const [phoneNum, setPhoneNum] = useState("");
    const characterCount = phoneNum.length;

    const handlePhoneNumChange = (event) => {
        setPhoneNum(event.target.value);
    };


    return (
        <div>
            <div>
                <header className="header_section">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="/">
                                <span>
                                    Read-Book
                                </span>
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link pl-lg-0" href="/">Home </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/books"> Books</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/test">Test</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/statistics"> Statistics </a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span> </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>

            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        {(reg.val === 0) ? (
                            <div className="col-md-6 ">
                                <div className="heading_container ">
                                    <h2 className="">
                                        Please login first ^_^
                                    </h2>
                                </div>
                                {/*
                                    input的原样式
                                    .contact_section input {
                                        width: 100%;
                                        border: 0;
                                        height: 50px;
                                        border-radius: 25px;
                                        margin-bottom: 25px;
                                        padding-left: 25px;
                                        outline: none;
                                        color: #101010;
                                        background: #f1f1f1;
                                        }
                                */}
                                <div>
                                    <Input className='inputBox' id="id" placeholder="ID" value={id} onChange={handleIdChange} />
                                    <br />
                                    <br />
                                    <Input.Password className='inputBox' id="pw" placeholder="Passwords" value={password} onChange={handlePasswordAgainChange} />

                                    {(err.val === 1) ? (
                                        <h6 style={LeftTextStyle}>Error! Please input again</h6>
                                    ) : (
                                        <h6></h6>
                                    )}
                                    <br />
                                    <div className="btn-box">
                                        <a>
                                            <button onClick={() => checkLoginInfo(id, password)}>
                                                SEND
                                            </button>
                                        </a>
                                    </div>
                                    <div>
                                        <br />
                                        <br />
                                        <h6 style={LeftTextStyle}>No account? Sign up <a className="linklike" onClick={toRegister}>here</a> ^_^</h6>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-6 ">
                                <div className="heading_container ">
                                    <h2 className="">
                                        Please register first ^_^
                                    </h2>
                                </div>
                                <div>
                                    <div className='row'>
                                        <Input style={{
                                            height: '50px',
                                            fontSize: "20px",
                                            textAlign: 'left',
                                        }} className="col-8" id="nameReg" placeholder="Name" />
                                        <Select style={{
                                            width: '100%',
                                            height: '50px',
                                            fontSize: "20px",
                                            textAlign: 'center',
                                            paddingRight: '0'
                                        }} defaultValue="Choice" className="select-after col-4">
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                            <Option value="none">Secret</Option>
                                        </Select>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.Password className='inputBox' id="pwReg" placeholder={'Input password'} value={password} onChange={handlePasswordChange} />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.Password className='inputBox' id="pw2Reg" placeholder={'Input password again'} value={passwordAgain} onChange={handlePasswordAgainChange} />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input className='inputBox' maxLength={11} id="teleReg" placeholder="Phone Number" count={{
                                            show: true,
                                            max: 10,
                                        }} />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.TextArea className='inputBox' autoSize={{ minRows: 3, maxRows: 5 }} id="briefReg" placeholder="Brief introduction" />
                                    </div>
                                    <br />
                                    {(err.val === 1) ? (
                                        <h6 style={LeftTextStyle}>Error! Please check again</h6>
                                    ) : ((err.val === 2) ? (
                                        <h6 style={LeftTextStyle}>Entered passwords are not the same! Please input again</h6>
                                    ) : (
                                        <h6></h6>
                                    )
                                    )}
                                    <div className="btn-box">
                                        <a>
                                            <button onClick={() => checkRegInfo(1, 2)}>
                                                SEND
                                            </button>
                                        </a>
                                    </div>
                                    <div>
                                        <br />
                                        <br />
                                        <h6 style={LeftTextStyle}>Already have an account? Login <a className="linklike" onClick={toLogin}>here</a>^_^</h6>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-md-6">
                            <Image src={require(`../../figures/contact-img.png`)} preview={false} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="info_section layout_padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_detail" style={justifyTextStyle}>
                                <h4>
                                    About Us
                                </h4>
                                <p>
                                    Contact us on these social-medias.
                                </p>
                                <div className="info_social">
                                    <a href="https://www.facebook.com/profile.php?id=100064520177692">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="https://user.qzone.qq.com/1659455853">
                                        <FontAwesomeIcon icon={faQq} />
                                    </a>
                                    <a href="https://github.com/Achinoise1">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 info-col">
                            <div className="info_contact" style={justifyTextStyle}>
                                <h4>
                                    Address
                                </h4>
                                <div className="contact_link_box">
                                    <a href="https://www.zstu.edu.cn/">
                                        <FontAwesomeIcon icon={faUniversity} />
                                        <span>
                                            ZSTU
                                        </span>
                                    </a>

                                    <a href="https://github.com/Casta-mere/Read-Book">
                                        <FontAwesomeIcon icon={faGithub} />
                                        <span>
                                            View our Github page
                                        </span>
                                    </a>
                                    <a href="" style={{ pointerEvents: "none" }}>
                                        <FontAwesomeIcon icon={faPhone} />
                                        <span>
                                            Call +86 13834230484
                                        </span>
                                    </a>
                                    <a href="" style={{ pointerEvents: "none" }}>
                                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                                        <span>
                                            E-mail castamego@gmail.com
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 info-col" >
                            <div className="info_contact" style={justifyTextStyle}>
                                <h4>
                                    Newsletter
                                </h4>
                                <form action="#">
                                    <input type="text" placeholder="Enter email" />
                                    <button type="submit" onClick={subscribe}>
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By
                        <a href="https://github.com/Casta-mere">Castamere</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LoginRegister;