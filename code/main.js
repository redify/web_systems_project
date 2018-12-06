$( document ).ready(function() {
	console.log( "document loaded" );

	getCurrentObsData();
	getDayRangeCurrentObsData();
  
	$( function() {
		$( "#tabs" ).tabs({
		});
	});
	
	$('#tabs a[href="#tabs-1"]').addClass('temp-tab');
	$('#tabs a[href="#tabs-2"]').addClass('rh-tab');
	$('#tabs a[href="#tabs-3"]').addClass('pressure-tab');
	
});

function getCurrentObsData(){
    console.log('fetching current obs...');
    $.ajax({
        type: "GET",
        url: "php/getobsdata.php",
        data: "",
        success: function(data){
			// echo what the server sent back...
            console.log("returned data: " + data);
            
			renderCurrentObs(jQuery.parseJSON(data));
        },
        complete: function() {
          //set timeout and repeat ajax call to auto-update page
          setTimeout(getCurrentObsData, 60000);
        }
    });
}


function getDayRangeCurrentObsData(){
    console.log('fetching historical obs...');
    $.ajax({
        type: "GET",
        url: "php/range_get_obs_data.php",
        data: "",
        success: function(data){
			// echo what the server sent back...
            //console.log("returned data: " + data);
            
			renderHistoricalObs(jQuery.parseJSON(data));
            // $("#MainContentPanel #rangeobs").html(data);
        },
        complete: function() {
          //set timeout and repeat ajax call to auto-update page
          setTimeout(getDayRangeCurrentObsData, 300000);
        },
        error: function(error){
          console.log("somethign went wrong with the historical fetch");
        }
    });
}

function renderCurrentObs(currentObs){
	$("#CurrentObsContainer #timestamp").text("Last Updated:	" + currentObs.timestamp);
	$("#CurrentObsContainer #temp").text(currentObs.temp).append(" &#8457;");
	$("#CurrentObsContainer #rh").text(currentObs.rh + " %");
	$("#CurrentObsContainer #pressure").text(currentObs.pressure + " hPa");
}

function renderHistoricalObs(histObs) {
	
	var temp_array = [];
	var rh_array = [];
	var pressure_array = [];
	var timestamp_array = [];
	
	$.each(histObs.reverse(), function (index, value) {
		var datem = moment.tz(value.timestamp, "America/New_York");
		
		temp_array.push([Date.parse(value.timestamp), parseFloat(value.temp)]);
		rh_array.push([Date.parse(value.timestamp), parseFloat(value.rh)]);
		pressure_array.push([Date.parse(value.timestamp), parseFloat(value.pressure)]);
	});
	
	// set global highcharts options
	Highcharts.setOptions({
		time: {
			timezone: 'America/New_York'
		},
		rangeSelector: {
			selected: 2,
			buttons: [{
				type: 'hour',
				count: 1,
				text: '1h'
			},{
				type: 'hour',
				count: 12,
				text: '12h'
			},{
				type: 'day',
				count: 1,
				text: '1d'
			},{
				type: 'day',
				count: 7,
				text: '1w'
			},{
				type: 'all',
				text: 'All'
			}]
		},
		navigator: {
			enabled: false
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			labels: {
				align: 'left'
			}
		}
	});
	
	var tempChart = Highcharts.stockChart('tabs-1', {
        // title: {
            // text: 'Historical Temperature'
        // },
        yAxis: {
            title: {
                text: 'Farhenheit'
            }
        },
        series: [{
            name: 'Temperature',
            data: temp_array,
			tooltip: {
                valueDecimals: 1
            }
        }]
    });
	
	var rhChart = Highcharts.stockChart('tabs-2', {
        // title: {
            // text: 'Historical Relative Humidity'
        // },
        yAxis: {
            title: {
                text: '%'
            }
        },
        series: [{
            name: 'Relative Humidity (%)',
            data: rh_array,
			tooltip: {
                valueDecimals: 1
            }
        }]
    });
	
	var pressureChart = Highcharts.stockChart('tabs-3', {
        // title: {
            // text: 'Historical Pressure'
        // },
        yAxis: {
            title: {
                text: 'hPa'
            }
        },
        series: [{
            name: 'Presure (hPa)',
            data: pressure_array,
			tooltip: {
                valueDecimals: 1
            }
        }]
    });
}


