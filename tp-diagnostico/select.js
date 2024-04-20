// CARGA INICIAL DE PROVINCIAS
window.onload = function () {
    fetch('cargainicial.php')
        .then(response => response.json())
        .then(data => {
             // CREAR TABLA
            data.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.idProvincia;
                option.textContent = provincia.Provincia;
                document.getElementById('provinciaSelect').appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
};


function refrescarProvincia() {

    //OBTENER VALOR DE PROVINCIA
    const selectElement = document.querySelector("#provinciaSelect");
    console.log(selectElement.value);
    valueprovincia = selectElement.value;

    // BORRAR SELECT DEPARTAMENTO
    const selectElement1 = document.querySelector("#departamentoSelect");
    while (selectElement1.firstChild) {
        selectElement1.removeChild(selectElement1.firstChild);
    }
    // CREAR ELEMENTO DEFAULT
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "Selecciona...";
    document.getElementById('departamentoSelect').appendChild(option);


    // BORRAR SELECT MUNICIPIO
    const selectElement2 = document.querySelector("#municipioSelect");
    while (selectElement2.firstChild) {
        selectElement2.removeChild(selectElement2.firstChild);
    }
    // CREAR ELEMENTO DEFAULT
    const option1 = document.createElement('option');
    option1.value = "";
    option1.textContent = "Selecciona...";
    document.getElementById('municipioSelect').appendChild(option1);

    // RECUPERAR DATOS DEPARTAMENTO
    fetch('refrescarProvincia.php', {
        method: 'POST',
        body: JSON.stringify({
            parametro: valueprovincia
        }),
    })
        .then(response => response.json())
        .then(data1 => {
            data1.forEach(departamento => {
                const option = document.createElement('option');
                option.value = departamento.idDepartamento;
                option.textContent = departamento.Departamento;
                document.getElementById('departamentoSelect').appendChild(option);
            });
            console.log(data1);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function refrescarDepartamento() {

    //OBTENER VALOR DE DEPARTAMENTO
    const selectElement = document.querySelector("#departamentoSelect");
    console.log(selectElement.value);
    valuedepartamento = selectElement.value;

    // BORRAR SELECT MUNICIPIO
    const selectElement1 = document.querySelector("#municipioSelect");
    while (selectElement1.firstChild) {
        selectElement1.removeChild(selectElement1.firstChild);
    }

    // CREAR ELEMENTO DEFAULT
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "Selecciona...";
    document.getElementById('municipioSelect').appendChild(option);


    // RECUPERAR DATOS MUNICIPIO
    fetch('refrescarMunicipio.php', {
        method: 'POST',
        body: JSON.stringify({
            parametro: valuedepartamento
        }),
    })
        .then(response => response.json())
        .then(data1 => {

            data1.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.idMunicipio;
                option.textContent = municipio.Municipio;
                document.getElementById('municipioSelect').appendChild(option);
            });

            console.log(data1);

        })
        .catch(error => {
            console.error('Error:', error);
        });


}

function imprimirDatos() {

    // SELECCIONAR MUNICIPIO , DEPARTAMENTO Y PROVINCIA 
    Municipio = document.querySelector("#municipioSelect");
    Departamento = document.querySelector("#departamentoSelect");
    Provincia = document.querySelector("#provinciaSelect");

    // RECUPERAR DATOS LOCALIDAD
    valuemunicipio = Municipio.value;

    fetch('recuperarLocalidad.php', {
        method: 'POST',
        body: JSON.stringify({
            parametro: valuemunicipio
        }),
    })
        .then(response => response.json())
        .then(data1 => {

           // BORRAR BODY DE TABLA
           tbody = document.getElementById('bodytable');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }       
    
            data1.forEach(localidad => {

                // CREAR ELEMENTOS ROW Y TABLEDATA
                row = document.createElement('tr');
                localidaddata = document.createElement('td');
                codutadata = document.createElement('td');
                municipiodata = document.createElement('td');
                departamentodata = document.createElement('td');
                provinciadata = document.createElement('td');   
            
                localidaddata.innerHTML = localidad.Municipio;             
                codutadata.innerHTML = localidad.codUTA2020;               
                municipiodata.innerHTML = Municipio.options[Municipio.selectedIndex].text;
                departamentodata.innerHTML = Departamento.options[Departamento.selectedIndex].text;
                provinciadata.innerHTML = Provincia.options[Provincia.selectedIndex].text;

                row.appendChild(localidaddata);
                row.appendChild(codutadata);
                row.appendChild(municipiodata);
                row.appendChild(departamentodata);
                row.appendChild(provinciadata);
                tbody.appendChild(row);

            });

            console.log(data1);

        })
        .catch(error => {
            console.error('Error:', error);
        });
    
}