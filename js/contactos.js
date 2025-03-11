// Función para eliminar un contacto
function deleteContact(id) {
    if (confirm("¿Estás seguro de eliminar este contacto?")) {
        fetch('api/contactos.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadContacts(); // Recargar contactos
            } else {
                alert("Error al eliminar el contacto");
            }
        })
        .catch(error => console.error('Error al eliminar el contacto:', error));
    }
}
// Función para cargar los contactos desde el servidor
function loadContacts() {
    fetch('api/contactos.php')
        .then(response => response.json())
        .then(data => {
            contactsTable.innerHTML = ''; // Limpiar tabla antes de agregar
            data.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${contact.nombre}</td>
                    <td>${contact.telefono}</td>
                    <td>${contact.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editContact(${contact.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Eliminar</button>
                    </td>
                `;
                contactsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los contactos:', error));
}
// Función para editar un contacto
function editContact(id) {
    fetch(`api/contactos.php?id=${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            document.getElementById("editName").value = data.nombre;
            document.getElementById("editPhone").value = data.telefono;
            document.getElementById("editEmail").value = data.email;
            document.getElementById("contactId").value = data.id;

            // Usamos el método de Bootstrap para mostrar el modal
            var myModal = new bootstrap.Modal(document.getElementById('editModal'));
            myModal.show();
        })
        .catch(error => console.error('Error al obtener el contacto:', error));
}
window.onload = function() {
    const contactsTable = document.getElementById("contactsTable");

    

    

    

    // Manejar el formulario de agregar contacto
    document.getElementById("addContactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById("addName").value;
        const telefono = document.getElementById("addPhone").value;
        const email = document.getElementById("addEmail").value;

        fetch('api/contactos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Usamos el método de Bootstrap para cerrar el modal correctamente
                var myModal = bootstrap.Modal.getInstance(document.getElementById('addContactModal'));
                myModal.hide(); // Cerrar el modal

                loadContacts(); // Recargar la lista de contactos
            } else {
                alert("Error al agregar el contacto");
            }
        })
        .catch(error => console.error('Error al agregar el contacto:', error));
    });

    // Manejar el formulario de edición
    document.getElementById("editForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const id = document.getElementById("contactId").value;
        const nombre = document.getElementById("editName").value;
        const telefono = document.getElementById("editPhone").value;
        const email = document.getElementById("editEmail").value;

        fetch('api/contactos.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nombre, telefono, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Usamos el método de Bootstrap para cerrar el modal de edición
                var myModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                myModal.hide(); // Cerrar el modal

                loadContacts(); // Recargar la lista de contactos
            } else {
                alert("Error al editar el contacto");
            }
        })
        .catch(error => console.error('Error al editar el contacto:', error));
    });

    // Cargar los contactos cuando la página cargue
    loadContacts();
};
