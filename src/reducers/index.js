import { combineReducers } from 'redux';
import ChampionReducer from './reducer_champion';

const rootReducer = combineReducers({
  champions: ChampionReducer
});

export default rootReducer;
