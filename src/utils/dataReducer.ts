import dataType from "src/types/type";

// Define the action types
type Action = { type: 'REMOVE_ENTRY',payload:{city:string} } 



// Define the reducer function
const dataReducer = (state: stateType, action: Action): stateType => {
  switch (action.type) {
    case 'REMOVE_ENTRY':{
      const {city} = action.payload
      if(state){
      return {
        ...state,
        items: state.items.filter(item => item.city !== city),
      }
    }
      return state
    }
    default:
      return state;
  }
};


// Define the initial state
export type stateType = {items:Array<dataType>} |null;
export default dataReducer;
