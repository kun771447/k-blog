const  bt = require('./bt');

const preOrder = (root) => {
    if(!root) return;

    console.log(root.val);
    root.left && preOrder(root.left);
    root.right && preOrder(root.right);
}

preOrder(bt);

console.log('------------------------------')

const preOrderForEach = (root) => {
    if(!root) return;
    const stack = [root];
    while(stack.length > 0) {
        const node = stack.pop();

        console.log(node.val);

        node.right && stack.push(node.right);
        node.left && stack.push(node.left);
    }
}

preOrderForEach(bt);