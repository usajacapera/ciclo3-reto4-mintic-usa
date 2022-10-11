let ruta = "http://150.136.171.92:8080"
//let ruta ="http://localhost:8080"
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