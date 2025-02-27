/* 
COMMON JS
module.exports.name = function
const math = require("./math.js")

ES MODULE
import name from "./math.js"
export default {add, mul, PI, obj}
in package json, "type" : "module"

*/
import { appendFileSync } from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

export {generateUniqueID, addAccount}

function generateUniqueID(firstName, lastName) {

    let firstNameFirstLetter = firstName[0].toString().toLowerCase();

    let lastNameLower = lastName.toString().toLowerCase();

    let uniqueAlphaString = uuidv4().slice(0,8);

    let uniqueID = firstNameFirstLetter + lastNameLower + uniqueAlphaString;
    return uniqueID;
}

function addAccount(accInfo) {

    if (accInfo.length != 4) {
        console.log("Not all fields are present");
        return false;
    }
    if (accInfo[0].length == 0 || accInfo[1].length == 0 || accInfo[2].length == 0 ) {
        console.log("There is an empty string");
        return false;
    }

    if (!validator.isEmail(accInfo[2] + "")) {
        console.log("Invalid Email");
        return false;
    }

    if (accInfo[3] < 18) {
        console.log("Age is less than 18");
        return false;
    }

    let uniqueID = generateUniqueID(accInfo[0], accInfo[1]);
    console.log("unique ID generated: " + uniqueID);

    try {
        appendFileSync('users.txt', accInfo + "," + uniqueID + "\n");
        console.log('The "data to append" was appended to file!');
      } catch (err) {
        /* Handle the error */
      } 

    return true;


}
