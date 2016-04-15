// preload images as seen in http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for(var src in sources) {
    numImages++;
  }
  for(var src in sources) {
    images[src] = new Image();
    images[src].zIndex=-1;
    images[src].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

var sources = {
    player1: 'images/x.png',
    player2: 'images/o.png',
    player3: 'images/black.png'
};

var player = 1;
var lineColor = "#000";

var canvas = document.getElementById('notTicTacToeGame');
var context = canvas.getContext('2d');

var canvasSize = 400;
var sectionSize = canvasSize / 4;
canvas.width = canvasSize;
canvas.height = canvasSize;

function getInitialBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < 4;x++) {
    board.push([]);

    for (var y = 0;y < 4;y++) {
      board[x].push(defaultValue);
    }
  }

  return board;
}
var alert2= new CustomAlert();
var alert3= new CustomAlert2();
var alertWinner = new CustomPrompt();

var board = getInitialBoard("");

var whoPlayed=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // temporary bidimensional array (matrix) in which we are going to save the plays

var theWinner=0;

var isPossible=true;
var tempn; // variable to coordinate action after the extra move

function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;

  if(impossible()!=10){
    for (var i = 0;i < 4;i++) {
      for (var j = 0;j < 4;j++) {
        xCordinate = i * sectionSize;
        yCordinate = j * sectionSize;

        if (mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
            mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize) {
                
            if (player === 1 && whoPlayed[i][j]==0) {
              var move1 = new player1(xCordinate,yCordinate);
              whoPlayed[i][j]=10;
              winner();
              if(impossible()==10){
                alert2.render('GAME OVER. No more moves.');
                // sendWinner(null);
              }else{
                tempn=0;
                var rand1= Math.random();
                if (rand1>.85 && theWinner==0){
                  alert3.render('The Blue player can make an extra blocking move.');
                  player=3;
                  continue;
                }else{
                  player=2;
                  continue;
                }
              }
             
            } else if (player === 2 && whoPlayed[i][j]==0) {
              var move2 = new player2(xCordinate,yCordinate);
              whoPlayed[i][j]=100;
              winner();
              if(impossible()==10){
                alert2.render('GAME OVER. No more moves.');
                // sendWinner(null);
              }else{
                tempn=1;
                var rand2= Math.random();
                if (rand2>.85 && theWinner==0){
                  alert3.render('The Green player can make an extra blocking move.');
                  player=3;
                  continue;
                }else{
                  player=1;
                  continue;
                }
              }
            } else if (player ===3 && whoPlayed[i][j]==0){//dummy player created to place the bonus moves!
              var move3 = new player3(xCordinate,yCordinate);
              whoPlayed[i][j]=1000;
              winner();
              if(impossible()==10){
                alert2.render('GAME OVER. No more moves.');
                // sendWinner(null);
              }else{
                if(tempn==0){
                  player=2;
                  continue;
                }else if (tempn==1){
                  player=1;
                  continue;
                }

              }
            
            }
          
        }
      }
    }
  }else{
    isPossible=false;
  } 
  return false; 
}

// console.log(whoPlayed);

var rowsToCompare=3;
var colsToCompare=3;


function winner(val){
  console.log(val);
  var win=winnerByColumns()+winnerByRows()+winnerByDiag1()+winnerByDiag2();
  var alert3= new CustomAlert();
  if(win==10){
    alertWinner.render('Blue player Wins!</br>Please input your name.</br>','sendWinner');
  }else if(win==100){
    alertWinner.render('Green player Wins!</br>Please input your name.</br>','sendWinner');
  }
  return win;
}


function drawLines (lineWidth, strokeStyle) {
  var lineStart = 0;
  var lineLenght = canvasSize;
  context.lineWidth = lineWidth;
  context.lineCap = 'square';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /* Horizontal lines */
  for (var y = 1;y <= 3;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
    context.globalCompositeOperation='destination-over';// as seen in http://stackoverflow.com/questions/9165766/html5-canvas-set-z-index
  }

  /* Vertical lines */
  for (var x = 1;x <= 3;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
    context.globalCompositeOperation='destination-over';
  }

  context.stroke();
}

drawLines(7, lineColor);

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
  
