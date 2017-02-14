<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Online SCADA</title>
    <link rel="stylesheet" href="contents/vendor/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="style/index.css">
    <script src="contents/vendor/jquery/3.1.0/jquery-3.1.0.min.js"></script>
</head>
<body>

    <div class="container">
       <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Online SCADA system!</h3>
          </div>
          <div class="panel-body">
            <div class="row">
                <div class="col-xs-6">
                   <div class="alert alert-danger" role="alert">SYSTEM</div>
                    <select id="systemId" class="form-control">
                        <option value="1">ON</option>
                        <option value="0">OFF</option>
                    </select><br>
                    <label for="speedId">Speed: <span id="speedValId">75</span></label>
                    <input type="range" id="speedId" class="form-control" oninput="updateVal('#speedValId',this.value)" min="20" max="100" step="1" value="75">
                </div>
                <div class="col-xs-6">
                   <div class="alert alert-success" role="alert">MOTOR</div>
                    <select id="motorId" class="form-control">
                        <option value="1">ON</option>
                        <option value="0">OFF</option>
                    </select><br>
                    <label for="rotationId">Rotation: <span id="rotationValId">50</span></label>
                    <input type="range" id="rotationId" class="form-control" oninput="updateVal('#rotationValId',this.value)" min="10" max="100" step="1" value="50">
                </div>
            </div><br>
            <button id="submit-btn" class="btn btn-info btn-lg btn-block">Set Data to PLC</button>
            <br>
            <div id="status_1" style="display:none;">
                <table class="table table-striped">
                    <thead>
                        <th>Tag Name</th>
                        <th></th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>System</td>
                            <td>:</td>
                            <td><span id="systemStat">Pending...</span></td>
                        </tr>
                        <tr>
                            <td>Motor</td>
                            <td>:</td>
                            <td><span id="motorStat">Pending...</span></td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>:</td>
                            <td><span id="speedStat">Pending...</span></td>
                        </tr>
                        <tr>
                            <td>Rotation</td>
                            <td>:</td>
                            <td><span id="rotationStat">Pending...</span></td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>:</td>
                            <td><span id="temperatureStat">Pending...</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="status_0">
                <div class="alert alert-info" role="alert">Trying to data retrieve. Please wait...</div>
            </div>
            <div id="status_2" style="display:none;">
                <div class="alert alert-warning" role="alert">Check your network communication...</div>
            </div>
          </div>
        </div>
    </div>
<script src="scheme/custom.js"></script>
<script src="scheme/system.js"></script>
</body>
</html>