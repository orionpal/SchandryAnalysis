//references readFile.js: array[]: entries

var words = {}; //unique words and their count found in some file
var selected = {}; //selected words to be used for search in entries of the file
/*
var TIwords = {};
var ABwords = {};
*/
//find words from titles and sticks them in var: words
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
}

//add "word" to selected set of words
function addWord(word){
	selected[word] = 1;
	showSelected();
}
//remove "word" from selected set of words
function removeWord(word){
	delete selected[word];
	showSelected();
}