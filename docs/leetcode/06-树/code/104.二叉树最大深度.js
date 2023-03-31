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
 * @return {number}
 */
var maxDepth = function(root) {

    let res = 0
    const deep = (root, n) => {
        if (!root) return 0;
        
        res = Math.max(res, n);

        root.left && deep(root.left, n + 1);
        root.right && deep(root.right, n + 1);
       
        return res;
    }

    
    return deep(root, 1);
};