var pts = {
  bart: [130, 30, 20],
  death: [150, 45, 25],
  slinger: [170, 60, 40],
  clair: [190, 70, 50]

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

    if (!(dead.length == 3)) {
      $("#result").empty();

      $("#opponent-image").css("text-align", "center").html("<br><br>" + "Select a Challenger");
    }

    $('div').on('click', function(evnt) {
      event.stopPropagation();
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

  $('#show').on('click', function(event) { //fourth event
    event.stopImmediatePropagation();
    if ((pro && ant) && !(aa <= 0 || pa <= 0)) {
      $("#result").html("Now Show Your Hand!!!");
      pa = pa - ac;
      aa = aa - pb;
      pb = pb + 40;
      $("#you-image").empty();
      $("div." + protag).clone().appendTo("#you-image");
      $("#you-image").append("<br>" + "Your worth: " + pa + "<br><br>" + " Power of your hand: " + pb + "<br> <br>");
      $("#opponent-image").empty();
      $("div." + antag).clone().appendTo("#opponent-image");
      $("#opponent-image").append("<br>" + "Your opponent's worth: " + aa + "<br> <br>" + "Power of his hand: " + ac + "<br> <br>");
      if (aa <= 0 || pa <= 0) {
        consequence();
      }
    } // end main if
  });
  //  VILLIAN / AA loses and No draw
  function consequence() {
    if ((aa <= 0) && !(pa <= 0 && aa <= 0)) {
      if (dead.length == 3) {
        $("#opponent-image").css("text-align", "center").html("<br><br>" + "You've Cleaned The Streets!");
        $("#result").empty();
        wins++;
        setTimeout(wait, 2000);

        function wait() {};
        restart();
      } //if dead
      else {
        $("#opponent-image").html("<br><br>" + "You've taken him out...");
        $("#result").empty();
        $("div." + antag).clone().appendTo("#remainder-image");
        setTimeout(wait1, 2000);
        dead.push(antag);
        ant = false;

        function wait1() {
          $("#opponent-image").empty();
          antagonist();
        }; //function - this isn't sending it back home - instead
      } //else 
    } //if aa

    // PA (HERO) LOSES 
    else if ((pa <= 0) && !(pa <= 0 && aa <= 0)) {
      losses++;
      $("#you-image").html("<br>" + "You've lost!!");
      $("#result").empty();
      setTimeout(wait2, 2000);

      function wait2() {
        restart();
      };
    }

    // DRAW - BOTH LOSE
    else if (pa <= 0 && aa <= 0) {
      draws++;
      $("#you-image").html("<br>" + "DRAW!!");
      $("#opponent-image").html("<br>" + "DRAW!!");
      $("#result").empty();
      setTimeout(wait3, 2000);

      function wait3() {
        restart();
      };
    }
    // WIN

  }; //close whole   consequence       

  ////// fourth event ends ////////?????????//////////

  $('#restart').on('click', restart); //second event
};

restart();