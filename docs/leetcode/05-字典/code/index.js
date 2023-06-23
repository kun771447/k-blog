/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (s.length < t.length) {
        return '';
    }

    const need = new Map();
    
    for(let c of t) {
        need.set(c, need.has(c) ? need.get(c) + 1 : 1);
    }
    
    let needType = need.size;

    let res = '';

    let l = null;
    
    let tempNeed = new Map(need);
    
    for (let i = 0; i < s.length; i++) {
        const c = s[i];

        if (tempNeed.has(c)) {
            if(l == null) l = i;
            
            tempNeed.set(c, tempNeed.get(c) - 1);

            if (tempNeed.get(c) === 0) {
                needType -= 1;
            }
        }

        if (needType === 0) {
            const newRes = s.substring(l,  i + 1);
            console.log(newRes, l, i + 1);
            if (!res || newRes.length < res.length) {
                res = newRes;
            }

            tempNeed = new Map(need);
            needType = tempNeed.size;
            l = null;
        }
    }

    return res;
};

minWindow("bdab", 'ab');