//listen port on 6655
//find user in wlan

window.onload=function(){

    //init local port
    //scan lan port 
    //load friends
    //list ok
    //call with other
    
    var groups = document.getElementById("friends_content");
    if(groups == null){
        return;
    }
    for(var i = 0; i < 10; i++){
        (function(i) {
            setTimeout(function() {
                //console.log(i);
                var children = document.createElement('a');
                groups.appendChild(children);
                children.innerHTML = "<a href=\"#\" class=\"list-group-item\"> <h4 class=\"list-group-item-heading\"> index:" + i + "</h4> <p class=\"list-group-item-text\"> 我们提供 247 支持。 </p></a>";
            }, (i + 1) * 1000);
        })(i)
    }
}