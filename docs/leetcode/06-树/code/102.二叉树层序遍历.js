/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];
    const arr = [[root.val]];
    
    const bfs = (nodeList) => {
        const levelNodeList = [];
        
        nodeList.forEach((item) => {
            item.left && levelNodeList.push(item.left);
            item.right && levelNodeList.push(item.right);
        });

        if (!levelNodeList.length) return;

        arr.push(levelNodeList.map(item => item.val));
        bfs(levelNodeList);
    }

    bfs([root]);

    return arr;
};

var levelOrder = function(root) {
    if(!root) return [];
    const q = [root];
    const res = [];

    while (q.length) {
        let len = q.length;
        res.push([]);

        while(len--) {
            const n = q.shift();
            res[res.length - 1].push(n.val);
            n.left && q.push(n.left);
            n.right && q.push(n.right);
        }
    }
    
    return res;
};