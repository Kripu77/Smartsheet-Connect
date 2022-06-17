
const arrayTwo = [
  ["hello", "Javascript"],
  
];


function arrayJoine(twoDarray){

    return twoDarray
      .map((singleArr) => {
        return singleArr.join(",");;
      }).join("\n")
     

}
console.log(arrayJoine(arrayTwo))
module.exports ={arrayJoine}