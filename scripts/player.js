var HIME;
var firstTimePlayed;
HIME = document.getElementById('ZZZ');
firstTimePlayed = false;
HIME.volume = 0.4;
var i = 0.1;
var curPlaying = HIME;
var playingNow = false;
var volumeBase = 0.4;
function fadeIn(){
	HIME.volume = 0;
    superinterval = 2;
	var superinterval = setInterval( function(){ HIME.volume += i; if(HIME.volume >= volumeBase){ clearInterval(superinterval);} }, 300);
}


function firstPlayAndGo(){
	if (!firstTimePlayed){
		firstTimePlayed = true;
		HIME.play();
		HIME.currentTime = 0.7;
		HIME.pause();
		document.getElementById('songchange').style.display = 'inline';
		document.getElementById('alwayson').style.display = 'inline';
        document.getElementById('vol1').style.display = "inline";
        document.getElementById('vol2').style.display = "inline";
		}
	if (!playingNow){
	HIME.volume = 0;
	HIME.play();
	fadeIn();
	}
	else{
		}
}

function leaveMascot(){
	if(!playingNow){
	HIME.pause();
	clearInterval(superinterval);
	}
	else{}
}

function changeListState(){
	document.getElementById('buttons').style.display = 'inline';
	document.getElementById('songchange').style.display = 'none';
}

function hideListShowButton(){
	document.getElementById('buttons').style.display = 'none';
	document.getElementById('songchange').style.display = 'inline';
}

function hideMenu(){
	document.getElementById('songchange').style.display = 'none';
	document.getElementById('alwayson').style.display = 'none';
}

function checkState(x){
	if (curPlaying == x){
		if (!curPlaying.paused){
			curPlaying.pause();
			playingNow = false;
		}
		else{
			curPlaying.volume = 0;
			curPlaying.play();
			fadeIn();
			playingNow = true;
		}
	}
	else{
		curPlaying.pause();
		curPlaying.currentTime = 0;
		curPlaying = x;
		curPlaying.volume = 0;
		curPlaying.play();
		fadeIn();
		playingNow = true;
	}
	
}
