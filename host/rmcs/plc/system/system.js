function loadStyle(url, callback){
    var link = document.createElement( "link" );
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    link.onreadystatechange = callback;
    link.onload = callback;
    document.getElementsByTagName( "head" )[0].appendChild( link );
}

function loadScript(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

var mainCode = function(){
    logText = $("#log-text");
    $(document).ready(function() {
        //Add siemens logo
        $(".bnr").css({
            "background-image": "url('" + server + "contents/images/siemens_banner.png')"
        });
        //View Body
        $("#service").css({
            "display": "block"
        });
        $("#loading").css({
            "display": "none"
        });
        //Restart function
        $("#restart").click(function() {
            window.location.replace('start.html');
        });
        //Log Copy function
        $("#copy-btn").unbind("click");
        $("#copy-btn").click(function(){
            logText.select();
                try {
                    var cpr = document.execCommand('copy');
                    console.log('Copy successful');
                } catch (err) {
                    console.log(err);
                }
        });
        LoginPLC(plcUserId, plcPassword);
    });

    function LoginPLC(userid, password){
        //Auto login
        var spost = 'Login='+userid+'&Password='+password;
        var bk = $.post("/FormLogin", spost, function(result) {
            datalog("Access & Login PLC: Success");
            //First Starting of functional loop I have created
            var op = $.post( server+'data.php',{},function(res){
                datalog("Access Server : Success");
                postToPLC(res);
            },'json');
            op.fail(function(){
                datalog("Access Server : Failed! Retry...");
                setTimeout(function(){
                    postToServer({});
                }, failureRequestTime);
            });
            datalog("Attempt to start process: Success");
        });
        bk.fail(function(){
            datalog("Access & Login PLC: Failed! Retry...");
            setTimeout(function(){
                LoginPLC(userid, password);
            }, failureRequestTime);
        });
    }

    function scrolldown(){
        logText.scrollTop(logText.prop("scrollHeight"));
    }

    txt = "";
    logNum = 0;
    function datalog(str){
        logNum++;
        var dt = new Date();
        var dateStr = dt.getFullYear()+"-"+dt.getMonth()+1+"-"+dt.getDate()+" > "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
        if(txt === ""){
            txt += logNum+" > "+dateStr+" > "+ str;
        }else{
            txt += "\r\n"+logNum+" > "+dateStr+" > "+ str;
        }
        var spt = txt.split("\r\n");
        sptLen = spt.length;
        if(sptLen > logLimit){
            spt = spt.slice(sptLen-logLimit, sptLen);
        }
        txt = spt.join("\r\n");
        logText.val(txt);
        scrolldown();
    }

    function postToPLC(data){
        var op = $.post('data.html',serverToPlc(data),function(res){
            datalog("Access PLC : Success");
            setTimeout(function(){
                postToServer(res);
            }, successRequestTime);
        },'json');
        op.fail(function(){
            datalog("Access PLC : Failed! Retry...");
            setTimeout(function(){
                postToPLC(data);
            }, failureRequestTime);
        });
    }

    function postToServer(data){
        var postData = plcToServer(data);
        postData['machine'] = 1;
        var op = $.post( server+'data.php', postData, function(res){
            datalog("Access Server : Success");
            setTimeout(function(){
                postToPLC(res);
            }, successRequestTime);
        },'json');
        op.fail(function(){
            datalog("Access Server : Failed! Retry...");
            setTimeout(function(){
                postToServer(data);
            }, failureRequestTime);
        });
    }
}

loadStyle(server + "contents/vendor/bootstrap/3.3.7/css/bootstrap.min.css", function(){
    loadScript(server + "contents/vendor/jquery/3.1.0/jquery-3.1.0.min.js", mainCode);
});