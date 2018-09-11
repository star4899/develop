(function(){
	var vsObj = {
		1 : {
			vsArr : [],
			vsData : []
		},
		2 : {
			vsArr : [],
			vsData : []
		},
		4 : {
			vsArr : [],
			vsData : []
		},
		8 : {
			vsArr : [],
			vsData : []
		},
		16 : {
			vsArr : [],
			vsData : []
		},
		32 : {
			vsArr : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			vsData : []
		}
	};
	var currentType, currentCnt;
	function Vs(){
		this.$h2 = document.querySelector("h2");
		this.$content = document.querySelector("#content");
		this.$cancel = document.querySelector("#cancel");
		this.$ul = document.createElement("ul");
		this.$li = document.createElement("li");
		this.$a = document.createElement("a");
		this.$a.setAttribute("href", "#");
		this.$li.appendChild(this.$a);
	};
	Vs.prototype.titleString = function(str){
		this.$h2.innerHTML = str;
	};
	Vs.prototype.arraySort = function(arr){
		arr.sort(function(a, b){
			return Math.random() - 0.5;
		});
	};
	Vs.prototype.cancelState = function(){
		if(currentType <= 32 && currentCnt > 0 && this.$cancel.disabled){
			this.$cancel.disabled =  false;
			this.$cancel.setAttribute("aria-disabled", false);
		};
		if(currentType === 32 && currentCnt === 0 || currentType === 1 && !this.$cancel.disabled){
			this.$cancel.disabled = true;
			this.$cancel.setAttribute("aria-disabled", true);
		};
	};
	Vs.prototype.cancelEventHandler = function(){
		currentCnt--;
		if(currentCnt < 0){
			vsObj[currentType].vsArr.pop();
			vsObj[currentType].vsData = [];
			currentType = currentType * 2;
			currentCnt = vsObj[currentType].vsData.length - 1;
		}else{
			vsObj[currentType / 2].vsArr.pop();
		};
		this.removeDom();
	};
	Vs.prototype.aEventHandler = function(e){
		e.preventDefault();
		var nextVs = currentType / 2;
		var index = e.target.getAttribute("data-index");
		vsObj[nextVs].vsArr.push(vsObj[currentType].vsData[currentCnt][index]);
		if(currentType === 2){
			vsObj[nextVs].vsData.push([vsObj[currentType].vsData[currentCnt][index]])
			return this.result();
		};
		currentCnt++;
		if(nextVs >= currentCnt + 1){
			this.removeDom();
		}else{
			this.createVsData(nextVs);
		};
	};
	Vs.prototype.result = function(){
		this.titleString("결과");
		this.$content.className = "complete";
		this.$content.firstChild && this.$content.removeChild(this.$content.firstChild);
		var $resultOl = document.createElement("ol");
		for(var key in vsObj){
			var $olLi = this.$li.cloneNode();
			$olLi.setAttribute("data-vs", key + "강");
			var $resultUl = this.$ul.cloneNode();
			for(var i = 0; i < vsObj[key].vsData.length; i++){
				for(var n = 0; n < vsObj[key].vsData[i].length; n++){
					var $ulLi = this.$li.cloneNode();
					$ulLi.className = "model model-" + vsObj[key].vsData[i][n];
					$ulLi.innerHTML = vsObj[key].vsData[i][n];
					$resultUl.appendChild($ulLi);
				};
			};
			$olLi.appendChild($resultUl);
			$resultOl.appendChild($olLi);
		};
		this.$content.appendChild($resultOl);
		this.cancelState();
	};
	Vs.prototype.createDom = function(){
		console.log(vsObj);
		var currentVsData = vsObj[currentType].vsData[currentCnt];
		var currentVsDataLength = currentVsData.length;
		var $ulClone = this.$ul.cloneNode();
		for(var i = 0; i < currentVsDataLength; i++){
			var $liClone = this.$li.cloneNode(true);
			var $liChlid = $liClone.querySelector("a");
			$liChlid.className = "model model-" + currentVsData[i];
			$liChlid.setAttribute("data-index", i);
			$liChlid.innerHTML = currentVsData[i];
			$liChlid.addEventListener("click", this.aEventHandler.bind(this));
			$liClone.appendChild($liChlid);
			$ulClone.appendChild($liClone);
		};
		this.$content.appendChild($ulClone);
	};
	Vs.prototype.removeDom = function(){
		this.titleString(currentType + "강 " + (currentCnt + 1) + "게임");
		this.$content.firstChild && this.$content.removeChild(this.$content.firstChild);
		this.createDom();
		this.cancelState();
	};
	Vs.prototype.createVsData = function(i){
		currentType = i;
		currentCnt = 0;
		this.arraySort(vsObj[currentType].vsArr);
		for(var n = 0; n < currentType; n++){
			if(n % 2 === 0){
				var tempArray = [];
				if(vsObj[currentType].vsArr[n] != undefined) tempArray.push(vsObj[currentType].vsArr[n]);
				if(vsObj[currentType].vsArr[n + 1] != undefined) tempArray.push(vsObj[currentType].vsArr[n + 1]);
				vsObj[currentType].vsData.push(tempArray);
			};
		};
		this.removeDom();
	};
	Vs.prototype.init = function(){
		this.createVsData(32);
		this.$cancel.addEventListener("click", this.cancelEventHandler.bind(this));
	};
	var vs = new Vs();
	vs.init();
})();