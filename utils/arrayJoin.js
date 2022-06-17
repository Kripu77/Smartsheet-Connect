
function arrayJoine(twoDarray){

    return twoDarray
      .map((singleArr) => {
        return singleArr.join(",");;
      }).join("\n")
     

}

module.exports ={arrayJoine}