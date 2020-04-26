//show all unique words, references var: words from words.js
function showWords(){
	var content = document.getElementById("content");
	content.innerHTML = ``;
	var newHtml = ``
	for (var i=0; i<justWords.length; i++){
		var word = justWords[i]
		newHtml += `<input type="button" id="add" value="+" onclick="addWord('${word}')">${word}	${words[word]}<br>`;
	}
	content.innerHTML = newHtml;
}
//show currently selected words, references var: selected from words.js
function showSelected(){
	var current = document.getElementById("current");
	current.innerHTML = `<b>Currently Selected Words</b><hr>`;
	var newHtml = ``;
	var justWords = Object.keys(selected)
	for (var i=0; i<justWords.length; i++){
		var word = justWords[i]
		newHtml += `<input type="button" id="sub" value="x" onclick="removeWord('${word}')">${word}	${words[word]}<br>`;
	}
	current.innerHTML = newHtml;
}
//show all tabs of a single entry
function showEntry(i){
	var content = document.getElementById("content");
	var entry = entries[i];
	var tabs = Object.keys(entry);

	content.innerHTML = ``;
	var newHtml = ``;
	for (var i=0; i<tabs.length; i++){
		var tab = tabs[i];
		newHtml += `${tab}: ${entry[tab]}<br>`;
	}
	for (word in selected){
		newHtml = highlight(newHtml, word);
	}
	content.innerHTML = newHtml;
}
//show all entries by title
function showAll(){
	var content = document.getElementById("content");
	content.innerHTML = ``;
	var newHtml = ``;
	for (var i=0; i<entries.length; i++){
		newHtml += `<input type="button" id="view" value="view" onclick="showEntry(${i})"> ${i}: ${entries[i]["TI"]}<br>`
	}
	content.innerHTML = newHtml;
}
//show entries by title that include selected words, references var: selected{} from words.js
function showEntries(){
	if (Object.keys(selected).length==0){
		showAll();
	}else{
		var content = document.getElementById("content");
		content.innerHTML = ``;
		var newHtml;
		for (var i=0; i<eSaved.length; i++){
			var index = eSaved[i];
			newHtml += `<input type="button" id="view" value="view" onclick="showEntry(${index})"> ${index}: ${entries[index]["TI"]}<br>`
		}
		for (word in selected){
			newHtml = highlight(newHtml, word);
		}
		content.innerHTML = newHtml;
	}
}
//add <mark></mark> around selected word
function highlight(str, word){
	var marks = [];
	for (var i=0; i<str.length; i++){
		var cur = str.substring(i, i+word.length).toLowerCase();
		if (cur==word){
			marks.push(i);
		}
	}
	var marked = str;
	for (var i=0; i<marks.length; i++){
		var mark = marks[i];
		marked = marked.substring(0,mark+(13*i)) + `<mark>` + word + `</mark>` + marked.substring(mark+word.length+(13*i), marked.length);
	}
	return marked
}