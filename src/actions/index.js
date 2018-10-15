import axios from 'axios';

let CHAMPIONS = {};

export const FETCH_ALL_CHAMPIONS = "FETCH_ALL_CHAMPIONS";
export const SEARCH_CHAMPION = "SEARCH_CHAMPION";
export const FILTER_TYPE = "FILTER_TYPE";

export function fetchAllChampions(){
    return (dispatch) =>{
        if(CHAMPIONS !== {}){
            const request = axios.get('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json');
            request.then((data) =>{
                CHAMPIONS = data.data.data;
                dispatch({ type: FETCH_ALL_CHAMPIONS, payload: CHAMPIONS});
            });
        }else{
            dispatch({ type: FETCH_ALL_CHAMPIONS, payload: CHAMPIONS});
        }
    }
}

export function searchChampion(input){
    let champions = [];
    _.map(CHAMPIONS, (champion) =>{
        if(champion.name.toLowerCase().includes(input)){
            champions.push(champion);
        }
    });
    return{
        type: SEARCH_CHAMPION,
        payload: champions
    };
}

export function filterType(type){
    if(type === 'All'){
        return {
            type: FILTER_TYPE,
            payload: CHAMPIONS
        };
    }
    else{
        let champions = [];
        _.map(CHAMPIONS, (champion) =>{
            // console.log(champion.tags);
            _.map(champion.tags, (tag) =>{
                if(tag === type){
                    champions.push(champion);
                }
            });
        });
        return {
            type: FILTER_TYPE,
            payload: _.mapKeys(champions, 'id')
        };
    }
}