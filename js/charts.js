$(document).ready(function(){

// quilts

	$('.quilt_key').click(function(){
	
		series_name = $(this).attr('data-series-name');

		$(this).toggleClass('on');
		
		target_cells = $('table.quilt td[data-series-name="'+series_name+'"]');
		target_cells.toggleClass('on');
	
		if($(this).hasClass('on')){
			series_color = $(this).attr('data-color');
			target_cells.css('background-color',series_color);
		} else {
			target_cells.css('background-color','');
		}
		
	}).bind('mouseover mouseout',
		function(e){
			if(e.type=="mouseover"){
			series_name  = $(this).attr('data-series-name');
			series_color = $(this).attr('data-color');
			target_cells = $('table.quilt td[data-series-name="'+series_name+'"]');
			target_cells.css('background-color',series_color);
		} else {
			if(!$(this).hasClass('on')){
				series_name  = $(this).attr('data-series-name');
				target_cells = $('table.quilt td[data-series-name="'+series_name+'"]');
				target_cells.css('background-color','');

			}
		}
		}
	).eq(0).click();
	
	$('table.quilt td').bind('mouseover mouseout click', function(e){
	
		series_name  = $(this).attr('data-series-name');
		$('.quilt_key[data-series-name="'+series_name+'"]').trigger(e.type);
	})
	

// pies -- to come

	$('.pighcharts').each(function(){
		var pie_id = $(this).attr('id');
		var pie_colors = [];
		var pie_data = [];
		
		$(this).find('.point').each(function(){
			pie_data.push([$(this).attr('data-label'), parseFloat($(this).attr('data-value').replace('%',''))])
			pie_colors.push($(this).attr('data-color'));
		})
		
		var innerSize = $(this).attr('data-inner-size');
		

		

		
		var pie_chart = new Highcharts.Chart({
		chart: {
			renderTo: pie_id,
			marginTop: 0,
			marginBottom: 0,
			marginLeft: 0,
			marginRight: 0,
			backgroundColor: null,
			
			spacingTop: 0,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 0,
			animation: false
		},
		title: {
			text: null
		},
		tooltip: {
			enabled: false,
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
			}
		},
		plotOptions: {
			pie: {
				innerSize: innerSize,
				dataLabels: {
					enabled: false
				}
			}
		},
		colors: pie_colors,
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: pie_data
		}]
	});
		
	})


