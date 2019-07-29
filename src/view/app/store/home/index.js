const initState = {
    list : []
}



const REDUCER = {
    
};









export const reducer = function(state=initState,{action,payload}){
    const reducer = REDUCER[action];
    return reducer ? reducer(state,payload) : state;
}