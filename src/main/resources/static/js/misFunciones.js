//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"
/**
 * -----------------------------------------------------------------------------------------------------------
 *                                                  BARCOS
 * -----------------------------------------------------------------------------------------------------------
 */
function getInfBoat(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoBote").empty();
            showBoat(respuesta);
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Peticion completada");
        }
    });
}
function queryByIdBoat(){
    let id = $("#idBote").val();
    if(id === ""){
        alert("Debe ingresar un ID para traer un barco")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat" + "/" + id,
            type:"GET",
            datatype:"JSON",
            contentType: "application/json",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoBote").empty();
                if(respuesta != null){
                    if(respuesta.category == null){
                        vacio = "Sin categoria asignada";
                        idvacio = 0;
                        $("#id").val(respuesta.id);
                        $("#brand").val(respuesta.brand);
                        $("#year").val(respuesta.year);
                        $("#name").val(respuesta.name);
                        $("#description").val(respuesta.description);
                        $("#category").val(vacio);
                        $("#enviarId").val(idvacio);
                    }else{
                        $("#id").val(respuesta.id);
                        $("#brand").val(respuesta.brand);
                        $("#year").val(respuesta.year);
                        $("#name").val(respuesta.name);
                        $("#description").val(respuesta.description);
                        $("#category").val(respuesta.category.name + " " + "(" + respuesta.category.description + ")");
                        $("#enviarId").val(respuesta.category.id)
                    }
                    alert("Barco encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado para poder traer un barco")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function showBoat(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"BRAND"+"</td>";
    myTable += "<td>"+"YEAR"+"</td>";
    myTable += "<td>"+"DESCRIPTION"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"CATEGORIA"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        if(respuesta[i].category == null){
            vacio = "Sin categoria asignada";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].brand + "</td>";
            myTable += "<td>" + respuesta[i].year + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + vacio + "</td>";
            myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
            myTable += "</tr>";
        }else{
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].brand + "</td>";
            myTable += "<td>" + respuesta[i].year + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + respuesta[i].category.name + " " + "(" + respuesta[i].category.description + ")" + "</td>";
            myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
            myTable += "</tr>";
        }
    }
    /*for(const i in respuesta){
         console.log(respuesta[i].category)
         myTable += "<tr>";
         myTable += "<td>" + respuesta[i].id + "</td>";
         myTable += "<td>" + respuesta[i].brand + "</td>";
         myTable += "<td>" + respuesta[i].year + "</td>";
         myTable += "<td>" + respuesta[i].description + "</td>";
         myTable += "<td>" + respuesta[i].name + "</td>";
         myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
         myTable += "</tr>";
    }*/
    myTable += "</table>";
    $("#resultadoBote").append(myTable);
}
function addInfoBoat(){
    if($("#enviarId").val() == ""){
        let myData = {
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
        }
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoBote").empty();
                $("#brand").val("");
                $("#year").val("");
                $("#name").val("");
                $("#description").val("");
                $("#category").val("");
                alert("Se ha creado bote exitosamente")
                getInfBoat();
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Category/all",
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                let id=$("#enviarId").val();
                if(respuesta.find(element => element.id == id) ){
                    let myData2 = {
                        id:$("#enviarId").val()
                    };
                    let myData = {
                        brand:$("#brand").val(),
                        year:$("#year").val(),
                        name:$("#name").val(),
                        description:$("#description").val(),
                        category:myData2
                    };
                    let dataToSend = JSON.stringify(myData);
                    $.ajax({
                        headers:{
                            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
                        },
                        url: ruta + "/api/Boat/save",
                        type:"POST",
                        data:dataToSend,
                        datatype:"JSON",
                        success:function(respuesta){
                            $("#resultadoBote").empty();
                            $("#brand").val("");
                            $("#year").val("");
                            $("#name").val("");
                            $("#description").val("");
                            $("#category").val("");
                            alert("Se ha creado bote exitosamente")
                            getInfBoat();
                        }
                    });
                }else{
                    alert("El ID no se encuentra resgistrado para categoria")
                }
            },
        });
    }
}
function modInfBoat(){
    let id=$("#enviarId").val();
    if(id != ""){
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Category/all",
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                let id=$("#enviarId").val();
                if(respuesta.find(element => element.id == id) ){
                    let myData2 = {
                        id:$("#enviarId").val()
                    };
                    let myData = {
                        id:$("#id").val(),
                        brand:$("#brand").val(),
                        year:$("#year").val(),
                        name:$("#name").val(),
                        description:$("#description").val(),
                        category:myData2
                    };
                    let dataToSend = JSON.stringify(myData);
                    $.ajax({
                        headers:{
                            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
                        },
                        url: ruta + "/api/Boat/update",
                        type:"PUT",
                        data:dataToSend,
                        contentType:"application/JSON",
                        datatype:"JSON",
                        success:function(respuesta){
                            $("#resultadoBote").empty();
                            $("#brand").val("");
                            $("#year").val("");
                            $("#name").val("");
                            $("#description").val("");
                            $("#category").val("");
                            alert("Se ha actualizado barco exitosamente")
                            getInfBoat();
                        }
                    });
                }else{
                    alert("El ID no se encuentra resgistrado para categoria")
                }
            },
        });
    }else{
        alert("Este campo de Id Categoria no puede estar vacio")
    }
}
function removeInfBoat(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Boat" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoBote").empty();
            getInfBoat();
            alert("Se ha eliminado bote exitosamente")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
