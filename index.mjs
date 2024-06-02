import { Tree } from "./tree.mjs";
const arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree();
tree.setRoot(arr);
tree.insert(8);
tree.insert(5);
tree.prettyPrint(tree.getRoot());
