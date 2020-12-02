/**
 * Html Template
 */

/**
 * Replacer var in HTML to value market with $()  
 * 
 * @param {*} tpl 
 * @param {*} data 
 */
function replacerHtmlToValues(tpl, data) {
	var re = /\$\(([^\)]+)?\)/g,
		match
	while ((match = re.exec(tpl))) {
		tpl = tpl.replace(match[0], data[match[1]])
		re.lastIndex = 0
	}
	return tpl
}

module.exports = {
    replacerHtmlToValues
}