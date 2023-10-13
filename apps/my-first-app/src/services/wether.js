import currentWether from '../api/source/data.json';
import errorWether from '../api/source/error.json';
import{KEY} from '../../key.js'
const url = 'https://weatherapi-com.p.rapidapi.com';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key':KEY,
        //'X-RapidAPI-Key': 'bf9f57d213msh779f78b866de13bp1e864djsn642281fee0a3',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

export async function getWether() {
    return currentWether;
}

export async function getWetherByName(cityName) {
    const BASE_URL = new URL('/current.json', url);
    BASE_URL.searchParams.append('q', cityName)
    console.log(BASE_URL.href)
    console.log(KEY);
    const resp = await fetch(BASE_URL.href, options);
    return resp.json();
}