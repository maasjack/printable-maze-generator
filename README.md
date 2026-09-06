# 迷宫小探险 2.0 / Little Maze Adventures

一个完全离线、适合 A4 打印的随机迷宫生成器。纯 HTML、CSS 和 JavaScript 实现，无需安装、服务器或网络。

A fully offline random maze generator designed for A4 printing. Built with plain HTML, CSS, and JavaScript—no installation, server, or internet connection required.

## 使用 / Usage

1. 下载项目并双击 `index.html`。/ Download the project and double-click `index.html`.
2. 选择大小和难度，点击“生成新迷宫”。/ Choose a size and difficulty, then generate a new maze.
3. 按 `Ctrl + P`（Mac：`Command + P`），使用 A4 纸打印。/ Press `Ctrl + P` (`Command + P` on Mac) and print on A4 paper.

## 功能 / Features

- 儿童练习册风格、大按钮与三档直观选择；打印自动隐藏彩色界面 / Child-friendly workbook layout, large controls and difficulty choices; colorful UI is hidden when printing
- 10×10 至 30×30 预设尺寸，以及 5×5 至 50×50 自定义尺寸 / Presets from 10×10 to 30×30, plus custom sizes from 5×5 to 50×50
- 简单、普通、困难三档结构难度 / Easy, normal, and hard structural difficulty levels
- 始终有解且只有唯一通路的完美迷宫 / Always-solvable perfect mazes with a unique path
- 清晰的入口、出口方向箭头 / Clear entrance and exit direction arrows
- SVG 黑白矢量绘制，自动适配单页 A4 纵向打印 / Black-and-white SVG output fitted to one portrait A4 page

## 文件 / Files

```text
├── index.html   # 页面、样式与全部程序 / Complete application
├── README.md    # 项目说明 / Project guide
└── tests/maze.test.cjs # 开发测试（使用时不需要）/ Optional developer tests
```

## 打印 / Printing

A4 纵向、100% 缩放，关闭浏览器页眉和页脚；仅迷宫与箭头进入打印。50×50 通道较细，建议细铅笔，低龄孩子可选较小地图。

Use portrait A4 at 100% scale with browser headers and footers disabled. Only the maze and arrows print. For dense 50×50 mazes, use a fine pencil; smaller grids are easier for younger children.

## 测试 / Tests

开发者可运行 `node --test tests/maze.test.cjs`，无需第三方依赖。覆盖连通性、唯一通路、箭头方向、自定义输入、难度抽样和打印尺寸计算。自动检查不等同于浏览器打印预览或实机打印验证。

Developers can run `node --test tests/maze.test.cjs` without third-party dependencies. Checks cover connectivity, unique paths, arrows, custom inputs, difficulty samples and print geometry; they do not replace browser print-preview or physical-printer testing.
