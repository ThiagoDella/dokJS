const fs = require('fs');

module.exports = function(path, file, verbose){
  return new Promise((resolve,reject) => {

    if(verbose){
      console.log("\n======\n"+ ">>> Mapping: " + file + '\n at: ' + path + "\n======\n");
    }
    let pathForStream = path.replace('\\','/');
    console.log(pathForStream);
    // var file = fs.readFileSync(path + '\\' + file);
    // console.log(file);

  });
}
