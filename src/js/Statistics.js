import { useState, useEffect } from "react";
import '../../node_modules/font-awesome/less/font-awesome.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelopeOpen, faPhone, faUniversity
} from '@fortawesome/fontawesome-free-solid'
import {
    faFacebook,
    faGithub, faQq
} from '@fortawesome/fontawesome-free-brands'
import { useLocation, useNavigate } from "react-router-dom";
import { subscribe, justifyTextStyle, getUser } from './utils.js';
import axios from "axios";
import '../css/style.css';
import { Progress, Space } from 'antd';
import { Radar } from '@antv/g2plot';
import CompareChartsDemo from './CompareChartsDemo'

function Statistics() {
    const [res, setRes] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof getUser() != 'object' || Object.keys(getUser()).length != 0) {
            const formData = new FormData();
            formData.append('userId', getUser().id);
            axios.post('/api/Statistics', formData)
                .then(response => {
                    setRes(response.data.data);
                    setIsLoaded(true); // 设置 isLoaded 为 true
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setIsLoaded(true);
        }
    }, [])

    const data = (res && res.Testscore) ? [
        { name: 'recently', attribute: 'figure', score: res.Testscore[0] },
        { name: 'recently', attribute: 'author', score: res.Testscore[1] },
        { name: 'recently', attribute: 'main', score: res.Testscore[2] },
        { name: 'recently', attribute: 'content', score: res.Testscore[3] },
        { name: 'recently', attribute: 'detail', score: res.Testscore[4] },
        { name: 'total', attribute: 'figure', score: res.Testscore[5] },
        { name: 'total', attribute: 'author', score: res.Testscore[6] },
        { name: 'total', attribute: 'main', score: res.Testscore[7] },
        { name: 'total', attribute: 'content', score: res.Testscore[8] },
        { name: 'total', attribute: 'detail', score: res.Testscore[9] }
    ] : [
        { name: 'recently', attribute: 'figure', score: 0 },
        { name: 'recently', attribute: 'author', score: 0 },
        { name: 'recently', attribute: 'main', score: 0 },
        { name: 'recently', attribute: 'content', score: 0 },
        { name: 'recently', attribute: 'detail', score: 0 },
        { name: 'total', attribute: 'figure', score: 0 },
        { name: 'total', attribute: 'author', score: 0 },
        { name: 'total', attribute: 'main', score: 0 },
        { name: 'total', attribute: 'content', score: 0 },
        { name: 'total', attribute: 'detail', score: 0 }
    ]

    //感觉所有的交互数据都可以用这个去操作，也避免渲染多次
    useEffect(() => {
        if (isLoaded && res != undefined && Object.keys(res).length > 0) { // 添加判断条件
            const radarPlot = new Radar('result-container', {
                data,
                xField: 'attribute',
                yField: 'score',
                seriesField: 'name',
                radius: 0.8,
                angleField: 'attribute',
                area: {},
            });
            radarPlot.render();

            return () => {
                radarPlot.destroy();
            };
        }
    }, [isLoaded]);

    return (
        <div>
            <div >
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

            <section className="blog_section layout_padding">
                {(typeof getUser() === 'object' && Object.keys(getUser()).length === 0) ? (
                    <div className="container ">
                        <div className="heading_container heading_center">
                            <h1>
                                <b>请先<a href='/login'>登录</a></b>
                            </h1>
                            <p style={{ fontSize: "24px" }}>
                                登录后即可查看结果
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="container">





                        {(res != undefined && Object.keys(res).length > 0) ? (
                            <div>
                                <div className="heading_container heading_center">
                                    <h2>
                                        历史数据
                                    </h2>
                                </div>
                                <br /><br />
                                <div className="row">
                                    <div className="col-md-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div style={{ marginBottom: "20px" }}>
                                                <Space>
                                                    <Progress type="circle" percent={res.avgAccuracy} />
                                                    <Progress type="circle" percent={res.lastAccuracy} />
                                                    {/* <CompareChartsDemo /> */}
                                                </Space>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div id="result-container" style={{ width: "300px", height: "300px" }}></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-7" style={justifyTextStyle}>
                                        <div>
                                            用户&emsp;<b style={{ fontSize: '20px' }}>{getUser().name}</b>：
                                        </div>
                                        <br />
                                        <div>
                                            &emsp;您共测试<b style={{ fontSize: '20px' }}>{res ? res.times : '/'}</b>次，
                                            平均用时<b style={{ fontSize: '20px' }}>{res ? res.avgDuration : '/'}</b>，
                                            正确率为<b style={{ fontSize: '20px' }}>{res ? res.avgAccuracy : '/'}%</b>。
                                            最近一次在<b style={{ fontSize: '20px' }}>{res ? res.lastTime : '/'}</b>测试，
                                            用时<b style={{ fontSize: '20px' }}>{res ? res.lastDuration : '/'}</b>，
                                            正确率为<b style={{ fontSize: '20px' }}>{res ? res.lastAccuracy : '/'}%</b>。
                                        </div>
                                        <br />
                                        <div>
                                            &emsp;综合来看，您对<span style={{ fontSize: '20px', fontWeight: 'bold' }}>总体知识</span>的掌握程度：
                                            {(() => {
                                                if (res.avgAccuracy < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.avgAccuracy < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.avgAccuracy < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.avgAccuracy < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                        <div>
                                            &emsp;其中，您对各类书籍中<span style={{ fontSize: '20px', fontWeight: 'bold' }}>人物部分</span>知识掌握程度
                                            {(() => {
                                                if (res.Testscore && res.Testscore[5] < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.Testscore && res.Testscore[5] < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.Testscore && res.Testscore[5] < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.Testscore && res.Testscore[5] < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                        <div>
                                            &emsp;其中，您对各类书籍中<span style={{ fontSize: '20px', fontWeight: 'bold' }}>作者部分</span>知识掌握程度
                                            {(() => {
                                                if (res.Testscore && res.Testscore[6] < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.Testscore && res.Testscore[6] < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.Testscore && res.Testscore[6] < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.Testscore && res.Testscore[6] < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                        <div>
                                            &emsp;其中，您对各类书籍中<span style={{ fontSize: '20px', fontWeight: 'bold' }}>主旨部分</span>知识掌握程度
                                            {(() => {
                                                if (res.Testscore && res.Testscore[7] < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.Testscore && res.Testscore[7] < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.Testscore && res.Testscore[7] < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.Testscore && res.Testscore[7] < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                        <div>
                                            &emsp;其中，您对各类书籍中<span style={{ fontSize: '20px', fontWeight: 'bold' }}>情节部分</span>知识掌握程度
                                            {(() => {
                                                if (res.Testscore && res.Testscore[8] < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.Testscore && res.Testscore[8] < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.Testscore && res.Testscore[8] < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.Testscore && res.Testscore[8] < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                        <div>
                                            &emsp;其中，您对各类书籍中<span style={{ fontSize: '20px', fontWeight: 'bold' }}>细节部分</span>知识掌握程度
                                            {(() => {
                                                if (res.Testscore && res.Testscore[9] < 60) {
                                                    return <b style={{ fontSize: '20px' }}>仍有待提高。</b>;
                                                } else if (res.Testscore && res.Testscore[9] < 70) {
                                                    return <b style={{ fontSize: '20px' }}>为一般。</b>;
                                                } else if (res.Testscore && res.Testscore[9] < 80) {
                                                    return <b style={{ fontSize: '20px' }}>为较好。</b>;
                                                } else if (res.Testscore && res.Testscore[9] < 90) {
                                                    return <b style={{ fontSize: '20px' }}>为良好。</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>为优秀。</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>

                                        <div>
                                            <br /><br />
                                            {(() => {
                                                if (res.avgAccuracy < 60) {
                                                    return <b style={{ fontSize: '20px' }}>如果不读书，行万里路，也只是个邮差——钱钟书</b>;
                                                } else if (res.avgAccuracy < 70) {
                                                    return <b style={{ fontSize: '20px' }}>只要打开书，就随时打开了一个崭新的世界——《人民日报》</b>;
                                                } else if (res.avgAccuracy < 80) {
                                                    return <b style={{ fontSize: '20px' }}>无论是驱赶迷茫，还是对抗平庸，读书都是最简单也最实用的方法</b>;
                                                } else if (res.avgAccuracy < 90) {
                                                    return <b style={{ fontSize: '20px' }}>世界上任何一个书籍都不能给你带来好运，但他们能让你悄悄地成为自己——赫尔曼·黑塞</b>;
                                                } else {
                                                    return <b style={{ fontSize: '20px' }}>脚步丈量不到的地方，书可以；眼睛到不了的地方，书可以——《人民日报》</b>;
                                                }
                                            })()}
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="heading_container heading_center">
                                <h2>
                                    您还没有进行过任何测试，请先进行<a href='/test'>测试</a>，或返回<a href='/'>主页</a>
                                </h2>
                            </div>
                        )}

                    </div>)}
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

export default Statistics;