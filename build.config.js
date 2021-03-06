var srcRoot="./src/static/"
// var version="1.0"
var distRoot="./dist/"
var distAssets=distRoot+"static/"

module.exports={
  cssSrc:[srcRoot+"css/*.scss"],
  cssDist:distAssets+"css",
  jsSrc:srcRoot+"js/*.jsx",
  jsDist:distAssets+"js",
  imgSrc:[srcRoot+"img/*.{png,jpg,jpeg,gif,ico}"],
  imgDist:distAssets+"img",
  jsSourceMap:false,
  cdnUrl:"http://cdn.hfax.com/",
  distRoot,
  srcRoot
}