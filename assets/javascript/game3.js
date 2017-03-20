
var pts = {	  };
var pro;
var ant;
var antag;
var protag;
var dead = [];
var draws = 0;
var losses = 0;
var wins = 0;

$("#result").empty();
/////////////////////////////////////////////////
function restart() {

  $("#you-image").empty();
  $("#opponent-image").empty();
  $("#remainder-image").empty();

  pts = {
    bart: [130, 20, 25],
    death: [150, 35, 35],
    slinger: [170, 50, 50],
    clair: [190, 60, 60]
  };

  pro = false;
  ant = false;
  antag = "";
  protag = "";

  dead = [];
  $("h1#win").html("Wins: " + wins);
  $("h1#loss").html("Losses: " + losses);
  $("h1#draw").html("Draws: " + draws);
  $("#you-image").css("text-align", "center").html("<br><br>" + "Select one of these four Characters for Today's Match");
start();
  // BART, DEATH, SLINGER, CLAIR
};
////////////////////////////////////////////////////
function start() {

    $('div').on('click', function(event) {
    event.stopPropagation();
      if (!pro) {

        protag = ($(this).attr("class"));

        $("#you-image").empty();
        $(this).clone().appendTo($("#you-image"));

        protagHP = pts[protag][0];
        protagAP = pts[protag][1];
        $("#you-image").append("<br>" + "\xa0\xa0\xa0" + "Your worth: " + pa + "<br><br>" + "\xa0\xa0\xa0" + " Power of your hand: " + pb + "<br> <br>");
        pro = true;
      }  // end protagonist  if 
    
 
  
     
  
      if (!(dead.length == 3)) && //
        (!($(this).attr("class") === (protag))) 
      && 
      (!($(this).attr("class") == (dead[0]))) && 
      (!($(this).attr("class") == (dead[1]))) {
 
      $("#result").empty();

      $("#opponent-image").css("text-align", "center").html("<br><br>" + "Select a Challenger");
  
        antag = ($(this).attr("class"));

        $("#opponent-image").empty();
        $(this).clone().appendTo($("#opponent-image"));

        antagHP = pts[antag][0];
        antagAP = pts[antag][2];
        $("#opponent-image").append("<br>" + "Your opponent's worth: " + antagHP + "<br> <br>" + "Power of his hand: " + antagAP + "<br> <br>");
        ant = true;
        $("#result").html("Now Show Your Hand!!!");
      } // end if ant
        }
       play(); 
}); // start ends
};
   
/////////////////////////////////////////////////////
function play() {

  // $('#show').addEventListener('click',doSomething2,false)
  $('#show').on('click', function(event) { //fourth event
event.stopImmediatePropagation();
    // if (pro && ant) {
      $("#result").html("Now Show Your Hand!!!");
      protagHP = protagHP - antagAP;
      antagHP = antagHP - protagAP;
      protagHP = protagHP + 10;
    // } // if
    calculate();
  }); //show
  
}; //play

// Opponent out of points but NOT a draw 
function calculate() {

      if ((antagHP <= 0) && !(protagHP <= 0 && antagHP <= 0)) {
          dead.push(antag);
          $("#opponent-image").empty();
          $("#opponent-image").html("<br><br>" + "You've taken him out...");
          $("#result").empty();
          $("div." + antag).clone().appendTo("#remainder-image");
			    
               if (dead.length == 3) {
            	       $("#opponent-image").css("text-align", "center").html("<br><br>" + "You've Cleaned The Streets!");
                      $("#result").empty();
	           		      setTimeout(wait1, 2000);
                  } //if dead
              if (dead.length <3){
	               setTimeout(wait2, 2000);
                  }
		    } //ends if

       
 // Youre out of points BUT not a draw

      else if ((protagHP <= 0) && !((protagHP <= 0) && (antagHP <= 0))) 
              {
          losses++;
          $("#you-image").html("<br>" + "You've lost!!");
          $("#result").empty();
        	setTimeout(wait3, 2000);
                  }

        // DRAW

      else if ((protagHP <= 0) && (antagHP <= 0)) {
        draws++;
        $("#you-image").html("<br>" + "DRAW!!");
        $("#opponent-image").html("<br>" + "DRAW!!");
        $("#result").empty();
	        setTimeout(wait4, 2000);
	        	
       } //ends else if

        // WIN

       else {
        $("#you-image").empty();
        $("div." + protag).clone().appendTo("#you-image");
        $("#you-image").append("<br>" + "Your worth: " + protagHP + "<br><br>" + " Power of your hand: " + protagAP + "<br> <br>");
        $("#opponent-image").empty();
        $("div." + antag).clone().appendTo("#opponent-image");
        $("#opponent-image").append("<br>" + "Your opponent's worth: " + antagHP + "<br> <br>" + "Power of his hand: " + antagAP + "<br> <br>");
        play();
      } // closes else 


       function wait1() {
              wins++;
              restart();    
                };

        function wait2() {
              
                
                ant = false;
                antagonist();
                }; //function ends

function wait3 () {
              restart();
        };

          function wait4() {
                restart();
              }; //ends timeout
       
    }; //calculation 

  

$('#restart').on('click', restart); //second event

restart();