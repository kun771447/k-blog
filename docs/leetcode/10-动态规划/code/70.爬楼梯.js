/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let arr = [0, 1, 2];

    for (let i = 3; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr[n];
};


var climbStairs = function(n) {
    if (n < 2) return 1;

    let dp0 = 1, dp1 = 1;

    for (let i = 2; i <= n; i++) {
        const temp = dp0;
        dp0 = dp1;
        dp1 += temp;
    }

    return dp1;
};