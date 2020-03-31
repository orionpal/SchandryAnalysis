var words = {};
document.getElementById('file').onchange = function(){
  words = {};
  //get the file that was selected
  var file = this.files[0];
  //create a new file reader
  var reader = new FileReader();
  //define function to do
  reader.onload = function(progressEvent){
    // split the file by lines
    var lines = this.result.split('\n');
    // go through lines and count words (saved in words)
    for(var line = 0; line < 2; line++){
      var entry = lines[line]; //get specified entry on line "line"
      var i = 0;
      while (i<entry.length){
        //find where the tag "AB" is
        if (entry.substring(i,i+2)=="AB"){
          var j = i+3;
          while (j<entry.length){
            //find where the tag "SN" is after the abstract (\t is the tabulation character)
            if (entry.substring(j,j+4)=='"\tSN'){
              entry = entry.substring(i+3, j);
              var word = '';
              //go through entry to find instances of words
              for (var chari=0; chari<entry.length; chari++){
                var char = entry[chari].toLowerCase(); //standardize letter to lowercase
                //if the char is a letter then add it to the word
                if (char != char.toUpperCase()){
                  word += char;
                }//if the char is a symbol then check if the word is longer than 2 letters
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
              break;
            }
            j += 1
          }
          break;
        }
        i += 1;
      }
    }
    //show word counts in alphabetical order
    console.log(words)
    var justWords = Object.keys(words);
    justWords.sort();

    var word = document.getElementById("word");
    var count = document.getElementById("count");
    for (var i=0; i<justWords.length; i++){
      word.innerHTML += `${justWords[i]}<br>`
      count.innerHTML += `${words[justWords[i]]}<br>`
    }
  };
  reader.readAsText(file); //read file and do function previously defined
};