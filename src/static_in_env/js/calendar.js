$(function(){
	// Render Calendar
	var dt = new Date(); // new date object
	var months = ['Janar','Shkurt','Mars','Prill','Maj','Qershor','Korrik','Gusht','Shtator','Tetor','Nentor','Dhjetor'];

	// Background images for the calendar go here
	var bgImgs = [
		'mountain4.jpg',
		'lake3.jpg',
		'flower4.jpg',
		'lake1.jpg',
		'mountain1.jpg',
		'trees8.jpg',
		'beach1.jpg',
		'beach6.jpg',
		'mountain2.jpg',
		'trees9.jpg',
		'web.jpg',
		'mountain7.jpg',
	];

	// sets the links for the background images for the calendar
	var imgLink = [];
	for (var i = 0; i < bgImgs.length; i++) {
		imgLink.push(path[0] + "/static/images/landscape/" + bgImgs[i]);
	}

	preloadImages(imgLink);

	// the background image animate and unanimate functions go here
	function cImgIn(){
		this.unanimate = function() {
			$(".calendar img.Imgactive").removeClass("Imgactive"); // deactivate this image
			$(".calendar .body").addClass("hideCalBody");
			$(".calendar .header, .calendar .year").fadeOut(300); // fadeOut the body of the calendar
		};
		this.animate = function() {
			$(".calendar img")[0].src = imgLink[dt.getMonth()]; // set the src of the bg image for calendar
			setTimeout(function(){
				$(".calendar img")[0].classList.add("Imgactive"); // add the Imgactive class to the calendar img

				setTimeout(function(){
					$(".calendar .header, .calendar .year").fadeIn(200);
					$(".calendar .body").removeClass("hideCalBody");
				}, 300); // fadeIn the body of the calendar
			}, 50);
		};
	};

	var calendarImg = new cImgIn(); //create the calendar Image object
	var calendarTO;//user for calendar TimeOut functions

	function renderCalendar(){
		var td = new Date(); //todays date
		var endDate = new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate(); //this months end date
		var day = new Date(dt.getFullYear(),dt.getMonth(),1).getDay(); // 
		var prevDate = new Date(dt.getFullYear(),dt.getMonth(),0).getDate(); // last months last day

		calendarImg.animate(); // animate the calendar

		$(".calendar>.year")[0].innerHTML = (1900 + dt.getYear()); // sets the year
		$(".calendar .month")[0].innerHTML = months[dt.getMonth()]; // sets the month
		var cells = ""; // will be filled with the calendar days

		for(i=(day==0?6:(day-1)); i>0; i--){
			cells += "<li class='prev_day'>" + (prevDate - i + 1) + "</li>"; // sets the previous days first
		}
		for(i=1; i<=endDate; i++){
			// this will set the days of the calendar and when it reaches the todays date will add to it the classes focusDay and today
			// every day has a link to it that goes to the events of that day and has attribute data-day set to the day in format yyyy-mm-dd
			cells += (i==td.getDate()&&dt.getMonth()==td.getMonth()&&dt.getYear()==td.getYear()?"<li class='today focusDay'>":"<li data-day='"+ (dt.getYear()+1900) +"-"+ (dt.getMonth()+1) +"-"+ (i<10?("0"+i):i) +"'>") + "<a href='/calendar/?date="+ (dt.getYear()+1900) +"-"+ (dt.getMonth()+1) +"-"+ i +"'>" + i + "</a></li>";
		}
		for(i=1; i<=43-(day==0?7:day)-endDate;i++){
			cells += "<li class='next_day'>" + i + "</li>"; // the next months days
		}
		$(".calendar .days")[0].innerHTML = cells; // set the days to the calendar
	};

	// departments
	var dept = ["Departamenti i Inxhinierise Informatike", "Departamenti i Inxhinierise Elektrionike dhe Telekomunikacionit", "Departamenti i Bazave te Informatikes"];

	// prepares the html string for the calendar events
	function prepareDataString(data){
		var data_str = "";
		for (var i = 0; i < data.length; i++) {
			data_str += "<a href='#'><div class='article'><div class='date-pub'>";
			var dt_str = data[i].pub_date;
			var index = dt_str.indexOf("T");
			dt_str = dt_str.substr(0, index);
			var dt = dt_str.split("-");
			var dep = (data[i].department == "DII") ? dept[0] : (data[i].department == "DET") ? dept[1] : dept[2];
			data_str += "<div class='date'>"+ dt[2] +"</div><div class='dt-gr'><div class='month'>" + months[dt[1]-1] + "</div><div class='year'>"+ dt[0] +"</div></div></div>";
			data_str += "<div class='art-body'>";
			data_str += "<h2 class='art-title'>"+ data[i].title +"</h2>";
			data_str += "<p class='description'>"+ data[i].content +"</p>";
			data_str += "</div></div></a>";
		}
		return (data_str==""?"<h3>Nuk ka asnji postim</h3>":data_str)
	}

	// ajax to get months data and more
	function ajaxGetCalendarEvent(url, time=0){
		$.ajax({
			url: window.location.origin + url,
			type: 'get',
			success: function(data){
				console.log($('.articles .heading li a')[0].href += '?month='+ (dt.getMonth()+1) + '&year=' + (dt.getYear()+1900));
				$(".article-gr").fadeOut(150);
				// wait for the calendar to be rendered
				setTimeout(function(){
					$('.article-gr')[0].innerHTML = prepareDataString(data); // display the events
					data = JSON.parse(data); // parse the data that came in JSON format
					for (var i = 0; i < data.length; i++) {
						// get the date of each event
						var dt_str = data[i].pub_date;
						var index = dt_str.indexOf("T");
						dt_str = dt_str.substr(0, index);
						// for each event the date on the calendar will have class hasEvent
						$(".days li[data-day='"+dt_str+"']").addClass('hasEvent');
					}
					$(".article-gr").fadeIn(200);
				}, time);
			},
			error: function(data){
				// the fail to get data function to be called
				console.log('fail: '+data);
			}
		})
	}

	// function to change the calendar
	function animateCalendar(time, date = dt.getDate(), month = dt.getMonth(), yr = dt.getYear()) {
		dt.setFullYear(yr+1900, month, date); // sets the calendar to that particular month
		calendarImg.unanimate(); // unanimates the current calendar
		calendarTO = setTimeout(renderCalendar, time); // sets timeout for the calendar rendering
		// get the months events and display them
		url = "/api/calendar/?month="+(parseInt(month)+1)+"&year="+(parseInt(yr)+1900);
		ajaxGetCalendarEvent(url, time);
		
	}

	renderCalendar(); // render the calendar of the current month first

	$('.articles .heading li a').on('click', function(e) {
		e.preventDefault();
		url = this.getAttribute('href');
		console.log(url);
		ajaxGetCalendarEvent(url);
	});

	// event when clicking to change the month
	$(".mc").on("click", function() {
		param = this.getAttribute("data-move");// prev or next
		var month = dt.getMonth() + (param=='prev'?-1:1); // go a month up or down
		animateCalendar(400, dt.getDate(), month);
		
	});

	// event when clicking days on the calendar
	// selector for only the current months days
	$(".calendar .days").on("click", "li:not(.next_day, .prev_day)", function(e){
		$(".focusDay").removeClass("focusDay"); // remove focur from previous focused day
		this.classList.add('focusDay'); // addes focus to the clicked day
	});

	// show the months of the year
	$(".calendar .header .month").on("click", function() {
		// fadeout the current calendar body
		$(".calendar .body").addClass("hideCalBody");
		$(".calendar .header, .calendar .year").fadeOut(300);
		$(".calendar .months .year")[0].innerHTML = (dt.getYear()+1900); // set the current year
		var mcells = ""; // month cells to be filled
		for(i=0;i<12;i++){
			mcells += "<li data-month="+i+">" + months[i] + "</li>";
		}
		$(".calendar .months")[0].innerHTML += mcells;
		$(".calendar .months")[0].classList.add("show");
	});

	// changing the year on the months display
	$(".calendar .months").on("click", ".ym", function() {
		param = this.getAttribute("data-move");
		var yr = $(".calendar .months .year")[0].innerHTML;
		yr = parseInt(yr);
		$(".calendar .months .year")[0].innerHTML = (yr + (param=="prev"?-1:1));
	});

	// clicked on month change the calendar to the setted month and year
	$(".calendar .months").on("click", "li:not(.yeartab)", function() {
		var month = this.getAttribute('data-month');
		var year = $(".calendar .yeartab .year")[0].innerHTML;
		$(".calendar .months").removeClass("show");
		animateCalendar(400, 1, month, (parseInt(year)-1900));
	});

	// get events for the day when clicking on a day link
	$(".calendar .days").on('click', "li a", function(e){
		e.preventDefault();
		var href = this.getAttribute('href');
		href = href.split('/');
		var url = window.location.href + "api/" + href[2];
		console.log(url);
		$.ajax({
			url: url,
			type: 'get',
			success: function(data){
				console.log(data);
				$(".article-gr").fadeOut(150);
				setTimeout(function(){
					$('.article-gr')[0].innerHTML = prepareDataString(data);
					$(".article-gr").fadeIn(200);
				}, 150);
			},
			error: function(data){
				console.log("fail")
			}
		})
	});

})