/**
 * -----------------------------------------------------------------------------------------------------------
 *                                                  CATEGORIAS
 * -----------------------------------------------------------------------------------------------------------
 */
function getInfCategory(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoCategory").empty();
            showCategory(respuesta)
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function queryByIdCategory(){
    let id = $("#idCat").val();
    if(id === ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Category" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoCategory").empty();
                if(respuesta != null){
                    $("#idCategory").val(respuesta.id);
                    $("#nameCategory").val(respuesta.name);
                    $("#descriptionCategory").val(respuesta.description);
                    $("#barcos").empty();
                    let myTable = "<table>";
                    myTable += "<span>" + "Boats" + "</span>";
                    myTable += "<thead>";
                    myTable += "<tr>";
                    myTable += "<td>"+"ID"+"</td>";
                    myTable += "<td>"+"NAME"+"</td>";
                    myTable += "<td>"+"BRAND"+"</td>";
                    myTable += "<td>"+"YEAR"+"</td>";
                    myTable += "<td>"+"DESCRIPTION"+"</td>";
                    myTable += "</tr>";
                    myTable += "</thead>";
                    for(i=0; i<respuesta.boats.length; i++){
                        myTable += "<tr>"
                        myTable += "<td>" + respuesta.boats[i].id + "</td>";
                        myTable += "<td>" + respuesta.boats[i].name + "</td>";
                        myTable += "<td>" + respuesta.boats[i].brand + "</td>";
                        myTable += "<td>" + respuesta.boats[i].year + "</td>";
                        myTable += "<td>" + respuesta.boats[i].description + "</td>";
                    }
                    $("#barcos").append(myTable);
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                alert("Petición realizada con exito");
                console.log("Petición completada");
            }
        });
    }
}
function showCategory(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"DESCRIPTION"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].id + "</td>";
        myTable += "<td>" + respuesta[i].name+ "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td> <button onclick='removeInfCategory("+respuesta[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCategory").append(myTable);
}
function addInfoCategory(){  //no se logra crear categoria cuando le enviamos un id
    let myData = {
        //id:$("#idCategory").val(),
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val()
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#idCategory").val("");
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
            getInfCategory(respuesta);
            alert("Categoria creada exitosamente");
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function modInfCategory(){
    let myData={
        id:$("#idCategory").val(),
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            $("#idCategory").val("");
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
            alert("Se ha actualizado barco exitosamente");
            getInfCategory(respuesta);
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function removeInfCategory(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Category" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategory").empty();
            alert("Se ha eliminado bote exitosamente")
            getInfCategory();
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Peticion completa");
        }
    });
}
/**
 * -----------------------------------------------------------------------------------------------------------
 *                                                  CLIENTES
 * -----------------------------------------------------------------------------------------------------------
 */
