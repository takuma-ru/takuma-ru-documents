---
title: "Webおじさん「WebComponentsはいいぞ」"
emoji: "👍"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["webcomponents", "lit"]
published: false
---
## はじめに
なんか昔から聞いたことあるけど、オワコンとか言われてるらしいけど、あんまりみんな使ってないけど、、、
そんなWebComponentsについて、今更ながら調べてみました。
調べてみると、とても便利で使いやすい技術だったので、今回はWebComponentsについてまとめてみました。
（筆者はぴちぴちの20代です）

## ❓ WebComponentsとは

### かんたんに
**オリジナルのエレメントを作れちゃう**技術です。
VueやReactでいうところのコンポーネントのようなものですね。
というか、JavaScriptライブラリのコンポーネント機能をブラウザの標準機能として実装したものです。

### もうちょっと詳しく
使い方はVueやReactのコンポーネントと似ていますが、コンポーネントの作り方は少し特殊です。
WebComponentsは以下の3つの技術を組み合わせて構成されています。
- **カスタム要素**
  カスタム要素とその動作を定義するための、一連の JavaScript API です。以降、ユーザーインターフェイスの中で好きなだけ使用することができます。(*1)
  **これがいわゆるコンポーネントを作ることができる機能です**。`<custom-element>`のようなオリジナルを要素を作成することができます。

- **シャドウ DOM**
  カプセル化された「シャドウ」 DOM ツリーを要素に紐付け、関連する機能を制御するための、一連の JavaScript API です。シャドウ DOM ツリーは、メイン文書の DOM とは別にレンダリングされます。こうして、要素の機能を公開せずに済み、文書の他の部分との重複を恐れることなく、スクリプト化やスタイル化できます。(*1)
  **これがいわゆるコンポーネントのDOMから完全に切り離す（カプセル化）する機能です**。`<custom-element>`の中で定義したスタイルは、`<custom-element>`の中でのみ有効になる程度の解釈でとりあえずはOKです。
  **この技術、ヤバヤバです！！！ReactやVueの scoped css, module css と同じような機能を標準でかつ、完全にDOMから分離することができます！**

- **HTML テンプレート**
  `<template>` と `<slot>` 要素によって、レンダリングされたページ内に表示されないマークアップのテンプレートを書くことができます。カスタム要素の構造体の基礎として、それらを何度も再利用できます。
  - `<template>`：HTMLのテンプレートを定義するための要素です。JavaScriptから参照、描画させることが可能です。そのため、同じテンプレートを複数の場所で何度も使用することができます。
    ```html
      <template id="my-template">
        <h1>これを書いただけではページ内の要素として描画されません！</h1>
      </template>

      <script>
        // 要素の取得が可能
        const template = document.querySelector('#my-template');
        const clone = document.importNode(template.content, true);
        document.body.appendChild(clone); // ここで描画
        document.body.appendChild(clone); // ここで描画
        document.body.appendChild(clone); // ここで描画（複製可能）
      </script>
    ```
  - `<slot>`：テンプレート内において、外部から要素を挿入するための要素です。
    Vueの`<slot>`、Reactの`props.children`と同じような機能です。
    ```html:<custom-button>コンポーネント
      <button>
        <slot></slot>
      </button>
    ```
    ```html
      <custom-button>
        <span>ボタンの中身</span> <!-- <= <slot>の部分に置換される -->
      </custom-button>
    ```


## 👍 WebComponentsのいいぞ
### 1. フレームワークに依存しない
言わずもがなですが、実装する際にVueやReactに依存することはありません。
そのため、フレームワーク依存の機能やバージョンアップによるサポート終了のリスクを回避することができます。

### 2. コンポーネントの再利用性がより高まる
View と Model を分離することができるので、コンポーネントの再利用性がより高まるよってことです。

となると、VueやReactと併用することが可能です。
例えば...
View : WebComponents
Model : Vue
みたいなことができます。

こんなことすることは珍しいかもしれないですが、デザインシステムとして構築する際には、実際のプロジェクト構築の際に、採用するフレームワークの選定に制限がかかることを防ぐことができます。
また、フレームワークに破壊的な（Vue2 -> Vue3みたいな）変更が発生した際でも、UI部分は修正する必要はなくなるので、他フレームワークへの移行コストを下げることができます。

### 3. ShadowDOM とかいうやばいやつを使って開発できる
先ほども説明しましたが、コンポーネントのDOMから完全に切り離す（カプセル化）ことができます。

![文書、シャドウルート、シャドウホストの相互作用を示す図の SVG 版。](https://developer.mozilla.org/ja/docs/Web/API/Web_components/Using_shadow_DOM/shadowdom.svg)


## 👎 WebComponentsのだめぞ
### 1. 機能がブラウザに依存

### 2. ドキュメントが少ない

### 3. 扱える人が少ない

## 👶 使ってみよう（基礎編）
素のWebComponents記法を使って簡単なボタンを実装してみよう。

## 🧒 使ってみよう（応用編）
SSRに対応したWebComponentsを実装してみよう。

## 🧑 使ってみよう(本格編)
実際に案件に導入する際は、WebComponentsライブラリを使用することで、型安全性や開発効率を保ったまま開発が行えます。
本当はここで紹介したかったのですが、あくまで今回はWebComponentsの紹介記事なので、別記事として公開予定です。

ちなみに...
**[Lit](https://lit.dev/)**
というライブラリを用いてWebページの開発を行うことができます。*（コンポーネントのみLitで開発を行って、ロジックはReactやVueで行うことも可能です！）*

Google が公開している [Material Web](https://material-web.dev/components/button/) というUIライブラリ や [Microsoftのアプリストア](https://apps.microsoft.com/home?hl=ja-jp&gl=JP)もLitを使用して開発されています。

ただ記法が独特なので、大規模案件では導入コストがかかるかもしれません...

## まとめ

## 参考文献/出典
*1 : [ウェブコンポーネント - mdn web docs](https://arc.net/l/quote/ajgmtcut)