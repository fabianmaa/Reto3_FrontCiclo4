function getUser (){
    
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListUser(response);
        }

    });

}

function printListUser(){
    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Identificación</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Dirección</td>";
        myTable+="<td>Teléfono</td>";
        myTable+="<td>Correo</td>";
        myTable+="<td>Contraseña</td>";
        myTable+="<td>Zona</td>";
        myTable+="<td>Tipo</td>";
    "</tr>"
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
            myTable+="<td>" + response[i].identification + "</td>";
            myTable+="<td>" + response[i].name + "</td>";
            myTable+="<td>" + response[i].address + "</td>";
            myTable+="<td>" + response[i].cellPhone + "</td>";
            myTable+="<td>" + response[i].email + "</td>";
            myTable+="<td>" + response[i].password + "</td>";
            myTable+="<td>" + response[i].zone + "</td>";
            myTable+="<td>" + response[i].type + "</td>";
            myTable+='<td><button class = "" onclick="borrar(' + response[i].id + ')">Borrar Usuario</button></td>';
            myTable+='<td><button class = "" onclick="cargarDatosSkate(' + response[i].id + ')">Editar Usuario</button></td>';
            myTable+='<td><button class = "" onclick="actualizar(' + response[i].id + ')">Actualizar Usuario</button></td>';
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#miListaSkate").html(myTable);
    

}

function borrar(idUser) {
    var elemento = {
        id: idUser
    }

    var dataToSend = JSON.stringify(element);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://localhost:8080/api/user/" + idUser,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaUser").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

function loadData(idUser) {
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + idUser,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#identificactionUser").val(item.identification);
            $("#nameUser").val(item.name);
            $("#addressUser").val(item.address);
            $("#cellphoneUser").val(item.cellPhone);
            $("#emailUser").val(item.email);
            $("#passwordUser").val(item.password);
            $("#zoneUser").val(item.zone);
            $("#typeUser").val(item.type);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function updateData(idUser){
    if($("#identificactionUser").val().length == 0 || $("#nameUser").val().length == 0 || $("#addressUser").val().length == 0
    || $("#cellphoneUser").val().length == 0 || $("#emailUser").val().length == 0 || $("#passwordUser").val().length == 0
    || $("#zonedUser").val().length == 0 || $("#typeUser").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        let element = {
            id: idUser,
            name: $("#nameCategory").val(),
            description: $("#categoryDescription").val(),

        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.119.43:8080/api/Category/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success:  function(respuesta) {
                $("#resultado").empty();
                $("#idCategory").val();
                $("#nameCategory").val("");
                $("#categoryDescription").val("");
                getCategorias();
                alert("se ha Actualizado correctamente la categoria")
            }  

        });
    }
}

