import '../css/bootstrap.css';
import '../css/ion.rangeSlider.min.css';
import '../css/responsive.css';
import '../css/style.css';
import '../css/style.css.map';
import '../../node_modules/font-awesome/less/font-awesome.less';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import { faFacebook, faGithub, faQq } from '@fortawesome/fontawesome-free-brands'
import axios from 'axios';
import { subscribe } from './utils.js';
import { Spin, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


function Book() {

    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const formData = new FormData();
        formData.append('start', 1);
        formData.append('end', 400);

        axios.post('/api/Book', formData)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const navigate = useNavigate();

    const handleClick = (bookId) => {
        navigate('/bookDetail', { state: { id: bookId } });
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data: {}
    //     };
    // }

    // componentDidMount() {
    //     this.fetchData();
    // }

    // fetchData() {
    //     const formData = new FormData();
    //     formData.append('start', 1);
    //     formData.append('end', 400);

    //     axios.post('/api/Book', formData).then(response =>
    //         this.setState({ data: response.data })
    //     ).catch(error => {
    //         console.log(error)
    //     });
    // };

    if (data === null) {
        return <Spin />;
    }

    const numbers = [];
    for (let i = 0; i < 4; i++) {
        numbers.push(i);
    }

    if (!data.data) return <Spin />
    for (let i = 0; i < 4; i++) {
        numbers.push(i);
    }

    return (
        <div>
            <div className="page-container">

                <div className="scrollable-section-lg">
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

                        <section className="about_section layout_padding">
                            <div className="container ">
                                <div className="row">
                                    {Array.isArray(data.data) ? (
                                        data.data.map((item) => (
                                            <div className="col-3" key={item.id} id={item.id}>
                                                <div className="detail-box">
                                                    <h5>{item.id}</h5>
                                                    <h5>{item.name}</h5>
                                                    <h5>{item.author}</h5>
                                                    <button onClick={() => handleClick(item.id)}>详情</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <Spin />
                                        // 100003——数据不可用
                                    )}
                                </div>
                            </div>
                        </section>

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
                </div>

                <div className="scrollable-section-sm">
                    {/* 做悬浮导航栏 */}
                    {/* <div className="container">

                            {Array.isArray(data.data) ? (
                                data.data.map((item, index) => {
                                    if (index % 4 === 0) {
                                        return (
                                            <div className='row'>
                                                <div key={item.id}>
                                                    <a className="sm equal-width" href={'#' + item.id}>{item.id}{'\u00A0\u00A0'}</a>
                                                </div>
                                                <div key={item.id + 1}>
                                                    <a className="sm equal-width" href={'#' + item.id + 1}>{item.id + 1}{'\u00A0\u00A0'}</a>
                                                </div>
                                                <div key={item.id + 2}>
                                                    <a className="sm equal-width" href={'#' + item.id + 2}>{item.id + 2}{'\u00A0\u00A0'}</a>
                                                </div>
                                                <div key={item.id + 3}>
                                                    <a className="sm equal-width" href={'#' + item.id + 3}>{item.id + 3}{'\u00A0\u00A0'}</a>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <Spin />
                            )}

                        </div> */}

                    <div className="flex-container">
                        {Array.isArray(data.data) ? (
                            <div>
                                {data.data.map((item, index) => {
                                    const colNum = 4;
                                    if (index % colNum === 0) {
                                        const temp = index / colNum + 1;
                                        return (
                                            <div className="flex-item" key={temp}>
                                                {Array.from({ length: colNum }, (_, subIndex) => (
                                                    <Button className="sm child-flex-item col-3" type="dashed" key={item.id + subIndex} href={'#' + (item.id + subIndex)}>
                                                        {item.id + subIndex}{'\u00A0\u00A0'}
                                                    </Button>

                                                ))}
                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
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



export default Book
