var permute = function(nums) {
    const res = []
    const deep = (arr) => {
        if (arr.length >= nums.length) {
            res.push(arr);
            return;
        }
        
        nums.forEach(e => {
            if (arr.include(e)) return;
            deep([...arr, e])
        });
    }

    deep([])
    return res;
};