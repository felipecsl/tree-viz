class TreeNode<T> {
  readonly data: T;
  readonly left?: TreeNode<T>;
  readonly right?: TreeNode<T>;

  constructor(data: T, left: TreeNode<T> = null, right: TreeNode<T> = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const FONT_SIZE = 30;

function makeTree(): TreeNode<string> {
  const treeNode = new TreeNode(
    "A",
    new TreeNode("B", new TreeNode("D"), new TreeNode("E")),
    new TreeNode("C", new TreeNode("F"), new TreeNode("G"))
  );
  return treeNode;
}

/* returns the total number of tree levels below this node */
function treeHeight<T>(root: TreeNode<T>, currDepth: number = 0): number {
  const left = root.left;
  const right = root.right;
  return Math.max(
    left != null ? treeHeight(left, currDepth + 1) : currDepth,
    right != null ? treeHeight(right, currDepth + 1) : currDepth
  );
}

function drawNode(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  node: TreeNode<string>,
  xDepth: number, // x depth starts at 0 for root node
  yDepth: number, // y depth starts at 0 for root node
  treeHeight: number
) {
  const { width, height } = canvas.getBoundingClientRect();
  const quadrantWidth = width / Math.pow(2, yDepth) - FONT_SIZE / 2;
  const levelHeight = height / (treeHeight + 1);
  const quadrantHeight = yDepth * levelHeight;
  const x = quadrantWidth * xDepth + quadrantWidth / 2;
  const y = quadrantHeight / 2 + FONT_SIZE;
  console.log(`xDepth=${xDepth}, data=${node.data}, x=${x}, y=${y}`);
  writeNode(ctx, node, x, y);
  if (node.left) {
    drawNode(canvas, ctx, node.left, 2 * xDepth, yDepth + 1, treeHeight);
  }
  if (node.right) {
    drawNode(canvas, ctx, node.right, 2 * xDepth + 1, yDepth + 1, treeHeight);
  }
}

function writeNode(
  ctx: CanvasRenderingContext2D,
  treeNode: TreeNode<string>,
  x: number,
  y: number
) {
  ctx.font = `${FONT_SIZE}px serif`;
  ctx.fillText(treeNode.data, x, y);
}

function drawTree(canvasId: string, root: TreeNode<string>) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const totalTreHeight = treeHeight(root);
    drawNode(canvas, ctx, root, 0, 0, totalTreHeight);
  }
}
