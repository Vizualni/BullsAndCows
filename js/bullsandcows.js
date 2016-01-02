function hasUniqueDigitsAndHasNoZero(number){
	var digits = {};
	if (number.length != 4) {
		return false;
	}
	for(var i in number){
		if (number[i]=="0" || digits[number[i]]!==undefined){
			return false;
		}
		digits[number[i]] = 1;
	}
	return true;
}

var BullsAndCows = function () {
	this.init();
};

BullsAndCows.prototype.init = function(){
	while (true) {
		var number = (1000 + parseInt(Math.random()*9999))+"";
		if (hasUniqueDigitsAndHasNoZero(number)){
			this.number = number;
			break;
		}
	}
	this.gameRunning = true;
};

BullsAndCows.prototype._win = function() {
	this.gameRunning = false;
	return this.onWin();
};

BullsAndCows.prototype.enterNumber = function(number) {
	if (this.gameRunning == false) {
		return false;
	}

	if (hasUniqueDigitsAndHasNoZero(number)==false) {
		return false;
	}

	if (number == this.number) {
		this.gameRunning = false;
		this.onWin();
		return true;
	}

	var status = {
		b: 0,
		c: 0,
	};

	// checking number at *i-th* position is bull or cow
	for (var i in number) {
		if (number[i]==this.number[i]) {
			// bull
			status.b++;
		}else if (this.number.indexOf(number[i])>=0) {
			// cow
			status.c++;
		}
	}

	return status;
};