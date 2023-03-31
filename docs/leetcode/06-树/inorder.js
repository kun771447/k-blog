const bt = require('./bt');

const inOrder = (root) => {
    if(!root) return;

    root.left && inOrder(root.left);
    console.log(root.val);
    root.right && inOrder(root.right);
}

inOrder(bt);

console.log('---------------------');

const inOrderForEach = (root) => {
    if (!root) { return; }

    const stack = [];
    let p = root;
    while(p) {
        stack.push(p)
        p = p.left;
    }
    while(stack.length || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right;
    }
}

inOrderForEach(bt);

