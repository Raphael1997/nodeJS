const fs = require("fs")
const axios = require('axios')
class Search {

    history = []
    dbPath = "./db/database.json"

    constructor() {

        this.readDB();
    }

    get paramsMapBox() {

        return {
            'access_token': process.env.MAP_BOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {

        return {
            "appid": process.env.OPEN_WEATHER_KEY,
            "units": "metric"
        }
    }

    async city(place) {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
                params: this.paramsMapBox
            });


            const resp = await instance.get();

            return resp.data.features.map(place => ({

                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async weatherByPlace(lat, lon) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();


            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                max: main.temp_max,
                min: main.temp_min,
            }
        } catch (error) {

            console.log(error);
        }
    }

    async saveHistory(place) {

        if (this.history.includes(place)) {
            return;
        }

        this.history.unshift(place);

        this.saveDB();

    }

    saveDB() {

        fs.writeFileSync(this.dbPath, JSON.stringify(this.history));
    }

    readDB() {

        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

        this.history = JSON.parse(info);
    }
}

module.exports = Search;