const fs = require('fs');
const mapFunctions = require('./mapFunctions');
module.exports = function(path,verbose) {

  return new Promise((resolve, reject) => {
    createTree(path);
    if (verbose) {
      console.log("Using path as: " + path);
      console.log("Creating files' tree as json.");
    }

    function  createTree(path){
      var regexp = '/*\.js$',
      dir = [];
      // if(verbose){
      //   tree = {
      //     thisLevelFolders : [],
      //     thisLevelFiles : [],
      //     deeperBranch : []
      //   };
      // }

      dir = fs.readdirSync(path);
      dir.map(file => {
        if(file !== ".git" && file !== "node_modules"){
          let stats = fs.statSync(path + '/' + file);

          if(stats.isFile() && file.match(regexp) !== null){
              // tree.thisLevelFiles.push(file.match(regexp).input);
              mapFunctions(path,file,verbose);
          }
          if(stats.isDirectory()){
            // tree.thisLevelFolders.push(file);
            createTree(path + '\\' + file);
          }
        }
      });
      // for(folder of tree.thisLevelFolders){
      //   tree['deeperBranch'].push(createTree(path + '\\' + folder));
      // }
      // return path;
    }
    // if(tree !== undefined && (tree.thisLevelFolders.length > 0 || tree.thisLevelFiles.length > 0) ){
    if(path.length > 0 ){
      resolve('Tree Created');
    }else{
      reject('There is no file in such directory.');
    }
  });

}
