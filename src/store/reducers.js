import {ADD_PLANET,REMOVE_PLANET,UPDATE_TOKEN,UPDATE_SEARCH_RESULT,UPDATE_TIME_TAKEN,RESET_ALL} from './actionTypes';

const initialState = {
    selectedPlanets: [],
    token: '',
    searchResult: {},
    timeTaken: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PLANET:
            return {
                ...state,
                selectedPlanets: [...state.selectedPlanets,action.planet]
            }
        case REMOVE_PLANET:
            const updatePlanets = state.selectedPlanets.filter(planet => planet.name !== action.planet.name);
            return {
                ...state,
                selectedPlanets: updatePlanets
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            }   
        case UPDATE_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.searchResult
            }
        case UPDATE_TIME_TAKEN: 
            return {
                ...state,
                timeTaken:action.timeTaken
            }
        case RESET_ALL:
            return {
                ...state,
                selectedPlanets: [],
                token: '',
                searchResult: {}
            }
        default:
            return state;
    }
}