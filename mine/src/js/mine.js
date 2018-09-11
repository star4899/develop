var Game = function(){
	this.board = document.querySelector("#game");
	this.row = 10;
	this.col = 10;
	this.mine = 10;
	this.mineArray = [];
	this.mouseState = 0;
};
Game.prototype.complete = function(){
	this.board.className = "complete";
	var span = this.board.querySelectorAll("span");
	for(var i = 0; i < span.length; i++){
		span[i].removeEventListener("mousedown", this.mouseDownHandler);
		span[i].removeEventListener("mouseup", this.mouseUpHandler);
	};
};
Game.prototype.result = function(e, r, c){
	if(e.button === 0 && e.buttons !== 3 && game.mineArray[r][c] === "*"){
		this.className = "fail";
		game.complete();
	};
	if(e.button === 2 && e.buttons !== 3 && game.mineArray[r][c] === "*"){
		game.mineArray[r][c] = "**";
		var successCnt = 0;
		var mineArrayRowLength = game.mineArray.length;
		for(var r = 0; r < mineArrayRowLength; r++){
			for(var c = 0; c < game.mineArray[r].length; c++){
				if(game.mineArray[r][c] === "**"){
					successCnt++;
				};
			};
		};
		if(successCnt === 10) game.complete();
	};
};
Game.prototype.mouseUpHandler = function(e){
	if(e.button === 0 && e.buttons !== 3){
		this.className = "open";
		game.result.call(this, e, this.getAttribute("data-row"), this.getAttribute("data-col"));
	};
};
Game.prototype.mouseDownHandler = function(e){
	if(e.button === 2 && e.buttons !== 3){
		if(this.className === ""){
			this.className = "choice";
			game.result.call(this, e, this.getAttribute("data-row"), this.getAttribute("data-col"));
		}else if(this.className === "choice"){
			this.className = "tempChoice";
		}else if(this.className === "tempChoice"){
			this.className = "";
		};
	};
};
Game.prototype.mineNumberSet = function(r, c){
	var mineLength = 0;
	if(r - 1 >= 0 && c - 1 >= 0 && this.mineArray[r - 1][c - 1] === "*") mineLength++;
	if(r - 1 >= 0 && this.mineArray[r - 1][c] === "*") mineLength++;
	if(r - 1 >= 0 && c + 1 <= this.col - 1 && this.mineArray[r - 1][c + 1] === "*") mineLength++;
	if(c - 1 >= 0 && this.mineArray[r][c - 1] === "*") mineLength++;
	if(c + 1 <= this.col - 1 && this.mineArray[r][c + 1] === "*") mineLength++;
	if(r + 1 <= this.row - 1 && c >= 0 && this.mineArray[r + 1][c - 1] === "*") mineLength++;
	if(r + 1 <= this.row - 1 && this.mineArray[r + 1][c] === "*") mineLength++;
	if(r + 1 <= this.row - 1 && c + 1 <= this.col - 1 && this.mineArray[r + 1][c + 1] === "*") mineLength++;
	return mineLength;
};
Game.prototype.createMap = function(){
	var mineArrayRowLength = this.mineArray.length;
	for(var r = 0; r < mineArrayRowLength; r++){
		for(var c = 0; c < this.mineArray[r].length; c++){
			var mineArea = document.createElement("span");
			mineArea.setAttribute("data-row", r);
			mineArea.setAttribute("data-col", c);
			var mineLength = this.mineNumberSet(r, c);
			if(!this.mineArray[r][c]) mineArea.setAttribute("data-number", mineLength);
			if(this.mineArray[r][c] === "*") mineArea.setAttribute("data-number", "*");
			mineArea.addEventListener("mousedown", this.mouseDownHandler);
			mineArea.addEventListener("mouseup", this.mouseUpHandler);
			this.board.appendChild(mineArea);
		};
	};
};
Game.prototype.createMine = function(){
	var rowPosition = Math.floor(Math.random() * this.row);
	var colPosition = Math.floor(Math.random() * this.col);
	if(this.mineArray[rowPosition][colPosition] === false) return this.mineArray[rowPosition][colPosition] = "*";
	if(this.mineArray[rowPosition][colPosition] !== false) this.createMine();
};
Game.prototype.mineSet = function(){
	for(var r = 0; r < this.row; r++){
		this.mineArray[r] = [];
		for(var c = 0; c < this.col; c++){
			this.mineArray[r][c] = false;
		};
	};
	for(var i = 0; i < this.mine; i++) this.createMine();
	this.createMap();
};
Game.prototype.init = function(option){
	this.board.addEventListener("contextmenu", function(e){
		e.preventDefault();
	});
	this.row = option.row;
	this.col = option.col;
	this.mine = option.mine;
	this.mineSet();
};
var game = new Game();
game.init({
	row : 10,
	col : 10,
	mine : 10
});
document.querySelector("#view").addEventListener("click", function(){
	game.complete();
});