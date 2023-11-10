import '../../css/bootstrap.css';
import '../../css/ion.rangeSlider.min.css';
import '../../css/responsive.css';
import '../../css/style.css'
import '../../css/style.css.map';
import '../../../node_modules/font-awesome/less/font-awesome.less';
import React, { useEffect, useState, useReducer, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import { faFacebook, faGithub, faQq } from '@fortawesome/fontawesome-free-brands'
import axios from 'axios';
import { subscribe, justifyTextStyle, LeftTextStyle, saveUser, ERROR, goBack, ItemCenter } from '../utils.js';
import { Form, Button, Image, Input, Space, Select } from 'antd';
import { AsteriskOutlined } from '@ant-design/icons';

const initialState = {
    inputCounts: {},
    inputLoginContent: {},
    selectContent: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'clearInputCount': {
            return {
                ...state,
                inputCounts: {
                },
            };
        }
        case 'updateInputCount': {
            const { id, count } = action.payload;
            return {
                ...state,
                inputCounts: {
                    ...state.inputCounts,
                    [id]: count,
                },
            };
        }
        case 'updateInputLoginContent': {
            const { id, content } = action.payload;
            return {
                ...state,
                inputLoginContent: {
                    ...state.inputLoginContent,
                    [id]: content,
                },
            };
        }
        case 'updateSelectContent': {
            const { name, content } = action.payload;
            // console.log(action)
            return {
                ...state,
                selectContent: {
                    ...state.selectContent,
                    [name]: content,
                },
            };
        }
        default:
            return state;
    }
};

// 错误码
/*
1xxx    登录
2xxx    注册

1001    账号不存在
1002    密码错误
1003    账号有误

2001    信息缺项
2002    密码不一致
2003    该用户已存在
2004    手机号无效    

*/

function LoginRegister() {

    const [reg, setReg] = useState({ val: 0 });     // 是否为注册页，默认为Login-0
    const [err, setErr] = useState({ val: 0 });

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

    // 存储登录信息
    const [loginRes, setLoginRes] = useState();

    //与后端通信，判断密码是否与账户匹配
    const checkLoginInfo = (values) => {
        const id = values['logName']
        const pwd = values['logPwd']
        const formData = new FormData();
        formData.append('id', id);
        formData.append('pwd', pwd)
        axios.post('/api/validation', formData)
            .then(response => {
                console.log(response)
                switch (response.data.code) {
                    case 200:
                        setLoginRes(response.data);
                        break;
                    case 404:
                        setErr({ val: 1001 });
                        break;
                    case 400:
                        setErr({ val: 1003 });
                        break;
                    case 403:
                        setErr({ val: 1002 });
                        break;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //如果成功获取到了数据，存储并跳转回上一个页面
    //loginRes改变了意味着获取到了数据，因此可以跳转
    useEffect(() => {
        console.log(loginRes)
        if (loginRes) {
            saveUser(loginRes.data);
            goBack();
        }
    }, [loginRes])


    // 存储注册信息
    const [regRes, setRegRes] = useState();

    //与后端通信，判断密码是否与账户匹配
    //todo: 改进
    const checkRegisterInfo = (values) => {
        const formData = new FormData();
        formData.append('username', values['regName']);
        formData.append('pwd', values['regPwd']);
        formData.append('gender', values['regGender']);
        formData.append('phone', values['regTele']);
        if (values['regBrief'] != undefined) {
            formData.append('brief', values['regBrief']);
        }
        axios.post('/api/registration', formData)
            .then(response => {
                // console.log(response)
                setRegRes(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }
    //如果成功获取到了数据，存储并跳转回上一个页面
    //loginRes改变了意味着获取到了数据，因此可以跳转
    useEffect(() => {
        if (regRes) {
            const userId = regRes.data.userId
            alert(`注册成功！您的账号是${userId}，请登录！`)
            window.location.href = "/login";
        }
    }, [regRes])

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleInputChange = (e, name = '') => {
        if (typeof (e) === typeof ('1')) {
            dispatch({ type: 'updateSelectContent', payload: { name, content: e } })
        } else {
            const { id, value } = e.target;
            if (id.includes('login')) {
                dispatch({ type: 'updateInputLoginContent', payload: { id, content: value } })
            }
            dispatch({ type: 'updateInputCount', payload: { id, count: value.length } });
        }
    };

    const [form] = Form.useForm();
    const handleInputReset = () => {
        form.resetFields();
        dispatch({ type: 'clearInputCount' });
    }

    //注册验证
    const formRefReg = useRef(null);
    const isFirstSubmitReg = useRef(true);
    const submitFormReg = () => {
        formRefReg.current.validateFields().then(values => {
            if (isFirstSubmitReg.current) {
                // console.log(isFirstSubmit); // 通过验证的表单数据
                // console.log(values)
                checkRegisterInfo(values);
                isFirstSubmitReg.current = false;
            }
            console.log(isFirstSubmitReg.current); // 通过验证的表单数据
        });
    }

    //登录验证
    const formRefLog = useRef(null);
    const isFirstSubmitLog = useRef(true);
    const submitFormLog = () => {
        formRefLog.current.validateFields().then(values => {
            if (isFirstSubmitLog.current) {
                // console.log(isFirstSubmit); // 通过验证的表单数据
                // console.log(values)
                checkLoginInfo(values);
                isFirstSubmitLog.current = false;
            }
            console.log(isFirstSubmitLog.current); // 通过验证的表单数据
        });
    }

    // console.log(state)
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
                            <div className="col-md-5 ">
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
                                {/* <div>
                                    <Input className='inputBox' id="loginId" placeholder="ID" onChange={handleInputChange} />
                                    <br />
                                    <br />
                                    <Input.Password className='inputBox' id="loginPwd" placeholder="Passwords" onChange={handleInputChange} />
                                    <br />
                                    <br />
                                    <h6 style={LeftTextStyle}>{ERROR[err.val]}</h6>
                                    <div className="btn-box">
                                        <a>
                                            <button onClick={() => checkLoginInfo()}>
                                                SEND
                                            </button>
                                        </a>
                                    </div>
                                    <div>
                                        <br />
                                        <br />
                                        <h6 style={LeftTextStyle}>No account? Sign up <a className="linklike" onClick={toRegister}>here</a> ^_^</h6>
                                    </div>
                                </div> */}
                                <Form
                                    ref={formRefLog}
                                    form={form}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 24 }}
                                    layout="horizontal"
                                    size='large'

                                    style={{ maxWidth: 600 }}
                                >
                                    <Form.Item
                                        name='logName'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入用户名',
                                            }
                                        ]}>
                                        <Input
                                            allowClear
                                            maxLength={10}
                                            onChange={handleInputChange}
                                            id="logName"
                                            placeholder='Username' />
                                    </Form.Item>

                                    <Form.Item
                                        name='logPwd'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入密码',
                                            }, {
                                                pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,18}$/,
                                                message: '密码长度为6-18位，必须由字母、数字组成',
                                            }
                                        ]}>
                                        <Input.Password
                                            maxLength={18}
                                            allowClear
                                            placeholder='Password' />
                                    </Form.Item>

                                    <div className="btn-box" style={ItemCenter}>
                                        <a>
                                            <button style={{ fontWeight: 'bold' }} htmlType="submit" onClick={() => submitFormLog()}>
                                                SEND
                                            </button>
                                        </a>
                                        &emsp;
                                        <a>
                                            <button style={{ fontWeight: 'bold' }} onClick={() => handleInputReset()}>
                                                RESET
                                            </button>
                                        </a>
                                    </div>
                                </Form >
                                <div>
                                    <br />
                                    <br />
                                    <h6 style={LeftTextStyle}>No account? Sign up <a className="linklike" onClick={toRegister}>here</a> ^_^</h6>
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-5 ">
                                <div className="heading_container ">
                                    <h2 className="">
                                        Please register first ^_^
                                    </h2>
                                </div>
                                <Form
                                    ref={formRefReg}
                                    form={form}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 24 }}
                                    layout="horizontal"
                                    size='large'
                                    style={{ maxWidth: 600 }}
                                >
                                    <Form.Item
                                        name='regName'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入用户名',
                                            }
                                        ]}>
                                        <Input
                                            allowClear
                                            maxLength={10}
                                            suffix={<span style={{ color: '#8c8c8c' }}>{state.inputCounts['regName'] || 0}/10</span>}
                                            onChange={handleInputChange}
                                            id="regName"
                                            placeholder='Username' />
                                    </Form.Item>
                                    <Form.Item
                                        name='regGender'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择性别',
                                            }
                                        ]}>
                                        <Select placeholder='Gender' style={LeftTextStyle}>
                                            <Select.Option value="M">Male</Select.Option>
                                            <Select.Option value="F">Female</Select.Option>
                                            <Select.Option value="N">None</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='regPwd'
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入密码',
                                            }, {
                                                pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,18}$/,
                                                message: '密码长度为6-18位，必须由字母、数字组成',
                                            }
                                        ]}>
                                        <Input.Password
                                            maxLength={18}
                                            allowClear
                                            placeholder='Password' />
                                    </Form.Item>
                                    <Form.Item
                                        name='regPwd2'
                                        dependencies={['regPwd']}
                                        rules={[
                                            { required: true, message: '请再次输入密码' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('regPwd') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('两次输入密码不一致');
                                                },
                                            }),
                                        ]}>
                                        <Input.Password
                                            maxLength={18}
                                            allowClear
                                            placeholder='Confirm Password' />
                                    </Form.Item>
                                    <Form.Item
                                        name='regTele'
                                        rules={[
                                            { required: true, message: '请输入手机号码' },
                                            { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' },
                                        ]}>
                                        <Input
                                            allowClear
                                            maxLength={11}
                                            suffix={<span style={{ color: '#8c8c8c' }}>{state.inputCounts['regTele'] || 0}/11</span>}
                                            onChange={handleInputChange}
                                            id="regTele"
                                            placeholder='Telephone' />
                                    </Form.Item>
                                    <Form.Item className="required-field" name='regBrief'>
                                        <Input.TextArea
                                            allowClear
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            maxLength={200}
                                            showCount
                                            id="regBrief"
                                            placeholder='Brief Introduction' />
                                    </Form.Item>
                                    <div className="btn-box" style={ItemCenter}>
                                        <a>
                                            <button style={{ fontWeight: 'bold' }} htmlType="submit" onClick={() => submitFormReg()}>
                                                SEND
                                            </button>
                                        </a>
                                        &emsp;
                                        <a>
                                            <button style={{ fontWeight: 'bold' }} onClick={() => handleInputReset()}>
                                                RESET
                                            </button>
                                        </a>
                                    </div>
                                </Form >
                                <div>
                                    <br />
                                    <br />
                                    <h6 style={LeftTextStyle}>Already have an account? Login <a className="linklike" onClick={toLogin}>here</a>^_^</h6>
                                </div>
                                {/* <div>
                                    <div className='row'>
                                        <Input
                                            required
                                            style={{ height: '50px', fontSize: "20px", textAlign: 'left' }}
                                            maxLength={10}
                                            suffix={<span style={{ color: '#8c8c8c' }}>{state.inputCounts['regName'] || 0}/10</span>}
                                            onChange={handleInputChange}
                                            className="col-8" id="regName" placeholder="Name" />
                                        <Select
                                            required
                                            style={{ width: '100%', height: '50px', textAlign: 'center', paddingRight: '0' }}
                                            defaultValue=""
                                            className="col-4"
                                            id="regGender"
                                            onChange={(value) => handleInputChange(value, 'gender')}>
                                            <Option style={{ fontSize: '20px' }} value="M">Male</Option>
                                            <Option style={{ fontSize: '20px' }} value="F">Female</Option>
                                            <Option style={{ fontSize: '20px' }} value="N">Secret</Option>
                                        </Select>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.Password className='inputBox' id="regPwd" placeholder={'Input password'} onChange={handleInputChange} />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.Password className='inputBox' id="regPwd2" placeholder={'Input password again'} onChange={handleInputChange} />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input
                                            className='inputBox'
                                            maxLength={11}
                                            suffix={<span style={{ color: '#8c8c8c' }}>{state.inputCounts['regTele'] || 0}/11</span>}
                                            onChange={handleInputChange}
                                            id="regTele"
                                            placeholder="Phone Number" />
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <Input.TextArea
                                            className='inputBox'
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            maxLength={200}
                                            showCount
                                            onChange={handleInputChange}
                                            id="regBrief"
                                            placeholder="Brief introduction" />
                                    </div>
                                    <br />
                                    <h6 style={LeftTextStyle}>{ERROR[err.val]}</h6>
                                    <div className="btn-box">
                                        <a>
                                            <button onClick={() => checkRegisterInfo()}>
                                                SEND
                                            </button>
                                        </a>
                                    </div>
                                    <div>
                                        <br />
                                        <br />
                                        <h6 style={LeftTextStyle}>Already have an account? Login <a className="linklike" onClick={toLogin}>here</a>^_^</h6>
                                    </div>
                                </div> */}
                            </div>
                        )}
                        <div className="col-md-6 offset-md-1">
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