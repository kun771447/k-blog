/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];

    const rec = (path, l, start) => {
        if (path.length === l) {
            res.push(path);
            return;
        }
        for (let i = start; i < nums.length; i++) {
            rec(path.concat(nums[i]), l, i + 1);
        }
    }

    for(let i = 0; i <= nums.length; i++) {
        rec([], i, 0);
    }

    return res;
};