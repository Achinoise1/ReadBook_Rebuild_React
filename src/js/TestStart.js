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

import { subscribe } from './utils.js';


function TestStart() {
    const wholePage = () => {
        $(window).attr("location", "#s1");
    }

    const choice = () => {
        $(function () {
            $("#test li").click(function () {
                $(this).siblings('li').removeClass('li-selected');
                $(this).addClass('li-selected');
                $(this).siblings('li').attr('name', '');
                $(this).attr('name', 'li-selected');
            });
        });
    }

    const sub = () => {

        /*  0 -- 题目id
                      1 -- 题目text
                      2 -- 选项文本 */

        /*var arr0 = [];*/
        var arr1 = [];
        /*var arr2 = [];*/

        $(".li-selected").each(function () {
            var va1 = $(this).attr('value');
            arr1.push(va1);
        });

        $.get('/submit', JSON.stringify({ "titleID_choice": arr1 }), function (data) {
            $(window).attr("location", "/process");
        }, "text");
    }

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



            <section id="s0" className="catagory_section layout_padding0">
                <div className="catagory_container">
                    <div className="container ">
                        <div className="heading_container heading_center">
                            <h2>
                                测试开始
                            </h2>
                            <p>
                                本次测试共有25个小题，分为选择题和判断题。请认真阅读每个小题，选择正确的答案。
                            </p>
                            <br /><br />
                        </div>
                        {/* {%if whole == 0%}
            <div className="row">
              <div className="col-sm-1 col-md-12">
                <div className="btn-box">
                  <a href="#s1">确认</a>
                </div>
              </div>
            </div>
            {%endif%} */}
                    </div>
                </div>
            </section>
            {/* <div>{{whole}}</div> */}

            {/* {%for i in range(0, length) %}
  {%if test[i]["Option_num"] == 4 %}
<section id="s{{i+1}}" className="catagory_section layout_padding3">
    {% endif %}
    {%if test[i]["Option_num"] == 2%}
    <section id="s{{i+1}}" className="catagory_section layout_padding4">
        {% endif %}
        <!--样式在style.css 57行附近-->
        {%if test[i]["Option_num"] == 3%}
        <section id="s{{i+1}}" className="catagory_section layout_padding5">
            {% endif %}
            <div className="catagory_container">
                <div className="container ">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 ">
                            <div className="box ">
                                <div className="img-box">
                                    <h3><b>{{ i+ 1}}</b></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-9 ">
                            <div>
                                <h5 id="idx">
                                    题目：{{ test[i]["Question"] }}
                                </h5>
                                <div className="box1 ">
                                    <form method="post">
                                        <ul id="test">
                                            {%for j in range(0,test[i]["Option_num"])%}
                                            <!--bootstrap.css 2427行附近-->
                                            <li name="" className="ori" value="{{i}}_{{test[i][" Options"][j]}}">
                                            {{ head[j]}}. &nbsp; {{ test[i]["Options"][j] }}
                                        </li>
                                        {% endfor %}
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!--最后一个加总提交样式-->
                <!-- 题数-1 -->
                {%if whole == 0%}
                {%if i == length-1%}
                <br><br>
                    <div className="btn-box">
                        <!--a标签的样式已经被改成跟button差不多的玩意儿了-->
                        <a href="#s{{i}}">上一题</a>
                        <div>&emsp;</div>
                        <!--整卷阅览需要把所有的上下题按钮藏起来-->
                        <a onclick="wholepage()">整卷阅览</a>
                        <div>&emsp;</div>
                        <a onclick="sub()">提交</a>
                    </div>
                    <!-- i>0, i<题数-1 -->
                    {% elif i>0 and i<length-1%}
                    <div className="btn-box">
                        <!--a标签的样式已经被改成跟button差不多的玩意儿了-->
                        <a href="#s{{i}}">上一题</a>
                        <div>&emsp;</div>
                        <a href="#s{{i+2}}">下一题</a>
                    </div>
                    {%else%}
                    <div className="btn-box">
                        <a href="#s{{i+2}}">下一题</a>
                    </div>
                    {% endif %}
                    {% elif whole == 1 and i == length-1%}
                    <div className="btn-box">
                        <a onclick="wholepage()">整卷阅览</a>
                        <div>&emsp;</div>
                        <a onclick="sub()">提交</a>
                    </div>
                    {% endif %}
                </div>
                </section>
                {% endfor %} */}

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

    )
}

export default TestStart