/*Copyright (c) 2012 Darius Kazemi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

//original code by github.com/dariusk, (HEAVY) modifications made by github.com/ShameOnATrip


var restclient = require('node-restclient');
var Twit = require('twit');

var config = require('./config/config');

// insert your twitter app info here
var T = new Twit(config.twit);

//Name Segments by Gender and Race

//Dwarves
var dorfMaleFirst = ["Ar", "Dar", "Ur", "Sur", "Lad", "Saf", "Raf", "Der", "Bo", "Gam", "Bom", "Da", "Dar", "Dan", "Khi", "Khim", "Lo", "Bel", "Rei", "Thr", "Thra", "Yur", "Yuru", "Thent", "Thend", "Urud", "Urut", "Ulluth"];
var dorfMaleLast = ["ist", "ust", "all", "rall", "sohn", "tist", "tol", "dol", "far", "var", "mar", "fur", "ril", "ghal", "in", "fin", "fir", "bur", "bir", "gar"];

var dorfFemFirst = ["D", "Sir", "Sar", "Laur", "Dahl", "Mish", "Sish", "Sash", "Tam", "Cam", "Da", "Lo", "Dar", "Dash", "Hish"];
var dorfFemLast = ["a", "ah", "ka", "da", "ta", "is", "isha", "ishta", "ora", "era", "hilda", "theow", "gal"];

var dorfFamFirst = ["Iron", "Gold", "Red", "Dark", "Stone", "Anvil", "Hammer", "Wolf", "Barrel", "Axe", "Ash", "Amber", "Righteous", "Twilight", "White", "Wind", "Holy", "Glander", "Earth", "Emerald", "Lantern", "Cask", "Cavern"];
var dorfFamLast = ["son", "hammer", "forge", "reach", "crown", "kil", "rett", "mort", "sort", "flask", "ale", "arm", "belt", "bringer", "sword", "kindler", "bane", "hood", "mace", "mover", "smith", "speaker"];

//Goblins
var gobMaleFirst = ["Rak", "Tik", "Rug", "Zugg", "Rooz", "Muk", "Kri", "Tek", "Sik", "Burk", "Sur", "Kol", "Buk"];
var gobMaleLast = ["sik", "ilk", "erk", "urk", "ork", "un", "uk", "sher", "kol", "krik", "dort", "sort", "vurk", "valk", "-uk", "'ivvik", "-irk"];

var gobFemFirst = ["Rak", "Tik", "Rug", "Zugg", "Rooz", "Muk", "Kri", "Tek", "Sik", "Burk", "Sur", "Kol", "Buk"];
var gobFemLast = ["erra", "erro", "arra", "arka", "orka", "uka", "ukina", "orkina", "ilkina", "ilka", "vurka", "valka", "sikka", "kulka", "kulkania", "ilkania"];

//Title segments

//Dwarven titles
var dorfOccupation = ["Destroyer", "Creator", "Ruler", "Servant", "Honer", "Artisan", "Master", "Apprentice", "Failure", "Ender", "Beginner", "Thief", "Defender", "Knight", "Enemy", "Warden", "Protector", "Lord", "Cleric", "Missionary", "Bard", "Brewer"];
var dorfSubject = ["Middle Earth", "the Under-realms", "All That Is Good", "the Sky", "their Kingdom", "War", "Fortune", "Conquest", "Destiny", "the Universe", "Nothing", "All", "Nature", "Order", "Law", "Chaos", "Good", "Evil", "Light", "Darkness", "the Ground", "Terra", "the Forests", "the Oceans", "the Seas", "the Mountains", "Treasure", "Souls", "Warriors", "their Tribe", "End-Times"];

//Goblin titles (professions)
var gobTitle = ["Thief", "Assassin", "Trapmaker", "Mercenary", "Traitor", "Axegoblin", "Archer", "Half-breed", "Barbarian", "Bard", "Villain", "Hero", "Ally of Man", "Occultist", "Pikegoblin", "Hunter"];

var statement =   "";

function makeName() {
	statement = "";
	gender = Math.floor((Math.random() * 2)+1);
  race = Math.floor((Math.random() * 2)+1);
  if (race == 1) {
	if (gender > 1) {
		statement += "Dwarven Male: " + dorfMaleFirst[Math.floor((Math.random() * dorfMaleFirst.length))] + dorfMaleLast[Math.floor((Math.random() * dorfMaleLast.length))];
	} else {
		statement += "Dwarven Female: " + dorfFemFirst[Math.floor((Math.random() * dorfFemFirst.length))] + dorfFemLast[Math.floor((Math.random() * dorfFemLast.length))];
	}
	statement += " " + dorfFamFirst[Math.floor((Math.random() * dorfFamFirst.length))] + dorfFamLast[Math.floor((Math.random() * dorfFamLast.length))] + ", " + dorfOccupation[Math.floor((Math.random() * dorfOccupation.length))] + " of " + dorfSubject[Math.floor((Math.random() * dorfSubject.length))];
  } else {
    if (gender >1){
      statement += "Goblin Male: " + gobMaleFirst[Math.floor((Math.random() * gobMaleFirst.length))] + gobMaleLast[Math.floor((Math.random() * gobMaleLast.length))];
    } else {
      statement += "Goblin Female: " + gobFemFirst[Math.floor((Math.random() * gobFemFirst.length))] + gobFemLast[Math.floor((Math.random() * gobFemLast.length))];
    }
    statement += ", " + gobTitle[Math.floor((Math.random() * gobTitle.length))];
  }

	console.log(statement);
	T.post('statuses/update', {status: statement}, function(err, reply) {
		console.log("error: " + err);
		console.log("reply: " + reply);
	});
}

function favRTs () {
  T.get('statuses/retweets_of_me', {}, function (e,r) {
    for(var i=0;i<r.length;i++) {
      T.post('favorites/create/'+r[i].id_str,{},function(){});
    }
    console.log('harvested some RTs'); 
  });
}

setInterval(function() {
  try {
    makeName();
  }
 catch (e) {
    console.log(e);
  }
},240000);

// every 5 hours, check for people who have RTed a metaphor, and favorite that metaphor
setInterval(function() {
  try {
    favRTs();
  }
 catch (e) {
    console.log(e);
  }
},60000*5);
