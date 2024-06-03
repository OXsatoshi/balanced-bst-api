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
    if (node.data === value) return node;
    else {
      if (value > node.value) find(value, node.right);
      else this.find(value, node.left);
    }
  }
}
