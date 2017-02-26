<!DOCTYPE html>
<?php
header( 'Content-Type: text/html; charset=utf-8' );
?>
<html>
<head>
<title>家</title>
<meta name="viewport" content="width=device-width">
<link rel='shortcut icon' type='image/x-icon' href='/styles/favicon.ico' />
<link rel="stylesheet" href="/styles/main.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<style>
a:link, a:visited {
    display: inline-block;
    background-color: #401A00;
    color: #D36743;
    text-align: center;	
    text-decoration: none;
    font-size: 1.15em;
    width: 200px;
    height: 200px;
    line-height: 184px;
}

a:hover, a:active {
	background-color: #7F3400;
}

.mascotto{
    filter: grayscale(0.80);
	transition-property: filter;
	opacity: 0.50;
}
.mascotto:hover{
	filter: grayscale(0.50);
	transition-property: filter;
	opacity: 0.90;
}
#buttons{
    position:initial;
}
#songchange{
    position:initial;
    overflow-y:scroll;
}
#alwayson{
    position:initial;
    overflow-y:scroll;
}

</style>
<audio id="ZZZ"><source src="https://dl.dropboxusercontent.com/s/frisyrk3rsis92r/03%20-%20Zzz%20%28Acappella%20Version%29.mp3" /></audio>
<audio id="HIME"><source src="http://a.pomf.se/hlpctl.mp3" /></audio>
<audio id="unowen"><source src="https://dl.dropboxusercontent.com/s/nxyxnuy3yzermi6/%5B15%5D%20U.N.%20Owen%20wa%20Kanojo%20Nanoka.mp3?dl=0" /></audio>
<audio id="yukki"><source src="https://dl.dropboxusercontent.com/s/e0782g2t2bdegna/Yuki%20Yuki%20Yuki%20-%20Yuno%20Gasai.mp3?dl=0" /></audio>
<audio id="badapple"><source src="https://dl.dropboxusercontent.com/s/t5pmyoci3p0r2px/badapple.mp3?dl=0" /></audio>
<audio id="bloodytears"><source src="https://dl.dropboxusercontent.com/s/1kzavmtyv7cnank/bloodytears.mp3?dl=0" /></audio>
<audio id="desu"><source src="https://dl.dropboxusercontent.com/s/6iq79zcx9mf07v6/desu.mp3?dl=0" /></audio>
<audio id="numberone"><source src="https://dl.dropboxusercontent.com/s/er14khn7hxw355l/numberone.mp3?dl=0" /></audio>
<audio id="shooter"><source src="https://dl.dropboxusercontent.com/s/4z2wm9kqhgwcksu/04%20EGOiSTiC%20SHOOTER.mp3?dl=0" /></audio>
</head>

<body style="font-size:100%" onload="drawvolumecontroller(20,35,8);">
<!-- bday confetti
<canvas id="confetti"></canvas>
<script src="./scripts/confetti.js" type="text/javascript"></script>
-->


<script src="/scripts/player.js"></script>
<!-- APRIL'S FOOLS 
<style>
#mainmenu {
  position: absolute;
  padding: 1em 2em;
}
</style>
<script>
function mousemoved(event) {
  var f = document.querySelector('#mainmenu');
  //console.log(event);
  f.style.top = event.pageY + f.scrollTop + 'px';
  f.style.left = event.pageX + 'px';
}
document.querySelector('body').addEventListener('mousemove', mousemoved);

function backtonormal () {
    document.querySelector('body').removeEventListener('mousemove', mousemoved);
    document.getElementById("#mainmenu").style = "all: initial";
}
</script>
-->

<script>
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
</script>
<div style="text-align:center">
<a href="#" onclick="firstPlayAndGo();" style="background-color:initial;width:initial;height:initial;display:initial;line-height:initial;">
<img src="styles/mascot.png"
onmouseover="firstPlayAndGo();"
onmouseleave="leaveMascot();" class="mascotto" style="width:300px;height:auto;" id="cuteone">
</a>
</div>


<div style="text-align:center;padding: 5px;" id="mainmenu">
<a href="/radio"><i class="fa fa-music"></i> radio</a>
<a href="/stats"><i class="fa fa-files-o"></i> stats</a>
<a href="/logs/"><i class="fa fa-hashtag"></i> logs</a>
<a href="/blog"><i class="fa fa-pencil"></i> blog</a>
<a href="/s"><i class="fa fa-share"></i> waaifu</a>
<a href="/flashes"><i class="fa fa-picture-o"></i> flashes</a>
<a href="/tuturu"><i class="fa fa-diamond"></i> tuturu</a>
<a href="/contact"><i class="fa fa-phone"></i> contact</a>
<a href="/info"><i class="fa fa-info"></i> info</a>
</div>
<hr>

<div style="text-align:center">
Remaining disk space:<br>
<?php
$df = disk_free_space("/");
$dt = disk_total_space("/");

function getSymbolByQuantity($bytes) {
    $symbols = array('B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB');
    $exp = floor(log($bytes)/log(1024));

    return sprintf('%.2f '.$symbols[$exp], ($bytes/pow(1024, floor($exp))));
}

echo(getSymbolByQuantity($df)." / ".getSymbolByQuantity($dt));
?><br>
</div>

<div style="text-align:center">
<div id="buttons" style="display: none">
<button onclick="HIME = document.getElementById('ZZZ');HIME.currentTime = 0;">Zzz (Acapella Version)</button><br>
<button onclick="HIME = document.getElementById('shooter');HIME.currentTime = 0;">EGOiSTiC SHOOTER</button><br>
<button onclick="HIME = document.getElementById('HIME');HIME.currentTime = 0;">HIME</button><br>
<button onclick="HIME = document.getElementById('unowen');HIME.currentTime = 0;">U.N. Owen wa Kanojo Nanoka?</button><br>
<button onclick="HIME = document.getElementById('yukki');HIME.currentTime = 0;" >Yukki Yukki Yukki!</button><br>
<button onclick="HIME = document.getElementById('badapple');HIME.currentTime = 0;">Bad Apple!!</button><br>
<button onclick="HIME = document.getElementById('bloodytears');HIME.currentTime = 0;">Bloody Tears</button><br>
<button onclick="HIME = document.getElementById('desu');HIME.currentTime = 0;">Desu Desu Desu!</button><br>
<button onclick="HIME = document.getElementById('numberone');HIME.currentTime = 0;">Number One!</button><br>
<button onclick="hideListShowButton()"><i class="fa fa-times"></i> close</button><br>
</div>

<button id="songchange" onclick="changeListState()" style="display: none;">Song change!</button><br>
<button id="alwayson" onclick="checkState(HIME)" style="display: none;">Play!</button><br>
<button id="vol1" onclick="volumeBase += 0.1; HIME.volume += 0.1;" style="display: none;">Volume up!+</button><br>
<button id="vol2" onclick="volumeBase -= 0.1; HIME.volume -= 0.1;" style="display: none;">Volume down!-</button><br>
</div><br>

<div style="text-align:center;">
	<div style="text-align: center; width: 30%; position: relative; left: 35%; color: rgb(255, 255, 255); margin: 10px 0px 0px -10px; background-color: rgb(93, 54, 26); border-radius: 10px / 20px;    -moz-border-radius: 10px / 20px;-webkit-border-radius: 10px / 20px;">🎂 <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QU6N348XJ7T2U" style="width:initial; height:initial; background-color:initial; color:initial; line-height: initial; color: rgb(237, 219, 28);font-size:150%;">It's already 1 year! Please consider donating!</a> 🎂
    </div>
</div>
</body>

</html>