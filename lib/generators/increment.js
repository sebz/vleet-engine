function IncrementGenerator(options) {
	this.initialValue = options.start;
	this.lastValue = null;
	this.step = options.step;
	this.system = "";
}

IncrementGenerator.prototype.generate = function(system) {
	if (this.system != system.name) {
		this.system = system.name;
		this.lastValue = this.initialValue;
	} else {
		this.lastValue = this.lastValue + this.step;
	}
	return this.lastValue;
};

module.exports = IncrementGenerator;