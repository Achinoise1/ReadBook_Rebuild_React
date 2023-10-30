import '../../node_modules/font-awesome/less/font-awesome.less';
import 'react-fontawesome';
import '../css/bootstrap.css';
import '../css/ion.rangeSlider.min.css';
import '../css/responsive.css';
import '../css/style.css';
import '../css/style.css.map';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft, faAngleRight, faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'

import {

} from '@fortawesome/fontawesome-free-regular'
import {
    faFacebook,
    faGithub, faQq
} from '@fortawesome/fontawesome-free-brands'
import axios from 'axios';
import { subscribe, truncateText, indentTextStyle, justifyTextStyle } from './utils.js';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Home() {

    const [data, setData] = useState({});

    useEffect(() => {

        axios.post('/api') // 替换为你的后端API URL
            .catch(error => {
                console.log(error)
            });
        axios.get('/api/Home') // 替换为你的后端API URL
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    //如果后边没加[]，首页会出现一个很搞笑的东西
    // useEffect(() => {

    //     axios.post('/api') // 替换为你的后端API URL
    //         .catch(error => {
    //             console.log(error)
    //         });
    //     axios.get('/api/Home') // 替换为你的后端API URL
    //         .then(response => {
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    // });

    if (!data.data) return <Spin />
    const coreData = data.data

    return (
        <div>
            <div className="hero_area">
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
                                    {/* {%if status == 0 or status == 1%}
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span> </a>
                                        </li>
                                        {% elif status == 2%}
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/profile">Profile <span className="sr-only">(current)</span> </a>
                                        </li>
                                        {% endif %} */}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>

                <section className="slider_section ">
                    <Carousel infiniteLoop autoPlay interval={4000}>
                        <div className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="detail-box">
                                                    <h5>
                                                        Read-Book
                                                    </h5>
                                                    <h1>
                                                        今天读什么？
                                                    </h1>
                                                    <p style={indentTextStyle}>
                                                        {truncateText(coreData.brief)}
                                                    </p>
                                                    <a className="empty" href="/bookDetail/{{bookReID}}">详情</a>
                                                </div>
                                            </div>
                                            <div className="col-md-2"></div>
                                            <div className="col-md-4">
                                                <img src={require(`../figures/pic/${coreData.id}.jpg`)} className="img1" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="detail-box">
                                                    <h5>
                                                        Read-Book
                                                    </h5>
                                                    <h1>
                                                        测一测 <br />
                                                        掌握了多少知识？
                                                    </h1>
                                                    <p>
                                                        随机选取题目测试，看看你对这些知识的了解程度。
                                                    </p>
                                                    <a href="/test">
                                                        测试
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <img src={require("../figures/slider-img.png")} alt="" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>
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
        </div>
    )
}

export default Home
