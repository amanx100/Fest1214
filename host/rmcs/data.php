<?php
    if(isset($_SERVER['HTTP_ORIGIN'])){
        header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
    }
    require 'connect.php';
    if(isset($_POST['human'])){
        unset($_POST['human']);
        foreach($_POST as $key => $val){
            $sql = "UPDATE `bidtag` SET `value`='$val' WHERE tag='$key' ";
            $conn->query($sql);
        }
    }
    if(isset($_POST['machine'])){
        unset($_POST['machine']);
        foreach($_POST as $key => $val){
            $sql = "UPDATE `bidtag` SET `value`='$val' WHERE tag='$key' ";
            $conn->query($sql);
        }
        $ltime=time();
        $sql = "UPDATE `bidtag` SET `value`='$ltime' WHERE tag='ltime' ";
        $conn->query($sql);
    }
    //Read dtabase values
    $data = array();
    $sql = "SELECT * FROM `bidtag` ";
	$result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $data[$row['tag']] = $row['value'];
        }
    }

    $data['ctime'] = (string)time();

    $conn->close();

    echo json_encode($data);
?>
