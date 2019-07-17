import axios from "axios";
import qs from "qs";
// axios.defaults.withCredentials = true;
const isProd = process.env.NODE_ENV==="production";
export function createRequest({baseURL="",request,response}={}){
	const axiosInters = axios.create({baseURL});
	const interceptors = {
		request : function(config){
			const params = config.data || {};
			config.data = qs.stringify(params);
			return config;
		},
		response : function(response){
			if(response.status==200){
				const res = response.data;
				return res;
			}else{
				const msg = `请求出错 status: ${response.status} statusText: ${response.statusText}`;
				return Promise.reject({
					code : -1000,
					msg : msg
				})
			}
		}
	}
	request = typeof request==="function" ? request : interceptors.request;
	response = typeof response==="function" ? response : interceptors.response;
	//添加request拦截器
	axiosInters.interceptors.request.use(request)
	//添加response拦截器
	axiosInters.interceptors.response.use(response,(error)=>{
		const msg = error.message=="Request failed with status code 504" ? 
			"网络请求起时，请检查您的网络" : 
			error.message;
		return Promise.reject({
			code : -1001,
			msg
		})
	})
	return axiosInters;
}
