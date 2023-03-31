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
var minDepth = function(root) {
    if (!root) {
        return 0;
    }  
    
    let res;

    const dfs = (root, n) => {
        if (!root.left && !root.right) {
            res = res ? Math.min(res, n) : n;
            return; 
        }

        root.left && dfs(root.left, n + 1);
        root.right && dfs(root.right, n + 1);
    }

    dfs(root, 1);

    return res;
};