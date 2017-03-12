

// $('<img src="'+ assets/images/bart.jpg +'">').load(function() {
//   $(this).width(20%).height(20%).appendTo('#you'); });// Uncaught SyntaxError: Unexpected token )

// $("#you").load("assets/images/bart.jpg"); // this gives XMLHttpRequest cannot load file:///C:/Users/mel/Git/week-4-game/assets/images/bart.jpg. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.

  
// $(bart).width(20%).height(20%);//doesn't work

function restart() {

var prompts=["Select your player", "Your player", "Select your opponent", "Your opponent", "Rouge's Gallery"];
   
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
    var counter=0;
    var hasProt=false;
    var gamecounter=0;
    var pts=[];

  
 
 //Select your Player
 $("#you").text(prompts[0]); // Select Player

 $(".images").on("click", function(){ // first event
 	
 	if ($(this).hasClass("images") && counter===0){
 		hasProt=true;
    counter++;
	 	$(this).addClass("prot");
 	 	$(".images").each(function(){
 	 		if ($(this).attr("class")!== "images prot") {	
 	 			$(this).hide;
 	 			$("#opponent-image").append($(this));
 	 			}	
 	 		}); //EACH EVENT OVER
 	 	$("#you").text(prompts[1]); //Your player (selected)
 	 	$("#opponent").text(prompts[2]); 	// Select Opponent
 	 } // FIRST IF THIS

 //Select your opponent 

 $(".images").click(function(){  //second event
 
 
if ($(this).hasClass("images") && (counter===1) && ($(this).attr("class") !=="images prot")) {
	
 	// stay =($(this).attr("id"));
 	$(this).addClass("antag");
  counter++
 	 	$(".images").each(function(){
 	 		if (($(this).attr("class")!== "images prot") && ($(this).attr("class")!== "images antag")) {	
 	 			$(this).hide;
 	 			$("#remainder-image").append($(this)); 	
 	 			$("#opponent").text(prompts[3]); 
 	 			$("#remainder").text(prompts[4]); 
 	 			}
		}); // each function
 }; //new iff/this 
}); //////////////////second event ends///////////////////////////////

 //third event begins/////////////////////////////////place inside second or after second yet inside thrird? /////////

$("#restart").click(function(){  //second event

$("#you-image").html(" "); 
$("#you").html(" "); 

$("#opponent-image").html(" "); 
$("#opponent").html(" "); 
$("#remainder-image").html(" "); 
$("#remainder").html(" "); 

$("#results").html(" "); 


restart(); 
}); //third event ends ????????????????????????????????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



////fourth event begins/////////////////////

$("#show").click(function(){  //fourth event
 if (gamecounter===0) {
 pts=[ [100,10,10], [115, 10, 10], [130, 20, 30], [160,30,30]];
 // bart, death, sling, clair   
} // if game counter
  gamecounter++;
 
if (counter>1) {
    // pts.hp1=pts.hp1-4;
    // $("#results").html("hp: " + pts.hp1);

var prot1=$(".images.prot").attr("id"); 

for (i=0; i<5; i++){
if (prot1==i) {
  var pa=pts[i][0];
  var pb=pts[i][1]; 
  $("#results").html("Your worth: " + pa + " Power of your hand: " + pb);  
} // closes prot1 if 

 } //for i
 

 var antag1=$(".images.antag").attr("id"); 

for (i=0; i<5; i++){
if (antag1==i) {
  var aa=pts[i][0];
  var ac=pts[i][2];
  $("#results").append("<br>" + "Your opponent's worth: " + aa + " Power of his hand: " + ac);  
} // closes prot1 if 

 } //for i
  
}//if counter

}); ////// fourth event ends ////////?????????//////////



 });	//first event ends///////////// ****ALWAYS EMBED YOUR SECOND EVENT HANDLER INSIDE THE FIRST, OTHERWISE "THIS" WILL ALWAYS REFER TO THE FIRST 
 
}; // restart function 

restart();