document.getElementById('file').onchange = function(){
  //get the file that was selected
  var file = this.files[0];
  //create a new file reader
  var reader = new FileReader();
  //define function to do
  reader.onload = function(progressEvent){
    // split the file by lines
    var lines = this.result.split('\n');
    // do something with the lines, currently only reads the first 5 entries, strong recommend against printing every single entry
    for(var line = 0; line < 5; line++){
      var entry = lines[line]; //get specified entry on line "line"
      var i = 0;
      while (i<entry.length){
        //find where the tag "AB" is
        if (entry.substring(i,i+2)=="AB"){
          var j = i+3;
          while (j<entry.length){
            //find where the tag "SN" is after the abstract (\t is the tabulation character)
            if (entry.substring(j,j+4)=='"\tSN'){
              //print only the abstract
              document.getElementById("content").innerHTML += entry.substring(i+3, j)+"<br><br>";
              break;
            }
            j += 1
          }
          break;
        }
        i += 1;
      }
    }
  };
  reader.readAsText(file);
};