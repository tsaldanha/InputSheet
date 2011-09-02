// JavaScript Document
var alphabet = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','x','z'];
function InputSheet (rows,sheet){
	this.rows =  rows;
	this.headers = sheet.header;
	this.values = sheet.value;
	this.columns = sheet.header.length;	
	this.groups = sheet.group;

}

InputSheet.prototype.writeSheet = function(){
		for (i=0; i < this.rows; i++){
			$('table tbody').append('<tr><th>'+(i+1)+'</th></tr>');	
		}
		
	}
InputSheet.prototype.fillHeader = function(){
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
	}
InputSheet.prototype.fillGroups = function(){
		$.each(this.headers, function(key,value){
									  
		});
	}
InputSheet.prototype.fillSheet = function(){
		$.each(this.values,function(key,value){
			$('table tbody tr').eq(value[0]).children().eq(value[1]).html(value[2]);
		});
	}
InputSheet.prototype.addGroup = function(){
		
	}
InputSheet.prototype.addLine = function(){
		var str = '';
		var col = $('tbody tr:last-child td').length;
		var num = parseInt($('tbody tr:last-child th').html()) + 1 ;
		for (var i=0; i<col;i++){
			str += '<td></td>';			
		}
		$('<tr><th>'+ num +'</th>'+ str +'</tr>').appendTo('tbody');
	}