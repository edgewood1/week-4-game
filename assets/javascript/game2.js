
var pts = {
	bart: [130, 20, 25],
    death: [150, 35, 35],
    slinger: [170, 50, 50],
    clair: [190, 60, 60]

};
var pro = false;
var ant =true;
var antag ="";
var protag ="";
var dead = [];
var draws = 0;
var losses = 0;
var wins = 0;

$("#result").empty();

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
  protagonist();

  // BART, DEATH, SLINGER, CLAIR

  function protagonist() {

    $('div').on('click', function() {

      if (!pro) {

        protag = ($(this).attr("class"));

        $("#you-image").empty();
        $(this).clone().appendTo($("#you-image"));

        pa = pts[protag][0];
        pb = pts[protag][1];
        $("#you-image").append("<br>" + "\xa0\xa0\xa0" + "Your worth: " + pa + "<br><br>" + "\xa0\xa0\xa0" + " Power of your hand: " + pb + "<br> <br>");
        antagonist();
        pro = true;
      }
    });
  };

  function antagonist() {

    if (!(dead.length == 3)) {
      $("#result").empty();

      $("#opponent-image").css("text-align", "center").html("<br><br>" + "Select a Challenger");
    }

    $('div').on('click', function() {
      if (!ant && !($(this).attr("class") === (protag)) && !($(this).attr("class") == (dead[0])) && !($(this).attr("class") == (dead[1]))) {

        antag = ($(this).attr("class"));

        $("#opponent-image").empty();
        $(this).clone().appendTo($("#opponent-image"));

        aa = pts[antag][0];
        ac = pts[antag][2];
        $("#opponent-image").append("<br>" + "Your opponent's worth: " + aa + "<br> <br>" + "Power of his hand: " + ac + "<br> <br>");
        ant = true;
        $("#result").html("Now Show Your Hand!!!");
      }

    });

  };

  $('#show').on('click', function() { //fourth event

    if (pro && ant) {
      $("#result").html("Now Show Your Hand!!!");
      aa = aa - pb;
      pa = pa - ac;
      pb = pb + 10;

// Opponent out of points but NOT a draw 

      if (((aa <= 0) && !(pa <= 0 && aa <= 0))) {
			if (dead.length == 3) {
            	$("#opponent-image").css("text-align", "center").html("<br><br>" + "You've Cleaned The Streets!");
            	$("#result").empty();
	           		setTimeout(wait, 2000);
	            	function wait() {};
            	wins++;
            	restart();
          		} //if dead
        $("#opponent-image").html("<br><br>" + "You've taken him out...");
        $("#result").empty();
        $("div." + antag).clone().appendTo("#remainder-image");

	        setTimeout(wait, 2000);
	        function wait() {
				$("#opponent-image").empty();
			    dead.push(antag);
			    ant = false;
			    antagonist();
	        }; //function ends
	    
		} //ends if

 // Youre out of points BUT not a draw

      else if ((pa <= 0) && !(pa <= 0 && aa <= 0)) {
        losses++;
        $("#you-image").html("<br>" + "You've lost!!");
        $("#result").empty();
        	setTimeout(wait, 2000);
        	function wait () {
          		restart();
        };
    }

        // DRAW


      else if (pa <= 0 && aa <= 0) {
        draws++;
        $("#you-image").html("<br>" + "DRAW!!");
        $("#opponent-image").html("<br>" + "DRAW!!");
        $("#result").empty();
	        setTimeout(wait, 2000);
	        	function wait() {
	          		restart();
	        	};
    }
        // WIN

       else {
        $("#you-image").empty();
        $("div." + protag).clone().appendTo("#you-image");
        $("#you-image").append("<br>" + "Your worth: " + pa + "<br><br>" + " Power of your hand: " + pb + "<br> <br>");
        $("#opponent-image").empty();
        $("div." + antag).clone().appendTo("#opponent-image");
        $("#opponent-image").append("<br>" + "Your opponent's worth: " + aa + "<br> <br>" + "Power of his hand: " + ac + "<br> <br>");
      } // closes else 
    } //main if            

  }); ////// fourth event ends ////////?????????//////////
  $('#restart').on('click', restart); //second event
};

restart();