# 迷宫小探险 3.0 · 小兔找胡萝卜 / Rabbit's Garden Adventure

一个完全离线、适合 A4 打印的随机迷宫生成器。纯 HTML、CSS 和 JavaScript 实现，无需安装、服务器或网络。

A fully offline random maze generator designed for A4 printing. Built with plain HTML, CSS, and JavaScript—no installation, server, or internet connection required.

## 使用 / Usage

1. 下载项目并双击 `index.html`。/ Download the project and double-click `index.html`.
2. 选择大小和难度，点击“生成新迷宫”。/ Choose a size and difficulty, then generate a new maze.
3. 按 `Ctrl + P`（Mac：`Command + P`），使用 A4 纸打印。/ Press `Ctrl + P` (`Command + P` on Mac) and print on A4 paper.

## 功能 / Features

- 纸上也有故事：小兔找胡萝卜，黑白花草可涂色 / A story on paper: help the rabbit find its carrot, then color the garden
- 小兔跟随上边入口、胡萝卜跟随下边出口，左右位置随机；装饰不遮挡迷宫 / Rabbit and carrot follow randomized openings on the top and bottom edges; decorations never cover passages
- 圆润墙线、清楚箭头；彩色操作界面不打印 / Rounded wall strokes and clear arrows; colorful controls do not print
- 10×10 至 30×30 预设尺寸，以及 5×5 至 50×50 自定义尺寸 / Presets from 10×10 to 30×30, plus custom sizes from 5×5 to 50×50
- 简单、普通、困难三档结构难度 / Easy, normal, and hard structural difficulty levels
- 始终有解且只有唯一通路的完美迷宫 / Always-solvable perfect mazes with a unique path
- SVG 迷宫搭配内嵌原创线稿；只需一个 HTML 文件 / SVG maze with embedded original coloring artwork; only one HTML file is needed

## 文件 / Files

```text
├── index.html   # 页面、样式与全部程序 / Complete application
├── README.md    # 项目说明 / Project guide
└── tests/maze.test.cjs # 开发测试（使用时不需要）/ Optional developer tests
```

## 打印 / Printing

A4 纵向、100% 缩放，关闭浏览器页眉和页脚。完整打印故事标题、迷宫、箭头、小兔、胡萝卜和花草；无需勾选“背景图形”。50×50 通道较细，建议细铅笔，低龄孩子可选较小地图。

Use portrait A4 at 100% scale with browser headers and footers disabled. The story, maze, arrows, rabbit, carrot and flowers all print; background graphics are not required. Use a fine pencil for 50×50 mazes; smaller grids are easier for younger children.

插画使用 AI 生成的黑白儿童涂色线稿，已完整内嵌；不会联网加载，也不会在每次生成迷宫时调用 AI。

AI-generated black-and-white coloring artwork is fully embedded. No network requests or AI calls occur when generating a maze.

## 测试 / Tests

开发者可运行 `node --test tests/maze.test.cjs`，无需第三方依赖。覆盖连通性、唯一通路、箭头方向、自定义输入、难度抽样、打印尺寸以及插画不越界、不挡路、不重叠。自动检查不等同于浏览器打印预览或实机打印验证。

Developers can run `node --test tests/maze.test.cjs` without third-party dependencies. Checks cover maze logic, arrows, inputs, difficulty, print geometry and collision-free artwork placement; they do not replace browser print-preview or physical-printer testing.
