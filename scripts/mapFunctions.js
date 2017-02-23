'use strict'
const fs = require('fs');

module.exports = function(path, file, verbose){
  return new Promise((resolve,reject) => {
    //This regex captures every not anon function signature in a file.
    const regexpFunctionDeclaration = '(function+\\s+([A-z]|[0-9])+)\\s*\\(([A-z]*\\,*[A-z]*)*\\)';
    if(verbose){
      console.log("\n======\n"+ ">>> Mapping: " + file + '\n at: ' + path + "\n======\n");
    }
    //Transforming the folder path for node fs usage.
    //I don't know why, but the backslash doesn't works.
    let pathForStream = path.split('\\');
    pathForStream = pathForStream.join('/');

    //Get an instance of the file
    let fileToStream = fs.readFileSync(pathForStream + '/' +  file, 'utf8');

    if(fileToStream !== ''){
      //Removing the carriage return and new line symbols from the file stream
      //and creating an array with every line.
      fileToStream = fileToStream.split('\r\n');

      //Reading every line of our file aka every position in array.
      fileToStream.map((line) => {
        //Checking if there is a function's signature within the file's line.
        if(line.match(regexpFunctionDeclaration)){
          let signature = line.match(regexpFunctionDeclaration)[0];
          if(verbose)
          console.log("Function Signature: ",signature);
        }


      });
    }


  });
}
