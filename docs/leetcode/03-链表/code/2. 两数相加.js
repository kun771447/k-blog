/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let head = new ListNode();
    let newHead = head;
    
    let yu = 0;
    while(l1 || l2) {
        const val1 = l1?.val || 0;
        const val2 = l2?.val || 0;
        const sum = (yu + val1 + val2);
        yu = Math.floor(sum / 10);
        
        newHead.next = new ListNode(sum % 10);
        newHead = newHead.next;
        
        l1 = l1 && l1.next;
        l2 = l2 && l2.next;
    }
    
    if (yu) {
        newHead.next = new ListNode(yu);
    }

    return head.next;
};