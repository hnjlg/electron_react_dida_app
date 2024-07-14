export const interceptorsReq = (config) => {
	// config.headers.Authorization = Authorization;
	return config;
};

export const interceptorsRes = (response) => {
	if (response.status === 200) {
		// 成功
		return new Promise((resolve) => {
			resolve(response);
		});
	} else {
		return new Promise((_resolve, reject) => {
			// 异常
			console.error(response.data.message || '请求错误');
			reject(response);
		});
	}
};
