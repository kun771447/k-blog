/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    const sortAscFunc = (a, b) => a - b;

    g.sort(sortAscFunc);
    s.sort(sortAscFunc);

    let i = 0;
    s.forEach(n => {
        if(n >= g[i]) {
            i += 1;
        }
    });
    return i;
};