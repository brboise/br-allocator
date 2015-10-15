(function() { // open block


var undefined;

function get_colors(){

	var tool_colors = ['#efc223',
	'#Df793d',
	'#3ebeba',	
	'#aaad39'
	];

	
	return tool_colors;
	
}

function get_ia_stats(form){

console.log('form');
console.log(form);

		var blend = [],
			g10k_data = [],		
			x, y, init, v;



		for(x in form){
			//console.log(form[x] / 100);
			//blend[x] = [form[x] * 100];	
			blend[x] = [form[x] / 100];						// Formats percentage from form
			blend[x].push((form[x] / 100) * 10000);
		}


		
		var blend_values = [];
		

		var i = 0, 
			lastsum = 10000;
		//console.log(blend);


		for(y in keyed_data){
			
			var row_total = 0;
			console.log(' ');
			console.log('%c' + y, 'color: blue; font-weight: bold; font-size:20px; margin-top:10px;');
			for(x in form){
				
				init = blend[x][blend[x].length-1];										
				//console.log(init);
				//v = init * ((10000 + keyed_data[y][x]) / 10000);
				console.log('%c> ' + x + ' <', 'color: blue; test-transform: uppercase; font-size:16px;');
				console.log(init * ((1 + keyed_data[y][x])));

				//blend[x].push( init * ((10000 + keyed_data[y][x]) / 10000) );
				blend[x].push( init * ((1 + keyed_data[y][x])) );
				row_total += init * ((1 + keyed_data[y][x]));
				//console.log(row_total);
				//console.log(x);
			}



			g10k_data[y] = row_total;
			i++;
			
			/*if(i && (i % 4 === 0)){
				for(x in form){
					var w = (form[x]);					
					blend[x].push( w * row_total /100 );
				}
			}*/
			var perf    = (row_total - lastsum) * 100 / lastsum;

			blend_values.push(perf);
			lastsum = row_total;			
			
		}
		console.log('blend');
		console.dir(blend);

		

		var blended_portfolio = blend;
		var blended_portfolio_vals = blend_values;
				
		var stddev_val = parseFloat(stddev(blended_portfolio_vals));

		var correlation = correl(blended_portfolio_vals, bench_data);
		
		var stats = new Object();
		
		stats.stddev = number_format(stddev_val,2) + '%';
		stats.correlation = number_format(correlation, 2);
		
		
//		set_ia_bar_value($('#ia_bar_stddev'), stddev_val);
		
		var rolling_12_months = [];
		
		var first, second, third, fourth, rolling;
		
		for(i in blended_portfolio_vals){
			if(i<3){
				continue;}
			first = blended_portfolio_vals[i-2];
			second = blended_portfolio_vals[i-1];
			third = blended_portfolio_vals[i];
			fourth = blended_portfolio_vals[i-3];
			
			rolling = ((first + 100)/100) * (( second + 100)/100) * ((third + 100)/100) * ((fourth+100)/100) - 1;
			rolling_12_months.push(rolling);
			
		}
		
		
		
		
		stats.worst_12_months = number_format(Math.min.apply(Math, rolling_12_months) * 100, 2) + '%';
		stats.best_12_months  = number_format(Math.max.apply(Math, rolling_12_months) * 100, 2 ) + '%';
		
		
		var g10k_rolling = 1000000;
		var cumulative_return = 100;
		var last_change = 1;
		var changes = [];
		var g10k = [];
		var change;
		for(x in blended_portfolio_vals){
			change = ((100 + blended_portfolio_vals[x]) /100);
			g10k_rolling = g10k_rolling * ((100 + blended_portfolio_vals[x]) /100);
			cumulative_return = cumulative_return * ((100 + blended_portfolio_vals[x]) /100);
			g10k.push(Math.round(g10k_rolling)/100);
		}
		

		
		var count = 0;
		for(x in keyed_data){
			x = new Date(x);

			g10k[count] = [Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()), g10k[count]];
			count++;
		}
		
		
		
		stats.g10k = '$' + number_format(g10k_rolling/100, 0);
		
		cumulative_return -= 100;
		stats.cumulative_return = number_format(cumulative_return, 2) + '%';
		
		var firstDate = new Date('1/1/2004');
		var lastDate = new Date(window.lastDate);
		
		var oneDay = 24*60*60*1000; 
		var diffDays = Math.round(Math.abs((firstDate.getTime() - lastDate.getTime())/(oneDay)));
		var diffYears = diffDays / 365; 
		
		console.log('firstDate.getTime()');
		console.log(firstDate);
		console.log(Math.round(firstDate.getTime()));
		console.log('lastDate.getTime()');
		console.log(lastDate.getTime());
		console.log('diffDays');
		console.log(diffDays);
		console.log('diffYears');
		console.log(diffYears);
		
		
		
		var annualized_return = parseFloat(Math.pow((cumulative_return+100) / 100 ,  (1/  (diffYears) ) ) * 100  - 100);

		console.log('annualized_return');
		console.log(annualized_return);
	
		stats.annualized_return = number_format(annualized_return,2) + '%';
		
		stats.g10k_data = g10k; 
		
		return stats;

}


function stddev(data){
	var deviation = [];
	var sum = 0;
	var devnsum = 0;
	var stddevn = 0;
	var len = data.length;
	for (var i=0; i<len; i++) {
	sum = sum + (data[i] * 1);  // ensure number
	}
	var mean = (sum/len).toFixed(6);  // 6 decimal places
	for (i=0; i<len; i++) {
	deviation[i] = data[i] - mean;
	deviation[i] = deviation[i] * deviation[i];
	devnsum = devnsum + deviation[i];
	}
	stddevn = Math.sqrt(devnsum/(len-1)).toFixed(6);  // 6 decimal places
	
	return stddevn;
}



function correl(arr1, arr2){

	var x;
	var pointCount = arr1.length;
	
	var arr1_arr2_sum = 0;
	var arr1_arr1_sum = 0;
	var arr2_arr2_sum = 0;

	var arr1_sum = 0;
	var arr2_sum = 0;
	
	for(x in arr1){
	
		
	
		arr1_arr2_sum += (arr1[x] ) * (arr2[x] );
		arr1_arr1_sum += (arr1[x] ) * (arr1[x] );
		arr2_arr2_sum += (arr2[x] ) * (arr2[x] );

		arr1_sum      += arr1[x];
		arr2_sum      += arr2[x];
	}

		
	
	var correl_val = (pointCount * arr1_arr2_sum - arr1_sum * arr2_sum) / Math.sqrt((pointCount * arr1_arr1_sum - arr1_sum * arr1_sum) * (pointCount * arr2_arr2_sum - arr2_sum * arr2_sum));

	return correl_val;

}



function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)){ return false; }
   return x==y && x.toString()==y.toString();
 } 

