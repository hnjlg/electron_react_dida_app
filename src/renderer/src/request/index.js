import axios from 'axios';
import { interceptorsReq, interceptorsRes } from './interceptors';

const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5000,
});

// 请求数据拦截处理
request.interceptors.request.use(interceptorsReq, (error) => Promise.reject(error.response));

// 返回数据拦截处理
request.interceptors.response.use(interceptorsRes, (error) => {
	if (error.response && error.response.status === 403) {
		console.error('登录信息过期！');
	} else {
		console.error(error?.response?.data?.message ?? '请求错误');
	}
	return Promise.reject(error.response);
});

export default request;
