import * as api from "@/api";
const initState = {
    isLogin : true,
    appInfo : {},
    userInfo : {},
    refer : ""
}
export const LOGIN_LOADING = "login_login";
export const LOGIN_FAIL = "login_fail";
export const LOGIN_SUCCESS = "login_success";

const REDUCER = {
    [LOGIN_LOADING](state,payload){
        return state;
    }
};


export const login = () => async (dispatch) => {
    dispatch({
        type : LOGIN_LOADING,
        payload : {
            a : "aaa"
        }
    })
    const res = await api.getMemberInfo().catch(e=>e);
    if(res.code==200){
        dispatch({type : LOGIN_SUCCESS})
    }else{
        dispatch({type : LOGIN_FAIL})
    }
    return res;
}

export const reducer = function(state=initState,{type,payload}){
    console.log("action",type,payload);
    const reducer = REDUCER[type];
    return reducer ? reducer(state,payload) : state;
}