function ia_bar_width_to_value(bar, width){

	var min = parseFloat(bar.closest('.ia_bar').attr('data-min'));
	var max = parseFloat(bar.closest('.ia_bar').attr('data-max'));
	var barwidth = bar.closest('.ia_bar').width();
	var value = (max-min) * width / barwidth;
	value = Math.round(value*100)/100;
	return value;
}

function ia_bar_value_to_width(bar, val){

	var min = parseFloat(bar.closest('.ia_bar').attr('data-min'));
	var max = parseFloat(bar.closest('.ia_bar').attr('data-max'));
//	var width = parseFloat(bar.closest('.ia_bar').width());
	
	val = parseFloat(val);
	
	var newwidth = (val / (max - min)) * 100;//width;
	return newwidth;

}
function set_ia_bar_value(bar, value, bench){

	if(bench === undefined){
		bench = false;}

	var target;
	if(bench){
		target = ".color.initial";
	} else {
		target = ".color:not(.initial)";}


	var newwidth = ia_bar_value_to_width(bar.find('.color'), value);
	

	
	bar.find(target)
		.animate(
			{width: newwidth+'%'},
			{
				step: function(now, fx){
					$(fx.elem).find('.label').html(ia_bar_width_to_value($(fx.elem), now) + '%');
				},
				duration: 2400,
				complete: function(){
					bar.find(target).find('.label').html(number_format(value,2) + '%');				
				}
			}
		).css('overflow','visible');

	

}

