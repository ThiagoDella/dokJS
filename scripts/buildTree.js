const fs = require('fs');

module.exports = function(path,verbose) {

  return new Promise((resolve, reject) => {
    const tree = createTree(path);
    if (verbose) {
      console.log("Using path as: " + path);
      console.log("Creating files' tree as json.");
    }

    function  createTree(path){
      var regexp = '/*\.js$',
      dir = [],
      tree = {
        thisLevelFolders : [],
        thisLevelFiles : [],
        deeperBranch : {}
      };

      dir = fs.readdirSync(path);
      dir.map(file => {
        if(file !== ".git" && file !== "node_modules"){
          if( file.match(regexp) !== null){
              tree.thisLevelFiles.push(file.match(regexp).input);
          }
          if(fs.statSync(path + '/' + file).isDirectory()){
            tree.thisLevelFolders.push(file);
          }
        }
      });
      for(folder of tree.thisLevelFolders){
        tree['deeperBranch'] = createTree(path + '\\' + folder);
      }
      return tree;
    }
    if(tree !== undefined && (tree.thisLevelFolders.length > 0 || tree.thisLevelFiles.length > 0) ){
      resolve(tree);
    }else{
      reject('There is no file in such directory.');
    }
  });

}
