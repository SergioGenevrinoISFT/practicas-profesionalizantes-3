
function getColorForPrecipitation(precipitation) {

    const coloresPrecipitacion = [
        { min: 0, max: 54.99, color: "#b0b0ff" },
        { min: 55, max: 69.99, color: "#a2a2ff" },
        { min: 70, max: 74.99, color: "#9494ff" },
        { min: 75, max: 99.99, color: "#8282ff" },
        { min: 100, max: 104.99, color: "#6666ff" },
        { min: 105, max: Infinity, color: "#5454ff" }
    ];

    for (let i = 0; i < coloresPrecipitacion.length; i++) {
        const range = coloresPrecipitacion[i];
        if (precipitation >= range.min && precipitation <= range.max) {
            console.log(range.color);
            return range.color;
        }
    }
    // DEFAULT
    return 'white'; 
}

function getColorForDayPrecipitation(dayprecipitation) {

    const coloresDiasPrecipitacion = [
        { min: 0, max: 9.99, color: "#a0c8f0" },
        { min: 10, max: Infinity, color: "#508cff" },
    ];

    for (let i = 0; i < coloresDiasPrecipitacion.length; i++) {
        const range = coloresDiasPrecipitacion[i];
        if (dayprecipitation >= range.min && dayprecipitation <= range.max) {
            console.log(range.color);
            return range.color;
        }
    }
    return 'white'; 
}


function getColorForLightHours(lighthours) {

    const coloresHorasDeSol = [
        { min: 0, max: 199.99, color: "#ffff99" },
        { min: 200, max: Infinity, color: "#ffff00" },
    ];

    for (let i = 0; i < coloresHorasDeSol.length; i++) {
        const range = coloresHorasDeSol[i];
        if (lighthours >= range.min && lighthours <= range.max) {
            console.log(range.color);
            return range.color;
        }
    }
    return 'white'; 
}

function getColorForHumidity(humidity) {

    const coloresHumedad = [
        { min: 0, max: 100, color: "#0000dc" }
    ];

    for (let i = 0; i < coloresHumedad.length; i++) {
        const range = coloresHumedad[i];
        if (humidity >= range.min && humidity <= range.max) {
            console.log(range.color);
            return range.color;
        }
    }
    return 'white'; 
}

function getColorForTemperature(temperature) {
    const coloresTemperatura = [
        { min: -10, max: -7.01, color: "#b4c8ff" },
        { min: -7, max: -5.01, color: "#c8dcff" },
        { min: -5, max: -3.01, color: "#dcf0ff" },
        { min: -3, max: -0.1, color: "#f0ffff" },
        { min: 0, max: 2.99, color: "#ffffff" },
        { min: 3, max: 5.99, color: "#ffffcc" },
        { min: 6, max: 8.99, color: "#ffff99" },
        { min: 9, max: 11.99, color: "#ffcc66" },
        { min: 12, max: 14.99, color: "#ffa500" },
        { min: 15, max: 17.99, color: "#ff9900" },
        { min: 18, max: 20.99, color: "#ff8c00" },
        { min: 21, max: 24.99, color: "#ff6400" },
        { min: 25, max: 26.99, color: "#ff5000" },
        { min: 27, max: 29.99, color: "#FF3C00" },
        { min: 30, max: 34.99, color: "#FF2800" },
        { min: 35, max: 39.99, color: "#FF0000" },
        { min: 40, max: Infinity, color: "#B60000" }
    ];

    for (let i = 0; i < coloresTemperatura.length; i++) {
        const range = coloresTemperatura[i];
        if (temperature >= range.min && temperature <= range.max) {
            console.log(range.color);
            return range.color;
        }
    }
    return 'white'; 
}


