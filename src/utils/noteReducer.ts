
// Define the action types
type Action = { type: 'ADD_NOTE',payload:{city:string,note:string} } 

// Define the reducer function
const noteReducer = (state: stateType, action: Action): stateType => {
  switch (action.type) {
    case 'ADD_NOTE':{
      const {city,note} = action.payload
      if(state.length===0){
        state.push({city:city,notes:[{id:1,date:new Date().toLocaleString(),note}]})
      }else{
       state.map(c=>{
        if(c.city===city){
          c.notes.push({id:c.notes.length+1,date:new Date().toLocaleString(),note})
        }
      })
    }
      return state
    }
    default:
      return state;
  }
};


// Define the initial state
export type stateType = Array<{city:string,notes:Array<{id:number,date:string,note:string}>}>;
export default noteReducer;
