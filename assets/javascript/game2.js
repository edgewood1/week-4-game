var pts = {
  bart: [130, 40, 15],
  death: [150, 50, 20],
  slinger: [170, 60, 25],
  clair: [190, 70, 30]

};
var pro = false;
var ant = true;
var antag = "";
var protag = "";
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
    death: [150, 35, 30],
    slinger: [170, 50, 35],
    clair: [190, 60, 40]
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

    $('div').on('click', function(event) {
      event.stopPropagation();

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

if (!(ant)) {
     $("#result").empty();

     $("#opponent-image").css("text-align", "center").html("<br><br>" + "Select a Challenger");

     $('div').on('click', function(evnt) {
     event.stopPropagation();

/// so long as you haven't chosen an antagonist and your choice is not a protagonist or someone from the dead pool. 
      
     if (!($(this).attr("class") === (protag)) && !($(this).attr("class") == (dead[0])) && !($(this).attr("class") == (dead[1]))) {

/// remember the antagonist

        antag = ($(this).attr("class"));

/// copy its image in the opponent 

        $("#opponent-image").empty();
        $(this).clone().appendTo($("#opponent-image"));

// give him points

        aa = pts[antag][0];
        ac = pts[antag][2];
        $("#opponent-image").append("<br>" + "Your opponent's worth: " + aa + "<br> <br>" + "Power of his hand: " + ac + "<br> <br>");
        ant = true;

//play time

        $("#result").html("Now Show Your Hand!!!");
      } // end of antag if

    }); // end of antag event handler
}// end main if
  }; // end of antag function

/////// //PLAY CLICK 

  $('#show').on('click', function(event) { //  
    event.stopImmediatePropagation();

  // to play, both characters must be present and neither under zero points

    if ((pro && ant) && !(aa <= 0 || pa <= 0)) {
      $("#result").html("Now Show Your Hand!!!");
      pa = pa - ac;
      aa = aa - pb;
      pb = pb + 47;

  // show each the results of the play 

      $("#you-image").empty();
      $("div." + protag).clone().appendTo("#you-image");
      $("#you-image").append("<br>" + "Your worth: " + pa + "<br><br>" + " Power of your hand: " + pb + "<br> <br>");

      $("#opponent-image").empty();
      $("div." + antag).clone().appendTo("#opponent-image");
      $("#opponent-image").append("<br>" + "Your opponent's worth: " + aa + "<br> <br>" + "Power of his hand: " + ac + "<br> <br>");
      
// if one character slips under zero, they pay the consequence: 

      if (aa <= 0 || pa <= 0) {
        consequence();
      } // end if to consequence
    } // end main if
  }); //end play click


  function consequence() {

//  VILLIAN loses and HERO alive and it's NOT the last VILLIAN
    if ((aa <= 0) && (pa > 0) & !(dead.length==3)) {
      $("#opponent-image").html("<br><br>" + "You've taken him out...");
        $("#result").empty();
        $("div." + antag).clone().appendTo("#remainder-image");
        setTimeout(wait1, 2000);
        dead.push(antag);
        ant = false;

        function wait1() {
          $("#opponent-image").empty();
          antagonist();
        }; // end of wait function
      

/// IF inside IF: if the LAST VILLIAN loses and HERO alive
      if ((aa <= 0) && (pa > 0) && (dead.length == 3)) {
        $("#opponent-image").css("text-align", "center").html("<br><br>" + "You've Cleaned The Streets!");
        $("#result").empty();
        wins++;
        setTimeout(wait, 2000);
        function wait() {
        restart();
      
      }; // end wait function
      } // end inner if
      } // end outer if
      
// else if HERO loses but VILLIAN lives 
    else if ((pa <= 0) && (aa > 0)) {
      losses++;
      $("#you-image").html("<br>" + "You've lost!!");
      $("#result").empty();
      setTimeout(wait2, 2000);

      function wait2() {
        restart();
      }; // end wait
    } // end else if

// else if DRAW

    else if (pa <= 0 && aa <= 0) {
      draws++;
      $("#you-image").html("<br>" + "DRAW!!");
      $("#opponent-image").html("<br>" + "DRAW!!");
      $("#result").empty();
      setTimeout(wait3, 2000);

      function wait3() {
        restart();
      }; // end waiting
    } // else if ends
  
  }; //close whole   consequence function      

  

  $('#restart').on('click', restart); //second event
  
};
restart();