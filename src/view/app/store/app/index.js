const initState = {
    isLogin : false,
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









export const reducer = function(state=initState,{action,payload}){
    const reducer = REDUCER[action];
    return reducer ? reducer(state,payload) : state;
}