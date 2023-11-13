// utils.js
import store from "store";
const USER_KEY = 'ReadBook';

export function subscribe() {
    alert("Subscribe Success!");
}

// 首行缩进
export const indentTextStyle = {
    textIndent: '2em',  // 设置首行缩进为2个字符
    textAlign: 'left'  // 靠左对齐
};

export const LeftTextStyle = {
    textAlign: 'left'  // 靠左对齐
};

// 两端对齐
export const justifyTextStyle = {
    textAlign: 'justify'
};

export const ItemCenter = {
    display: 'flex',
    justifyContent: 'center', // 控制水平居中
    alignItems: 'center' // 控制垂直居中
}

// 假设你的文本内容存在于一个变量 text 中

const MAX_LENGTH = 200;  // 定义最大文本长度

export function truncateText(text) {
    if (text.length > MAX_LENGTH) {
        // 截取文本，保留前200个字符加省略号
        return text.substring(0, MAX_LENGTH) + '...';
    } else {
        // 不需要截取，直接返回原文本
        return text;
    }
}



//保存用户
export function saveUser(user) {
    store.set(USER_KEY, user);// 登录成功的时候，读取用户数据并放在内存中
    // const user = result.data;
    // // memoryUtils.user = user;
    // storageUtils.saveUser(user);
}

// 读取用户
export function getUser() {
    return store.get(USER_KEY) || {}
}

// 删除用户
export function removeUser() {
    store.remove(USER_KEY);
}

//返回上一个页面
export function goBack() {
    window.history.back()
}

export const ERROR = {
    1001: '账户不存在',
    1002: '密码错误',
    1003: '账号有误',
    2001: '信息缺项',
    2002: '密码不一致',
    2003: '该用户已存在',
    2004: '手机号无效'
}