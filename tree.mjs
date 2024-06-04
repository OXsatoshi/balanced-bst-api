import { Node } from "./node.mjs";
export class Tree {
  constructor() {
    this.tree = null;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  buildTree(array) {
    if (array.length === 0) {
      return null;
    } else {
      let mid = Math.floor(array.length / 2);
      let rootNode = new Node();
      rootNode.setData(array[mid]);
      const leftArray = array.slice(0, mid);
      const rightArray = array.slice(mid + 1);
      rootNode.left = this.buildTree(leftArray);
      rootNode.right = this.buildTree(rightArray);
      return rootNode;
    }
  }
  setRoot(arr) {
    this.root = this.buildTree(arr);
  }
  getRoot() {
    return this.root;
  }
  insert(value) {
    let temp = this.root;
    while (temp.right || temp.left) {
      if (value > temp.data && temp.right) temp = temp.right;
      else if (value < temp.data && temp.left) temp = temp.left;
    }
    if (value > temp.data) {
      temp.right = new Node();
      temp.right.setData(value);
    } else if (value < temp.data) {
      temp.left = new Node();
      temp.left.setData(value);
    }
  }
  deleteItem(value, node) {
    if (node.data === value) {
      if (this.isALeaf(node)) return null;
      if (this.hasOneChild(node)) return node.left || node.right;
      else {
        let n = this.min(node.right);
        console.log(n);
        node.data = n;
        node.right = this.deleteItem(n, node.right);
        return node;
      }
    } else {
      if (value > node.data && node.right) {
        node.right = this.deleteItem(value, node.right);
        return node;
      } else if (value < node.data && node.left) {
        node.left = this.deleteItem(value, node.left);
        return node;
      }
    }
  }
  isALeaf(node) {
    return node.left === null && node.right === null;
  }
  min(node) {
    if (node.left === null) return node.data;
    else {
      return this.min(node.left);
    }
  }
  hasOneChild(node) {
    return (
      !(node.left !== null && node.right !== null) &&
      (node.left !== null || node.right !== null)
    );
  }
  find(value, node) {
    if (node === null) {
      console.log(value + "nexist pas");
      return;
    } else if (node.data === value) return node;
    if (value > node.data) return this.find(value, node.right);
    else return this.find(value, node.left);
  }
  breadthFirst(func) {
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      func(node);
    }
  }
  recBreadthFirs(func, queue) {
    if (queue.length === 0) return;
    else {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      func(node);
      this.recBreadthFirs(func, queue);
    }
  }
  recuresionBreadthFirt(func) {
    let queue = [];
    queue.push(this.root);
    this.recBreadthFirs(func, queue);
  }
  inorder(func, node) {
    if (node === null) {
      return;
    } else {
      this.inorder(func, node.left);
      func(node);
      this.inorder(func, node.right);
    }
  }
  postorder(func, node) {
    if (node === null) {
      return;
    } else {
      this.postorder(func, node.left);

      this.postorder(func, node.right);
      func(node);
    }
  }
  preorder(func, node) {
    if (node === null) {
      return;
    } else {
      func(node);
      this.preorder(func, node.left);
      this.preorder(func, node.right);
    }
  }
  height(node) {
    if (node === null || this.isALeaf(node)) return 0;

    return 1 + this.max(this.height(node.right), this.height(node.left));
  }
  max(a, b) {
    return a > b ? a : b;
  }
  depth(root, node) {
    if (root === node) return 0;
    if (root.data > node.data) return 1 + this.depth(root.left, node);
    if (root.data < node.data) return 1 + this.depth(root.right, node);
  }
}
