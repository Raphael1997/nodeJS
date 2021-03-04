const { readInput, inquirerMenu, pause, listPlaces } = require("./helpers/inquire");
const Search = require("./models/search");
require("dotenv").config();

const main = async () => {

    let opt;

    const search = new Search();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:

                const inputUser = await readInput("City: ");

                const cities = await search.city(inputUser);

                const id = await listPlaces(cities);

                if (id === 0) continue;
                const citySelected = cities.find(city => city.id === id);

                search.saveHistory(citySelected.name);

                const temp = await search.weatherByPlace(citySelected.lat, citySelected.lng);


                console.log("\n Info about the city\n".green);
                console.log("City: ", citySelected.name);
                console.log("Lat: ", citySelected.lat);
                console.log("Long: ", citySelected.lng);
                console.log("Tempereture: ", temp.temp);
                console.log("Max: ", temp.max);
                console.log("Min: ", temp.min);
                console.log("Weather: ", temp.desc);
                break;

            case 2:

                search.history.forEach((place, i) => {
                    const id = `${i + 1}`.green;

                    console.log(`${id} ${place}`);
                })
                break;

            default:
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}

main();