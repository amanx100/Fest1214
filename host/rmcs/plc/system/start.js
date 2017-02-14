var timer = null;
document.addEventListener("DOMContentLoaded", function(event) {
    timer = setInterval(makeProgress,10);
    {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', server+'reply.php');
        xhr.onload = function() {
            if (xhr.status === 200) {
                //alert(xhr.responseText);
                setTimeout(function(){
                    window.location.replace("sync.html");
                }, afterLoadingTime);
            }
            else {
                //alert('Request failed. Returned status: ' + xhr.status);
            }
        };
        xhr.send();
    }
});

var maxTime = maximumLoadingTime/10;
function makeProgress(){
    maxTime--;
    document.getElementById("progin").style.width = 100-((maxTime/1000)*100)+"%";
    if(maxTime == 0){
        clearInterval(timer);
        //window.location.replace("xserver.html");
        document.getElementById("serverlink").innerHTML = server;
        document.getElementById("container_1").style.display = "none";
        document.getElementById("container_2").style.display = "block";
    }
}