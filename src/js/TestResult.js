import { useState, useEffect } from "react";
import '../../node_modules/font-awesome/less/font-awesome.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery';
import {
    faFacebook,
    faGithub, faQq
} from '@fortawesome/fontawesome-free-brands'
import { useLocation } from "react-router-dom";
import { subscribe } from './utils.js';
import axios from "axios";
import { Spin } from 'antd';
import '../css/style.css';
import { justifyTextStyle } from './utils';
import { Card } from "react-bootstrap";
import { Button } from 'antd'

function TestResult() {
    const choice = ['A', 'B', 'C', 'D'];
    const [cards, setCards] = useState({});

    const location = useLocation();
    const { ques } = location.state
    const { userChoose } = location.state

    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    }

    const show = () => {
        console.log(userChoose)
        console.log(ques.data)
        console.log(cards.data.ans)     // 获取到所有的选择结果

    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const formData = new FormData();
        formData.append('questions', JSON.stringify(ques));
        formData.append('choice', JSON.stringify(userChoose));
        axios.post('/api/TestProcess', formData)
            .then(response => {
                setCards(response.data)
            })
            .catch(error => {
                console.log(error);
            });

    }

    const coreData = ques.data
    console.log(cards)


    return (
        <div>
            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <a className="navbar-brand" href="/">
                            <span>
                                Read-Book
                            </span>
                        </a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                                {/* {%if status == 0 or status == 1%}
              <li className="nav-item active">
                <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span> </a>
              </li>
              {%elif status == 2%}
              <li className="nav-item active">
                <a className="nav-link" href="/profile">Profile <span className="sr-only">(current)</span> </a>
              </li>
              {%endif%} */}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="page-container">
                <div className="scrollable-section-lg">
                    <br />
                    <br />
                    <br />

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        {(coreData) ? (
                            coreData.ques.map((itemOutside, indexOutside) => (
                                <Card className="w-75 test-card" id={indexOutside + 1}>
                                    <Card.Body>
                                        <div className='row' key={indexOutside} >
                                            <div className='col-2 test-id'>{indexOutside + 1}</div>
                                            <div style={justifyTextStyle} className='col-10'>
                                                <Card.Title style={{ fontSize: '36px' }}><b>{itemOutside.Question}</b></Card.Title>
                                            </div>
                                        </div>
                                        <ul style={{ paddingInlineStart: '0px' }} id='test-single'>
                                            {itemOutside.Options.map((item, indexInside) => {
                                                return (
                                                    (itemOutside.Options[indexInside] === itemOutside.Ans) ? (
                                                        (userChoose && userChoose[indexOutside]) ? (
                                                            // 用户选择了答案，用绿色显示正确答案
                                                            <li className='li-right' key={indexInside} value={item} >
                                                                <div className='row' >
                                                                    <Card.Text className='col-2' style={{ margin: '0px', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{choice[indexInside]}</Card.Text>
                                                                    <Card.Text className='col-10' style={{ fontSize: '22px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>{item}</Card.Text>
                                                                </div>
                                                            </li>
                                                        ) : (
                                                            // 用户没有选择答案，用蓝色显示正确答案
                                                            <li className='li-empty' key={indexInside} value={item} >
                                                                <div className='row' >
                                                                    <Card.Text className='col-2' style={{ margin: '0px', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{choice[indexInside]}</Card.Text>
                                                                    <Card.Text className='col-10' style={{ fontSize: '22px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>{item}</Card.Text>
                                                                </div>
                                                            </li>
                                                        )
                                                    ) : (
                                                        (userChoose[indexOutside] === item) ? (
                                                            // 用户选择了错误答案，用红色显示
                                                            <li className='li-wrong' key={indexInside} value={item} >
                                                                <div className='row' >
                                                                    <Card.Text className='col-2' style={{ margin: '0px', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{choice[indexInside]}</Card.Text>
                                                                    <Card.Text className='col-10' style={{ fontSize: '22px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>{item}</Card.Text>
                                                                </div>
                                                            </li>
                                                        ) : (
                                                            // 其他无关选项，不显示颜色
                                                            <li key={indexInside} value={item} >
                                                                <div className='row' >
                                                                    <Card.Text className='col-2' style={{ margin: '0px', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{choice[indexInside]}</Card.Text>
                                                                    <Card.Text className='col-10' style={{ fontSize: '22px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>{item}</Card.Text>
                                                                </div>
                                                            </li>
                                                        )
                                                    )
                                                );

                                            })}
                                        </ul>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <Spin />
                            // 100003——数据不可用
                        )}


                        <div className='click-box' onClick={show}>提交</div>
                    </div>

                    <br />
                    <section className="info_section layout_padding2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-lg-4 info-col">
                                    <div className="info_detail">
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
                                    <div className="info_contact">
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
                                <div className="col-md-6 col-lg-4 info-col">
                                    <div className="info_contact">
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
                <div className="fixed-section">
                    <div className="flex-container">
                        {(coreData) ? (
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {coreData.ques.map((_, index) => (
                                    <div className="flex-item" key={index}
                                        style={{
                                            flex: "0 0 25%",
                                            maxWidth: "25%",
                                            width: "25%"
                                        }}
                                    >
                                        <Button type='text' className="sm child-flex-item" onClick={() => scrollToAnchor(index + 1)}>
                                            {index + 1}{'\u00A0\u00A0'}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Spin />
                        )}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default TestResult