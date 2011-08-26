/*
	Name: Auto Ellipsis Text with jQuery
	Date: August 2011
	Description: Auto Ellipsis Text with jQuery, based on Brandon Cannaday's Auto Ellipse script at: http://www.switchonthecode.com/tutorials/javascript-tutorial-how-to-auto-ellipse-text
	Version: 1.0
	Author: Ross Morsali
	Author URI: http://www.weareelevate.com
	Project URI: https://github.com/rmorse/AutoEllipsis
*/
jQuery.fn.autoEllipsisText = function(options)
{
	//current options supported are "width" and "offset"
	//WIDTH is currently used to manually define a width for the content area and to begin clipping the text - if none is provided the width of the DOM element will be used by default
	//OFFSET would normally be used when WIDTH above is not used, this can be used to increase or decrease the clipping area from the parents element. A negative value will have a padding effect clipping text before the edges of the DOM element
	
	if(!options)
	{
		var options = new Array();
	}
	//initalise variables
	var width = 0;
	var text = "";
	var offset = 0;
	
	var twidth = "";
	if(options["width"]){twidth = options["width"];}
	if(twidth!=""){width = options["width"];}
	
	var toffset = "";
	if(options["offset"]){toffset = options["offset"];}
	if(toffset!=""){offset = toffset;}
	
	//loop through each occurence
	this.each(function()
	{
		if(width==0)
		{
			width = $(this).width()+offset;
		}
		
		text = $(this).html();
		$(this).html('<span title="' + text + '" class="ellipsisSpan" style="white-space:nowrap;">' + text + '</span>');
		inSpan = $(this).find('span');
		
		if(inSpan.width() > width)
		{
			var i = 1;
			inSpan.html("");
			while(inSpan.width() < (width) && i < text.length)
			{
				inSpan.html(text.substr(0,i) + '...');
				i++;
			}
			returnText = inSpan.html();
			
			
		}
	});
	return this;
};