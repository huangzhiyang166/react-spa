import * as api from "@/api";
export const initState = {
    list : []
}
export const LOGIN_LOADING = "login_login";
export const LOGIN_FAIL = "login_fail";
export const LOGIN_SUCCESS = "login_success";

export const reducers = {
    [LOGIN_LOADING](state,payload){
        return state;
    }
};

export const actions = {
    getList(){
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


