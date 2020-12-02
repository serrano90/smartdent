/**
 * 
 */

 /**
  * Concept Split delete separation with - for jump line
  * @param {string} val 
  */
export function conceptSplit(val) {
    let value = val.split(" - ")
    return value.join(" <br /> ")
}