export const PROD_INFO_LOADING = "prod_info_loading";
export const PROD_INFO_SUCCESS = "prod_info_success";


export const store = {
    namespace : "booking",
    state : {
        infoLoading : true,
        info : {},
    },
    reducers : {
        [PROD_INFO_LOADING](state,loading){
            return Object.assign({},state,{infoLoading:loading})
        }
    },
    actions : {
        loading(loading){
            return{
                type : PROD_INFO_LOADING,
                payload : !!loading
            }
        }
    }
}