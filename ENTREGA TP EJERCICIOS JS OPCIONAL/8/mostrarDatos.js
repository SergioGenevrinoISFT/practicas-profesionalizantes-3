window.onload = function () {
    
    fetch('getData.php')
        .then(response => response.json())
        .then(data => {
          
            console.log(data);       
            buildTable(data);

            // EVENTO CLICK BOTON
            var representarInformacionButton = document.getElementById('representar-informacion');
            console.log(representarInformacionButton);
            representarInformacionButton.addEventListener('click', function () {
                console.log('El botón de representar información ha sido pulsado.');
                console.log(representarInformacionButton.value);
                if (representarInformacionButton.value=='desactivado')
                {
                    representarInformacionButton.value = 'activado';
                    representarColores();
                } else
                {
                    representarInformacionButton.value = 'desactivado';
                    limpiarColores();
                }                   
            });
        })
        .catch(error => console.error('Error:', error));
};

// CREAR TABLA
function buildTable(data) {

    titulosTabla = Array("Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
                         "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre","Anual");
    
    var tableContainer = document.getElementById('table-container'); 
    var table = document.createElement('table');

    // ENCABEZADO TABLA
    var headerRow = document.createElement('tr');
    titulosTabla.forEach(function (titulo) {
        var headerCell = document.createElement('th');
        headerCell.textContent = titulo;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // BODY TABLA
    data.forEach(function (rowData) {
        var row = document.createElement('tr');

        Object.values(rowData).forEach(function (value) {
            var cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
   
    tableContainer.appendChild(table);
}


function representarColores() {
    
    // FILAS DE LA TABLA
    var rows = document.querySelectorAll('tr');
    // ITERACION FILAS TEMPERATURA
    for (var i = 0; i < 6; i++) {
        
        var cells = rows[i].querySelectorAll('td');
        cells.forEach(function (cell) {         
            var value = parseFloat(cell.textContent);
            var color = getColorForTemperature(value); 
            cell.style.backgroundColor = color;
        });
    }

    // FILA PRECIPITACION
    var cells = rows[6].querySelectorAll('td');
        cells.forEach(function (cell) {
        var value = parseFloat(cell.textContent);
        var color = getColorForPrecipitation(value); 
        cell.style.backgroundColor = color;
    });

    // FILA DIAS PRECIPITACION
    var cells = rows[7].querySelectorAll('td');
    cells.forEach(function (cell) {
        var value = parseFloat(cell.textContent);
        var color = getColorForDayPrecipitation(value); 
        cell.style.backgroundColor = color;
    });

    // FILA HORAS DE SOL
    var cells = rows[8].querySelectorAll('td');
    cells.forEach(function (cell) {
        var value = parseFloat(cell.textContent);
        var color = getColorForLightHours(value); 
        cell.style.backgroundColor = color;
    });

    // FILA HUMEDAD
    var cells = rows[9].querySelectorAll('td');
    cells.forEach(function (cell) {
        var value = parseFloat(cell.textContent);
        var color = getColorForHumidity(value); 
        cell.style.backgroundColor = color;
    });
    
}

function limpiarColores() {
    // OBTENER TODAS LAS CELDAS DE LA TABLA
    var cells = document.querySelectorAll('td');
    cells.forEach(function (cell) {
        color = "#ffffff";
        cell.style.backgroundColor = color;
    });
}




