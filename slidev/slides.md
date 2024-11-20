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

## Slidev 超入門

# エンジニアだからこそ作れるつよつよスライドの作り方！

<div class="absolute bottom-5 right-10">
  <p class="font-size-4">@takuma-ru</p>
</div>

---
layout: section
---

## 4. 👶 Slidev のきほん

---

### 4.1. インストールする

以下コマンドを実行するだけです

```shell
pnpm create slidev
```

```shell
$ pnpm create slidev

  ●■▲
  Slidev Creator  v0.50.0-beta.7

✔ Project name: … project-name
  Scaffolding project in project-name ...
  Done.

✔ Install and start it now? … yes
✔ Choose the package manager › pnpm
```

---

### 4.2. 新規スライドを作成する

`{project-root}/slides.md`ファイルが１スライドとなります。

作成中にプレビュー表示されるのは、このファイルです。

4.1 を経由した場合はすでにスライドが作成されているはずです。

---

### 4.3. 新しいページを作る

2ページ目以降を作成する場合は、`---`で区切ります。

基本的には **`slides.md`のみでスライドの全てのページ内容を作成** します。

```markdown
# 1ページ目

1ページ目の内容

---

# 2ページ目

2ページ目の内容
```

---

#### Tips : 別ファイルに分割する

各スライドの先頭に、オプションの[frontmatter](https://jekyllrb.com/docs/front-matter/)を追加してスライドを設定できます。

`src`属性を使って別ファイルに分割することも可能です。

```markdown
<!-- slides.md -->
# 1ページ目

1ページ目の内容

---
src: ./pages/imported-slides.md
hide: false
---
```

```markdown
<!-- ./pages/imported-slides.md -->
# 2ページ目

分割された2ページ目の内容
```

---

### 4.4. ページの内容を記述する

markdownの基本的な構文（[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)）で記述が可能です

またSlidev独自機能として、[MDC Syntax](https://sli.dev/features/mdc)も使用できます。

```markdown
---
mdc: true
---

# MDC Syntax

frontmatter に `mdc: true` を追加することで、MDC Syntax を使用できます。

This is a [red text]{style="color:red"} :inline-component{prop="value"}

---
```

---

### 4.5. 台本（スピーカーノート）を書く

Google Slide 等には、スピーカーノートという、発表中に発表者が見るための台本・補足情報を記述できる機能があります。
Slidev にも同様の機能があります。

**各スライドの末尾にあるコメントブロックが、スピーカーノートとして扱われます。**

```markdown
<!-- ここに記述してもダメです -->

# 1ページ目

<!--
このコメントアウト部分がスピーカーノートとして表示されます
-->
```

---

### 4.6. スライドのプレビュー

ローカル環境でスライドをプレビューするには、以下のコマンドを実行します。

```shell
pnpm slidev
```

リンクが3つ表示されますが、それぞれ以下の通りです。

- **public slide show** : スライドの公開URL
- **presenter mode** : プレゼンターモードのURL
  先ほど追加した**スピーカーノートはこのURLで確認**することができます
- **slides overview** : スライドの概要を表示するURL

---
layout: section
---
**🎉 ここまでできれば、あなたはSlidevで遊べるだけの知識を得ました！**

---