function traerInfCliente(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoCliente").empty();
            pintarRespuestaCliente(respuesta);
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function queryByIdClient(){
    let idClient = $("#SetIdClient").val();
    if(idClient === ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Client" + "/" + idClient,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoCliente").empty();
                if(respuesta != null){
                    $("#idCliente").val(respuesta.idClient);
                    $("#nameCliente").val(respuesta.name);
                    $("#email").val(respuesta.email);
                    $("#password").val(respuesta.password);
                    $("#age").val(respuesta.age);
                    $("#messagesClient").empty();
                    $("#reservationsClient").empty();
                    let myTableReservations = "<table>";
                    myTableReservations += "<span>" + "RESERVATIONS" + "</span>";
                    myTableReservations += "<thead>";
                    myTableReservations += "<tr>";
                    myTableReservations += "<td>"+"ID"+"</td>";
                    myTableReservations += "<td>"+"STARTDATE"+"</td>";
                    myTableReservations += "<td>"+"DEVOLUTIONDATE"+"</td>";
                    myTableReservations += "<td>"+"STATUS"+"</td>";
                    myTableReservations += "<td>"+"BOAT"+"</td>";
                    myTableReservations += "<td>"+"CATEGORY"+"</td>";
                    myTableReservations += "</tr>";
                    myTableReservations += "</thead>";
                    if(respuesta.reservations.length != 0){
                        for(i=0; i<respuesta.reservations.length; i++){
                            myTableReservations += "<tr>"
                            myTableReservations += "<td>" + respuesta.reservations[i].idReservation + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].startDate + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].devolutionDate + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].status + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].boat.name + "</td>"
                            myTableReservations += "<td>" + respuesta.reservations[i].boat.category.name + " " + "(" + respuesta.reservations[i].boat.category.description + ")" + "</td>";
                        }
                        $("#reservationsClient").append(myTableReservations);
                    }else{
                        alert("Aun no tiene reservas registradas")
                    }
                    if(respuesta.messages.length != 0){
                        let myTableMessage = "<table>";
                        myTableMessage += "<span>" + "MESSAGES" + "</span>";
                        myTableMessage += "<thead>";
                        myTableMessage += "<tr>";
                        myTableMessage += "<td>"+"ID"+"</td>";
                        myTableMessage += "<td>"+"MESSAGETEXT"+"</td>";
                        myTableMessage += "<td>"+"BOAT"+"</td>";
                        myTableMessage += "<td>"+"CATEGORY"+"</td>";
                        myTableMessage += "</tr>";
                        myTableMessage += "</thead>";
                        for(i=0; i<respuesta.messages.length; i++){
                            myTableMessage += "<tr>"
                            myTableMessage += "<td>" + respuesta.messages[i].idMessage + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].messageText + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].boat.name + "(" + "id:"+ respuesta.messages[i].boat.id + ")" + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].boat.category.name + "(" + "id:"+ respuesta.messages[i].boat.category.id + ")" + "</td>";
                        }
                        $("#messagesClient").append(myTableMessage);
                    }else{
                        alert("Aun no tiene mensajes registrados")
                    }
                    alert("Petición realizada exitosamente")
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function pintarRespuestaCliente(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"EMAIL"+"</td>";
    myTable += "<td>"+"PASSWORD"+"</td>"
    myTable += "<td>"+"AGE"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    myTable += "<tr>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<td>" + respuesta[i].idClient + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCliente").append(myTable);
}
function guardarInfCliente(){
    let myData = {
        id:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#password").val("");
            $("#age").val("");
            traerInfCliente();
            alert("Se ha creado cliente exitosamente")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function editarInfCliente(){
    let myData = {
        idClient:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#age").val("");
            traerInfCliente();
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            alert("Se ha Actualizado Cliente exitosamente");
            console.log("Todo OK");
        }
    });
}
function borrarCliente(idElemento){
    let id = parseInt(idElemento);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            traerInfCliente();
            alert("Se ha eliminado cliente exitosamente");
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
/**
 * -----------------------------------------------------------------------------------------------------------
 *                                                  MENSAJES
 * -----------------------------------------------------------------------------------------------------------
 */
function traerMensajes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoMensajes").empty();
            pintarMensaje(respuesta)
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function queryByIdMessage(){
    let id = $("#getOneMessage").val();
    if(id == ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoMensajes").empty();
                if(respuesta != null){
                    $("#idMensaje").val(respuesta.idMessage);
                    $("#messagetext").val(respuesta.messageText);
                    $("#dataBoatMessage").val(respuesta.boat.name + " " + "(" +"id: " + respuesta.boat.id + ")" );
                    $("#idGetBoatMessage").val(respuesta.boat.id);
                    $("#dataClientMessage").val(respuesta.client.name);
                    $("#idGetClientMessage").val(respuesta.client.idClient);
                    alert("Producto encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function pintarMensaje(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"MESSAGETEXT"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    myTable += "<tr>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idMessage + "</td>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensajes").append(myTable);
}
function guardarMensaje(){
    if(($("#idGetBoatMessage").val() != "") && ($("#idGetClientMessage").val() != "")){
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/all",
            type:"GET",
            datatype:"JSON",
            success: function(barcos){
                console.log(barcos);
                let idBarco = $("#idGetBoatMessage").val()
                if(barcos.find(element => element.id == idBarco)){
                    $.ajax({
                        headers:{
                            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
                        },
                        url: ruta + "/api/Client/all",
                        type:"GET",
                        datatype:"JSON",
                        success: function(clientes){
                            console.log(clientes);
                            let idCliente = $("#idGetClientMessage").val();
                            if(clientes.find(element => element.idClient == idCliente)){
                                let myData2 = {
                                    idClient:$("#idGetClientMessage").val()
                                };
                                let myData3 = {
                                    id:$("#idGetBoatMessage").val()
                                };
                                let myData = {
                                    idMessage:$("#idMensaje").val(),
                                    messageText:$("#messagetext").val(),
                                    boat:myData3,
                                    client:myData2
                                };
                                let dataToSend = JSON.stringify(myData);
                                $.ajax({
                                    headers:{
                                        accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
                                    },
                                    url: ruta + "/api/Message/save",
                                    type:"POST",
                                    data:dataToSend,
                                    datatype:"JSON",
                                    success:function(mensajes){
                                        console.log(mensajes)
                                        $("#resultadoMensajes").empty();
                                        $("#idMensaje").val("");
                                        $("#messagetext").val("");
                                        $("#idGetBoatMessage").val("");
                                        $("#idGetClientMessage").val("");
                                        traerMensajes();
                                        alert("Mensaje creado exitosamente");
                                    },
                                    error : function(xhr, status){
                                        alert("ha sucedido un problema");
                                        console.log(status);
                                    },
                                    complete : function(xhr, status){
                                        console.log("Petición completada");
                                    }
                                });
                            }else{
                                alert("El id para cliente no se encuentra registrado")
                            }
                        }
                    })

                }else{
                    alert("El id para barco no se encuentra resgitrado")
                }
            }
        })
    }else{
        alert("Debe asignar el mensaje a un cliente y un barco")
    }//close if/else
}//close function
function editarMensaje(){
    if($("#idGetBoatMessage").val() != "" && $("#idGetClientMessage").val() != ""){
        let dataBarco = {
            id:$("#idGetBoatMessage").val()
        }
        let dataCliente = {
            idClient: $("#idGetClientMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            boat:dataBarco,
            client:dataCliente
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val(respuesta.idMessage);
                $("#messagetext").val(respuesta.messageText);
                if(respuesta.boat.category != null){
                    $("#dataBoatMessage").val(respuesta.boat.name + "(" + "cat: " + respuesta.boat.category.name + ")");
                }else{
                    $("#dataBoatMessage").val("Sin categoria asignada");
                }
                $("#idGetBoatMessage").val(respuesta.boat.id);
                $("#dataClientMessage").val(respuesta.client.name);
                $("#idGetClientMessage").val(respuesta.client.idClient);
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    } else if($("#idGetBoatMessage").val() != "" && $("#idGetClientMessage").val() == ""){
        let dataBarco = {
            id:$("#idGetBoatMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            boat:dataBarco,
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else if($("#idGetBoatMessage").val() == "" && $("#idGetClientMessage").val() != ""){
        let dataCliente = {
            idClient: $("#idGetClientMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            client:dataCliente
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else{
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }

}
function borrarMensaje(idElemento){
    let id = parseInt(idElemento);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Message" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            traerMensajes();
            alert("Mensaje borrado exitosamente");
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
/**
 * -----------------------------------------------------------------------------------------------------------
 *                                                  RESERVACIONES
 * -----------------------------------------------------------------------------------------------------------
 */
function getReservations(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservaciones").empty();
            showReservations(respuesta)
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Peticion completada");
        }
    });
}
function verificarIdReservation(respuesta){
    verificar=false;
    if(respuesta != null){
        let id=respuesta.idReservation;
        let idReserva = $("#SetIdReservation").val();
        if(id == idReserva){
            verificar=true;
        }
    }else{
        return verificar
    }
    return verificar
}
function queryByIdReservation(){
    let id = $("#SetIdReservation").val();
    if(id == ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                if(respuesta != null){
                    if(respuesta.boat == null && respuesta.client == null){
                        vacioCliente = "Sin cliente asignao"
                        vacioBarco = "Sin barco asignado";
                        idvacio = 0;
                        $("#idReservation").val(respuesta.idReservation);
                        $("#startDate").val(respuesta.startDate);
                        $("#devolutionDate").val(respuesta.devolutionDate);
                        $("#dataBoat").val(vacioBarco);
                        $("#idGetBoat").val(idvacio);
                        $("#dataClient").val(vacioCliente);
                        $("#idGetClient").val(idvacio);
                    }else{
                        $("#idReservation").val(respuesta.idReservation);
                        $("#startDate").val(respuesta.startDate);
                        $("#devolutionDate").val(respuesta.devolutionDate);
                        $("#dataBoat").val(respuesta.boat.name + " " + "(" + "Categoria: " +  respuesta.boat.category.name + "-" + respuesta.boat.category.description + ")");
                        $("#idGetBoat").val(respuesta.boat.id);
                        $("#dataClient").val(respuesta.client.name);
                        $("#idGetClient").val(respuesta.client.idClient)
                    }
                    alert("Producto encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function showReservations(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"STARTDATE"+"</td>";
    myTable += "<td>"+"DEVOLUTIONDATE"+"</td>";
    myTable += "<td>"+"BARCO"+"</td>";
    myTable += "<td>"+"CLIENT"+"</td>";
    myTable += "<td>"+"SCORE"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        if(respuesta[i].boat == null && respuesta[i].client == null && respuesta[i].score == null){
            let vacioBoat = "Sin barco asignado";
            let vacioClient = "Sin cliente asignado";
            let vacioScore = "Sin calificación";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + vacioBoat + "</td>";
            myTable += "<td>" + vacioClient + "</td>";
            myTable += "<td>" + vacioScore + "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }else if(respuesta[i].boat != null && respuesta[i].client != null && respuesta[i].score == null){
            let vacioScore = "Sin calificación";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].boat.name + " " + "(" + respuesta[i].boat.category.name + "-" + respuesta[i].boat.category.description + ")" + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + vacioScore+ "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }else{
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].boat.name + " " + "(" + respuesta[i].boat.category + ")" + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + respuesta[i].score.name + " " + "(" + respuesta[i].score.description + ")" + "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }
    }
    myTable += "</table>";
    $("#resultadoReservaciones").append(myTable);
}
function createReservation(){
    if($("#idGetBoat").val() != null && $("#idGetClient").val() != null){
        let myData2 = {
            idClient:$("#idGetClient").val()
        };
        let myData3 = {
            id:$("#idGetBoat").val()
        };
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            client:myData2,
            boat:myData3,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            contentType: "application/json",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                $("#devolutionDate").val("");
                $("#idGetBoat").val("");
                $("#idGetClient").val("");
                alert("Se ha creado la reserva exitosamente")
                getReservations();
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else{
        alert("Debe asignar un barco y un cliente a la reserva")
    }

}
function modReservation(){
    let myData2 = {
        idClient:$("#idGetClient").val()
    };
    let myData3 = {
        id:$("#idGetBoat").val()
    };
    let myData = {
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        client:myData2,
        boat:myData3,
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoReservaciones").empty();
            $("#devolutionDate").val("");
            $("#idGetBoat").val("");
            $("#idGetClient").val("");
            alert("Se ha actualizado la reserva exitosamente")
            getReservations();
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function removeReservation(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Reservation" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            getReservations();
            alert("Se ha cancelado la reserva exitosamente")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}