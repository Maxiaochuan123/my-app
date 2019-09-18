import Qs from "qs";
import storage from "../../static/js/storage";
import tool from "../../static/js/tool";
import axios from "axios";
import Toast from "muse-ui-toast";
import Loading from "muse-ui-loading";
const CODE_SUCCESS = 0;
const CODE_FAIL_LOGIN = 302; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};
let loading = null;
// 超时时间
axios.defaults.timeout = 5000;
/*----------------------请求拦截----------------------*/
axios.interceptors.request.use(
  config => {
    loading = Loading({
      text: "正在加载中"
    });
    // 参数序列化
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      config.data = Qs.stringify(config.data);
    }
    // 携带 token
    let loginObj = tool.decUserInfo("login");
    let accessToken = loginObj.accessToken;

    if (accessToken && config.url !== "/login") {
      config.headers.accessToken = accessToken;
    }
    return config;
  },
  error => {
    Toast.error({
      message: "加载超时"
    });
    loading && loading.close();
    return Promise.reject(error);
  }
);
/*----------------------响应拦截----------------------*/
axios.interceptors.response.use(
  response => {
    loading && loading.close();
    return response;
  },
  error => {
    loading && loading.close();
    if (error && error.response) {
      switch (error.response.status) {
        case CODE_FAIL_LOGIN:
          localStorage.clear();
          window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
          break;
        case NO_VIEW_RECORD_PERMISSION:
          Toast.warning({
            message: "您无权访问该页面"
          });
          window.history.go(-1);
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  server = "service"
}) => {
  let httpUrl = window.config[server] + url;
  function checkCode(res) {
    return new Promise((resolve, reject) => {
      const data = res.data;
      if (res.code === CODE_SUCCESS) {
        resolve(data);
      } else {
        if (data.code === CODE_FAIL_LOGIN) {
          Toast.error({
            message: "token过期,或者没有登录",
            position: "top"
          });
          utils.signOut();
        } else if (data.code === NO_VIEW_RECORD_PERMISSION) {
          Toast.error({
            message: "您没有权限访问",
            position: "top"
          });
          window.history.go(-1);
        } else if (data.msg) {
          Toast.error({
            message: data.msg,
            position: "top"
          });
        } else {
          Toast.error({
            message: `code:${data.code}`,
            position: "top"
          });
        }
        reject(data);
      }
    });
  }
  if (method === METHODS.GET) {
    return axios.get(httpUrl, { params: params }).then(res => checkCode(res));
  } else if (method === METHODS.POST) {
    return axios.post(httpUrl, params).then(res => checkCode(res));
  }
};
const post = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET
  });
export default post;
