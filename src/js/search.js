

export function searchCity(city, cities){
    return cities.filter(ci => {
        const regex = new RegExp(city, 'gi');
        return ci.city.match(regex);
    })
}
