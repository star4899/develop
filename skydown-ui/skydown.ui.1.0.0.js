/*
* skydown UI javascript Library v1.0.0
* https://blog.skydown.co.kr
* Date : 2017-10-13
*/
;(function(w){
	"use strict";
	var skydown = function(selector){
		var $obj = document.querySelectorAll(selector);
		return Array.prototype.push.apply(this,$obj);
	};
	skydown.prototype.css = function(s){
		var objLength = this.length, k, t, l;
		if(arguments.length === 1){
			if(typeof s !== "undefined" && s.constructor == Object){
				for(var i = 0; i < objLength; i++){
					for(var key in s){
						k = key, l = k.indexOf("-");
						if(l > -1){
							t = k.substr(l,2).split("-")[1];
							k = k.replace("-" + t,t.toUpperCase());
						};
						this[i].style[k] = isNaN(s[key]) ? s[key] : s[key] + "px";
					};
				};
			};
		}else if(arguments.length > 1){
			if(typeof arguments[0] === "string" && (typeof arguments[1] === "string" || typeof arguments[1] === "number")){
				for(var i = 0; i < objLength; i++){
					k = arguments[0], l = k.indexOf("-");
					if(l > -1){
						t = k.substr(l,2).split("-")[1];
						k = k.replace("-" + t,t.toUpperCase());
					};
					this[i].style[k] = isNaN(arguments[1]) ? arguments[1] : arguments[1] + "px";
				};
			};
		};
	};
	w.$sky = function(selector){
		return new skydown(selector);
	};
})(window);