var ia_pie = false;
var ia_pie_2 = false;

var default_pie_initialized = false;
function default_pie_init(){

	if(default_pie_initialized){
		return;
	}

	default_pie_initialized = true;

	var data_def = [
		{name:'Stock', y:60, color:"#1F5E80"},
		{name:'Bonds', y:40, color:"#683F80"}
	];
	ia_pie_2 = new Highcharts.Chart({
		title: {
			text: null,
			enabled:false
		},
		chart: {
			backgroundColor: null,
			renderTo: 'default_holder',
			margin:[0,0,0,0],
			borderWidth: 0
			
		},
		plotOptions: {
			pie: {
				size: '100%',
				innerSize:'60%',
                
				dataLabels: {
					enabled: true,
					distance: -17,
					color:"#ffffff",

					formatter: function(){
						
						var html = 	'<b>' + this.y + '%</b>';
						if(this.y==0){
							html = ""
						}
						return html;
					}
				}
			}
		},
		series: [
			{
				type:"pie",
				data:data_def
			}
		],
		tooltip: { enabled : false } 
		
		
	});
}


function ia_update_pie(){

		var form = {};
		

		
		$('#implementing_alts_form').find('input[type!="submit"]').each(function(){
			var val = $(this).attr('value');
			
			var valid_numbers = true;
			if(!isInt(val)){
				valid_numbers = false;
				return false;
			}

			if(parseInt(val,10)<0){
				valid_numbers = false;
				return false;			
			}
			
			val = parseFloat(val);

		//	total += val;
			
			
			form[$(this).attr('name')] = val;
			
			
		});

	var outer_colors = ['#868686','#6693bc'];
	var pie_colors = get_colors();


	var data = [
		{name:'Stock', y:form.stock, color:pie_colors[0]},
		{name:'Bonds', y:form.bonds, color:pie_colors[1]},
		{name:'Hedged Fund Strategies', y:form.hedged_strategies, color:pie_colors[2]},
		{name:'Private Investments', y:form.private_investments, color:pie_colors[3]}
	];		
	var data_outer = [
		{name:'Stocks & Bonds', y:(form.stock+form.bonds), color:outer_colors[0]},
		{name:'Alternatives', y:(form.hedged_strategies + form.private_investments), color:outer_colors[1]}
	];		



	if(!ia_pie){
	// create the pie
	
	ia_pie = new Highcharts.Chart({
		title: {
			text: null,
			enabled:false
		},
		chart: {
			backgroundColor: null,
			renderTo: 'holder',
			margin:[0,0,0,0],
			borderWidth: 0,
			
		},
		plotOptions: {
			pie: {
				size: '100%',
				innerSize:'60%',
				dataLabels: {
					enabled: true,
					distance: -14,
					color:"#ffffff",
					style:{
						fontSize:'10px'
					},
						formatter: function(){
						
						var html = 	'<b>' + this.y + '%</b>';
						if(this.y==0){
							html = ""
						}
						return html;
					}

				}
			}
		},
		series: [
			{
				type:"pie",
				data:data,
				size: '89%'
			},
			{
				type:"pie",
				data:data_outer,
				size: '100%',
				innerSize: '90%',
				dataLabels:{ enabled: false }
			}

		],


		tooltip: { enabled : false } 
		
		
		
	});
	
	
	
	} else {

		var i;
		var count = 0;
		var pie_colors = get_colors();
		// update the pie
			for(i in data){
//			var pie_y = parseInt(data[i][1]);
//			var pie_x = data[i][0];



			ia_pie.series[0].data[i].update(data[i],true, {duration: 800});

			count++;
		}

		count = 0;
		// update the pie
			for(i in data_outer){
//			var pie_y = parseInt(data_outer[i][1]);
//			var pie_x = data_outer[i][0];

			ia_pie.series[1].data[i].update(data_outer[i],true, {duration: 800});

			count++;
		}



	}	
}

