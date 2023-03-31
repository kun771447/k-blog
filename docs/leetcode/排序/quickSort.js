Array.prototype.quickSort = function() {
    const rec = (arr) => {
        if (arr.length <= 1) {
            return arr;
        }

        const left = [];
        const right = [];

        const flag = arr[0];
        
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] <= flag) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        console.log(left, right);
        return [...rec(left), flag, ...rec(right)];
    }

    rec(this).forEach((n, i) => {
        this[i] = n;    
    });
};

const arr = [2, 4, 5, 3, 1];

arr.quickSort();

console.log(arr);
