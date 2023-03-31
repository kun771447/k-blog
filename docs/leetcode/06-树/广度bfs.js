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


const bfs = (node) => {
    const q = [node];
    for(let i = 0; i < q.length;i++) {
        console.log(q[i].val);
        q[i].children?.forEach(element => {
            q.push(element);
        });
    }
}

bfs(tree);