'use strict';

var alphabet = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','x','z'];
(function($){
	var methods = {
		init: function(sheet){
			this.rows =  sheet.rows;
			this.headers = sheet.header;
			this.values = sheet.value;
			this.columns = sheet.header.length;	
			this.groups = sheet.group;

			//create Sheet 
			for (var i=0; i < this.rows; i++){
				$('table tbody').append('<tr><th>'+(i+1)+'</th></tr>');	
			}
			
			//create header
			$.each(this.headers, function(key,value){
				var colspan = 1;
				var rowspan = 1;
				if (value[1]){
					colspan = value[1].length;
				}else{
					rowspan = 2;	
					$('table tbody tr').append('<td></td>');									 
				}
				$('table thead tr#category').append('<th colspan="'+ colspan +'" rowspan="'+ rowspan +'">'+value[0]+'</th>');
				if (value[1]){
					$.each(value[1], function(key,value){
						$('table thead tr#subCategory').append('<th>'+value+'</th>');						  
						$('table tbody tr').append('<td></td>');									 
					});
				}
			});
			//fill Groups

			$.each(this.headers, function(key,value){
								  
			});
			//Fill values
			$.each(this.values,function(key,value){
				console.log(value);
				$('table tbody tr').eq(value[0]).children().eq(value[1]).html(value[2]);
			});

			var currentCell;
			
			//Editing cell
			$('tbody td').on('click',function(){
				currentCell = $(this);
				var position = $(this).offset(); 
				var height = $(this).innerHeight();
				var width = $(this).innerWidth();
				$('#overlay-cell').css({'top': position.top, 'left': position.left, 'width':width, 'height':height}).show();
			});
			$('#overlay-cell').on('click',function(){
				var value = $(currentCell).html();
				$(this).html('');
				$('<input id="cell" type="text" value="'+value+'"/>').appendTo($(this));
				$('#cell').focus();
			});
			
			$('#cell').on('focusout',function(){
				console.log('teste');
				var value = $(this).val();
				var column = $(currentCell).index() ;
				var row = $(currentCell).parent().index() +1;
				$(currentCell).html(value);
				$(this).remove();
			});	
			

			$('#addRow').click(function(){
				$.InputSheet('addLine');
			});
			$('tbody').scroll(function(){
				var position = $('tbody tr th:first-child').offset();
			
				$('thead').animate({
					heigth:'100%',
					left: position.left
					
				}, 0, function() {
				// Animation complete.
				});
			});
		},
		addLine: function(){
			var str = '';
			var col = $('tbody tr:last-child td').length;
			var num = parseInt($('tbody tr:last-child th').html()) + 1 ;
			for (var i=0; i<col;i++){
				str += '<td></td>';			
			}
			$('<tr><th>'+ num +'</th>'+ str +'</tr>').appendTo('tbody');
		}
	}

	$.InputSheet = function(methodOrOptions){
		if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }    
	};	

})(jQuery);

