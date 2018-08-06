//Keyboard emulation
window.addEventListener("keydown", function(event){
  document.getElementById("console").focus();
  document.getElementById("input").scrollIntoView();
  let key = event.keyCode;
  let line = document.getElementById("input");
  let text = line.innerHTML.slice();
  let input = "" //char keycode will be stored here to be added to innerHTML
  let special = undefined; //enter, backspace, tab
  //check keycode for key value or order
  //keycode value is stored into variable "input"
  if (event.shiftKey){
    switch(key){
      case 32:
        input = " ";
        break;
      case 48:
        input = ")";
        break;
      case 49:
        input = "!";
        break;
      case 50:
        input = "@";
        break;
      case 51:
        input = "#";
        break;
      case 52:
        input = "$";
        break;
      case 53:
        input = "%";
        break;
      case 54:
        input = "^";
        break;
      case 55:
        input = "&";
        break;
      case 56:
        input = "*";
        break;
      case 57:
        input = "(";
        break;
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
        input = String.fromCharCode(key).toUpperCase();
        break;
      case 186:
        input = ":";
        break;
      case 187:
        input = "+";
        break;
      case 188:
        input = "<";
        break;
      case 189:
        input = "_";
        break;
      case 190:
        input = ">";
        break;
      case 191:
        input = "?";
        break;
      case 192:
        input = "~";
        break;
      case 219:
        input = "{";
        break;
      case 220:
        input = "|";
        break;
      case 221:
        input = "}";
        break;
      case 222:
        input = "\"";
        break;
      //other keys
      case 8: //backspace
        special = "delete";
        break;
      case 13: //enter
        special = "enter";
      default:
    }
  } else {
    switch(key){
      case 32:
        input = " ";
        break;
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
          input = String.fromCharCode(key).toLowerCase();
          break;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        input = String.fromCharCode(key);
        break;
      case 186:
        input = ";";
        break;
      case 187:
        input = "=";
        break;
      case 188:
        input = ",";
        break;
      case 189:
        input = "-";
        break;
      case 190:
        input = ".";
        break;
      case 191:
        input = "/";
        break;
      case 192:
        input = "`";
        break;
      case 219:
        input = "[";
        break;
      case 220:
        input = "\\";
        break;
      case 221:
        input = "]";
        break;
      case 222:
        input = "'";
        break;
      //other keys
      case 8: //backspace
        special = "delete";
        break;
      case 9: //tab
        input = "  ";
        break;
      case 13: //enter
        special = "enter";
      default:
    }
  }

  //check which output path should be used
  if (special){ //non-character key functions

    //BACKSPACE
    if (special == "delete"){
      //parse text for html character codes
      let parsedText = text.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");
      line.innerHTML = parsedText.substr(0,parsedText.length-1);
    }

    //ENTER
    if (special == "enter"){
      var inputLine = line.innerHTML;
      line.innerHTML = "";
      terminal(inputLine);

      //if console variables included with %var%, change input text to point to console variables
      if (/%[\w\d]*%/.test(inputLine)) inputLine = inputLine.replace(/%([\w\d]*)%/g, 'console_variables.$1');

      //FUNCTIONS

      //(A) special function calls with ":"
      if (/^\s*:\w+/i.test(inputLine)) {
        //(A1) simple output of js expressions with syntax ":out exp"
        if (/^\s*:out\s.+/i.test(inputLine)){
          let exp = inputLine.replace(/^\s*:out\s(.+);?$/, '$1');
          terminal(eval(exp));
        }
        //(A2) set local variables with syntax ":set var = exp"
        else if (/^\s*:set\s*.+/i.test(inputLine)) {
          let expLine = inputLine.replace(/^\s*:set\s+([\w\d]+)\s*=\s*(.+);?$/, '$1=$2');
          let variable = expLine.replace(/^([\w\d]*).*$/, '$1');
          let exp = expLine.replace(/^.*=(.+)\s*$/, '$1');
          console_variables[variable] = eval(exp);
          terminal(console_variables[variable]);
        }
        //(A3) display local variables with syntax ":var"
        // reset all local variables with syntax ":var reset"
        else if (/^\s*:var\s*.*/i.test(inputLine)){
          if (/:var\s*reset(?:\s.*)?/ig.test(inputLine)){
            for (let key in console_variables){
              delete console_variables[key];
            }
            terminal("Local variables cleared.")
          } else {
            var output = "LOCAL VARIABLES:";
            if (Object.keys(console_variables).length > 0){
              for (let key in console_variables){
                output = output + "<br>       " + key + " = " + console_variables[key];
              }
            } else output = output + " none";
            terminal(output);
          }
        }
        //(A4) run scripts with syntax ":run scriptPath.js"
        else if(/^\s*:run\s.+\.js/i.test(inputLine)){ //run a .js file
          let filePath = inputLine.replace(/^.*\s(.+\.js).*$/, '$1');
          let element = document.createElement('script');
          element.src = filePath;
          document.getElementById("body").appendChild(element);
        }
        //(A5) clear the console with syntax ":clear"
        else if (/^\s*:clear/i.test(inputLine)){ //clear all lines
          document.getElementById("console").innerHTML =
          '<p id="type-line">001> <span id="input"></span><span class="blink">_</span></p><div id="spacer"><br></div>'
        }
        //(A6) displays all recognized terminal functions to help the user
        else if (/^\s*:help\s*/.test(inputLine)){
          var output = "TERMINAL FUNCTIONS:";
          let nl = "<br>       "
          output = output
            + nl + ":out <span class='hl1'>exp</span>     -- Prints the value of an <span class='hl1'>expression</span> to the console."
            + nl + ":set <span class='hl2'>var</span> = <span class='hl1'>exp</span> -- Sets a <span class='hl2'>variable</span> equal to the <span class='hl1'>expression</span> value. Call the variable with %<span class='hl2'>var</span>%"
            + nl + ":var <span class='hl4'>(reset)</span>   -- Displays <span class='hl4'>(or resets)</span> all local variables."
            + nl + ":run <span class='hl3'>path</span>    -- Runs a javascript file (.js) at the given file <span class='hl3'>path</span>."
            + nl + ":clear         -- Clears all terminal lines.";
          terminal(output);
        }
        //(AX) if no recognizable function is entered
        else {
          terminal("ERROR: null function");
        }
      }
      //(B) Math operations with input lines ending in "="
      else if (/.+=$/.test(inputLine)){ //run expression
        let exp = inputLine.replace(/^\s*(.+)=$/, '$1');
        terminal(eval(exp));
      }
      //(C) normal execution of input line
      else {
        if (/;$/.test(inputLine)) { //javascript expression ends with ";"
          eval(inputLine);
        }
        document.getElementById("spacer").scrollIntoView();
      }
    }
  }
  //if no special keypress, simply add the character input
  else {
    line.innerHTML = text + input;
  }
});
