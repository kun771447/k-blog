Array.prototype.insertionSort = function() {
    for (let i = 1; i < this.length; i++) {
        const temp = this[i];
        let j = i;

        while (j > 0) {
            if (this[j - 1] > temp) {
                this[j] = this[j - 1];
            } else {
                break;
            }

            j--;
        }

        this[j] = temp;
    }
}

const arr = [2, 4, 5, 3, 1];

arr.insertionSort();

console.log(arr);