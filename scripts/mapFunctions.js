'use strict'
const fs = require('fs');

module.exports = function(path, file, verbose){
  return new Promise((resolve,reject) => {

    //Creating a list of functions.
    let functionsArray = [];
    //Model for saving our functions.
    function functionObj(){
      this.body = [];
      this.signature = "";
    };
    functionObj.prototype.getSignature = function(){
      return this.body[this.body.length -1];
    };
    functionObj.prototype.setSignature = function(signature){
      this.signature = signature;
    };
    functionObj.prototype.setFunctionLine = function(line){
      this.body.push(line);
    }

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
      let startFunction = false, countMoustache = 0, fObj;

      //Reading every line of our file aka every position in array.
        for(let i = 0, stop = fileToStream.length; i < stop; i++) {

        //Checking if there is a function's signature within the file's fileToStream[i].
        if(fileToStream[i].match(regexpFunctionDeclaration)){
          startFunction = true;
          fObj =  new functionObj();
          let signature = fileToStream[i].match(regexpFunctionDeclaration)[0];
          fObj.setSignature(signature);

          // if(verbose)
          // console.log("Function Signature: ",signature);
        }
        if(startFunction){
          fObj.setFunctionLine(fileToStream[i]);
          if(fileToStream[i].match('\\{')){
            countMoustache++;
          }else if(fileToStream[i].match('\\}')){
            countMoustache--;
          }

          if(countMoustache === 0){
            startFunction = false;
            functionsArray.push(fObj);
          }
        }
        //End for()
      }
      // console.log('\n',functionsArray);
      console.log(functionsArray[0]);

    }

  });
}
