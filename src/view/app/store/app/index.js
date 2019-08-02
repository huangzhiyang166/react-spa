import * as api from "@/api";
//actionType
export const LOGIN_LOADING = "login_login";
export const LOGIN_FAIL = "login_fail";
export const LOGIN_SUCCESS = "login_success";

export const store = {
    namespace : "app",
    state : {
        isLogin : true,
        appInfo : {},
        userInfo : {},
        refer : ""
    },
    reducers : {
        [LOGIN_LOADING](state,payload){
            return state;
        }
    },
    actions : {
        login(){
            return async function(dispatch){
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
        }
    }
}

