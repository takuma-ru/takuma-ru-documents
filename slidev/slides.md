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

## Slidevとは？

---

**Slidev** は **Markdown** ベースで構築できるプレゼンテーションライブラリです。
数々のOSSに携わってきている **Anthony Fu** さん([antfu.me](https://antfu.me/))が開発したライブラリで、 **Vue.js** をベースに構築されています。

### 2.1. Slidev の特徴

- **Markdownで記述**
- **開発者フレンドリー**
- **Vue.js, CSS でインタラクティブで表現力豊かなカスタマイズが可能**
- **多様な公開方法**
- **Vite で高速なビルド**

詳細は[Slidev - Slidevを選ぶ理由](https://sli.dev/guide/why#why-slidev)

---
layout: section
---

## Default Markdown Syntax

---

# Headers

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2

---

# Emphasis

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

---

# Lists

1. First ordered list item
2. Another item
   ⋅⋅\* Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   ⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses

---

# Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

---
layout: section
---

## Animation

---
layout: MyLayout
---

### v-click

<v-click>
   <p>この要素は 1回 Right Arrow や Space キーを押すことで表示されました</p>
</v-click>

<div v-click>
  <p>この要素は 2回 Right Arrow や Space キーを押すことで表示されました</p>
</div>

---

<div class="absolute bottom-5 left-10">
  <span class="font-size-2">
    {{ $slidev.configs.title }}
  </span>
</div>

<div class="grid pt-4 gap-4 grid-cols-[100px,1fr]">

### Name

- Item 1
- Item 2

</div>

<div class="absolute bottom-5 right-5">
  <span class="font-size-2">
    {{ $page }}
  </span>
</div>
