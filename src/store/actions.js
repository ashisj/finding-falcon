import {ADD_PLANET,REMOVE_PLANET,UPDATE_TOKEN,UPDATE_SEARCH_RESULT,UPDATE_TIME_TAKEN,RESET_ALL} from './actionTypes';

export const addPlanet = planet => ({
    type: ADD_PLANET,
    planet
});

export const removePlanet = planet => ({
    type: REMOVE_PLANET,
    planet
});

export const updateToken = token => ({
    type: UPDATE_TOKEN,
    token
});

export const updateSearchResult = searchResult => ({
    type: UPDATE_SEARCH_RESULT,
    searchResult
});

export const updateTimeTaken = timeTaken => ({
    type: UPDATE_TIME_TAKEN,
    timeTaken
});

export const resetAll = () => ({
    type: RESET_ALL
});
