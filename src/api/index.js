import {createRequest} from "@/util/request";
import md5 from "js-md5";
const axios = createRequest();

export function login(account,pwd,yzm=""){
	return axios.post("dlogin.php",{
    	passport : account,
        password : md5(pwd),
        yzm
	})
}

export function getMemberInfo(){
	return axios.post("/r/Home_HomeMember/getMemberInfo")
}