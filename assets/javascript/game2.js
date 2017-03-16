// $("#you-image").append($("div.bart"));

var pts = {
	bart: [100, 10, 10],
	death: [115, 10, 10],
    slinger: [130, 20, 30],
    clair: [160, 30, 30]
        };
var pro=false;
var ant=false;
var antag ="";
var protag ="";
var dead=[];
var draws =0;
var losses=0;
var wins=0;

function restart() {

$("#you-image").empty();
$("#opponent-image").empty();
$("#remainder-image").empty();
// $("header").html($("div.bart"));
// $("header").append($("div.death"));
// $("header").append($("div.slinger"));
// $("header").append($("div.clair"));
// $("div.a").html($("div.bart"));
// $("div.b").html($("div.death"));
// $("div.c").html($("div.slinger"));
// $("div.d").html($("div.clair"));
pts = {
	bart: [100, 10, 10],
	death: [115, 10, 10],
    slinger: [130, 20, 30],
    clair: [160, 30, 30]
        };
pro=false;
ant=false;
antag ="";
protag ="";
protagonist();
dead=[];
$("h1#win").html(wins);
$("h1#loss").html(losses);
$("h1#draw").html(draws);


// BART, DEATH, SLINGER, CLAIR


function antagonist() {

	$('div').on('click', function(){
		if (!ant && !($(this).attr("class")===(protag)) && !($(this).attr("class")==(dead[0])) && !($(this).attr("class")==(dead[1]))) {
		 antag =($(this).attr("class"));
		
$("#opponent-image").empty();
		$(this).clone().appendTo($("#opponent-image"));

		    aa = pts[antag][0];
            ac = pts[antag][2];
            $("#opponent-image").append("<br> <br>" + "Your opponent's worth: " + aa + "<br> <br>" +  "Power of his hand: " + ac + "<br> <br>");
        ant=true;
    }

	});
};

function protagonist() {

$('div').on('click', function(){

if (!pro) {
 	protag =($(this).attr("class"));
 	
$("#you-image").empty();
$(this).clone().appendTo($("#you-image"));
	

	        pa = pts[protag][0];
            pb = pts[protag][1];
            $("#you-image").append("<br><br>" +"Your worth: " + pa + "<br><br>" +" Power of your hand: " + pb + "<br> <br>");          
			antagonist();
			pro=true;
}
	});
};



$('#show').on('click', function(){    //fourth event

      if (pro && ant) {
        aa = aa - pb;
        pa = pa - ac;
        pb = pb + 15;
       
        if (((aa <= 0) && !(pa <=0 && aa<=0))) {
        	
              $("#opponent-image").append("\xa0\xa0\xa0" + antag + " loses");
              $("div." + antag).clone().appendTo("#remainder-image"); 
              $("#opponent-image").empty();
              dead.push(antag);
              if (dead.length==3) {
					$("#opponent-image").html("You've Cleaned The Streets!");
              	setTimeout(wait2, 4000);
            function wait2() {
            	wins++;
            	restart();
           		   }
          		}
              ant=false;
              antagonist();
            }
    
        else if ((pa <= 0) && !(pa <=0 && aa<=0)) {
            losses++;
            $("#you-image").append("You've lost!!");
              	setTimeout(wait2, 4000);
            		function wait2() {	
            			restart();
           		   		}
            
            }

        else if (pa <=0 && aa<=0)
        	{ 
        		draws++;
        		$("#you-image").append("DRAW!!");
              	setTimeout(wait2, 4000);
            		function wait2() {	
            			restart();}
            		}

        else {
        	$("#you-image").empty();
        	$("div." + protag).clone().appendTo("#you-image"); 
        	$("#you-image").append("<br><br>" +"Your worth: " + pa + "<br><br>" +" Power of your hand: " + pb + "<br> <br>");          
        	$("#opponent-image").empty();
        	$("div." + antag).clone().appendTo("#opponent-image"); 
            $("#opponent-image").append("<br> <br>" + "Your opponent's worth: " + aa + "<br> <br>" +  "Power of his hand: " + ac + "<br> <br>");
        	} // closes else 
           } //main if            
      
    }); ////// fourth event ends ////////?????????//////////
$('#restart').on('click', restart);  //second event
};

restart();