// generic highcharts

	$('.highcharts').each(function(){
	
		id = $(this).attr('id');
	
	chartsettings = {
      chart: {
         renderTo: id,
         animation: false
      },
      title: {
      	text : ''
      },
      subtitle: {
      },
      xAxis: {
      	type: 'datetime',
      	labels: {},
      	title: {
      		text: '',
	      	style:{
    	  		color: '#888888',
    	  		fontWeight: 'bold'
    	  	}

      	}
      },
      plotOptions: {
      	line: {
      		marker : {
      			enabled: false
      		}
      	},
      	series: {
      		borderWidth: 0,
      		shadow:false,
      		animation: false
      	}
      },
      yAxis: [{
      	
         title: {
            text: '',
	      	style:{
    	  		color: '#888888',
    	  		fontWeight: 'bold'
    	  	}
         },
         labels: {
         		formatter: function(){
         			return '$' + (this.value)
         		}
         	}
		
      }],
      
      tooltip: {
		borderRadius: 0,
		borderWidth: 1
      },
      legend: {
		borderRadius: 0,
		backgroundColor: '#FFFFFF',
		itemStyle: {
			color: '#000000',
			fontSize: '11px'
      	} 
      },
      series: []
   }
   
	if($(this).attr('data-date-format') !== undefined){
		dateformat = $(this).attr('data-date-format');
	} else {
		dateformat = "%B %e, %Y";
	}

	chartsettings.dateformat = dateformat;
   
   legend_align = $(this).attr('data-legend-align');
   if(legend_align != undefined){
	   	chartsettings.legend.align = legend_align;
	   	chartsettings.legend.floating = true;
   }
   
   legend_vertical_align = $(this).attr('data-legend-verticalAlign');
   if(legend_vertical_align != undefined){
	   	chartsettings.legend.verticalAlign = legend_vertical_align;
   }
   
   // turn legend on/off
   legend = $(this).attr('data-legend');
   if(legend=="n")
   		chartsettings.legend.enabled = false;
   if(legend=="y")
   		chartsettings.legend.enabled = true;
   
   if($(this).hasClass('generic')){
		chartsettings.legend.floating = false;
		chartsettings.legend.align = 'center';
		chartsettings.legend.verticalAlign = 'bottom';
   }
   
   y_axis_tick_interval = $(this).attr('data-y-axis-tick-interval');
   if(y_axis_tick_interval !== undefined){
   	chartsettings.yAxis[0].tickInterval = parseFloat(y_axis_tick_interval);
   }

   y_axis_max = $(this).attr('data-y-axis-max');
   if(y_axis_max !== undefined){
   	chartsettings.yAxis[0].max = parseFloat(y_axis_max);
   }


   
   chartsettings.yAxis[0].type = $(this).attr('data-y-axis-type');

	i=0;
	$(this).find('.y-axis').each(function(){
		
		chartsettings.yAxis[i] = new Object();
		
		val = $(this).attr('data-type')
		if(val != undefined)
			chartsettings.yAxis[i].type = val;
		
		val = $(this).attr('data-name')
		if(val != undefined){
			chartsettings.yAxis[i].title = new Object;
			chartsettings.yAxis[i].title.text = val;
			chartsettings.yAxis[i].title.style = {color:'#333333'};
		}
		val = $(this).attr('data-tick-interval')
		if(val != undefined)
			chartsettings.yAxis[i].tickInterval = parseFloat(val);
		
		if(i%2){
			chartsettings.yAxis[i].opposite = true;
		}
				
		i++;
	})
   
 
   y_axis_tick_interval = $(this).attr('data-yAxis-tick-interval');
   if(y_axis_tick_interval !== undefined){
   	chartsettings.yAxis[0].tickInterval = parseFloat(y_axis_tick_interval);
   }

   y_axis_max = $(this).attr('data-yAxis-max');
   if(y_axis_max !== undefined){
   	chartsettings.yAxis[0].max = parseFloat(y_axis_max);
   }
   y_axis_min = $(this).attr('data-yAxis-min');
   if(y_axis_min !== undefined){
   	chartsettings.yAxis[0].min = parseFloat(y_axis_min);
   }

   x_axis_tick_interval = $(this).attr('data-xAxis-tick-interval');
   if(x_axis_tick_interval !== undefined){
   	chartsettings.xAxis.tickInterval = parseFloat(x_axis_tick_interval);
   }

   x_axis_label = $(this).attr('data-xAxis-label');
   if(x_axis_label !== undefined){
   	chartsettings.xAxis.title.text = x_axis_label;

   }
   y_axis_label = $(this).attr('data-yAxis-label');
   if(y_axis_label !== undefined){
   	chartsettings.yAxis[0].title.text = y_axis_label;
	chartsettings.yAxis[0].title.style = {color:'#888888', fontWeight:'bold'};

   }

/*
   x_axis_max = $(this).attr('data-xAxis-max');
   if(x_axis_max !== undefined){
   	chartsettings.xAxis[0].max = parseFloat(x_axis_max);
   }
   x_axis_min = $(this).attr('data-xAxis-min');
   if(x_axis_min !== undefined){
   	chartsettings.xAxis[0].min = parseFloat(x_axis_min);
   }
*/

  
   function y_format(val){
   	return val;
   }
   function y_format_curr(val){
	return '$' + number_format(val,0);
   }
   function y_format_percent(val){
 	return val + '%';  
   }
   
   
   y_format_function = [];
   	for(i in chartsettings.yAxis){
		chartsettings.yAxis[i].labels = new Object;
		
		chartsettings.yAxis[i].labels.formatter = function(val){
		
		}
	
		switch(chartsettings.yAxis[i].type){
			case "curr":
				chartsettings.yAxis[i].labels.formatter = function(){
					return y_format_curr(this.value);
				}
	 		
	   		break;
	   		case "percent":
				chartsettings.yAxis[i].labels.formatter = function(){
					return y_format_percent(this.value);
				}   		
	   		break;
	   		default:
				chartsettings.yAxis[i].labels.formatter = function(){
					return y_format(this.value)
	   			}
   		}
   }
   
   x_axis_type = $(this).attr('data-x-axis-type');
 
 

	 		x_format_datetime = function(val, dateformat){
				return Highcharts.dateFormat(dateformat, val);
		
			}
			x_format_linear = function(val){
				return val;
			}
	
   
   
  

   
  // chartsettings.yAxis[0].labels.formatter = function(){
	//   	return y_format_function(this.value);
   //}
   
   chartsettings.tooltip.formatter = function(){


	   switch(this.series.yAxis.options.type){
	   		case "curr":
	   			y = y_format_curr(this.y)
	   		break;
	   		case "percent":
				y = y_format_percent(this.y)
	   		break;	   		
	   		default:
				y = y_format(this.y)	   		
	   		break;
	   }


   
   		switch(this.series.xAxis.options.type){

   		
   			case "datetime":
   				x = x_format_datetime(this.x, this.series.chart.options.dateformat);

				break
			default:
				x = x_format_linear(this.x);
   		
   		}
   
   		return this.series.name + '<br/>' + '<b>' + x + '</b><br/>' + y;
   }
   
  
	x_axis_type = $(this).attr('data-x-axis-type');
	if(x_axis_type != undefined){
		chartsettings.xAxis.type = x_axis_type;
	}


	label_y = $(this).attr('data-labels-y');
	if(label_y != undefined){
		chartsettings.xAxis.labels.y = parseFloat(label_y);
	}

	label_x = $(this).attr('data-labels-x');
	if(label_x != undefined){
		chartsettings.xAxis.labels.x = parseFloat(label_x);
	}

	legend_y = $(this).attr('data-legend-y');
	if(legend_y != undefined){
		chartsettings.legend.y = parseFloat(legend_y);
	}

	legend_x = $(this).attr('data-legend-x');
	if(legend_x != undefined){
		chartsettings.legend.x = parseFloat(legend_x);
	}


	attr_val = $(this).attr('data-marginTop');
	if(attr_val != undefined){
		chartsettings.chart.marginTop = parseFloat(attr_val);
	}

	attr_val = $(this).attr('data-marginLeft');
	if(attr_val != undefined){
		chartsettings.chart.marginLeft = parseFloat(attr_val);
	}
	
	attr_val = $(this).attr('data-marginRight');
	if(attr_val != undefined){
		chartsettings.chart.marginRight = parseFloat(attr_val);
	}
	
	attr_val = $(this).attr('data-marginBottom');
	if(attr_val != undefined){
		chartsettings.chart.marginBottom = parseFloat(attr_val);
	}



	label_rotation = $(this).attr('data-label-rotation');
	if(label_rotation != undefined){
		chartsettings.xAxis.labels.rotation = parseFloat(label_rotation);
	}

	if($(this).find('.categories').size()){
		
		chartsettings.xAxis.categories = [];
		$(this).find('.point').each(function(){

			chartsettings.xAxis.categories.push($(this).html());

		})

	
	}
   
   $(this).find('.series').each(function(){
   		series = { name: $(this).attr('data-name')};

		if($(this).attr('data-show-in-legend') == 'n'){
			series.showInLegend = false;
		}


		color = $(this).attr('data-color');
		if(color != undefined)
			series.color = color;

   		series.data = [];
   		
   		y_axis = $(this).attr('data-y-axis');
   		if(y_axis != undefined){
   			series.yAxis = parseInt(y_axis);
   		}
   		
   		$(this).find('.point').each(function(){
   			
			
   			if(chartsettings.xAxis.type == "datetime"){
				date = $(this).attr('data-date');
				date = date.split(/\//);					
				date = new Date(date[2]+'/'+date[0]+'/'+date[1]);
				series.data.push([Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()) , parseFloat($(this).html())]);
			} else if( $(this).attr('data-date') !== undefined ) {
				series.data.push([parseFloat( $(this).attr('data-date') ) , parseFloat($(this).html())]);
			} else {
				series.data.push(parseFloat($(this).html()))

			}
	
   		})

   		series.type = $(this).attr('data-type');
   		chartsettings.series.push(series);
   })
	/*
	$(this).find('.settings').each(function(){
		var newsettings = eval('('+$(this).html()+')');
		$.extend(true, chartsettings, newsettings);
	})
*/
	   chart = new Highcharts.Chart(chartsettings);
   
	})


