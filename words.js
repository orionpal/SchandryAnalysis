//references readFile.js: array[]: entries
var eSaved = []; //indexes of the saved entries
var words = {}; //unique words and their count found in some file
var justWords = []; //array of just the words (no counts)
var selected = {}; //selected words to be used for search in entries of the file
/*
var TIwords = {};
var ABwords = {};
*/
//find words from titles and sticks them in var: words, also sticks the key values in var: justWords
function findWords(){
	words = {};
	for (var e=0; e<entries.length; e++){
		var ab = entries[e]["TI"];
		var word = '';
		//go through entry to find instances of words
		for (var i=0; i<ab.length; i++){
			var char = ab[i].toLowerCase(); //standardize letter to lowercase
			//if the char is a letter then add it to the word
			if (char != char.toUpperCase()){
			  word += char;
			}//if the char is a symbol then check if the current word is longer than 2 letters
			else if (word.length>2){
			  if (word in words){
			    words[word] += 1;
			  }else{
			    words[word] = 1;
			  }
			  word = '';
			}//otherwise our word is too small/insignificant
			else{
			  word = '';
			}
		}
	}
	justWords = Object.keys(words);
	justWords.sort();
}
function findEntries(){
	eSaved = [];
	for (var i=0; i<entries.length; i++){
		var entry = entries[i]["TI"];
		if (hasSelected(entry)){
			eSaved.push(i);
		}
	}
}
//add "word" to selected set of words
function addWord(word){
	selected[word] = 1;
	showSelected();
	findEntries();
}
//remove "word" from selected set of words
function removeWord(word){
	delete selected[word];
	showSelected();
	findEntries();
}
//convert entry i into a full string, used for searching selected words
function fullString(i){
	var str = ``;
	var entry = entries[i];
	var tabs = Object.keys(entry);
	for (var i=0; i<tabs.length; i++){
		var tab = tabs[i];
		str += entry[tab];
	}
	return str;
}
//***uppercase and lowercase issue***
function hasSelected(str){
	var has = false;
	for (word in selected){
		has = (has || str.toLowerCase().includes(word)) //
	}
	return has;
}