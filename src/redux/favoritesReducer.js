const initialState = {
  favorites:[],
  };
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        if (state.favorites.find(item => item.id === action.payload.id)) return state;
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
  
      case 'REMOVE_FROM_FAVORITES':
        return {
          ...state,
          favorites: state.favorites.filter(item => item.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  