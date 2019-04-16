var displayNames = function(data){
    console.log(data)
    //empty old data
    console.log("inDisplay")
    $("#items1").empty()
    $("#items2").empty()
    $("#items3").empty()
    $("#items4").empty()  
    $("#items5").empty()  
    $("#items6").empty()  
    $("#items7").empty()
    $("#items8").empty() 
    
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["title"]+"</div>")
        console.log("appending " + new_name)
        $("#items1").append(new_name)
     
    })
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["author"]+"</div>")
        console.log("appending " + new_name)
        $("#items2").append(new_name)
    })
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["isbn"]+"</div>")
        console.log("appending " + new_name)
        $("#items3").append(new_name)
    })
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["own"]+"</div>")
        console.log("appending " + new_name)
        $("#items5").append(new_name)
    })
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["read"]+"</div>")
        console.log("appending " + new_name)
        $("#items6").append(new_name)
    })
    $.each(data, function(i, datum){
        var new_name= $("<div class = 'd'>"+datum["priority"]+"</div>")
        console.log("appending " + new_name)
        $("#items7").append(new_name)
    })
    
    $.each(data, function(i, datum){
        var new_name= $('<div class = "d1" >'  + '<button id =' +  " " + datum["id"] + " " + 'onclick="delete_book(this.id)" type="button" class="btn btn-warning" > Delete</button>' + '</div>')
        console.log("appending " + new_name)
        $("#items4").append(new_name)
    })
    $.each(data, function(i, datum){
        var new_name= $('<div class = "d1" >'  + '<button id =' +  " " + datum["id"] + " " + 'onclick="search_web(this.id)" type="button" class="btn bg-success" > Lookup</button>' + '</div>')
        console.log("appending " + new_name)
        $("#items8").append(new_name)
    })

}

var  save_book = function(book){
    console.log("in Save")
    $.ajax({
        type: "POST",
        url: "save_book",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(book),
        success: function(result){
            console.log(result)
            console.log("save_book")
            displayNames( result["data"])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}


function add(){
    console.log("INSUBMIT")
        var title = $("#title").val()                 
        var name = $("#author").val()
        var isbn = $("#isbn").val()
        var own = $("#own").is(":checked");
        var read =  $("#read").is(":checked");
        var priority = document.getElementById("Priority").value;

        var book = {
            "id": 1,
            "title": title,
            "author": name,
            "isbn": isbn,
            "own" : own, 
            "read" : read, 
            "priority" : priority
       }

            $("#title").val('');
            $("#author").val('');
            $("#isbn").val('');
            $("#own").val('');
            $("#read").val('');
            $("#priority").val('1');

        document.getElementById("title").focus();
        
        save_book(book)
}

function sorting(){
    var val = document.getElementById("sort").value;
    $.ajax({
        type: "POST",
        url: "sort",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(val),
        success: function(result){
            console.log(result)
            console.log("save_book")
            displayNames( result["data"])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
function delete_book(id){
    var data_to_send = {"id": id}
    $.ajax({
        type: "POST",
        url: "delete_book",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_send),
        success: function(result){
            displayNames( result["data"])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
function search_web(id){
    var data_to_send = {"id": id}
    $.ajax({
        type: "POST",
        url: "search_web",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_send),
        success: function(result){
            displayNames( result["data"])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    displayNames(data)  
})



