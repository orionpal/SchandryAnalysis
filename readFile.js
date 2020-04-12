//This file handles the reading of the text file,
//creates an object "entries" that is an array of objects with the tags:
/*
AU - Authors
SO - ?
TI - Title
AB - Abstract
SN - Serial number?
PD - publish date
PY - publish year
VL - ?
IS - ?
BP - ?
*/
var entries = [];
document.getElementById('file').onchange = function(){
  entries = [];
  //get the file that was selected
  var file = this.files[0];
  //create a new file reader
  var reader = new FileReader();
  //define function to do
  reader.onload = function(progressEvent){
    // split the file by lines
    var lines = this.result.split('\n');
    // go through lines and count words (saved in words)
    for(var line = 0; line < lines.length; line++){
    	var entry = lines[line]; //get specified entry on line "line"
	  	var start = 0;
		var end = 0;
		//gets part using the tag that appears after what you want to get, I know it's confusing but pls
		function getPart(tag){
			var part = ''
			while (end < entry.length){
					//find next tag as end point
					if (entry.substring(end,end+2)==tag){
						part = entry.substring(start,end);
						start = end+3;
						end = start;
						break;
					}
					end += 1;
				}
			return part;
		}
		while (start<entry.length){
			//find AU as first tag
			if (entry.substring(start,start+2)=="AU"){
				start = start+3;
				end = start;
				var tAU = getPart("TI");//get AU
				var tTI = getPart("SO");//get SO
				var tSO = getPart("AB");//find TI
				var tAB = getPart("SN");//find AB
				var tSN = getPart("PD");//find SN
				var tPD = getPart("PY");//find PD
				var tPY = getPart("VL");//find PY
				var tVL = getPart("IS");//find VL
				var tIS = getPart("BP");//find IS
				var tBP = getPart("EP");//find BP
				var tEP = entry.substring(start);//get EP
				break;
			}
			start += 1;
		}
		entries.push({
			AU: tAU,
			SO: tSO,
			TI: tTI,
			AB: tAB,
			SN: tSN,
			PD: tPD,
			PY: tPY,
			VL: tVL,
			IS: tIS,
			BP: tBP,
			EP: tEP
		});
    }
    findWords(); //referencing words.js
  };
  reader.readAsText(file); //read file and do function previously defined
};