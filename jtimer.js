//Version 1.0
//Based on Ruby on Rails' solution
//Author: Victor Ferreira at Porta8080

function Time(i){
  if(i) this.t = new Date(i);
  else this.t = new Date();
  this.jump = 0;
  this.timer = null;
}

Time.prototype.toMilliseconds = function(a){
  if(!a) a = 1;
  return a;
}

Time.prototype.toSeconds = function(a){
  if(!a) a = 1;
  return this.toMilliseconds() * a * 1000;
}

Time.prototype.toMinutes = function(a){
  if(!a) a = 1;
  return this.toSeconds() * a * 60;
}

Time.prototype.toHours = function(a){
  if(!a) a = 1;
  return this.toMinutes() * a * 60;
}

Time.prototype.toDays = function(a){
  if(!a) a = 1;
  return this.toHours() * a * 24;
}

Time.prototype.toWeeks = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 7;
}

Time.prototype.toMonths = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 30;
}

Time.prototype.toYears = function(a){
  if(!a) a = 1;
  return this.toDays() * a * 365;
}

Time.prototype.millisecond = Time.prototype.milliseconds = function(a){
  this.jump = this.toMilliseconds(a);
  return this;
}

Time.prototype.second = Time.prototype.seconds = function(a){
  this.jump = this.toSeconds(a);
  return this;
}

Time.prototype.minute = Time.prototype.minutes = function(a){
  this.jump = this.toMinutes(a);
  return this;
}

Time.prototype.hour = Time.prototype.hours = function(a){
  this.jump = this.toHours(a);
  return this;
}

Time.prototype.day = Time.prototype.days = function(a){
  this.jump = this.toDays(a);
  return this;
}

Time.prototype.week = Time.prototype.weeks = function(a){
  this.jump = this.toWeeks(a);
  return this;
}

Time.prototype.month = Time.prototype.months = function(a){
  this.jump = this.toMonths(a);
  return this;
}

Time.prototype.year = Time.prototype.years = function(a){
  this.jump = this.toYears(a);
  return this;
}

Time.prototype.add = function(i){
  var p = i.split(' ');
  this[p[1]](p[0]).after();
  return this;
}

Time.prototype.subtract = function(i){
  var p = i.split(' ');
  this[p[1]](p[0]).before();
  return this;
}

Time.prototype.before = function(){
  this.t = new Date(this.t.getTime() - this.jump);
  return this;
}

Time.prototype.after = function(){
  this.t = new Date(this.t.getTime() + this.jump);
  return this;
}

Time.prototype.today = function(){
    var t = new Date();
    this.t = new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);
    return this;
}

Time.prototype.yesterday = function(){
    this.t = new Date(new Date().getTime() - this.toDays(1));
    return this;
}

Time.prototype.tomorrow = function(){
    this.t = new Date(new Date().getTime() + this.toDays(1));
    return this;
}

Time.prototype.now = function(){
    this.t = new Date();
    return this;
}

Time.prototype.ago = function(){
    this.t = new Date(new Date().getTime() - this.jump);
    return this;
}

Time.prototype.fromNow = function(){
    this.t = new Date(new Date().getTime() + this.jump);
    return this;
}

Time.prototype.lastDayOfMonth = function(){
    this.t = new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0);
    return this;
}

Time.prototype.daysInMonth = function(){
    return new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0).getDate();
}

Time.prototype.get = function(){
    return this.t.getTime();
}

Time.prototype.format = function(m){
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

Time.prototype.interval = function(time,callback,params){
    var interval = function(time,callback,params){
        this.timer = setTimeout(function(){
            var r = callback(params);
            if(r) params = r;
            interval(time,callback,params);
        },time);
    }

    interval(time,callback,params);
}

Time.prototype.stop = function(time,callback,params){
    clearTimeout(this.timer);
}
