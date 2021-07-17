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
  const treeNode = new TreeNode("A", b, c);
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

function drawLineLeftChild(
  ctx: CanvasRenderingContext2D,
  _x: number,
  y: number,
  quadrantWidth: number,
  levelHeight: number
) {
  const x = _x + 10;
  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x + 1, y + 10);
  ctx.lineTo(x + 1 - quadrantWidth / 4, y + 1 + levelHeight / 2 - FONT_SIZE);
  ctx.lineTo(x - quadrantWidth / 4, y + levelHeight / 2 - FONT_SIZE);
  ctx.fill();
}

function drawLineRightChild(
  ctx: CanvasRenderingContext2D,
  _x: number,
  y: number,
  quadrantWidth: number,
  levelHeight: number
) {
  const x = _x + 10;
  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x + 1, y + 10);
  ctx.lineTo(x + 1 + quadrantWidth / 4, y + 1 + levelHeight / 2 - FONT_SIZE);
  ctx.lineTo(x + quadrantWidth / 4, y + levelHeight / 2 - FONT_SIZE);
  ctx.fill();
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
  const quadrantWidth = width / Math.pow(2, yDepth);
  const levelHeight = height / (treeHeight - 1);
  const quadrantHeight = yDepth * levelHeight;
  const x = quadrantWidth * xDepth + quadrantWidth / 2;
  const y = quadrantHeight / 2 + FONT_SIZE;
  console.log(`xDepth=${xDepth}, data=${node.data}, x=${x}, y=${y}`);
  writeNode(ctx, node, x, y);
  if (node.left) {
    drawLineLeftChild(ctx, x, y, quadrantWidth, levelHeight);
    drawNode(canvas, ctx, node.left, 2 * xDepth, yDepth + 1, treeHeight);
  }
  if (node.right) {
    drawLineRightChild(ctx, x, y, quadrantWidth, levelHeight);
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
