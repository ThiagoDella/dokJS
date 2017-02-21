const fs = require('fs');

module.exports = function(path,verbose) {
  if (verbose) {
    console.log("Using path as: " + path);
  }

 createTree(path);


  function  createTree(path){
    fs.readdir(path, (err,itens) => {
      var regexp = '/*\.js$',
      tree = {
        thisLevelFolders : [],
        thisLevelFiles : [],
        nextLevel : {}
      };

      itens.map(file => {
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
        tree.nextLevel = createTree(path + '/' + folder);
      }
      console.log(tree);
    });
  }
}
