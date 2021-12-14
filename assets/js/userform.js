function saveUser(user) {
    let data = {
        let identification = $("#identificationUser").val(),
        name = $("#nameUser").val(),
        adress = $("#addressUser").val(),
        cellphone = $("#cellphone").val(),
        email = $("#emailUser").val(),
        password = $("#passwordUser").val(),
        zone = $("#zoneUser").val(),
        type = $("#typeUser").val(),

    }

    let datosPeticion = JSON.stringify(data)
    $.ajax({
        url: "http://129.151.120.50:8088/api/user/" + email,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            if (response == true) {
                $.ajax({
                    url: "http://129.151.120.50:8088/api/user/" + email + "/" + password,
                    type: "GET",
                    datatype: "JSON",
                    success: function (response) {
                        console.log(response)
                        if (response.name != 'NO DEFINIDO') {
                            swal.fire({
                                title: "Bienvenido " + response.name,
                                text: "Validación Correcta",
                                icon: "success",
                                showConfirmButton: false,
                                allowOutsideClick: true,
                                timer: 5000,
                                timerProgressBar: true
                            });
                        } else {
                            swal.fire({
                                title: "La combinación usuario/contraseña es incorrecta",
                                text: "Valide por favor",
                                icon: "error",
                                showConfirmButton: true,
                                confirmButtonColor: "#242729",
                                confirmButtonText: "Aceptar",
                                footer: "<a href='registrar.html'>o de clic aquí para registrarse</a>"
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
                    }
                });
            } else {
                swal.fire({
                    title: "El usuario no existe en el sistema",
                    text: "Valide por favor",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    footer: "<a href='registrar.html'>o de clic aquí para registrarse</a>"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
        }
    });

}