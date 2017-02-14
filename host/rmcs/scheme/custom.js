
failureRequestTime = 1000;
successRequestTime = 500;

function setUserInterface(res){
    if(res.system == 0) $("#systemStat").html("Stopped");
    else $("#systemStat").html("Running");

    if(res.motor == 0) $("#motorStat").html("Stopped");
    else $("#motorStat").html("Running");

    $("#speedStat").html(res.speed+" %");

    $("#rotationStat").html(res.rotation+" %");

    $("#temperatureStat").html(res.temperature+" &#8451;");
}

function getUserInterface(){
    return {
        "system":$("#systemId").val(),
        "motor":$("#motorId").val(),
        "speed":$("#speedId").val(),
        "rotation":$("#rotationId").val()
    };
}