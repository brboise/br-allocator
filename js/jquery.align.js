var before_width; var after_width; var char_width;

$('table').ready(function(){


	$(this).find('col').each(function(){
	
		if(!$(this).attr('data-align')=='char')
			return false;
		
		align_by = $(this).attr('data-char');

		before_width = 0;
		after_width = 0;
		char_width = 0;
	
		eq = $(this).index();	

		table = $(this).closest('table');
		table.find('tr').each(function(){
			$(this).find('td').eq(eq).each(function(){

				$(this).css('width',$(this).width()+'px');

				html = $(this).html();
				html = html.split(align_by);
				if(html.length>1){
					
//					$(this).html('<div style="position:relative; white-space:nowrap;zoom:1"><span class="before_char">'+html[0]+'</span><span class="char">.</span><span class="after_char">'+html[1]+'</span></div>');

					$(this).html('<div><span class="before_char">'+html[0]+'</span><span class="char">.</span><span class="after_char">'+html[1]+'</span></div>');
					$(this).find('div').css('position','relative');
					$(this).find('div').css('white-space','nowrap');


					char = $(this).find('.char');
					left = char.position().left;
					width = char.width();
					right = $(this).width() - left - width;
		
					before_width = Math.max(left, before_width);
					after_width = Math.max(right,after_width);
					char_width = Math.max(char_width, width);
				}

			})
		})
		
		if(!before_width || !after_width){
			return;
		}
		
		table.find('tr').each(function(){
			
			$(this).find('td').eq(eq).each(function(){
				align = $(this).css('text-align');

				if(align=='left'){
				
					$(this).find('.before_char').css('width',before_width+'px').css('display','inline-block').css('text-align','right');
				
				}else if(align=='right') {
					
					$(this).find('.after_char').css('width',after_width+'px').css('display','inline-block').css('text-align','left');
				
				} else {
				
					
					if(before_width > after_width){
						$(this).find('.before_char').css('width',before_width+'px').css('display','inline-block').css('text-align','right');
						$(this).css('text-align','left');
					} else {
	
						$(this).find('.after_char').css('width',after_width+'px').css('display','inline-block').css('text-align','left');										
						$(this).css('text-align','right');
					}
				}

			})
		})
	
	})

})