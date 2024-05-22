window.onload = function () {

    fetch('getData.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            // FUNCION DE CREACION DE TABLA
            buildTable(data);
        })
        .catch(error => console.error('Error:', error));
};

function buildTable(data) {

    titulosTabla = Array("Mes", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
                         "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre","Anual");
    
    var tableContainer = document.getElementById('table-container');
    var table = document.createElement('table');

    // CREAR ENCABEZADO
    var headerRow = document.createElement('tr');
       titulosTabla.forEach(function (titulo) {
        var headerCell = document.createElement('th');
        headerCell.textContent = titulo;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // CREAR BODYTABLE
    data.forEach(function (rowData) {
        var row = document.createElement('tr');
        Object.values(rowData).forEach(function (value) {
            var cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    // Agregar la tabla al contenedor
    tableContainer.appendChild(table);
}