var canvasMousePosition= getCanvasMousePosition(event);

  addPlayingPiece(canvasMousePosition);
   
  drawLines(7, lineColor);
});

function player1(xPos, yPos){
  loadImages(sources, function(images){
	 context.drawImage(images.player1, xPos, yPos);
  });
	player1.cursor = "pointer"; 

	player1.regX = 100/2; // half the width
	player1.regY = 100/2;  // half the height
		
	player1.alpha = .8; 

return player1};

function player2(xPos, yPos){
	loadImages(sources, function(images){
   context.drawImage(images.player2, xPos, yPos);
  });
	player2.cursor = "pointer"; 

	player2.regX = 100/2; 
	player2.regY = 100/2; 

	player2.alpha = .8;

return player2};

function player3(xPos, yPos){
	loadImages(sources, function(images){
   context.drawImage(images.player3, xPos, yPos);
  });
	player3.cursor = "pointer"; 

	player3.regX = 95/2; 
	player3.regY = 95/2;  

	player3.alpha = .8; 

return player3};

function winnerByColumns(){
  //Check columns for winner
  for(var i=0;i<colsToCompare+1;i++){ 
    var count=0; 
    for(var j=0;j<rowsToCompare;j++){
      if(whoPlayed[i][j]==whoPlayed[i][j+1] && whoPlayed[i][j]!=0){
        count++;
        if(count==rowsToCompare){
          theWinner=whoPlayed[i][j];
          console.log("winner by columns: P"+theWinner);
          return theWinner;
        }
      }else{
        continue;
      }
    }  
  }
  return 0;
}

function winnerByRows(){
  //Check rows for winner
  for(var k=0;k<rowsToCompare+1;k++){
    var count=0; 
    for(var l=0;l<colsToCompare;l++){
      if(whoPlayed[l][k]==whoPlayed[l+1][k] && whoPlayed[l][k]!=0){
        count++;
        if(count==colsToCompare){
          theWinner=whoPlayed[l][k];          
          console.log("winner by rows: P"+theWinner);
          return theWinner;
        }
      }else{
        continue;
      }
    }
  }
  return 0;
}

function winnerByDiag1(){
  //Check diagonal 1 for winner
  for(var m=0;m<colsToCompare+1;m++){
    var count=0; 
    for(var n=0;n<rowsToCompare;n++){
      if(whoPlayed[n][n]==whoPlayed[n+1][n+1] && whoPlayed[n][n]!=0){
        count++;
        if(count==colsToCompare){
          theWinner=whoPlayed[n][n];          
          console.log("winner by diag1: P"+theWinner);
          return theWinner;
        }
      }else{
        continue;
      }
    }
  }
  return 0;
}


function winnerByDiag2(){
  // Check diagonal 2 for winner
  var countd2=0; 
  for(var o=colsToCompare;o>0;o--){
      var p=colsToCompare-o;
      if(whoPlayed[o][p]==whoPlayed[o-1][p+1] && whoPlayed[o][p]!=0){
        countd2++;
        if(countd2==colsToCompare){
          theWinner=whoPlayed[o][p];          
          console.log("winner by diag2: P"+theWinner);
          return theWinner;
        }
      }else{
        continue;
      }
    
  }
  return 0;
}