var ia_g10k;
var g10k_init;


function ia_update_g10k(data, bench){
	
	bench = (typeof bench == 'undefined') ? false : bench;

//	if(bench == undefined)
//		bench = false;

	var colors = get_colors();

	var label = "My Portfolio";
	if(bench){
		label = "Stocks & Bonds Only";
		g10k_init = data;
	}

	if(ia_g10k == undefined){

	
		ia_g10k = new Highcharts.Chart({
		title: {
			text: null
		},
		chart: {
			backgroundColor: null,
			renderTo: 'implementing_alts_g10k',
			animation: false,
			margin: [40,0,20,60]
		},
		plotOptions: {
			line: {
				marker: {
					enabled: true
				},
				animation: true,
				shadow:  false,
				lineWidth: 1,
                
			},
            series: {
                pointStart: Date.UTC(2004),
            }

		},
		legend: {
			align: "right",
			verticalAlign: "top",
			floating: false,
			borderRadius: 0,
			x: 10,
			y: -10,
			backgroundColor: '#FFF',
			labelFormatter: function() {
               return '<span style="color:'+this.color+'">'+this.name +'</span>';
            }
		},
		xAxis: {
			type:"datetime",
            startOnTick: true,
			labels: {
				y: 20
			}
           
		},
		yAxis: {
			//tickInterval: 500,
			title: {
				text: null
			},
			labels: {
				formatter: function(){return '$' + number_format(this.value);}
			},
			plotLines: [
				{color:"#cccccc", value:10000, width:2}
			],
			
		},
		tooltip: {
			formatter: function(){
				var dateformat = "%B %e, %Y";
				var theDate = Highcharts.dateFormat(dateformat, this.x);	
		
				return this.series.name + '<br>' + '<b>' + theDate + '</b><br>$' + number_format(this.y,2);
			}
		},
		series: [
			{
				color:colors[0],
				type:"line",
				data:data,
				name:label,
			}
			
		]
			
	});
	} else {
	
		
	
		if(ia_g10k.series.length == 1){
			
			var init_series = {type:'line', data:g10k_init, color:comp_colors[0], name:"60% Stocks / 40% Bonds"};
			ia_g10k.series[0].remove();

			ia_g10k.addSeries(init_series);
			ia_g10k.addSeries({type:'line',data:data, color:comp_colors[1], name:label});
		} else {
			while(ia_g10k.series.length > 1){
				ia_g10k.series[ia_g10k.series.length-1].remove();
			}
			ia_g10k.addSeries({type:'line',data:data, color:comp_colors[1], name:label});
		}
	
		
		
	}


}


