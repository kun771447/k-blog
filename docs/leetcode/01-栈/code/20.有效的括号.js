/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const map = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}']
    ]);
    const stack = [];
    for (let ch of s) {
        const temp = map.get(ch);
        if (temp) {
            stack.push(temp);
            continue;
        } 

        if (stack.pop() !== ch) {
            return false;
        }
    }

    if (stack.length > 0) {
        return false;
    } 

    return true;
};