function impossible(){
var maxCols=4;
var maxRows=4;
var impossible=0;

  for (var i=0;i<maxCols;i++){
   
    switch (whoPlayed[i][0]+whoPlayed[i][1]+whoPlayed[i][2]+whoPlayed[i][3]){
      case 0: //no plays yet
          break;
      case 10: //player 1 once
          break;
      case 20: //player 1 twice
          break; 
      case 30: //player 1 three times
          break;
      case 40: //player 1 four times
          break;
      case 100: //player 2 once
          break;
      case 200: //player 2 twice
          break; 
      case 300: //player 2 three times
          break;
      case 400: //player 2 four times
          break;    
      default:
        impossible++;
    };

  };

  for (var j=0;j<maxRows;j++){
   
    switch (whoPlayed[0][j]+whoPlayed[1][j]+whoPlayed[2][j]+whoPlayed[3][j]){
      case 0: 
          break;
      case 10: 
          break;
      case 20: 
          break; 
      case 30: 
          break;
      case 40: 
          break;
      case 100: 
          break;
      case 200:
          break; 
      case 300:
          break;
      case 400: 
          break;    
      default:
        impossible++;
    };

  };
   
  switch (whoPlayed[0][0]+whoPlayed[1][1]+whoPlayed[2][2]+whoPlayed[3][3]){
    case 0: 
          break;
      case 10: 
          break;
      case 20: 
          break; 
      case 30: 
          break;
      case 40: 
          break;
      case 100: 
          break;
      case 200:
          break; 
      case 300:
          break;
      case 400: 
          break;    
      default:
        impossible++;
  };

  switch (whoPlayed[0][3]+whoPlayed[1][2]+whoPlayed[2][1]+whoPlayed[3][0]){
    case 0: 
          break;
      case 10: 
          break;
      case 20: 
          break; 
      case 30: 
          break;
      case 40: 
          break;
      case 100: 
          break;
      case 200:
          break; 
      case 300:
          break;
      case 400: 
          break;    
      default:
        impossible++;
  };

console.log(impossible);

return impossible;
  

};
//function taken from https://www.developphp.com/video/JavaScript/Custom-Alert-Box-Programming-Tutorial
function CustomAlert(message){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogbox.style.left = (winW/2) - (300 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        dialogHead =document.getElementById('dialogboxhead'); 
        dialogHead.style.background="white";
        dialogHead.style.color="black";
        dialogHead.innerHTML= "NOT-TicTacToe :)";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        dialogFoot=document.getElementById('dialogboxfoot');
        dialogFoot.style.background="white";
        dialogFoot.style.color="black";
        dialogFoot.innerHTML = '<button onclick="sendWinner()">OK</button>';
    }
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}

function sendWinner(val){

var form = document.getElementById('score');
// console.log(val);

if(val!=null){ 

  form.querySelector('input[name="name"]').value = val;
  
  var colour;
  if(theWinner==10){
    colour="blue";
    form.querySelector('[name="colour"]').value = colour;
  }else if(theWinner==100){
    colour="green";
    form.querySelector('[name="colour"]').value = colour;
  }
}else{
    colour="draw";
    form.querySelector('input[name="name"]').value = "ninguno";
    form.querySelector('input[name="colour"]').value = colour;
}
console.log("namedb: "+form.querySelector('input[name="name"]').value);
console.log("colourdb: "+form.querySelector('input[name="colour"]').value);
console.log("name: "+val);
console.log("colour: "+colour);
form.submit();
};

//function for the special move Alert. It's different from the previous one because we don't need to refresh the page.
function CustomAlert2(message){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogbox.style.left = (winW/2) - (300 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        dialogHead =document.getElementById('dialogboxhead'); 
        dialogHead.style.background="white";
        dialogHead.style.color="black";
        dialogHead.innerHTML= "<span class='redf'> BONUS MOVE!</span>";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        dialogFoot=document.getElementById('dialogboxfoot');
        dialogFoot.style.background="white";
        dialogFoot.style.color="black";
        dialogFoot.innerHTML = '<button onclick="alert3.ok()">OK</button>';
    }
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}


function CustomPrompt(){
  this.render = function(dialog,func){
    var winW = window.innerWidth;
      var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
    // dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (300 * .5)+"px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";
    dialogHead=document.getElementById('dialogboxhead')
    dialogHead.innerHTML = "Congratulations!";
    document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxbody').innerHTML += '<br><input name="prompt_value1" id="prompt_value1" onchange="activateButton();"/>';
    var prompt=document.getElementById('prompt_value1');
    prompt.setAttribute("placeholder","Please insert your name");
    console.log(prompt.value);
    
    dialogFoot=document.getElementById('dialogboxfoot');
    dialogFoot.innerHTML = '<button id="btnWinner" name="btnWinner" onclick="alertWinner.ok(\''+func+'\')">OK</button>';

    if(prompt.value==''){
      document.getElementById("btnWinner").disabled=true;
      prompt.setAttribute("placeholder","Your name is required");

    }else{
      document.getElementById("btnWinner").disabled=false;
    }
    

  this.ok = function(func){

    var prompt_value1 = document.getElementById('prompt_value1').value;
    window[func](prompt_value1);
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
   
  }
}
}
function activateButton(){
     console.log("activateButton");
     document.getElementById("btnWinner").disabled=false;
}

