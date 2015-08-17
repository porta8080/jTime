//Version 1.1
//Based on the Ruby on Rails' solution
//Author: Victor Ferreira at Porta8080

function TimeTravel(i){
  if(i) this.t = new Date(i);
  else this.t = new Date();
  this.jump = 0;
  this.timer = null;
}

function tt(i){
	return new TimeTravel(i);
}

TimeTravel.prototype.toMilliseconds = function(a){
  if(!a) a = 1;
  return a;
}

TimeTravel.prototype.toSeconds = function(a){
  if(!a) a = 1;
  return this.toMilliseconds() * a * 1000;
}

TimeTravel.prototype.toMinutes = function(a){
  if(!a) a = 1;
  return this.toSeconds() * a * 60;
}

TimeTravel.prototype.toHours = function(a){
  if(!a) a = 1;
  return this.toMinutes() * a * 60;
}

TimeTravel.prototype.toDays = function(a){
  if(!a) a = 1;
  return this.toHours() * a * 24;
}

TimeTravel.prototype.toWeeks = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 7;
}

TimeTravel.prototype.toMonths = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 30;
}

TimeTravel.prototype.toYears = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 365;
}

TimeTravel.prototype.millisecond = TimeTravel.prototype.milliseconds = function(a){
  this.jump = this.toMilliseconds(a);
  return this;
}

TimeTravel.prototype.second = TimeTravel.prototype.seconds = function(a){
  this.jump = this.toSeconds(a);
  return this;
}

TimeTravel.prototype.minute = TimeTravel.prototype.minutes = function(a){
  this.jump = this.toMinutes(a);
  return this;
}

TimeTravel.prototype.hour = TimeTravel.prototype.hours = function(a){
  this.jump = this.toHours(a);
  return this;
}

TimeTravel.prototype.day = TimeTravel.prototype.days = function(a){
  this.jump = this.toDays(a);
  return this;
}

TimeTravel.prototype.week = TimeTravel.prototype.weeks = function(a){
  this.jump = this.toWeeks(a);
  return this;
}

TimeTravel.prototype.month = TimeTravel.prototype.months = function(a){
  this.jump = this.toMonths(a);
  return this;
}

TimeTravel.prototype.year = TimeTravel.prototype.years = function(a){
  this.jump = this.toYears(a);
  return this;
}

TimeTravel.prototype.add = function(i){
  var p = i.split(' ');
  this[p[1]](p[0]).after();
  return this;
}

TimeTravel.prototype.subtract = function(i){
  var p = i.split(' ');
  this[p[1]](p[0]).before();
  return this;
}

TimeTravel.prototype.before = function(){
  this.t = new Date(this.t.getTime() - this.jump);
  return this;
}

TimeTravel.prototype.after = function(){
  this.t = new Date(this.t.getTime() + this.jump);
  return this;
}

TimeTravel.prototype.today = function(){
    var t = new Date();
    this.t = new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);
    return this;
}

TimeTravel.prototype.yesterday = function(){
    this.t = new Date(new Date().getTime() - this.toDays(1));
    return this;
}

TimeTravel.prototype.tomorrow = function(){
    this.t = new Date(new Date().getTime() + this.toDays(1));
    return this;
}

TimeTravel.prototype.now = function(){
    this.t = new Date();
    return this;
}

TimeTravel.prototype.ago = function(){
    this.t = new Date(new Date().getTime() - this.jump);
    return this;
}

TimeTravel.prototype.fromNow = function(){
    this.t = new Date(new Date().getTime() + this.jump);
    return this;
}

TimeTravel.prototype.lastDayOfMonth = function(){
    this.t = new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0);
    return this;
}

TimeTravel.prototype.daysInMonth = function(){
    return new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0).getDate();
}

TimeTravel.prototype.isLeapYear = function(){
	var year = this.t.getFullYear();
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

TimeTravel.prototype.get = function(){
    return this.t.getTime();
}

TimeTravel.prototype.format = function(m){
    var s='';
    var c, t;

    var fill = function(i){
        i = i.toString();
        return (i.length == 1) ? '0'+i : i;
    }

    for(i=0,l=m.length;i<l;i++){
        c = m.charAt(i);
        switch(c){
            case 'y':
                s += this.t.getFullYear().toString().slice(2);
            break;

            case 'Y':
                s += this.t.getFullYear().toString();
            break;

            case 'm':
                s += fill(this.t.getMonth() + 1);
            break;

            case 'd':
                s += fill(this.t.getDate());
            break;

            case 'h':
                s += fill(this.t.getHours());
            break;

            case 'i':
                s += fill(this.t.getMinutes());
            break;

            case 's':
                s += fill(this.t.getSeconds());
            break;

            case 'w':
                s += (this.t.getDay() + 1).toString();
            break;

            default:
                s += c;
        }
    }

    return s;
}

TimeTravel.prototype.interval = function(time,callback,params){
	var _tt = this;
    var interval = function(time,callback,params){
		if(!_tt.stopInterval){
			_tt.timer = setTimeout(function(){			
				var r = callback(params);
				if(r) params = r;
				interval(time,callback,params);
			},time);
		}        
    }
	
	this.stopInterval = false;
    interval(time,callback,params);
}

TimeTravel.prototype.stop = function(){
	this.stopInterval = true;
}
