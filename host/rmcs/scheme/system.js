function updateVal(id,value){
    $(id).html(value);
}

function setdata(res){
    if(Number(res.ltime)+5 >= Number(res.ctime)){

        setUserInterface(res);

        $("#status_0").css({"display":"none"});
        $("#status_1").css({"display":"block"});
        $("#status_2").css({"display":"none"});
    }else{
        $("#status_0").css({"display":"block"});
        $("#status_1").css({"display":"none"});
        $("#status_2").css({"display":"none"});
    }
}

function readWriteData(){
    var fb = $.post("data.php",{},function(res){
        setdata(res);
        setTimeout(function(){
            readWriteData();
        }, successRequestTime);

    },'json');
    fb.fail(function(){
        $("#status_0").css({"display":"none"});
        $("#status_1").css({"display":"none"});
        $("#status_2").css({"display":"block"});
        setTimeout(function(){
            readWriteData();
        }, failureRequestTime);
    });
}

$("#submit-btn").unbind('click');
$("#submit-btn").click(function(){
    var postVal = getUserInterface();
    postVal['human'] = 1;
    $.post("data.php",postVal,function(res){
        setdata(res);
    },'json');
});

readWriteData();