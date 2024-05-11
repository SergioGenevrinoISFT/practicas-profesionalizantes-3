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

        // CREACION DE LOS ELEMENTOS DE LA TABLA

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

    }

    fillWith(data) {
        //Acá queremos recibir un array de objetos y insertarlos todos en la tabla
        //Forma del objeto (data) a recibir: [ { id: 'id', username: 'username', saldo: 'saldo' }, ... ];
        data.forEach(item => {
            const row = this.userTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = item.id;
            cell2.textContent = item.username;
            cell3.textContent = item.saldo;
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

        // Llamamos a fillWith con tres objetos de ejemplo
        const data = [
            { id: '1', username: 'usuario1', saldo: '100' },
            { id: '2', username: 'usuario2', saldo: '200' },
            { id: '3', username: 'usuario3', saldo: '300' }
        ];

        this.fillWith(data); // Llamamos fillWith dentro de connectedCallback
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
}

customElements.define('my-component', MyWebComponent);
