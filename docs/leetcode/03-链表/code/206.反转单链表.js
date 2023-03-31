var reverseList = function(head) {
    let newHead =  null;

    while(head) {
        const temp = head;
        head = head.next;
        temp.next = newHead;
        newHead = temp; 
    }
    
    return newHead;
}