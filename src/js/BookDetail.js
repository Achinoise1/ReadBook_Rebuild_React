import { Component } from "react";
import '../../node_modules/font-awesome/less/font-awesome.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery';
import {

} from '@fortawesome/fontawesome-free-regular'
import {
    faFacebook,
    faGithub, faQq
} from '@fortawesome/fontawesome-free-brands'


class BookDetail extends Component {
    render() {
        return (
            <div>
                <body className="sub_page">

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
                    </div>


                    <section className="about_section layout_padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="img-box">
                                        <img src="/static/images/pic/{{i+1}}.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {/* <h5 className="text-center" name="ID" value="{{detail[0]}}">排名：{{ detail[0]}}</h5>
                                    <h5 className="text-center">书名：{{ detail[1]}}</h5>
                                    <h5 className="text-center">作者：{{ detail[2]}}</h5>
                                    {%if foreign == 1%}
                                    <h5 className="text-center">原作名：{{ detail[16]}}</h5>
                                    <h5 className="text-center">译者：{{ detail[17]}}</h5>
                                    {% endif %}
                                    <h5 className="text-center">国家：{{ detail[3]}}</h5>
                                    <h5 className="text-center">出版社：{{ detail[4]}}</h5>
                                    <h5 className="text-center">出版年份：{{ detail[5]}}</h5>
                                    <h5 className="text-center">页数：{{ detail[6]}}</h5>
                                    <h5 className="text-center">价格：{{ detail[7]}}</h5>
                                    <h5 className="text-center">装帧：{{ detail[8]}}</h5>
                                    <h5 className="text-center">丛书：{{ detail[9]}}</h5>
                                    <h5 className="text-center">isbn码：{{ detail[10]}}</h5>
                                    <h5 className="text-center">评分：{{ detail[11]}}</h5>
                                    <h5 className="text-center">评论数：{{ detail[12]}}</h5> */}
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <h5>简介：{{ detail[13]}}</h5> */}
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row align-items-center">
                            {/* {%for j in range(0,5)%}
                                                <div className="col">
                                                    <h5 className="text-center">&nbsp;</h5>
                                                </div>
                                                {% endfor %} */}
                            <div className="col-md-offset-1">
                                <div className="btn-box m-auto">
                                    <a href="/books">
                                        <button>
                                            返回
                                        </button>
                                    </a>
                                    {/* {%if status == 2%}
                                                        &emsp;
                                                        <!--<a onclick="testSingle()">-->
                                                            <a href="/testID/{{i+1}}">
                                                                <button>
                                                                    测试
                                                                </button>
                                                            </a>
                                                            {% endif %} */}
                                </div>
                            </div>
                            {/* {%for j in range(0,5)%}
                                                <div className="col">
                                                    <h5 className="text-center">&nbsp;</h5>
                                                </div>
                                                {% endfor %} */}

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
                                            <button type="submit" onClick="subscribe()">
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



                </body>
            </div>
        )
    }
}

export default BookDetail;