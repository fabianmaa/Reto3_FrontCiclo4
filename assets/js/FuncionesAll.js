
/*======== Funciones Tabla de Productos ========*/

// Actualizar tabla de Productos 
function traerInformacionProductos(){
    console.log("test");
        $.ajax({
        url:"http://129.151.120.50:8086/api/chocolate/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

// Mostrar Productos 
function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
		myTable+="<td>"+respuesta[i].description+"</td>";
		myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button onclick='eliminarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoProducto").html(myTable);
}

// Agregar Producto
function agregarProducto(){

    Swal
    .fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
        }
    });
}

// Borrar Producto
/* function borrarProducto(reference){
    console.log(reference);
    let myData={
        id:reference
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.120.50:8096/api/chocolate/"+reference,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionProductos();
    Swal.fire({
        title: 'Eliminado con Éxito!',
  		text: 'La referencia de chocolate se eliminó del inventario',
  		imageUrl: 'https://media0.giphy.com/media/a0h7sAqON67nO/giphy.gif',
  		imageWidth: 480,
  		imageHeight: 270,
  		imageAlt: 'Eliminado',
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se elimina producto*");
        } else {
            // Dijeron que no
            console.log("*El producto no fue eliminado*");
        }
    });
        }
    });

}
*/

function eliminarProducto(reference){
console.log(reference)

       Swal
        .fire({
            title: "Esta seguro de eliminar el producto "+reference,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                $.ajax({
                    url:"http://129.151.120.50:8086/api/chocolate/"+reference,
                    type:"DELETE",
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        $("#resultado").empty();
                        traerInformacionProductos();
                    }
                });      
                
                console.log("*se elimina la venta*");
            } else {
                // Dijeron que no
                console.log("*NO se elimina la venta*");
            }
        });
}


