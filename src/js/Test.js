import { useEffect } from "react";
import '../../node_modules/font-awesome/less/font-awesome.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import {

} from '@fortawesome/fontawesome-free-regular'
import {
    faFacebook,
    faGithub, faQq
} from '@fortawesome/fontawesome-free-brands'

import cat1 from '../figures/cat1.png';
import cat2 from '../figures/cat2.png';
import cat3 from '../figures/cat3.png';
import cat4 from '../figures/cat4.png';
import cat5 from '../figures/cat5.png';
import cat6 from '../figures/cat6.png';
import { useNavigate } from 'react-router-dom';
import { subscribe, justifyTextStyle } from './utils.js';


function Test() {
    // selected() {
    //     const arr1 = [];
    //     const selectedElements = document.querySelectorAll(".selected");
    //     selectedElements.forEach((element) => {
    //         const value = element.getAttribute('value');
    //         arr1.push(value);
    //     });

    //     if (arr1.length === 0) {
    //         alert("Please select one category!");
    //     } else {
    //         window.location.href = `/testStart/${arr1}`;
    //     }
    // }

    // componentDidMount() {
    //     $(".img-box").click(function () {
    //         $(".img-box").removeClass('selected');
    //         $(this).addClass('selected');
    //         $(".img-box").removeAttr("name");
    //         $(this).attr('name', 'selected');
    //     });
    // }


    // const selected = () => {
    //     const arr1 = [];
    //     const selectedElements = document.querySelectorAll(".selected");
    //     selectedElements.forEach((element) => {
    //         const value = element.getAttribute('value');
    //         arr1.push(value);
    //     });

    //     if (arr1.length === 0) {
    //         alert("Please select one category!");
    //     } else {
    //         window.location.href = `/testStart/${arr1}`;
    //     }
    // };

    useEffect(() => {
        const handleImageClick = function () {
            const imgBoxes = document.querySelectorAll(".img-box");
            imgBoxes.forEach((box) => {
                box.classList.remove('selected');
                box.removeAttribute("name");
            });

            this.classList.add('selected');
            this.setAttribute('name', 'selected');
        };

        const imgBoxes = document.querySelectorAll(".img-box");
        imgBoxes.forEach((box) => box.addEventListener("click", handleImageClick));

        return () => {
            imgBoxes.forEach((box) => box.removeEventListener("click", handleImageClick));
        };
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        var arr1 = 'none';
        const selectedElements = document.querySelectorAll(".selected");
        selectedElements.forEach((element) => {
            const value = element.getAttribute('value');
            arr1 = value;
        });

        if (arr1 === 'none') {
            alert("Please select one category!");
        } else {
            navigate('/testStart', { state: { testType: arr1 } });
        }

    };


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


            <section id="s0" className="catagory_section layout_padding">
                <div className="catagory_container">
                    <div className="container ">
                        <div className="heading_container heading_center">
                            <h2>
                                Books Categories
                            </h2>
                            <p>
                                选择一个类别，点击按钮开始测试
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box selected" value="random">
                                        <img src={cat1} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="random" >
                                            随机
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box" value="figure">
                                        <img src={cat2} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="figure">
                                            人物形象
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box" value="writer">
                                        <img src={cat3} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="writer">
                                            作者
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box" value="main">
                                        <img src={cat4} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="main">
                                            主旨
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box" value="content">
                                        <img src={cat5} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="content">
                                            情节
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 ">
                                <div className="box ">
                                    <div className="img-box" value="detail">
                                        <img src={cat6} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5 id="detail">
                                            细节
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="catagory_container">
                            <div className="btn-box">
                                <a onClick={handleClick}>开始测试</a>
                            </div>
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

export default Test