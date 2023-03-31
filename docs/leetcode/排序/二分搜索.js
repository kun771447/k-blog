Array.prototype.binarySearch = function (item) {
    let l = 0;
    let r = this.length - 1;

    while(l <= r) {
        let mid = Math.floor(l + (r - l) / 2);

        const temp = this[mid];

        if (temp === item) {
            return mid;
        } else if (temp > item) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
}

const res = [1, 2, 3, 4, 5].binarySearch(3);
console.log(res);