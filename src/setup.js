'use strict'
let console_variables = {};

function terminal(input) {
    let type = document.getElementById("type-line");
    //change next id for the type line
    let typeText = type.innerHTML.slice();
    let typeSplit = typeText.split(" ");
    let digits = typeSplit[0].length - 4;
    let id = parseInt(typeSplit[0].slice(0,digits));
    type.innerHTML = zeroID(id + 1) + typeText.slice(digits);
    //get next id for the log line
    let log = document.createElement("P");
    log.innerHTML = zeroID(id) + "> " + input;
    document.getElementById("console").insertBefore(log, type);
}
//another way to call terminal
const out = terminal;

function zeroID(num){
  if (num>=0){
    if (num < 10) return "00" + num;
    else if (num < 100) return "0" + num;
    else return num.toString();
  } else {
    return "000";
  }
}

function randomInt(min, max){
  return Math.floor(Math.random()*(max - min + 1)) + min;
}