// Editar Producto
function editarProducto(id) {
    (async () => {
const { value: formValues } = await Swal.fire({
  		title: 'Actualice el Producto',
  		html:
    		'<input id="reference" class="swal2-input" placeholder="Referencia">' +
    		'<input id="category" class="swal2-input" placeholder="Categoría">' +
    		'<input id="description" class="swal2-input" placeholder="Descripción">' +
    		'<input id="availability" class="swal2-input" placeholder="Disponibilidad">' +
    		'<input id="price" class="swal2-input" placeholder="Precio">' +
    		'<input id="quantity" class="swal2-input" placeholder="Cantidad">' +
    		'<input id="photography" class="swal2-input" placeholder="URL Imagen">',
    		
  		focusConfirm: false,
  		preConfirm: () => {
    		return [
      			document.getElementById('reference').value,
      			document.getElementById('category').value,
				document.getElementById('description').value,
				document.getElementById('availability').value,
				document.getElementById('price').value,
				document.getElementById('quantity').value,
				document.getElementById('photography').value
				
    ]
  }
})

if (formValues) {
  Swal.fire(JSON.stringify(formValues))
}

})()
   
    $.ajax({
        dataType: 'json',
        url:"http://129.151.120.50:8086/api/chocolate/"+reference,
    
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#reference2").val(item.reference);
            $("#category2").val(item.category);
            $("#description2").val(item.description);
			$("#availability2").val(item.availability);
			$("#price2").val(item.price);
			$("#quantity2").val(item.quantity);
			$("#photography2").val(item.photography);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

/*======== FIN Funciones Tabla de Productos ========*/

/*======== Funciones Registro Producto ========*/

// validación de campos 
$("#formularioProd").validate({
    onkeyup: true,
    onfocusin: true,
    rules: {
        reference: {
            required: true,
            minlength: 1,
            maxlength: 80,
        },
        category: {
            required: true,
            minlength: 1,
            maxlength: 50,
        },
        description: {
            required: true,
            minlength: 6,
            maxlength: 80,
        },
        availability: {
            required: true,
            minlength: 6,
            maxlength: 50,    
        },
        price: {
            required: true,
            minlength: 1,
            maxlength: 50,    
        },
        quantity: {
            required: true,
            minlength: 6,
            maxlength: 50,    
        },
        photography: {
            required: true,
            minlength: 6,
            maxlength: 50,    
        }
    }
})

$("#registrar").click(function () {
    if ($("#formularioProd").valid() == false) {
        return;
    }
    let reference = $("#reference").val()
    let category = $("#category").val()
    let description = $("#description").val()
    let availability = $("#availability").val()
	let price = $("#price").val()
	let quantity = $("#quantity").val()
	let photography = $("#photography").val()
})
// fin validación de campos

//// Guardar Producto
function guardarProductos() {
    var reference = $("#reference").val();

    $.ajax({
        url: "http://129.151.120.50:8086/api/chocolate/"+reference,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            if (response == true) {
                swal.fire({
					allowOutsideClick: false,
					backdrop: true,
                    title: "El Producto ya está registrado",
                    text: "Revisa la información",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    footer: "<a href='productotable.html'>o de clic aquí, si quiere ver el listado de productos <i class='fas fa-sign-in-alt heart'></a>"
                });
            } else {
                let var1 = {
                    reference: $("#reference").val(),
                    category: $("#category").val(),
                    description: $("#description").val(),
					availability: $("#availability").val(),
					price: $("#price").val(),
					quantity: $("#quantity").val(),
					photography: $("#photography").val(),
                };
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data: JSON.stringify(var1),
                    url: "http://129.151.120.50:8086/api/chocolate/new",
                    success: function (response) {
                        console.log(response);
                        console.log("El producto se registró con éxito");
                        swal.fire({
                            title: "La referencia de Chocolate fue creada correctamente",
                            text: "Se guardó la referencia " + response.reference,
                            icon: "success",
                            showConfirmButton: true,
                            allowOutsideClick: true,
                            footer: "<a href='productotable.html'>Ingresa aquí para ver la lista actualizada de productos<i class='fas fa-sign-in-alt heart'></i></a>"
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Ha ocurrido un error. Intenta de nuevo más tarde", "Validación No Exitosa", "error");
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en el procesamiento. Comunícate con el administrador del sistema", "Validación No Exitosa", "error");
        }
    });
} 

/// fin guardar usuario

/*======== FIN Funciones Registro Producto ========*/


/*======== Funciones Tabla de Usuarios ========*/

// Actualizar tabla de Usuarios
function traerInformacionUsuarios(){
    console.log("test");
        $.ajax({
        url:"http://129.151.120.50:8086/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaUsuarios(respuesta);
        }
    });
}

// Mostrar Usuarios
function pintarRespuestaUsuarios(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].identification+"</td>";
		myTable+="<td>"+respuesta[i].name+"</td>";
		myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].cellPhone+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
		myTable+="<td>"+respuesta[i].zone+"</td>";
		myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+="<td> <button onclick='editarUsuario("+JSON.stringify(respuesta[i].id)+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarUsuario("+JSON.stringify(respuesta[i].id)+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoUsuario").html(myTable);
}

// Agregar Usuario
function agregarUsuario(){

    Swal
    .fire({
        title: "Tu nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            let nombre = resultado.value;
            console.log("Hola, " + nombre);
        }
    });
}

// Borrar Usuario
function borrarUsuario(id){
    console.log(id);
    let myData={
        id:id
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.120.50:8086/api/user/"+id,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionProductos();
    Swal.fire({
        title: 'Eliminado con Éxito!',
  		text: 'El usuario se eliminó de la base de usuarios',
  		imageUrl: 'https://media0.giphy.com/media/a0h7sAqON67nO/giphy.gif',
  		imageWidth: 480,
  		imageHeight: 270,
  		imageAlt: 'Eliminado',
    })
    .then(resultado => {
        if (resultado.value) {
            // Hicieron click en "Sí"
            console.log("*se elimina usuario*");
        } else {
            // Dijeron que no
            console.log("*El usuario no fue eliminado*");
        }
    });
        }
    });

}

