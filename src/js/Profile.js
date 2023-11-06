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
// import axios from 'axios';
import { subscribe, justifyTextStyle, getUser, LeftTextStyle, removeUser } from './utils.js';
import { Spin, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUser();
            setUser(data);
            // console.log(data);
        };
        fetchData();
    }, []);
    const navigate = useNavigate();
    const logout = () => {
        removeUser();
        navigate('/');

    }
    // console.log(user);
    // console.log(getUser());

    return (
        <div>
            <div className="">
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
                                    {(typeof getUser() === 'object' && Object.keys(getUser()).length === 0) ? (
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span> </a>
                                        </li>
                                    ) : (
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/profile">Profile <span className="sr-only">(current)</span> </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>

            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="heading_container ">
                                <h1 className="">
                                    <b>Profile</b>
                                </h1> <br /><br />
                            </div>
                            {(typeof getUser() === 'object' && Object.keys(getUser()).length === 0) ? (
                                <h4></h4>
                            ) : (
                                <div>
                                    <h4 style={LeftTextStyle}>
                                        <b>ID:&emsp;</b> {getUser().id}
                                    </h4> <br />
                                    <h4 style={LeftTextStyle}>
                                        <b>Name:&emsp;</b> {getUser().name}
                                    </h4> <br />
                                    <h4 style={LeftTextStyle}>
                                        <b>Gender:&emsp;</b> {getUser().gender}
                                    </h4> <br />
                                    <h4 style={LeftTextStyle}>
                                        <b>Tele:&emsp;</b> {getUser().tele}
                                    </h4> <br />
                                    <h4 style={LeftTextStyle}>
                                        <b>Brief introduction:&emsp;</b> {getUser().brief}
                                    </h4>
                                    <br />
                                    <br />
                                    <div className="btn-box">
                                        <a onClick={() => logout()}>
                                            {/* <a > */}
                                            <button>
                                                Logout
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="col-md-6">
                            <Image src={require(`../figures/contact-img.png`)} preview={false} alt="" />
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

export default Profile;