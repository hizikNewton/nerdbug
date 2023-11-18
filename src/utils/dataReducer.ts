import dataType from 'src/types/type';

// Define the action types
type Action =
  | { type: 'REMOVE_ENTRY'; payload: { city: string } }
  | { type: 'UPDATE_ENTRY'; payload: { cityObj: dataType } };

const initialState: stateType =
  JSON.parse(localStorage.getItem('citiesAndWeather') ?? '') ||
  ({} as stateType);

// Define the reducer function
const dataReducer = (
  state: stateType = initialState,
  action: Action
): stateType => {
  switch (action.type) {
    case 'REMOVE_ENTRY': {
      const { city } = action.payload;
      console.log(state);
      return {
        ...state,
        items: state!.items.filter((item) => item.city !== city),
      };
    }
    case 'UPDATE_ENTRY': {
      const { cityObj } = action.payload;
      const existingItemIndex = state!.items.findIndex(
        (item) => item.city === cityObj.city
      );

      const updatedItems = [...state!.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        ...cityObj,
      };
      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};

// Define the initial state
export type stateType = { items: Array<dataType> } | null;
export default dataReducer;
