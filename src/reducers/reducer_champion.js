import { FETCH_ALL_CHAMPIONS, SEARCH_CHAMPION, FILTER_TYPE } from '../actions/index'; 
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_CHAMPIONS:{
            return action.payload;
        }
        case SEARCH_CHAMPION: {
            return _.mapKeys(action.payload, 'id');
        }
        case FILTER_TYPE: {
            return action.payload;
        }
    }
    return state;
}