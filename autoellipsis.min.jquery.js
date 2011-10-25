/*
	Name: Auto Ellipsis Text with jQuery
	Date: October 2011
	Description: Auto Ellipsis Text with jQuery, based on Brandon Cannaday's Auto Ellipse script at: http://www.switchonthecode.com/tutorials/javascript-tutorial-how-to-auto-ellipse-text
	Version: 1.1
	Author: Ross Morsali
	Author URI: http://www.weareelevate.com
	Project URI: https://github.com/rmorse/AutoEllipsis
*/
jQuery.fn.autoEllipsisText=function(a){var b={width:0,height:0,offset:0,persist:0,addTitle:true,multiline:false,accuracyStep:1};var c="";var d=jQuery.extend(b,a);this.each(function(){var a=$(this);var b=d.height;var e=d.width;if(d.width==0){e=a.width()+d.offset}if(d.height==0){b=a.height()}c=a.html();if(d.multiline==true){a.html("<span>"+c+"</span>")}else{if(d.addTitle){a.html('<span title="'+c+'" style="white-space:nowrap;">'+c+"</span>")}else{a.html('<span style="white-space:nowrap;">'+c+"</span>")}}inSpan=a.find("span");if(d.multiline){var f=inSpan.height();if(f>b){var g=c.length;inSpan.html("");while(f>b&&g>0){inSpan.html(c.substr(0,g)+"...");f=inSpan.height();g=g-d.accuracyStep}returnText=inSpan.html()}}else{var h=inSpan.width();if(h>e){var g=1;inSpan.html("");h=0;while(inSpan.width()<e&&g<c.length){inSpan.html(c.substr(0,g)+"...");h=inSpan.width();g++}returnText=inSpan.html()}}});return this}