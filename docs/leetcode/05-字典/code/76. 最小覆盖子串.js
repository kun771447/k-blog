var minWindow = function(s, t) {
    // 左指针
    let l = 0;
    // 右指针
    let r = 0;

    // 创建字典存放需要的字符
    const need = new Map();

    // 存入需要查找的字串
    for(let c of t) {
        need.set(c, need.has(c) ? need.get(c) + 1 :1);
    }

    // 字符类型数量
    let needType = need.size;

    // 最短字符串
    let res = '';

    // 存入字串
    for(; r < s.length; r++) {
        const c = s[r];
        
        // 判断这个字符是否需要
        if (need.has(c)) {
            need.set(c, need.get(c) - 1);
            // 如果这个类型的字符都找到了，删除这个类型
            if (need.get(c) === 0)
                needType -= 1;
        }
        
        // 当所有字符都找到了，开始移动左指针
        for(; needType === 0; l++) {
            // 包含 t 的子串
            const newRes = s.substring(l, r + 1);
            
            // 如果 res 不存在，或新的子串长度小的话替换
            if (!res || newRes.length < res.length)
                res = newRes;

            const c2 = s[l];

            // 左指针移动，遇到所需字符串
            if (need.has(c2)) {
                need.set(c2, need.get(c2) + 1);
                // 跳出循环，重新查找
                if (need.get(c2) === 1) 
                    needType += 1; 
            }
        }
    }

    return res;
};