// JavaScript Documentvar cantidades ={};
var banderai = 0;

function traerOrdenes(){
    console.log("test funcion ordenes")
    $.ajax({
        url:"http://129.151.120.50:8086/api/order/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
        pintarRespuesta(respuesta);
        }

    })

}


function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].registerDay+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <button onclick='verPedido("+JSON.stringify(respuesta[i].reference)+")'>Ver Pedido</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);   

}


///////////////////////usuarios/////////////////////////
function traerInformacionUsuario(){

    urlString = "http://129.151.120.50:8086/api/user/"+3;
    $.ajax({
        type: "GET",
        url: urlString
		
    })
    .done(
        function(respuesta)
        {
           	console.log(respuesta);
            sessionStorage.setItem('miUser', JSON.stringify(respuesta));
            recuperarJson = respuesta;
            $('#tablaUsuarios').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "identification"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "cellPhone"},
                    {"data": "email"},
                    {"data": "password"},
                    {"data": "zone"},
                    {"data": "type"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-primary btnEditarAbrir'>Editar</button><button type='button' class='btn btn-danger btn_borrar'>Borrar</button></div></div>"}
                ],
            });
        }
    )
    .fail(
        function()
        {
            //alert("Error servidor");
        }
    )
    .always(
        function()
        {
            //alert("siempre ejecutandose")
        }
    )
    ;
}

function pintarRespuestaUsuarios(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].identification+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
		myTable+="<td>"+respuesta[i].cellPhone+"</td>";
		myTable+="<td>"+respuesta[i].email+"</td>";
		myTable+="<td>"+respuesta[i].password+"</td>";
		myTable+="<td>"+respuesta[i].zone+"</td>";
		myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+="<td> <button onclick='verPedido("+JSON.stringify(respuesta[i].reference)+")'>Ver Pedido</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);   

}

////////////////////////////productos///////////////////////////////
function traerProductos(){
   // console.log("test funcion")
    $.ajax({
        url:"http://129.151.120.50:8086/api/chocolate/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        //    console.log(respuesta);
            pintarRespuesta(respuesta);
            sessionStorage.setItem('misProductos', JSON.stringify(respuesta));
        }

    })

}

function pintarRespuesta(respuesta){

    let myTable="<table class= 'misCantidades'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
		myTable+="<td> <button onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button onclick='eliminarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
		myTable+="<td>"+respuesta[i].description+"</td>";
		myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
		myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <input type='number' id='micantidad"+i+"'></input> </td>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);   
    banderai=respuesta.length;

}


var etiquetaContador ={};

function cantidad(){
    
    var d_reference = JSON.parse(sessionStorage.getItem('misProductos'));
    var miContador = $('.misCantidades tr').length;
    //console.log(banderai);
    
    for(a=0;a<banderai;a++){
        var id = $("#micantidad"+a).val(); 
        console.log("este es"+id);
        var etiqueta = d_reference[a].reference; 
        etiquetaContador[a] += etiqueta+':'+id ;
    }
    
    cantidades = etiquetaContador;
    console.log(cantidades);
}


function agregarOrden(){
   // console.log("prueba boton")
   
    var date = new Date();
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    var d_producto = JSON.parse(sessionStorage.getItem('misProductos'));
    var id = parseInt($.trim($("#idOrder	").val()));

    cantidad();
let dataToSend = {
    id:id,
    registerDay:date.toISOString(),
    status:"Pendiente",
    salesman:d_user,
    products:d_producto,
    quantities:cantidades


}
console.log(dataToSend);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url:"http://129.151.120.50:8086/api/order/new",
        data: dataToSend,
        datatype:"json",
        cache: false,
        timeout: 600000,
        success:function(respuesta){
            location.reload();
        },
        error : function(e) {
            alert("No FUNCIONA");
        },
        done : function(e) {
            alert("No FUNCIONA");
        }
    });
}


/*======== Funciones Tabla de Productos ========*/
    
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
                        $("#resultado3").empty();
                        traerProductos();
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