var comp_colors = [];
var keyed_data = {};
var bench_data = [];
var lastDate;


    jQuery(document).ready(function(){





	var fields = ['stock','bonds','hedged_strategies','private_investments'];
	var data;
	var form = [];


	$('#tool_results_key .ia_key').each(function(){
		comp_colors.push($(this).css('background-color'));
	});




	


	
	$('div.implementing_alts_data span').remove();
	
	data = $('div.implementing_alts_data').html();
	data = data.split(/BR/);

	for(var x=0; x<data.length; x++){

		data[x] = data[x].split(/TAB/);

		keyed_data[data[x][0]] = {};
		var i;
		var data_row = data[x].slice(1);
		var data_row_real = {};
		for(i in fields){

		
			data_row_real[i] = data_row[i];
			//console.log(data_row_real[i]);

		
			if(fields[i] == "stock"){
				bench_data.push(parseFloat(data_row_real[i]));
			}
		
			if(isNaN(data_row_real[i])){
				data_row_real[i] = 0;}
			//keyed_data[data[x][0]][fields[i]] = parseInt(parseFloat(data_row_real[i]) * 100);        // Removed rounding
			keyed_data[data[x][0]][fields[i]] = parseFloat(data_row_real[i]/100);
			window.lastDate = data[x][0];
		}
	
		
	}
	console.log('keyed_data');
	console.log(keyed_data);

	// initialize with 60/40
	form.hedged_strategies=0;
	form.private_investments=0;
	form.stock=60;
	form.bonds=40;

	var stats = get_ia_stats(form);

	console.log('stats');
	console.log(stats);

	set_ia_bar_value($('#ia_bar_stddev'), stats.stddev, true);
	set_ia_bar_value($('#ia_bar_return'), stats.annualized_return, true);
	
	ia_update_g10k(stats.g10k_data, true);

	for(x in stats){
		$('table.stats tr[data-stat="'+x+'"] td.value_init').html(stats[x]);
	}



	
	$('#implementing_alts_form input[type="text"]').bind('change, keyup',function(){
		if($.trim($(this).val()) ==""){
			$(this).val('0');}
		if(!isInt($(this).val())){
			$(this).val('0');}

		
		
		if(parseInt($(this).val(),10)<0){
			alert('Negative numbers are not allowed.');
			return false;	
		}
		
		var hs = parseFloat($('input[name="hedged_strategies"]').val());
		var pi = parseFloat($('input[name="private_investments"]').val());

		var st = parseFloat($('input[name="stock"]').val());
		var bo = parseFloat($('input[name="bonds"]').val());


//		$('#alts_total').html(hs+pi);

		$('.altsReadout').html(hs+pi+'%')
		$('.sbReadout').html(st+bo+'%')
		
		var all_total = hs+pi+st+bo;
		
		$('#all_total').html(all_total);
		
		if(all_total != 100){
			$('.all_total_wrapper').addClass('err');
			$('.compare').addClass('err');
			$('.alert_100').addClass('err');
		} else {
			$('.all_total_wrapper').removeClass('err');
			$('.compare').removeClass('err');
			$('.alert_100').removeClass('err');
		}
		
	}).trigger('change');

	$('.increment_up').click(function(){
		var target = $('input[name="'+$(this).attr('data-target')+'"]');
		var val = target.val();
		if(!isInt(val)){
			return false;
		}
		if(val >= 100){
			return false;}
		target.val(parseInt(val)+5).trigger('change');
	});

	$('.increment_down').click(function(){
		var target = $('input[name="'+$(this).attr('data-target')+'"]');
		var val = target.val();
		if(!isInt(val)){
			return false;
		}

		if(val <= 0){
			return false;}

		target.val(parseInt(val)-5).trigger('change');
	});
		
		
	$('#implementing_alts_form').submit(function(){



		var x;
		stats = {};
		form = {};
		var total = 0;
		var valid_numbers = true;
		
		form = {};

		
		$(this).find('input[type!="submit"]').each(function(){
			var val = $(this).attr('value');
			
			if(!isInt(val)){
				valid_numbers = false;
				return false;
			}

			if(parseInt(val)<0){
				valid_numbers = false;
				return false;			
			}
			
			val = parseFloat(val);

			total += val;
			
			
			form[$(this).attr('name')] = val;
			
			
		});

		if(!valid_numbers){
			alert('All entries must be integers greater than or equal to zero.');
			return false;
		}


		
		if(total !== 100){
			//alert('Total must be 100.');
			$('#alert_100').toggle();
			return false;
		}
		
		ia_update_pie();

		default_pie_init();

		stats = get_ia_stats(form);
		
		for(x in stats){
			$('table.stats tr[data-stat="'+x+'"] td.value').html(stats[x]);
		}

		set_ia_bar_value($('#ia_bar_stddev'), stats.stddev);

		set_ia_bar_value($('#ia_bar_return'), stats.annualized_return);

		ia_update_g10k(stats.g10k_data, false);

		
		
		return false;
	});

		ia_update_pie();
		default_pie_init();

	
	$('.compare').click(function(){
		$("#implementing_alts_form").submit();
	}).click();
	
});






function number_format (number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/number_format    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);
}

}());