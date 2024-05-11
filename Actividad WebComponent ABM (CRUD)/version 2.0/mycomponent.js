console.log('Introducción a WebComponents');

class MyWebComponent extends HTMLElement {

    constructor() {
        super();

        // CREACION DE LOS ENCABEZADOS
        this.heading = document.createElement('h3');
        this.buttonGroupLabel = document.createElement('p');
        this.tableHeading = document.createElement('h4');

        this.heading.innerText = 'Gestión de cuentas';
        this.buttonGroupLabel.innerText = 'Seleccione una opcion:';
        this.tableHeading.innerText = 'Listado de usuarios';

        // CREACION DE BOTONES
        this.listButton = document.createElement('button');
        this.createButton = document.createElement('button');
        this.editButton = document.createElement('button');
        this.deleteButton = document.createElement('button');

        this.listButton.innerText = "Listar";
        this.createButton.innerText = "Crear";
        this.editButton.innerText = "Editar";
        this.deleteButton.innerText = "Eliminar";

        // CREACION DE SELECT
        this.selectButton = document.createElement('select');
        const options = ['...', 'Opcion 1', 'Opcion2'];
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.innerText = optionText;
            this.selectButton.appendChild(option);
        });

        // CREACION DE TABLA
        this.userTable = document.createElement('table');

        // ENCABEZADO
        var tableHeader = this.userTable.createTHead();
        var rowHeader = tableHeader.insertRow();
        var headerText = ['ID', 'Username', 'Saldo'];
        headerText.forEach(function (text) {
            var th = document.createElement('th');
            th.textContent = text;
            rowHeader.appendChild(th);
        });
        this.userTable.appendChild(rowHeader);

        // BODY
        var tableBody = this.userTable.createTBody();
      
        // ARRAY PARA RECUPERAR EL ARCHIVO JSON
        this.datos = [];
       
    }

    fillWith() {
        //Acá queremos recibir un array de objetos y insertarlos todos en la tabla
        //Forma del objeto (data) a recibir: [ { id: 'id', username: 'username', saldo: 'saldo' }, ... ];
        
        // LIMPIAR CONTENIDO DEL TBODY
        const tbody = this.userTable.querySelector('tbody');
        tbody.innerHTML = '';

        // ITERAR DATOS Y CREAR FILAS
        this.datos.forEach((dato) => {
            const row = tbody.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            cell1.textContent = dato.id;
            cell2.textContent = dato.username;
            cell3.textContent = dato.saldo;
        });        
    }

    connectedCallback() {
        //Es el primer método que se ejecuta cuando la instancia/objeto es insertado dentro
        //de un nodo que ya sí está representado/renderizado en pantalla.
        //Recién ahora, el objeto pasa a tener estado activo (Recibe eventos y puede contestarlos)
        this.appendChild(this.heading);
        this.appendChild(this.buttonGroupLabel);
        this.appendChild(this.listButton);
        this.appendChild(this.createButton);
        this.appendChild(this.editButton);
        this.appendChild(this.deleteButton);
        this.appendChild(this.selectButton);
        this.appendChild(this.tableHeading);
        this.appendChild(this.userTable);
            
        // CARGAR EL ARRAY CON EL ARCHIVO JSON
        this.loadJSONData();
        
        // EVENTOS DE BOTONES
        // BOTON LISTAR
        this.listButton.addEventListener('click', () => {
          console.log('Evento Click boton Listar');
          this.fillWith();
        });

        // BOTON CREAR
        this.createButton.addEventListener('click', () => {
            console.log('Evento Click boton Crear');
            const username = prompt("Ingrese Nombre del usuario:");
            const saldo = prompt("Ingrese el saldo:");

            // VALIDACION DE DATOS 
            if (username !== null && saldo !== null && username !== "" && saldo !== "") {
                // GENERAR UN ID UNICO A PARTIR DEL ULTIMO ID DEL ARRAY
                const lastId = this.datos.length > 0 ? this.datos[this.datos.length - 1].id : 0;
                const newId = lastId + 1;

                // FORMATO DE SALDO
                const priceNumber = parseFloat(saldo);
                const priceFormat = priceNumber.toFixed(2)
                const newPrice = `$${priceFormat}`;

                // CREAR EL NUEVO OBJETO
                const newData = { id: newId, username: username, saldo: newPrice };

                // MENSAJE POR CONSOLA
                console.log("Nuevo objeto creado:");
                console.log(newData);

                // AGREGAR OBJETO AL ARRAY DATOS
                this.datos.push(newData);

                // ACTUALIZAR TABLA
                this.fillWith();
            } else {
                alert("Debe ingresar un username y un saldo.");
            }
        }); 

        // BOTON EDITAR  
        this.editButton.addEventListener('click', () => {
            console.log('Evento Click boton Editar');
            const idToEdit = prompt("Ingrese Id del Registro que desea modificar:");
            // CONVERTIR A ENTERO
            const idToEditInt = parseInt(idToEdit);   
         
            // VALIDACION DEL ID
            if (!isNaN(idToEditInt)) {

                // BUSQUEDA DEL INDICE
                const indexToEdit = this.datos.findIndex(dato => dato.id === idToEditInt);

                // VERIFICAR SI SE ENCONTRO EL ID
                if (indexToEdit !== -1) {

                    // MENSAJE POR CONSOLA DEL REGISTRO 
                    console.log("Objeto a modificar:");
                    console.log(this.datos[indexToEdit]);

                    const username = prompt("Ingrese Nombre del usuario nuevo:",this.datos[indexToEdit].username);
                    const saldo = prompt("Ingrese el saldo nuevo:", this.datos[indexToEdit].saldo );

                    // VALIDACION DE DATOS 
                    if (username !== null && saldo !== null && username !== "" && saldo !== "") {
                        
                        // FORMATO DE SALDO
                        const priceNumber = parseFloat(saldo);
                        const priceFormat = priceNumber.toFixed(2)
                        const newPrice = `$${priceFormat}` ;
                        
                        // CREAR EL NUEVO OBJETO
                        const newData = { id: idToEditInt, username: username, saldo: newPrice };

                        // MENSAJE POR CONSOLA
                        console.log("Objeto modificado:");
                        console.log(newData);

                        // MODIFICAR REGISTRO
                        this.datos[indexToEdit] = newData;

                        // ACTUALIZAR TABLA 
                        this.fillWith();
                    
                    } else {
                        alert("Debe ingresar un username y un saldo.");
                    }

                } else {
                    console.log("No se encontró ningún registro con el ID proporcionado.");
                }
            } else {
                console.log("ID no válido. Por favor, ingrese un número entero.");
            }
      
        });

        // BOTON ELIMINAR
        this.deleteButton.addEventListener('click', () => {
            console.log('Evento Click boton Eliminar');
            const idToDelete = prompt("Ingrese el Id del Registro que desea borrar:");

            // CONVERTIR A ENTERO
            const idToDeleteInt = parseInt(idToDelete);

            // VALIDACION DEL ID
            if (!isNaN(idToDeleteInt)) {

                // BUSQUEDA DEL INDICE
                const indexToDelete = this.datos.findIndex(dato => dato.id === idToDeleteInt);

                // VERIFICAR SI SE ENCONTRO EL ID
                if (indexToDelete !== -1) {

                    // MENSAJE POR CONSOLA DEL REGISTRO 
                    console.log("Objeto a borrar:");
                    console.log(this.datos[indexToDelete]);

                    // ELIMINAR REGISTRO
                    this.datos.splice(indexToDelete, 1);

                    console.log("Registro eliminado con éxito.");

                    // MOSTRAR DATOS ACTUALIZADOS
                    this.fillWith();
                } else {
                    console.log("No se encontró ningún registro con el ID proporcionado.");
                }
            } else {
                console.log("ID no válido. Por favor, ingrese un número entero.");
            }

        });        
    }

    disconnectedCallback() {
        //Se ejecuta cuando el elemento gráfico es retirado del nodo que lo representa.
        //Vuelve a estar desconectado de la recepción de eventos.
    }

    adoptedCallback() {
        //Se ejecuta sólo cuando el objeto es movido de "proceso" o de "pestaña"
    }

    attributesChangedCallback(oldValue, newValue) {
        //Se utiliza sólo para personalizar el comportamiento ante cambios en los valores de los atributos
        //que se definen en la propiedad observableAttributes()
    }

    static get observableAttributes() {
        //Sirve para definir atributos del estilo "HTML" y que tienen posibilidad de ser modificados
        //durante la ejecución.
    }

    loadJSONData() {
        // RUTA AL ARCHIVO JSON
        const rutaArchivoJSON = './cuentas.json';

        // PETICION FETCH
        fetch(rutaArchivoJSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                // ALMACENAR LOS DATOS EN EL ARRAY DATOS
                this.datos = data.cuentas;
                console.log(this.datos);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

customElements.define('my-component', MyWebComponent);
