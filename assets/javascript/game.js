function restart() {

///// resets the page upon a restart.      
  $("#you-image").html(" ");
  $("#you").html(" ");

  $("#opponent-image").html(" ");
  $("#opponent").html(" ");
  $("#remainder-image").html(" ");
  $("#remainder").html(" ");

  $("#results").html(" ");

//////sets up the page///

  var prompts = ["Select your player", "Your player", "Select your opponent", "Your opponent", "Rouge's Gallery"];
  var bart = $("<div>");
  var fig = $("<figure>");
  bart.append(fig);
  $(fig).append($("<img>").attr("class", "images").attr("id", 0).attr("src", "assets/images/bart.jpg"));
  $(fig).append("<figcaption> Bart </figcaption>");
  $("#you-image").append(bart);
  var death = $("<img>").attr("class", "images").attr("id", 1).attr("src", "assets/images/death.jpg");
  $("#you-image").append(death);
  var slinger = $("<img>").attr("class", "images").attr("id", 2).attr("src", "assets/images/slinger.jpg");
  $("#you-image").append(slinger);
  var clairvoyant = $("<img>").attr("class", "images").attr("id", 3).attr("src", "assets/images/the clairvoyant.jpg");
  $("#you-image").append(clairvoyant);
  $("#you").text(prompts[0]); // Select Player
  var pa, pb, aa, ac;
  var counter = 0;
  var hasProt = false;
  var gamecounter = 0;
  var pts = [];
  

/////////event  1: CHOOSE / INITIALIZE PROTAGONIST / ANTAGONIST///////////////////////////////////////////////
$('.images').on('click', function(){

    if (counter === 0) {
      hasProt = true;
      counter++;
      $(this).addClass("prot");
      ///// event 1 - A - A//// 
      // $(".images").each(function() {    ***return 
        // if ($(this).attr("class") !== "images prot") { **undelete
          $(this).hide;
          $("#opponent-image").append($(this));
        }   // ends inner if 
      // }); ////ends event 1 - a - a /// 
      $("#you").text(prompts[1]); //Your player (selected)
      $("#opponent").text(prompts[2]); // Select Opponent
     // ends outer if 
});
//////////event 1.1 ///////////////////select opponent 

    $('.images').on('click', function(){//second event

      if ((counter === 1) && ($(this).attr("class") !== "images prot")) {

        // stay =($(this).attr("id"));
        $(this).addClass("antag");
        counter++
        $(".images").each(function() {
          if (($(this).attr("class") !== "images prot") && ($(this).attr("class") !== "images antag")) {
            $(this).hide;
            $("#remainder-image").append($(this));
            $("#opponent").text(prompts[3]);
            $("#remainder").text(prompts[4]);
          }   // inner iff 
        }); // each function
      }; /// outer if ends 
    

///////third event - handle restart button ////  



////fourth event begins - assign points to characters/////////////////////


      if (gamecounter === 0) {  
        pts = [
          [100, 10, 10],
          [115, 10, 10],
          [130, 20, 30] ,
          [160, 30, 30]
        ];
        // bart, death,sling, clair   
        gamecounter++; //gamecounter prevents reassignment of starting points
      } // if game counter
      

      if (counter === 2) { /// counter is 2 after both fighters chosen, 
        //////////////but after they're given the points below, counter will be 3   
        
        var prot1 = $(".images.prot").attr("id");

        for (i = 0; i < 5; i++) {
          if (prot1 == i) {
            pa = pts[i][0];
            pb = pts[i][1];
            $("#results").html("<br>" +"Your worth: " + pa + "<br><br>" +" Power of your hand: " + pb + "<br> <br>");
          } // closes prot1 if 
        
        } //for i

        var antag1 = $(".images.antag").attr("id");

        for (i = 0; i < 5; i++) {
          if (antag1 == i) {
            aa = pts[i][0];
            ac = pts[i][2];
            $("#results").append("Your opponent's worth: " + aa + "<br> <br>" +  "Power of his hand: " + ac + "<br> <br>");
          } // closes prot1 if 

        } //for i
        counter++;//// adds the 3rd counter so that this section is not revisited
      } //if counter
//////////
}); //////////////////second event (1.1) ends///////////////////////////////

$('#restart').on('click', restart);  //second event
$('#show').on('click', function(){    //fourth event

      if (counter>2 && gamecounter >0) {
        aa = aa - pb;
        pa = pa - ac;
        
/// why is the above looping through 2-3 times? 

        if (aa <= 0) {
          setTimeout(wait1, 1000);
            function wait1() {
              $("#results").html("<br>" + "Antagonist Loses");
              };          
            }
        else if (pa <= 0) {
          setTimeout(wait2, 1000);
            function wait2() {
            $("#results").append("<br>" + "Protagonist Loses");
            gamecounter=0;// why should i have to add this? 
            counter=0;
            restart();
              };
            }
        else {
          $("#results").html("<br>" +"Your worth: " + pa + "<br><br>" +" Power of your hand: " + pb + "<br><br><br>" + "Your opponent's worth: " + aa + "<br><br>" +" Power of his hand: " + ac + "<br>");
        } // closes else 
                         
      }    //closes if counter

    }); ////// fourth event ends ////////?????????//////////
   
}; // restart function 

restart();