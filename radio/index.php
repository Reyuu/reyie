<?php
  $bg = array('1.jpg', '2.png', '3.jpg', '4.png', '5.png', '6.png', '7.png', '8.jpg', '9.png', '10.png', '11.png', '12.jpg', '13.png', '14.jpg', '15.jpg', '16.jpg', '17.png', '18.jpg', '19.jpg', '20.png', '21.png' ); // array of filenames

  $i = rand(0, count($bg)-1); // generate random number size of the array
  $selectedBg = "$bg[$i]"; // set variable equal to which random filename was chosen
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../styles/main.css" type="text/css">
        <title>Cutie radio!</title>
        <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
    <style>
        .av-green{color:green; font-weight: bold}
        .av-red{color:red; font-weight: bold}
        .radio-main-container{
            text-align: center;
            width:100%;
            height:100%;
        }
        .radio-sticky-navmenu{
            height:auto;
            width: 100%;
            position: absolute;
            left:0;
            top: auto;
            bottom: 0;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.8);
            vertical-align: middle;
            color: #fff;
            -webkit-box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);
            box-shadow: 0px -4px 5px 0px rgba(0,0,0,0.75);
        }
        html{
            background-image: url("background/<?php echo $selectedBg; ?>");
        }
    </style>
    <script>
    function radioTitle() {
 
    // this is the URL of the json.xml file located on your server.
    var url = 'http://reyie.cf:8001/json.xsl';
    // this is your mountpoint's name, mine is called /radio
    var mountpoint = '/stream';
 
    $.ajax({  type: 'GET',
          url: url,
          async: true,
          jsonpCallback: 'parseMusic',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function (json) {
            if (typeof myVar != 'undefined'){
              $("#status").attr("class", "av-red");
              $("#status").text("•")
            }
            else{
                // this is the element we're updating that will hold the track title
                $('#track-title').text(json[mountpoint].title);
                // this is the element we're updating that will hold the listeners count
                $('#listeners').text(json[mountpoint].listeners);
                $("#status").attr("class", "av-green");
                $("#status").text("•");
            }
        },
          error: function (e) {
              console.log(e.message);
              $("#status").attr("class", "av-red");
              $("#status").text("•");
        }
    });
 
}
$(document).ready(function () {
 
    setTimeout(function () {radioTitle();}, 2000);
    // we're going to update our html elements / player every 15 seconds
    setInterval(function () {radioTitle();}, 15000); 
 
});
    </script>
    <div class="radio-main-container">
        <div>
        <span id="status" class="av-red">•</span>
        </div>
    </div>
      <div class="radio-sticky-navmenu">
        <div style="padding-bottom: 10px;">
            <span id="listeners">00</span> listeners  
            <span id="track-title">NONE</span>
        </div>
        <div>
            <audio controls>
                <source src="http://reyie.cf:8001/stream" type="audio/ogg" id="radio-stream">
            </audio>
        </div>
      </div>
    </body>
</html>