const initState = {
    list : [],
    page : 1
}



const REDUCER = {
    
};









export const reducer = function(state=initState,{action,payload}){
    const reducer = REDUCER[action];
    return reducer ? reducer(state,payload) : state;
}