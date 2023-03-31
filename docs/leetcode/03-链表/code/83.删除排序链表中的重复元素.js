/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (!head) {
        return head;
    }
    
    const newHead = head;

    while (head.next) {
        if (head.val !== head.next.val) {
            head = head.next;
            continue;
        }

        head.next = head.next.next;
    }

    return newHead;
};