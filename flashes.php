<html>
<head>
<link rel="stylesheet" href="/styles/main.css">
<link rel='shortcut icon' type='image/x-icon' href='/styles/favicon.ico' />
<title>Flashes</title>
<meta name="viewport" content="width=device-width">
</head>
<body>
<div style="text-align: center">
<center>
Here are some IOSYS promotional flashes and some that aren't but you'll like them:<br>

<?php
$dir = "./IOSYS";
$files = scandir($dir);
$files = array_slice($files, 2);

$names[] = "0x40 hues v2.3T";
$names[] = "Border of Death";
$names[] = "Giant Swing";
$names[] = "Hatate";
$names[] = "Eirin's Clinic";
$names[] = "FOE";
$names[] = "Iteyoshi 2005";
$names[] = "Futatsu no Tsubasa";
$names[] = "Oyome ni Shinasai";
$names[] = "Hakurei Jinja";
$names[] = "Sansuu Kyoushitsu";
$names[] = "Cirno Onsen";
$names[] = "Marisa Stole the Precious Thing";
$names[] = "Overdrive";
$names[] = "Tewi REMIX";
$names[] = "Sweets";
$names[] = "vip-sources";

$limiter = sizeof($files)-1;
for ($x = 0; $x <= $limiter; $x++){
?>

<button style="position: relative;" onclick="location.href='/flashes/<?=$files[$x]?>'"><?=$names[$x]?></button><br>
<?php
}
?>
<br>
<br>
<button style="position: relative;" onclick="location.href='/'">Go to index</button>
</center>
</div>
<center>
<span style="font: 8px;">All copyrights belong to their respective owners. </span>
</body>
</html>