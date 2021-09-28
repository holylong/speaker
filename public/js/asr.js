window.onload=function(){
    console.log("start list ")
    var groups = document.getElementById("asr_content");
    if(groups == null){
        return;
    }
    console.log("to list")
    // for(var i = 0; i < 10; i++){
    //     //sleep(500).then(() => {
    //         var children = document.createElement('a');
    //         groups.appendChild(children);
    //         children.innerHTML = "<a href=\"#\" class=\"list-group-item\"> <h4 class=\"list-group-item-heading\"> index:" + i + "</h4> <p class=\"list-group-item-text\"> 我们提供 247 支持。 </p></a>";
    //     //})
    // }
    // for(var i = 0; i < 10; i++){
    //     (function(i) {
    //         setTimeout(function() {
    //             //console.log(i);
    //             var children = document.createElement('a');
    //             groups.appendChild(children);
    //             children.innerHTML = "<a href=\"#\" class=\"list-group-item\"> <h4 class=\"list-group-item-heading\"> index:" + i + "</h4> <p class=\"list-group-item-text\"> 我们提供 247 支持。 </p></a>";
    //         }, (i + 1) * 1000);
    //     })(i)
    // }
}

// window.onload=(async function(){
//     console.log("start list ")
//     var groups = document.getElementById("asr_content");
//     if(groups == null){
//         return;
//     }
//     console.log("to list")
//     for(var i = 0; i < 10; i++){
//         await sleep(1)
//         var children = document.createElement('a');
//         groups.appendChild(children);
//         children.innerHTML = "<a href=\"#\" class=\"list-group-item\"> <h4 class=\"list-group-item-heading\"> index:" + i + "</h4> <p class=\"list-group-item-text\"> 我们提供 247 支持。 </p></a>";
//     }
// })();


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }