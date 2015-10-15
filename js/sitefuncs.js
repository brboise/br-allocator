$(document).ready(function(){
	$('.modal_trigger').click(function(){
		var type = $(this).attr('data-type');
		$(this).closest('.manager_container').find('.'+type+'_modal_content').modal({minWidth:700, minHeight:300});
		return false;
	})
	
	$(window.location.hash).click();
	//alert();
})

var chart;


//---------- Working ----------//

function show_working(){
	$('body').append('<div id="working" style="padding:10px 15px;font-size:12px;position:fixed;top:0;left:0;background-color:#333;color:#fff">loading...</div>')
}

function hide_working(){
	$('#working').remove();
}


$(document).ready(function(){

//------ offsite ----------//
$('.offsite').click(function() {
	var offsiteLink = $(this).attr('href');
	$('<div class="offsite_wrap"><h1>You are about to leave hatterasfunds.com</h1><div class="buttons"><a href="#" class="closeModal">Cancel</a><a href="' + offsiteLink + '" class="goOffsite">Continue</a></div><p>Hatteras Funds has not been involved in the preparation of the content supplied at the site and does not guarantee or assume any responsibility for its content.</p></div>').modal({minWidth:700, minHeight:300, closeClass:'closeModal'});
	return false;
});

//---------- Liquidity Slider ----------//
	
	if($('.main .sliderGroup').size()) {

		$('.main .sliderGroup li:first a').addClass('on');
		$('.liqGroup:first').show();
		var setCount = $('.main .sliderGroup li').length;
		var setIncrement = (100/setCount);
		var startPoint = Math.floor(100/(setCount*2));
		var endPoint = 100-startPoint;
		var startIndex = 1;

		$("#slider").slider({
			min: startPoint,
			max: endPoint,
			slide: function( event, ui ) {
				var newIndex = Math.floor(ui.value/(100/setCount)) + 1;
				if(newIndex != startIndex) {
					$('.sliderGroup li:nth-child(' + newIndex + ') a').trigger('click');
				}
			}
		});


		$('.main .sliderGroup li a').click(function() {
			var curIndex = $(this).parent().index() + 1;

			$('.sliderGroup li a').removeClass('on');
			$('.sliderGroup li:nth-child(' + curIndex + ') a').addClass('on');

			var newTab = $('.sliderGroup li:nth-child(' + curIndex + ') a').attr('href');
			$('.liqGroup').hide();
			$(newTab).show();

			var newLocation = ((curIndex-1) * setIncrement) + (setIncrement/2);
			$( "#slider" ).slider( "value", newLocation );

			startIndex = curIndex;			
			return false;
		});


/*
		$('.main .sliderGroup li:first a').addClass('on');
		$('.liqGroup:first').show();
		var setCount = $('.main .sliderGroup li').length;
		var setIncrement = Math.floor(100/setCount);
		var startPoint = Math.floor(100/(setCount*2));
		var endPoint = 100-startPoint;
		var startIndex = 1;

		$("#slider").slider({
			min: startPoint,
			max: endPoint,
			slide: function( event, ui ) {
				var curIndex = Math.floor(ui.value/(100/setCount))+1;
				
				if(curIndex != startIndex) {
					$('.sliderGroup li a').removeClass('on');
					$('.sliderGroup li:nth-child(' + curIndex + ') a').addClass('on');
					
					var curTab = $('.sliderGroup li:nth-child(' + curIndex + ') a').attr('href');
					$('.liqGroup').hide();
					$(curTab).show();

					startIndex = curIndex;
				}
			}
	
		});

		$('.main .sliderGroup li a').click(function() {
			var index = $(this).parent().index();
			var newLocation = (index * setIncrement) + (setIncrement/2);
			$( "#slider" ).slider( "value", newLocation );
			return false;
		});
*/
	}

//---------- Sales Map ----------//

	if($('#map-usa').size()) {

		function change_map(regionsArray,flag,setColor) {
			settings = [];
			for (x in regionsArray[flag]) {
				settings[regionsArray[flag][x]] = setColor;
			}
			$('#map-usa').vectorMap('set', 'colors', settings);
		}
/*
		$("#slider").slider().bind({
			slidechange: function(event,ui) {
				var curIndex = ui.value + 1;
				var curTab = $('.sliderGroup li:nth-child(' + curIndex + ') a').attr('href');
				var curTabId = $(curTab).attr('id');
			
				change_map(regions,regionFlag,mapColor);
				change_map(regions,curTabId,mapColorOn);
				regionFlag = curTabId;
			}
		});
*/
		var regions = new Object;
		var mapColor = '#646263';
		var mapColorOn = '#222222';
		var mapColorHover = '#393536';
		var regionFlag = $('.salesmap .liqGroup:first').attr('id');
	
		$('.liqGroup').each(function(){
			var setKey = $(this).attr('id');
			regions[setKey] = [];
			
			$(this).find('.states ul li').each(function(){					
				regions[setKey].push($(this).attr('id'));
			});
			
		});

		$('#map-usa').vectorMap({
			map: 'usa_en',
			color: mapColor,
			hoverColor: mapColorHover,
			backgroundColor: '#ebebed',
			onLabelShow: function(event, code){
				return false
			},
			onRegionClick: function(event, code){
				var activeDiv = $('#' + code).closest('.liqGroup');
				var activeId = $('#' + code).closest('.liqGroup').attr('id');
				$('a[href$="' + activeId + '"]').trigger('click');
			},
			onRegionOver: function(event, code){
				event.preventDefault();
				var activeId = $('#' + code).closest('.liqGroup').attr('id');
				if(activeId  != regionFlag) {
					change_map(regions,activeId,mapColorHover);
				}
			},
			onRegionOut: function(event, code){
				event.preventDefault();
				var activeId = $('#' + code).closest('.liqGroup').attr('id');
				if(activeId  != regionFlag) {
					change_map(regions,activeId,mapColor);
				}
			}
		});

		$('.main .sliderGroup li a').bind('click', function() {
				var thisIndex = $(this).parent().index() + 1;
				var curTab = $('.sliderGroup li:nth-child(' + thisIndex + ') a').attr('href');
				var curTabId = $(curTab).attr('id');

				change_map(regions,regionFlag,mapColor);
				change_map(regions,curTabId,mapColorOn);
				regionFlag = curTabId;
		});

		startSettings = [];
		for (x in regions[regionFlag]) {
			startSettings[regions[regionFlag][x]] = mapColorOn;
		}	
		$('#map-usa').vectorMap('set', 'colors', startSettings);
	}


//---------- Dropdown Menus ----------//
	
	$('.nav.primary li').hover(function() {
		$(this).addClass('hovered');
	}, function() {
		$(this).removeClass('hovered');
	});

//---------- Sidebar Hover Rows ----------//
	
	$('.sidebar table tbody tr').hover(function() {
		$(this).addClass('hovered');
	}, function() {
		$(this).removeClass('hovered');
	});

//---------- Zebrastriping ----------//
	
	$('.main table.stripe tbody').each(function() {
		$(this).children('tr:even').addClass('alt');
	});
	
	$('div.mockTable ul').each(function() {
		$(this).children('li:even').addClass('alt');
	});
	

//------------ nav cleanup --------//

	$('ul.nav').find('li:visible:last').css('background-image','none');
	$('ul.tools').find('li:last-child a').css('border-right','none');

//------------ Mock Dropdown --------//

	if($('.optionsWrap').size()) {
		var fundOptions = $('.optionsWrap').contents();
		$(".mockWrap").append(fundOptions);	

		$('.mockWrap').hover(function(){
			$(this).addClass('hovered');
		}, function() {
			$(this).removeClass('hovered');
		});
	}

//------------ Notify --------//

	if($('.notify').size()) {
		$('.notify').delay(5000).slideUp();
	}

//------------ sidebar performance switcher --------//

	$('.perf_class_switcher a').click(function(){

		fundClass = $(this).attr('data-class');

		$(this).addClass('current').siblings().removeClass('current');
		$(this).closest(':has(div.tab)').find('div.tab').removeClass('current');
		$('div.tab[data-class="'+fundClass+'"]').addClass('current');
		return false;
	});

	$('.tabs').each(function(){
		$(this).find('a.tab_trigger:first').addClass('current');
	});
	
	
	$('.performance_tab_wrapper a.tab_trigger').live('click',function(){

		$(this).addClass('current').siblings().removeClass('current');
		tabclass = $(this).attr('data-tab');

		$(this).closest('.performance_tab_wrapper').find('.performance_tab').removeClass('current');
		$(this).closest('.performance_tab_wrapper').find('.performance_tab[data-tab="'+tabclass+'"]').addClass('current');
		return false;
	})

	
//----------- bio modal -------------//

	$('.bio_modal').click(function(){
//		$.post($(this).attr('href'), function(data){
//			data = $(data);
//			$.modal(data.find('.main').html())
//		})
//		return false;
	})



	
//----------- glossary -------------//

$('.glossary_key a').click(function(){
	if($(this).hasClass('on')){
	
		$(this).removeClass('on');
		$('.glossary_entry').show();
	
	} else {
		$('.glossary_key a.on').removeClass('on');
		$(this).addClass('on');
		letter = $(this).attr('data-letter');
		
		$('.glossary_entry').hide();
		$('.glossary_entry[data-first-letter="'+letter+'"]').show();

	}
	
	return false;
	
})


/*------ order literature ----------*/
	
$('table.literature input[type="text"]').focus(function(){
		if($(this).val() == "0") $(this).val('');
	}).blur(function(){
		if($(this).val() == "")	$(this).val('0');
	})
	
	


/*------ timeline ----------*/

		$('table.newTimeline tr').hover(function(){
			$(this).addClass('hovered');
		}, function() {
			$(this).removeClass('hovered');
		});


/*------ letter ----------*/
	if($('div.columnize').size() > 0) {
		$('div.columnize').columnize({
		  width: 370
		});
	}



});

// -------- helper functions --------- //

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