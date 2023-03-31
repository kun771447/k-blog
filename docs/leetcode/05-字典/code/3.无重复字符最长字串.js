/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let l = 0;
    let len = 0;
    for (let i = 0; i < s.length; i++) {
        const curL = map.get(s[i]);
        if (map.has(s[i]) && curL >= l) {
            l = curL + 1;
        }

        len = Math.max((i - l + 1), len);

        map.set(s[i], i);
    }

    return len;
};