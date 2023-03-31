/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const temp = map.get(target - nums[i])
        if (temp != undefined) {
            return [temp, i];
        } else {
            map.set(nums[i], i);
        }
    }
};