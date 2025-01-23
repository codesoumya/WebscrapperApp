export interface authReducerState {
    id: string | null,
    isAuthenticated: boolean,
    emailId: string | null,
    name: string | null,
    password: string | null,
    phone: number | null
  }
  
  interface setAuthAction {
    type: "SET_AUTH_DETAILS",
    payload: {
      authDetails: authReducerState
    }
  }
  
  interface setAuthItem {
    type: "SET_AUTH_ITEM",
    payload: {
      item: string,
      value: string | boolean | number
    }
  }
  
  const initialState: authReducerState = {
    id: null,
    isAuthenticated: false,
    emailId: null,
    name: null,
    password: null,
    phone: null
  };
  
  export type actions = setAuthAction | setAuthItem;
  
  const authReducer = (state = initialState, action: actions): authReducerState => {
    switch (action.type) {
      case "SET_AUTH_DETAILS":
        const authDetails = action.payload.authDetails;
        return authDetails;
      
      case "SET_AUTH_ITEM":
        const item = action.payload.item;
        const value = action.payload.value;
        return {
          ...state,
          [item]: value
        };
      
      default:
        return state;
    }
  };
  
  export default authReducer;
  