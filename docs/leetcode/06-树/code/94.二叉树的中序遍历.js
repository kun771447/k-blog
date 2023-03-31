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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    if(!root) return [];

    const stack = [];
    let p = root
    while(p) {
        stack.push(p);   
        p = p.left
    }

    const res = [];

    while(stack.length || p) {
        while(p) {
            stack.push(p);   
            p = p.left
        }
    
        const n = stack.pop();
        
        res.push(n.val);

        p = n.right;
    }

    return res;
};