// Editar Usuario
function editarUsuario(id) {
	
	
    (async () => {
const { value: formValues } = await Swal.fire({
  		title: 'Actualice Usuario',
  		html:
    		'<input id="identification" class="swal2-input" placeholder="Identificación">' +
    		'<input id="name" class="swal2-input" placeholder="Nombre">' +
    		'<input id="address" class="swal2-input" placeholder="Dirección">' +
    		'<input id="cellPhone" class="swal2-input" placeholder="Teléfono">' +
    		'<input id="email" class="swal2-input" placeholder="Email">' +
    		'<input id="password" class="swal2-input" placeholder="Contraseña">' +
    		'<input id="zone" class="swal2-input" placeholder="Zona">' +
    		'<input id="type" class="swal2-input" placeholder="Tipo">',
  		focusConfirm: false,
  		preConfirm: () => {
    		return [
      			document.getElementById('identification').value,
      			document.getElementById('name').value,
				document.getElementById('address').value,
				document.getElementById('cellPhone').value,
				document.getElementById('email').value,
				document.getElementById('password').value,
				document.getElementById('zone').value,
				document.getElementById('type').value
    ]
  }
})

if (formValues) {
  Swal.fire(JSON.stringify(formValues))
}

})()
	
	
   
    $.ajax({
        dataType: 'json',
        url:"http://129.151.120.50:8086/api/user/update",
    
        type: 'PUT',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id2").val(item.id);
            $("#identification2").val(item.identification);
            $("#name2").val(item.name);
			$("#address2").val(item.address);
			$("#cellPhone2").val(item.cellPhone);
			$("#email2").val(item.email);
			$("#password2").val(item.password);
			$("#zone2").val(item.zone);
			$("#type2").val(item.type);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

/*======== FIN Funciones Tabla de Productos ========*/


/*======== Funciones Registro Usuario ========*/

// validación de campos 
$("#formularioUser").validate({
    onkeyup: true,
    onfocusin: true,
    rules: {
		identification: {
            required: true,
            minlength: 3,
            maxlength: 80,
        name: {
            required: true,
            minlength: 3,
            maxlength: 80,
        },
        address: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
		cellphone: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
		email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },	
        password: {
            required: true,
            minlength: 6,
            maxlength: 50,
        },
        password_confirm: {
            required: true,
            minlength: 6,
            maxlength: 50,
            equalTo: "#password",
        },
		zone: {
            required: true,
            minlength: 6,
            maxlength: 50,
        },
		type: {
            required: true,
            minlength: 6,
            maxlength: 50,
        }	
    }
	}
})

$("#registrarUser").click(function () {
    if ($("#formularioUser").valid() == false) {
        return;
    }
    let identification = $("#identification").val()
	let name = $("#name").val()
    let address = $("#address").val()
	let cellPhone = $("#cellPhone").val()
	let email = $("#email").val()
    let password = $("#password").val()
    let password_confirm = $("#password_confirm").val()
	let zone = $("#zone").val()
	let type = $("#type").val()
})
// fin validación de campos

//// Guardar usuario
function guardarUsuarios() {
    var email = $("#email").val();

    $.ajax({
        url: "http://129.151.120.50:8086/api/user/" + email,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            if (response == true) {
                swal.fire({
                    title: "Usuario ya registrado",
                    text: "Revisa la información",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    footer: "<a href='usuariotable.html'>o de clic para ver los usuarios <i class='fas fa-sign-in-alt heart'></a>"
                });
            } else {
                let var1 = {
                    identification: $("#identification").val(),
					name: $("#name").val(),
					address: $("#address").val(),
					cellPhone: $("#cellPhone").val(),
					email: $("#email").val(),
					password: $("#password").val(),
					zone: $("#zone").val(),
					type: $("#type").val()
				
                };
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data: JSON.stringify(var1),
                    url: "http://129.151.120.50:808	6/api/user/new",
                    success: function (response) {
                        console.log(response);
                        console.log("Se registró con éxito");
                        swal.fire({
                            title: "Cuenta fue creada correctamente",
                            text: "Hola " + response.name,
                            icon: "success",
                            showConfirmButton: false,
                            allowOutsideClick: true,
                            footer: "<a href='usuariotable.html'> de clic para ver la tabla de usuarios actualizada <i class='fas fa-sign-in-alt heart'></a>"
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Ha ocurrido un error. Intenta de nuevo más tarde", "Validación No Exitosa", "error");
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en el procesamiento. Comunícate con el administrador del sistema", "Validación No Exitosa", "error");
        }
    });
} 

/// fin guardar usuario

/*======== FIN Funciones Registro Usuario ========*/