const  bt = require('./bt');

const postOrder = (root) => {
    if(!root) return;

    root.left && postOrder(root.left);
    root.right && postOrder(root.right);
    console.log(root.val);
}

postOrder(bt); 

console.log('---------------------');

const postOrderForEach = (root) => {
    if(!root) return;
    const outputStack = [];
    const stack = [root];
    while(stack.length) {
        const n = stack.pop();
        outputStack.push(n);

        n.left && stack.push(n.left);
        n.right && stack.push(n.right);
    }
    
    while(outputStack.length){
        const n = outputStack.pop();
        console.log(n.val);
    }
}

postOrderForEach(bt);