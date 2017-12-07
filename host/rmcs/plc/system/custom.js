    server = "http://192.168.0.254:80/rmcs/";
    plcUserId = 'admin';
    plcPassword = "";
    logLimit = 1024;
    failureRequestTime = 3000;
    successRequestTime = 500;
    maximumLoadingTime = 10000;
    afterLoadingTime = 2000;

    function plcToServer(data){
        return {
            "temperature": data.temperature
        }
    }

    function serverToPlc(data){
        /*var system = escape('"data".system')+'='+data.system;
        var motor = escape('"data".motor')+'='+data.motor;
        var speed = escape('"data".speed')+'='+data.speed;
        var rotation = escape('"data".rotation')+'='+data.rotation;

        var pdata = system + '&' + motor + '&' + speed + '&' + rotation;
        return pdata;*/
        return{
            '"data".system': data.system,
            '"data".motor': data.motor,
            '"data".speed': data.speed,
            '"data".rotation': data.rotation
        }
    }