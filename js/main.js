$(document).ready(function(){

$('#moviesubmit').submit(function() {
	//grab values of movie titles from input boxes
	var movie1title = $('#movie1').val();
	var movie2title = $('#movie2').val();


	if (movie1title == '' || movie2title == ''){
		//produce error if there aren't two movies inputted
		$('#winner_output').html("You haven't inputted two movies to compare! Try again, man.");
		event.preventDefault();
	}
	
	else{
		$('#loading').html("Your information is coming, be patient!");
		//strip extra characters from movie titles to better match API data
		var simplem1temp = movie1title.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
		var simplem1tempURI = simplem1temp.replace(/\s{2,}/g," ");
		var simplem1URI = simplem1tempURI.replace(" ", "%20");
		var simplem2temp = movie2title.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
		var simplem2tempURI = simplem2temp.replace(/\s{2,}/g," ");
		var simplem2URI = simplem2tempURI.replace(" ", "%20");
		//score placeholders
		var audiencescorem1 = 55;
		var audiencescorem2 = 5;
		var criticscorem1 = 5555;
		var criticscorem2 = 3;
		//winners
		var audiencewinner = "weiners";
		var criticswinner = "weeeeiners";

			//get scores for first movie
			$.ajax({
				url:"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="+simplem1URI+"&page_limit=10&page=1&apikey=6xnbpmtn5k3wsm76m3zswk9b",
				dataType:  "jsonp",
				success:function(json){
					//pulls the audience's scores for the movie
					audiencescorem1 = json.movies[0].ratings.audience_score;
					//pulls the critic's scores for the movie
					criticscorem1 = json.movies[0].ratings.critics_score;
				
					//get scores for second movie
					$.ajax({
						url:"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q="+simplem2URI+"&page_limit=10&page=1&apikey=6xnbpmtn5k3wsm76m3zswk9b",
						dataType:  "jsonp",
						success:function(json){
							//pulls the audience's scores for the movie
							audiencescorem2 = json.movies[0].ratings.audience_score;
							//pulls the critic's scores for the movie
							criticscorem2 = json.movies[0].ratings.critics_score;
							compareAudienceScores();
							compareCriticScores();
							displayMovieText();
						},
					});


				},
			});

event.preventDefault();	



//FUNCTIONS

	//function that determines the winner of the audience's heart
	function compareAudienceScores(){
			if (audiencescorem1>audiencescorem2){
				audiencewinner = "<p>According to the audience, the winner is <span class='movietitleoutput'>" + simplem1tempURI +"</span>.</p>";
			}
			else if (audiencescorem2>audiencescorem1){
				audiencewinner = "<p>According to the audience, the winner is <span class='movietitleoutput'>" + simplem2tempURI +"</span>.</p>";
			}
			else {
				audiencewinner = "<p>The audience liked both movies the same! WHOA.</p>"
			}
	};

	//function that determines the winner of the critics's heart
	function compareCriticScores(){
			if (criticscorem1>criticscorem2){
				criticwinner = "<p>According to the critics, the winner is <span class='movietitleoutput'>" + simplem1tempURI +"</span>.</p>";
			}
			else if (criticscorem2>criticscorem1){
				criticwinner = "<p>According to the critics, the winner is <span class='movietitleoutput'>" + simplem2tempURI +"</span>.</p>";
			}
			else {
				criticwinner = "<p>The critics liked both movies the same! WHOA.</p>"
			}
	};



	//Text to support final decision
	function displayMovieText(){
				//remove loading paragraph
			$('#loading').html(" ");

			//confirm movie titles
			$('#winner_output').html("You have chosen <span class='movietitleoutput'>"+ simplem1tempURI +"</span> to rank against <span class='movietitleoutput'>"+simplem2tempURI+"</span>. Here are the results: " + audiencewinner + criticwinner);
			// console.log(simplem2URI);
	};


	}

	});


});