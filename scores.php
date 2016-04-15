<!DOCTYPE html>
<html>
<head>
    <title>Scores Table</title>
  <link href="css/normalize.css" rel="stylesheet" type="text/css" />
  <link href="css/mondrian.css" rel="stylesheet" type="text/css" />
  <link href="css/styles.css" rel="stylesheet" type="text/css" />

    <script src="js/createjs-2015.05.21.min.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="none">
    <div class="main-div-scores">
  
        <div class="container-scores">
            </br>
            </br>
            </br>
            <h1><span class="green">Scores</span><span class="black">-</span><span class="blue">Table</span></h1>

            </br>
            <h2 class="scorename" id="scorename"><span class="red">Name</span><span class="black">-</span><span class="white">Score</span></h2>

            </br>
            <div id="scores" class="center-v">
                <?php
                    // step 1 - create PDO handler
                    $dbh2 = new PDO('mysql:host=localhost;dbname=[your DB name goes here ];charset=utf8', '[your DB user name goes here]', '[your DB password goes here]');
                    $dbh2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $dbh2->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

                    // step 2 - build an sql statement 
                    $sql2 = "SELECT `name`,COUNT(*) as score FROM `scores` WHERE `name` NOT LIKE 'NINGUNO' GROUP BY `name` ORDER BY score DESC, `name` ASC";
                    
                    // step 3 - prepare sql statement
                    $stmt2 = $dbh2->prepare( $sql2 );

                    // step 4 - execute statement
                    $stmt2->execute();

                    // step 5 - fetch all results into an array
                    $result = $stmt2->fetchAll( PDO::FETCH_OBJ );
                     
                    echo "<ol>";

                    foreach( $result as $item ) {
                    // echo "<br>"; 
                    echo "<li>";
                    echo $item->name;
                    echo "\t-\t";
                    echo $item->score;
                    echo "</li>";
                    }

                    echo "</ol>";

                    echo "</div>";

                    $sql3= "SELECT COUNT(`colour`) as count,`colour` FROM `scores` GROUP BY `colour` ORDER BY count DESC";

                    $stmt3 = $dbh2->prepare( $sql3 );

                    $stmt3->execute();

                    $result2 = $stmt3->fetchAll( PDO::FETCH_OBJ );
                    echo "<br>";
                    echo "<h1><span class=\"black\">TOTALS</span></h1>";
                    echo "<br>";
                    echo "<h2><span class=\"black\">(</span><span class=\"blue\">wins</span><span class=\"white\">by</span><span class=\"red\">  colour</span><span class=\"white\">  and </span><span class=\"green\">draws</span><span class=\"black\">)</span></h2>";
                    echo "<br>";
                   
                    echo "<div id=\"scores2\" class=\"center-v\">";
                    echo "<ul>";
                    foreach( $result2 as $item2 ) {
                    
                    echo "<li>";
                    echo "\t";
                    echo $item2->colour;
                    echo "\t";
                    echo "\t";
                    echo ": ".$item2->count; 
                    echo "</li>";
                    // echo "<br>";
                    }
                    echo "<br>";
                    echo "</ul>";


                    // echo "</div>";
                      
                ?>
            </div>
            </br>
                <div id="menuscores" class="menuscores" >
                      
                      <div id="gamebutton2" type="button" class='gamebutton2'onClick="location.href='index.php'"  >
                        <img src="images/image3.png">
                      </div> 
                      
                </div>
             </br>
        </div>
    </div>
</body>
</html>