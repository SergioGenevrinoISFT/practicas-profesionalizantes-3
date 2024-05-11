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
            
       
    }

    fillWith() {
       
        // Realizar la petición JSON al archivo list.php
        fetch('list.php', {
            headers: {
                'Accept': 'application/json'
            }
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(datos=> {
                console.log(datos);
                // LIMPIAR CONTENIDO DEL TBODY
                const tbody = this.userTable.querySelector('tbody');
                tbody.innerHTML = '';

                // ITERAR DATOS Y CREAR FILAS
                    datos.forEach((dato) => {
                    const row = tbody.insertRow();
                    const cell1 = row.insertCell();
                    const cell2 = row.insertCell();
                    const cell3 = row.insertCell();
                    cell1.textContent = dato.id;
                    cell2.textContent = dato.username;
                    cell3.textContent = dato.saldo;
                });   
              
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
        
      
        // EVENTOS DE BOTONES
        // BOTON LISTAR
        this.listButton.addEventListener('click', () => {
          console.log('Evento Click boton Listar');
          this.fillWith();
        });

        // BOTON CREAR
        this.createButton.addEventListener('click', async () => {
            console.log('Evento Click boton Crear');
            const username = prompt("Ingrese Nombre del usuario:");
            let saldo = prompt("Ingrese el saldo:");

            // VALIDACION DE DATOS 
            if (username && saldo) {
                const price = '$'+saldo;                  
                const data = { username: username, saldo: price };
                console.log(data);
                try {
                    const response = await fetch('create.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                          console.log('Usuario creado exitosamente');
                        
                    } else {
                         console.error('Error al crear usuario:', response.statusText);                        
                    }
                } catch (error) {
                    console.error('Error de red:', error);                   
                }
            } else {
                alert("Debe ingresar un username y un saldo.");
            }

            this.fillWith();
        });
        
        // BOTÓN EDITAR
        this.editButton.addEventListener('click', () => {
            console.log('Evento Click boton Editar');
            const idToEdit = prompt("Ingrese el Id del Registro que desea modificar:");

            // CONVERTIR A ENTERO
            const idToEditInt = parseInt(idToEdit);

            // VALIDACIÓN DEL ID
            if (!isNaN(idToEditInt)) {
                // PETICIÓN JSON PARA VERIFICAR SI EL ID EXISTE Y RECUPERAR LOS DATOS ACTUALES
                fetch(`verify.php?id=${idToEditInt}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al verificar el ID');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data) {
                            // MOSTRAR EL REGISTRO 
                            console.log('Registro a modificar:');
                            console.log("Datos del registro:", data);

                            // PEDIR LOS NUEVOS DATOS
                            const newUsername = prompt("Ingrese el username nuevo:", data.username);
                            const newSaldo = prompt("Ingrese el saldo nuevo:", data.saldo);
                            
                            // PETICIÓN JSON PARA MODIFICAR LOS DATOS EN LA TABLA DE USUARIOS
                            fetch('modify.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: idToEditInt,
                                    username: newUsername,
                                    saldo: newSaldo
                                })
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Error al modificar el registro');
                                    }
                                    return response.json();
                                })
                                .then(datos => {
                                    this.fillWith();
                                })
                                .catch(error => {
                                    console.error('Error al modificar el registro:', error);
                                });
                          
                        } else {
                            console.log("El ID no existe.");
                        }
                    })
                    .catch(error => {
                        console.error('Error al verificar el ID:', error);
                    });
            } else {
                console.log("ID no válido. Por favor, ingrese un número entero.");
            }
        });





          
                            

                            

        




        // BOTON ELIMINAR
        this.deleteButton.addEventListener('click', async() => {
            console.log('Evento Click boton Eliminar');
            const idToDelete = prompt("Ingrese el Id del Registro que desea borrar:");
            // CONVERTIR A ENTERO
            let idToDeleteInt = parseInt(idToDelete);

            // VALIDACION DEL ID
            if (!isNaN(idToDeleteInt)) {
                let idparam = JSON.stringify({ id: idToDeleteInt })
                console.log(idparam);
               await fetch('delete.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: idparam
                 
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(response);
                            console.log('Registro eliminado correctamente.');
                            // Aquí podrías hacer cualquier otra acción necesaria después de eliminar el registro
                            this.fillWith();
                        } else {
                            console.error('Error al eliminar el registro.');
                            // Aquí maneja el error según tu lógica de la aplicación
                        }
                    })
                    .catch(error => {
                        console.error('Error de red:', error);
                        // Maneja errores de red según tu lógica de la aplicación
                    });            
               
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
