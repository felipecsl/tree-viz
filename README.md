# Tree 🌴 rendering

Sample rendering a Tree data structure in a HTML canvas.

## Usage

`yarn build`

Then open `tree.html` on your browser.

![screenshot](screenshot.png)

```typescript
const b = new TreeNode(
  "B",
  new TreeNode("D", new TreeNode("X"), new TreeNode("Y")),
  new TreeNode("E", new TreeNode("H"), new TreeNode("T"))
);
const c = new TreeNode(
  "C",
  new TreeNode("F", new TreeNode("I"), new TreeNode("J")),
  new TreeNode("G", new TreeNode("K"), new TreeNode("L"))
);
const root = new TreeNode("A", b, c);
drawTree("area", root);
```

MIT license.
