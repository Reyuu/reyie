<!doctype html>
<html lang="pl">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" >
  <meta name="viewport" content="width=device-width">  <title>{{ name }} stats</title>
  <meta name="description" content="{{ name }} stats">
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
  <script src="http://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
  <script src="https://raw.githubusercontent.com/gionkunz/chartist-plugin-pointlabels/master/dist/chartist-plugin-pointlabels.js"></script>
<!---https://github.com/blueimp/JavaScript-Templates--->
</head>
	<body>

<div style="text-align: center; width: 30%; position: relative; left: 35%; color: rgb(255, 255, 255); margin: 10px 0px 0px -10px; background-color: rgb(93, 54, 26); border-radius: 10px / 20px;    -moz-border-radius: 10px / 20px;-webkit-border-radius: 10px / 20px;"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QU6N348XJ7T2U" style="color: rgb(255, 255, 255);">Please donate! <img src="/coin.png" style="vertical-align: middle;"></a></div>
<br>
<div style="text-align: center"><a href="https://discord.gg/ncb2h7V"><img alt="Discord" src="http://iculture.textopus.nl/wp-content/uploads/2015/05/Discord-icon.png" class="icon" style="width:auto; height:32px"></a><br>
</div>

<div style="text-align:center;">
<h1>Activity chart</h1>
<style>
.ct-label{
    color: #D36743;
    font-family: "Droid Sans",sans-serif;
}
.ct-chart{
    background-color:rgba(255, 255, 255, 0.05);
    width: 500px;
    height: 400px;
    display: block;
  margin-left: auto;
  margin-right: auto;
    
}
</style>
<div class="ct-chart" style="text-align:center">
    </div>
    <script>
    new Chartist.Line('.ct-chart', {
  series: [[
    {x: 0, y: {{ activity_graph[0] }} },
    {x: 1, y: {{ activity_graph[1] }} },
    {x: 2, y: {{ activity_graph[2] }} },
    {x: 3, y: {{ activity_graph[3] }} },
    {x: 4, y: {{ activity_graph[4] }} },
    {x: 5, y: {{ activity_graph[5] }} },
    {x: 6, y: {{ activity_graph[6] }} },
    {x: 7, y: {{ activity_graph[7] }} },
    {x: 8, y: {{ activity_graph[8] }} },
    {x: 9, y: {{ activity_graph[9] }} },
    {x: 10, y: {{ activity_graph[10] }} },
    {x: 11, y: {{ activity_graph[11] }} },
    {x: 12, y: {{ activity_graph[12] }} },
    {x: 13, y: {{ activity_graph[13] }} },
    {x: 14, y: {{ activity_graph[14] }} },
    {x: 15, y: {{ activity_graph[15] }} },
    {x: 16, y: {{ activity_graph[16] }} },
    {x: 17, y: {{ activity_graph[17] }} },
    {x: 18, y: {{ activity_graph[18] }} },
    {x: 19, y: {{ activity_graph[19] }} },
    {x: 20, y: {{ activity_graph[20] }} },
    {x: 21, y: {{ activity_graph[21] }} },
    {x: 22, y: {{ activity_graph[22] }} },
    {x: 23, y: {{ activity_graph[23] }} }
  ]]
    }, {
      width: 500,
      height: 400,
      plugins: [
        Chartist.plugins.ctPointLabels({
          labelClass: 'ct-label',
          textAnchor: 'middle',
          labelOffset: {
            x: 0,
            y: -10
          }
        })
    ],
      axisX: {
    type: Chartist.AutoScaleAxis,
    onlyInteger: true
  }
    });
    </script>
Percentage of messages over time.<br>
According to server time (CET).
</div>