// PEI Horizontal Bar CHarts
	$('.assetcharts').each(function(){
	
    // Pull ID from Container Element
		id = $(this).attr('id');
		chartTitle = $(this).attr('data-title');
		barColor = $(this).attr('data-color');
		
		// Populate X-Axis from HTML
		categories = [];
		$(this).find('.categories .point').each(function(){
			var str = $(this).html(),
			    decoded = str.replace(/&amp;/g, '&');
			categories.push(decoded);
		});
		
		// Populate Y-Axis from HTML
		dataSeries = [];
		$(this).find('.series .point').each(function(){
			dataSeries.push(parseFloat($(this).html()));
		});
		
		plotBandMax = dataSeries.length;
		plotBandMin = plotBandMax - 1.5;

		// General Chart Settings
		chartsettings = {
	  	chart: {
				renderTo: id,
				animation: false,
				type: 'bar',
				marginRight: 20,
				marginBottom: 30,
				marginLeft: 100
	    },
      title: {
        style: {
          color: '#000000',
          font: '11px Georgia',
          fontWeight: 'bold'
        },
        text: chartTitle,
        align: 'left',
        x: 0
      },
      xAxis: [{
      	plotBands : [{
					from : plotBandMin,
					to : plotBandMax,
					color : '#EBECEC'
				}],
        lineColor: '#FFFFFF',
        lineWidth: 1 , 
        tickWidth:0,
        categories: categories,
        labels: {
	        style: {
	          color: '#000000',
	          font: '12px Helvetica',
	          fontWeight: 'normal'
	        },
          step: 1,
          align:'left',
	        x: -100
        },
      }],
      yAxis: {
      	lineWidth:1,
        lineColor:'#232323',
        opposite:true,
        title: {
        	text: null
        },
        labels: {
          style: {
	          color: '#000000',
	          font: '12px Georgia',
	          fontWeight: 'bold'
	        },
          formatter: function(){
          	return (this.value) + '.0%';
          }
        },
        align:'left',
        min: -3,
        max: 5,
      },
      plotOptions: {
        series: {
      		shadow:false,
      		animation: false,
        	stacking: 'normal'
        }
      },
      tooltip: {
	      formatter: function(){
	      	return '<b>'+ this.point.category +'</b><br/>'+this.point.y + '%';
	      },
				borderRadius: 0,
				borderWidth: 1
      },
      legend: {
     		enabled: false
      },
      series: [{
        color: barColor,
        borderColor: false,
        data: dataSeries
      }]
		}

		// Render Chart
		chart = new Highcharts.Chart(chartsettings);
	});


});


