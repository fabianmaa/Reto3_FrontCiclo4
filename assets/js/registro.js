userform.html/*======== Funciones Registro Usuario ========*/

// validación de campos 
$("#formularioProd").validate({
    onkeyup: true,
    onfocusin: true,
    rules: {
        name: {
            required: true,
            minlength: 3,
            maxlength: 80,
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
        }
    }
})

$("#registrar").click(function () {
    if ($("#formularioProd").valid() == false) {
        return;
    }
    let name = $("#name").val()
    let email = $("#email").val()
    let password = $("#password").val()
    let password_confirm = $("#password_confirm").val()
})
// fin validación de campos

//// Guardar usuario
function guardarUsuarios() {
    var email = $("#email").val();

    $.ajax({
        url: "http://129.151.120.50:8096/api/user/" + email,
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
                    footer: "<a href='index.html'>o de clic aquí ingresar <i class='fas fa-sign-in-alt heart'></a>"
                });
            } else {
                let var1 = {
                    identification: $("#identification").val(),
					email: $("#email").val(),
                    password: $("#password").val(),
                    name: $("#name").val()
                    
                };
                $.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data: JSON.stringify(var1),
                    url: "http://129.151.120.50:8096/api/user/new",
                    success: function (response) {
                        console.log(response);
                        console.log("Se registró con éxito");
                        swal.fire({
                            title: "Cuenta fue creada correctamente",
                            text: "Hola " + response.name,
                            icon: "success",
                            showConfirmButton: false,
                            allowOutsideClick: true,
                            footer: "<a href='index.html'>Ingresa Aquí <i class='fas fa-sign-in-alt heart'></i></a>"
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