<div class="mostactive">
	<h1 style="text-align:center;">Most active users</h1><br>
	<table style="width:100%; text-align:center;">
		<tr>
			<td style="background-color:#2d240c">
				No.
			</td>
			<td style="background-color:#2d240c">
				Nick
			</td>
			<td style="background-color:#2d240c">
				Messages
			</td>
			<td style="background-color:#2d240c">
				Random quote
			</td>
			<td style="background-color:#2d240c">
				Avatar
			</td>
		</tr>

		{% for item in most_active %}
		<tr style="height:50px">
			<td style="background-color:#181832; width=25pt">
				{{ loop.index }}
			</td>
			<td style="width=125pt">
				{{ item[0] }}
			</td>
			<td style="background-color:#102b2b;width=40pt">
				{{ item[1] }}
			</td>
			<td style="text-align:left">
				{{ item[2] }}
			</td>
			<td style="text-align:center;width=128px">
				<a href="http://osu.ppy.sh/u/{{ item[3] }}">
					<img src="http://a.ppy.sh/{{ item[3] }}" style="height:auto; width:auto; max-width: 128px; max-height: 128px">
				</a>
			</td>
		</tr>
		{% endfor %}

	</table>

	<div class="runnerups" style="text-align:center;">
		<table style="width:100%; text-align:center">
		<tr>
			{% for item in runner_ups[:5] %}
			<td style="background-color:#181832">
				{{ 26+loop.index0 }}. {{ item }}
			</td>
			{% endfor %}
		</tr>
		<tr>
			{% for item in runner_ups[5:] %}
			<td style="background-color:#181832">
				{{ 30+loop.index0 }}. {{ item }}
			</td>
			{% endfor %}
		</tr>
		</table>
	</div>

</div>

<hr>

<div class="bignumbersusers" style="text-align:center"><h1 style="text-align:center">User big numbers</h1><br>
	<span>{{ being["screaming"][0][0] }} is screaming too much or has a hearing problem! {{ being["screaming"][0][1] }} lines contained exclamation mark!</span><br>
	<span style="font-size:10px">{{ being["screaming"][1][0] }} is helping {{ being["screaming"][0][0] }} expand exclamation mark revolution, {{ being["screaming"][1][1] }} lines.</span><br>

	<span>{{ being["asking"][0][0] }} is asking too much questions, {{ being["asking"][0][1] }} lines contained question mark!</span><br>
	<span style="font-size:10px">{{ being["asking"][1][0] }} is probably chased by FBI by now, {{ being["asking"][1][1] }} lines.</span><br>

	<span>{{ being["telling"][0][0] }} is always telling us what is he\she doing - {{ being["telling"][0][1] }} actions!</span><br>
	<span style="font-size:10px">{{ being["telling"][1][0] }} tells us what's up too, {{ being["telling"][1][1] }} actions!</span><br>

	<span>{{ being["modding"][0][0] }} got mode from BanchoBot {{ being["modding"][0][1] }} times</span><br>
	<span style="font-size:10px">{{ being["modding"][1][0] }} got only {{ being["modding"][1][1] }} times.</span><br>
</div>

<hr>

<div class="mostusedurls"><h1 style="text-align:center">Most used urls</h1>
	<table style="width:100%; text-align:center">
		<tr>
			<td style="background-color:#2d240c">
				No.
			</td>
			<td style="background-color:#2d240c">
				Link
			</td>
			<td style="background-color:#2d240c">
				Times
			</td>
			<td style="background-color:#2d240c">
				Last used by
			</td>
		</tr>
	{% for item in urls_used %}
		<tr style="height:50px">
			<td style="background-color:#181832">
				{{ loop.index }}.
			</td>
			<td>
				<a href="{{ item[0] }}">
					{{ item[0] }}
				</a>
			</td>
			<td style="background-color:#102b2b">
				{{ item[1] }}
			</td>
			<td style="background-color:#181832">
				{{ item[2] }}
			</td>
		</tr>
	{% endfor %}
	</table>
</div>

<hr>

<div class="mostactivetotal"><h1 style="text-align:center">Total big numbers</h1>
	<table style="width:100%; text-align:center">
		<tr style="height:50px">
			<td style="background-color:#181832">
				Total lines with question marks
			</td>
			<td>
				{{ total[0] }}
			</td>
		</tr>
		<tr style="height:50px">
			<td style="background-color:#181832">
				Total lines with exclamation marks
			</td>
			<td>
				{{ total[1] }}
			</td>
		</tr>
		<tr style="height:50px">
			<td style="background-color:#181832">
				Total actions triggered
			</td>
			<td>
				{{ total[2] }}
			</td>
		</tr>
		<tr style="height:50px">
			<td style="background-color:#181832">
				Total BanchoBot given modes
			</td>
			<td>
				{{ total[3] }}
			</td>
		</tr>
	</table>
</div>

<hr><br>
<div style="text-align:center; font-size:10px">The stats are based on my log file from irssi, which hasn't been trimmed or cut since start. If you can't live with that just leave.</div><br>
<div style="text-align:center; font-size:10px">Created by ircioStats rev e3fb626</div><br>

</body>
</html>