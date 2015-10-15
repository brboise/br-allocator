	if(document.URL.match(/funds\/?$/))
		window.location = '/funds/daily/alpha';


function show_working(){
	hide_working();
	$('body').prepend('<div id="working"></div>')
}

function hide_working(){
	$('#working').remove();
}


jQuery(document).ready(function(){
	$('.contact_summary').prependTo('.header .nav_1_contact > ul').show();;

		$('.showHide_toggle').live('click', function(){
			$(this).toggleClass('expanded');
			newText = $(this).attr('data-toggle-text');
			oldText = $(this).html();
			$(this).attr('data-toggle-text',oldText);
			$(this).html(newText);

			var target = $('.showHide[data-toggler="'+$(this).attr('data-toggler')+'"]');
			target.slideToggle();
			return false;
		})

	$('.ajax_managers').live('click',function(){
		show_working();
		var name = $(this).attr('title');
		$.post(
			$(this).attr('href'),
			{},
			function(data){
				hide_working();
				data = $(data);
				modal = data.find('.personnel_modal_content[data-company-name]');
				modal.each(function(){
					console.log($(this).attr('data-company-name').toLowerCase().replace(/\s/g,''));
					if($(this).attr('data-company-name').toLowerCase().replace(/\s/g,'') == name.toLowerCase().replace(/\s/g,'')){
						$(this).modal({minWidth:700, minHeight:300})					
					}
				})
				

			}
		)
		return false;
	})
	
	
	$('.nav_1_funds > a').removeAttr('href');

})

