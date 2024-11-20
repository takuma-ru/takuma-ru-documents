---
theme: default
title: 【Slidev 超入門】エンジニアだからこそ作れるつよつよスライドの作り方！
mdc: true
fonts:
  # 標準テキスト用
  sans: Noto Sans JP
  # UnoCSS で `font-serif` クラスを指定したとき用
  serif: Noto Serif JP
  # コードブロック用
  mono: Fira Code
---

<v-click>
   <p>この要素は 1回 Right Arrow や Space キーを押すことで表示されました</p>
</v-click>

<div v-click.at="3">
  <p>この要素は 3回 Right Arrow や Space キーを押すことで表示されました</p> <!-- 通常は2回目だが -->
</div>

<div v-click.at="2">
  <p>この要素は 2回 Right Arrow や Space キーを押すことで表示されました</p> <!-- 通常は3回目だが -->
</div>
---
