var TreeNode = /** @class */ (function () {
    function TreeNode(data, left, right) {
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.data = data;
        this.left = left;
        this.right = right;
    }
    return TreeNode;
}());
var FONT_SIZE = 30;
function makeTree() {
    var treeNode = new TreeNode("A", new TreeNode("B", new TreeNode("D"), new TreeNode("E")), new TreeNode("C", new TreeNode("F"), new TreeNode("G")));
    return treeNode;
}
/* returns the total number of tree levels below this node */
function treeHeight(root, currDepth) {
    if (currDepth === void 0) { currDepth = 0; }
    var left = root.left;
    var right = root.right;
    return Math.max(left != null ? treeHeight(left, currDepth + 1) : currDepth, right != null ? treeHeight(right, currDepth + 1) : currDepth);
}
function drawNode(canvas, ctx, node, xDepth, // x depth starts at 0 for root node
yDepth, // y depth starts at 0 for root node
treeHeight) {
    var _a = canvas.getBoundingClientRect(), width = _a.width, height = _a.height;
    var quadrantWidth = width / Math.pow(2, yDepth) - FONT_SIZE / 2;
    var levelHeight = height / (treeHeight + 1);
    var quadrantHeight = yDepth * levelHeight;
    var x = quadrantWidth * xDepth + quadrantWidth / 2;
    var y = quadrantHeight / 2 + FONT_SIZE;
    console.log("xDepth=" + xDepth + ", data=" + node.data + ", x=" + x + ", y=" + y);
    writeNode(ctx, node, x, y);
    if (node.left) {
        drawNode(canvas, ctx, node.left, 2 * xDepth, yDepth + 1, treeHeight);
    }
    if (node.right) {
        drawNode(canvas, ctx, node.right, 2 * xDepth + 1, yDepth + 1, treeHeight);
    }
}
function writeNode(ctx, treeNode, x, y) {
    ctx.font = FONT_SIZE + "px serif";
    ctx.fillText(treeNode.data, x, y);
}
function drawTree(canvasId, root) {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var totalTreHeight = treeHeight(root);
        drawNode(canvas, ctx, root, 0, 0, totalTreHeight);
    }
}
