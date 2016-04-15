<!DOCTYPE html>
<html>
<head>
	<title>NOT-TicTacToe</title>
  <link href="css/normalize.css" rel="stylesheet" type="text/css" />
  <link href="css/styles.css" rel="stylesheet" type="text/css" />
  <link href="css/mondrian.css" rel="stylesheet" type="text/css" />



	<script src="js/createjs-2015.05.21.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>     
	<div class="main-div">
  
	  <div class="canvas-container">

	    <div id="dialogoverlay"></div>
        <div id="dialogbox">
          <div>
            <div id="dialogboxhead"></div>
            <div id="dialogboxbody"></div>
            <div id="dialogboxfoot"></div>

            <form id="score" class="score" action="save.php" method="POST" name="score">
                  <fieldset> 
                     <input id="name" name="name" type="hidden" required>
                     <input id="colour" name="colour" type="hidden"> 
                  </fieldset>
            </form>

          </div>
        </div>
        <h1><span class="red" >NOT</span><span class="black" >-</span><span class="blue" >Tic</span><span class="white" >Tac</span><span class="red" >Toe</span><span class="black" >!</span></h1>
        </br>
        <canvas id="notTicTacToeGame" class="center-v">
       
        </canvas>
        </br>
            <div id="menu" class="menu" >
              
              <div id="gamebutton" type="button" class='gamebutton'onClick="location.href='index.php'"  >
                <img src="images/image3.png">
              </div> 
              <div id="cupbutton" type="button" class='cupbutton'onClick="location.href='scores.php'"   >
                <img src="images/image4.png">
              </div> 
              <div id="infobutton" type="button" class='infobutton'onClick="location.href='instructions.html'"  >
                <img src="images/image2.png">
              </div>
            </div>
   
      </div>
	  </div>
	</div>

<script src="js/game.js"> </script>
</body>
</html>