window.onload = function () {
    
    fetch('getData.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            buildTable(data);
        })
        .catch(error => console.error('Error:', error));
};


function buildTable(data) {
    var titulosTabla = ["Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Anual"];

    var tableContainer = document.getElementById('table-container');

    // RADIO BUTTONS
    var celsiusRadio = document.getElementById('celsius');
    var fahrenheitRadio = document.getElementById('fahrenheit');

    // LIMPIAR TABLA
    tableContainer.innerHTML = '';

    // CREAR TABLA
    var table = document.createElement('table');

    var headerRow = document.createElement('tr');
    titulosTabla.forEach(function (titulo) {
        var headerCell = document.createElement('th');
        headerCell.textContent = titulo;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);
    // CONTADOR DE LAS FILAS
    var counter = 0; 

    data.forEach(function (rowData) {
        var row = document.createElement('tr');
        Object.values(rowData).forEach(function (value, index) {
            var cell = document.createElement('td');

            // MOSTRAR DATOS (MENOS LA COLUMNA DE MES ) SEGUN ESTADO DE RADIO BUTTONS
            // EXCLUIR MES
            if (index !== 0) { 
            // APLICAR SOLO A LAS PRIMERAS 5 FILAS 
                if (counter <= 4 && !isNaN(value)) { 
                    if (celsiusRadio.checked) {
                        cell.textContent = value + " °C";
                    } else {
                        // FAHRENHEIT
                        var fahrenheitValue = (parseFloat(value) * 9 / 5) + 32;
                        cell.textContent = fahrenheitValue.toFixed(2) + " °F";
                    }
                } else {
                    cell.textContent = value;
                }
            } else {
                cell.textContent = value;
            }
            row.appendChild(cell);
        });
        table.appendChild(row);

        counter++; 
    });

    tableContainer.appendChild(table);

    // ESTADO DE RADIO BUTTONS
    celsiusRadio.addEventListener('change', function () {
        buildTable(data);
    });

    fahrenheitRadio.addEventListener('change', function () {
        buildTable(data);
    });
}
