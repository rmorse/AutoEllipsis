/*
	Name: Auto Ellipsis Text with jQuery
	Date: October 2011
	Description: Auto Ellipsis Text with jQuery, based on Brandon Cannaday's Auto Ellipse script at: http://www.switchonthecode.com/tutorials/javascript-tutorial-how-to-auto-ellipse-text
	Version: 1.1
	Author: Ross Morsali
	Author URI: http://www.weareelevate.com
	Project URI: https://github.com/rmorse/AutoEllipsis
*/
jQuery.fn.autoEllipsisText = function(options)
{
	//current options supported are "width" and "offset"
	//WIDTH is currently used to manually define a width for the content area and to begin clipping the text - if none is provided the width of the DOM element will be used by default
	//OFFSET would normally be used when WIDTH above is not used, this can be used to increase or decrease the clipping area from the parents element. A negative value will have a padding effect clipping text before the edges of the DOM element
	
	//initalise defaults
	var defaults = {
		width: 0, //manually set the width the text needs to fit in - overrides the width of the containing element
		height: 0, //the manually set a height the text needs to fit in - only works if multiline is "true" - overrides the height of the containing element.
		offset: 0, //to manually add/remove a certain amount of width in px
		persist: 0, //add event listener to the div to check on resize, if resize occures the script will recalculate (not advised)
		addTitle: true, //this allows the full text to be added to the title attribute of the span tag so users will see full text on mouse over - applies to single line only
		multiline: false, // default for single line processing - could be a processor killer if used on a lot of body text throughout a page
		accuracyStep: 1 //increasing the variable will increase performance however it may be less accurate - only applies to multiline	
	};
	
	var text = '';
	
	//initialise options
	var opts = jQuery.extend(defaults, options);
	
	//loop through each item matched
	this.each(function()
	{
		var item = $(this);
		var itemHeight = opts.height;
		var itemWidth = opts.width;
		
		if((opts.width==0))
		{//if no width has been manually set grab the width, if offset has been set it will be automatically added
			itemWidth = item.width()+opts.offset;
			
		}
		if(opts.height==0)
		{//if height has not been set then grab the current height of the div
			itemHeight = item.height();
		}
		
		//collect text currently residing in matched elements
		text = item.html();
		
		if(opts.multiline==true)
		{//if it is a multiline then add span tags
			item.html('<span>' + text + '</span>');
		}
		else
		{//if it is a single line for content to be on one line using white-space:nowrap
			if(opts.addTitle)
			{
				item.html('<span title="' + text + '" style="white-space:nowrap;">' + text + '</span>');
			}
			else
			{
				item.html('<span style="white-space:nowrap;">' + text + '</span>');
			}
		}
		inSpan = item.find('span');
		
		if(opts.multiline)
		{
			var spanHeight = inSpan.height();
			if(spanHeight > itemHeight)
			{
				
				var i = text.length;
				inSpan.html("");

				while ((spanHeight > (itemHeight))&&(i>0))
				{
					inSpan.html(text.substr(0,i) + '...');
					spanHeight = inSpan.height();
					i = i-opts.accuracyStep;
				}
				returnText = inSpan.html();
			}
		}
		else
		{
			var spanWidth = inSpan.width();
			if(spanWidth > itemWidth)
			{
				var i = 1;
				inSpan.html("");
				spanWidth = 0;
				while(inSpan.width() < (itemWidth) && i < text.length)
				{
					inSpan.html(text.substr(0,i) + '...');
					spanWidth = inSpan.width();
					i++;
				}
				returnText = inSpan.html();
			}
		}
	});
	return this;
};