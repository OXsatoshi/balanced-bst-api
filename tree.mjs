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
  deleteItem(value) {
    let temp = this.root;
    while (value !== temp.data) {
      if (value > temp.data) temp = temp.right;
      else if (value < temp.data) temp = temp.left;
    }
  }
}
