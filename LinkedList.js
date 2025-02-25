class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }
        return null;
    }

    remove(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                if (current.prev) current.prev.next = current.next;
                if (current.next) current.next.prev = current.prev;
                if (current === this.head) this.head = current.next;
                if (current === this.tail) this.tail = current.prev;
                this.length--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    update(oldValue, newValue) {
        let node = this.search(oldValue);
        if (node) {
            node.value = newValue;
            return true;
        }
        return false;
    }

    getLength() {
        return this.length;
    }
}

// Test cases
const list = new DoublyLinkedList();
list.insert(1);
list.insert(2);
list.insert(3);
console.log(list.search(2));
list.update(2, 5);
list.remove(1);
console.log(list.getLength());
