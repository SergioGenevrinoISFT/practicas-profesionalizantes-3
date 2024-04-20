<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="style.css">
    <script src="select.js"></script>
    <title>Buscador de localidades</title>
    <style>
        
    </style>
</head>

<body class="w3-light-grey">

    <div class="w3-container w3-padding-32">
        <h2>BUSCADOR DE LOCALIDADES</h2>

        <div class="w3-row-padding">
            <div class="w3-third">
                <label for="provinciaSelect">PROVINCIA:</label>
                <select id="provinciaSelect" name="provincia" onchange="refrescarProvincia()" class="w3-select">
                    <option value="">Selecciona...</option>
                </select>
            </div>

            <div class="w3-third">
                <label for="departamentoSelect">DEPARTAMENTO:</label>
                <select id="departamentoSelect" name="departamento" onchange="refrescarDepartamento()" class="w3-select">
                    <option value="">Selecciona...</option>
                </select>
            </div>

            <div class="w3-third">
                <label for="municipioSelect">MUNICIPIO:</label>
                <select id="municipioSelect" name="municipio" onchange="imprimirDatos()" class="w3-select">
                    <option value="">Selecciona...</option>
                </select>
            </div>
        </div>

            <table id='tabla' class="w3-table w3-bordered">
                <thead>
                    <tr class="tableheading">
                        <th>LOCALIDAD</th>
                        <th>CODIGO UTA 2020</th>
                        <th>MUNICIPIO</th>
                        <th>DEPARTAMENTO</th>
                        <th>PROVINCIA</th>
                    </tr>
                </thead>

                <tbody id='bodytable'></tbody>

            </table>
        
    </div>

</body>

</html>