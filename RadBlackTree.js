const RED = true;
const BLACK = false;

class Node {
    constructor(value) {
        this.value = value;
        this.color = RED;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    search(node, value) {
        if (!node || node.value === value) return node;
        return value < node.value ? this.search(node.left, value) : this.search(node.right, value);
    }

    find(value) {
        return this.search(this.root, value);
    }

    leftRotate(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left) y.left.parent = x;
        y.parent = x.parent;
        if (!x.parent) this.root = y;
        else if (x === x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }

    rightRotate(y) {
        let x = y.left;
        y.left = x.right;
        if (x.right) x.right.parent = y;
        x.parent = y.parent;
        if (!y.parent) this.root = x;
        else if (y === y.parent.left) y.parent.left = x;
        else y.parent.right = x;
        x.right = y;
        y.parent = x;
    }
}
