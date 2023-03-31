const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'c',
                    children: [
                        {
                            val: 'd'
                        }
                    ]
                }
            ]
        },
        {
            val: 'e',
            children: [
                {
                    val: 'f',
                    children: [
                        {
                            val: 'g'
                        }
                    ]
                }
            ]
        }
    ]
}


const dfs = (node) => {
    console.log(node.val);
    node.children && node.children.forEach(element => {
        dfs(element);
    });
}

dfs(tree);