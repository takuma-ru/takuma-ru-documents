---
title: "Reactアニメーションライブラリって結局何がいいの？"
emoji: "🧪"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["Animation", "React", "Framer", "WebAnimationsAPI", "Nextjs"]
published: true
---
<!-- e8b6a0df7a72cd -->

# はじめに
みなさんはReactでアニメーションを実装する時、どのライブラリを使っていますか？
Reactでアニメーションを実装するライブラリはたくさんありますが、どれを使えばいいのか迷ってしまいますよね。





# 比べてやろうじゃないか...
というわけで、今回はReactの人気アニメーションライブラリ2点＋ライブラリなしでの実装を比較し、どれがいいのかを考察していきます。

#### 比較するライブラリ
**1. ライブラリを使用せず実装(JS only)**
  ライブラリを使用しない場合は**Web Animations API**を使用することで比較的楽にアニメーションを実装することができます。今回はこれを使用します。
https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API

**2. Framer Motion**
  Framer MotionはFramer社が開発しているアニメーションライブラリで、エレメントタグを拡張する形でアニメーションを実装することができます。
https://www.framer.com/motion/

**3. react-spring**
  spring-physics（ばねの物理学）を原点とするアニメーションライブラリです。easingに関して独自の考えを持っており、直感的にeasingを実装することができる点が特徴です。
https://www.react-spring.dev/

#### 検証環境

| 項目         | 数値                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| 検証機       | M2 MacBook Pro                                                                                         |
| OS           | Mac OS 13.4                                                                                            |
| プロジェクト | Monorepo Next.js Project ([ソースコードを参照](https://github.com/takuma-ru/next-anim-lib-comparison)) |
| ブラウザ     | Arc                                                                                                    |
| エンジン     | Chromium Version 114.0.5735.133 (Official Build) (arm64)                                               |

#### 比較に使用するもの
それぞれのライブラリで、**開閉アニメーション付きアコーディオンコンポーネント**を実装する。
実装時の条件は以下の通り。
- `<details>`と`<summary>` (実用的かつ実装が複雑という点で採用)
- 開閉の切り替えはdetailsタグの`open`属性を使用（i11y対策）
- durationは`400ms`
- easingは `cubic-bezier(0.4, 0.0, 0.2, 1)`

#### 検証項目
以下の3点を結果を測定する。
測定後、**各項目ごとの評価**と**総合的な評価**を行う。
#### 1. 実装コスト
行数・文字数に加え、作成する変数や関数の数も測定する。
実装時に時間がかかった箇所や、自分で工夫した点をポイントとしてまとめる。
#### 2. ビルドサイズ
`yarn build`実行時のビルドサイズを測定する。
#### 3. パフォーマンス
LightHouseのパフォーマンススコアを測定する。

# 結果
|                | 実装コスト               | ビルドサイズ                                      | パフォーマンス |
| -------------- | ------------------------ | ------------------------------------------------- | -------------- |
| ライブラリなし | **99**行<br>**2779**文字 | Size: **1.58** kB<br>  First Load JS: **78.9** kB | 約**83** pt    |
| Framer Motion  | **85**行<br>**2386**文字 | Size: **35.2** kB<br>  First Load JS: **112** kB  | 約**80** pt    |
| react-spring   | **83**行<br>**2474**文字 | Size: **17.8** kB<br>  First Load JS: **95.1** kB | 約**80** pt    |

**実装コスト**は**Framer Motion**が一番良いという結果になった。理由等は後述。
**ビルドサイズ**はら**ライブラリを使用せず実装**した場合は一番小さいという結果になった。
**パフォーマンス**はどれもほぼ同じという結果になった。






# 解説1：ライブラリを使用せず実装(JS only)
まずはライブラリを使用せずにアニメーションを実装してみます。

## 実装したコード
https://github.com/takuma-ru/next-anim-lib-comparison/blob/49423b385e09b5e672f78e19d785aa8407bac9b4/default/src/app/_components/Accordion.tsx

## 結果
### 1. 実装コスト
**99行**、**2779文字**で実装することができた。
変数は**4つ**。
・easing等のconfig変数
・開閉フラグのstate
・details要素の参照を行うref
・アコーディオンの中身要素の参照を行うref

関数は**3つ**。
・アコーディオンを開く関数
・アコーディオンを閉じる関数
・開閉どちらを実行するかを判定する関数

#### 実装時のポイント
- アコーディオンの中身の高さを`auto`にしてしまうと正常に動作しない。そのため、useRefを用いて高さを取得する処理を実装した。
- easingやdurationはアニメーション実行関数(`.animate()`)の引数に毎回渡する必要があるため変数化した。

### 2. ビルドサイズ
`yarn build`を行った結果
```
Route (app)                                Size     First Load JS
┌ ○ /                                      1.58 kB        78.9 kB
└ ○ /favicon.ico                           0 B                0 B
+ First Load JS shared by all              77.3 kB
  ├ chunks/62-68b3c52ca89ed77b.js          24.8 kB
  ├ chunks/d4618404-1a4e538510290108.js    50.5 kB
  ├ chunks/main-app-71fc4a4c36b17cc9.js    214 B
  └ chunks/webpack-0d81cf5b3d6f867f.js     1.71 kB
```


### 3. パフォーマンス
スコアにばらつきはあるが、平均で**80**pt程度のスコアを出すことができた。
![](https://storage.googleapis.com/zenn-user-upload/d8f2485729e7-20230620.png)





# 解説2：Framer Motion
次にFramer Motionを使用してアニメーションを実装してみます。

## 実装したコード
https://github.com/takuma-ru/next-anim-lib-comparison/blob/49423b385e09b5e672f78e19d785aa8407bac9b4/framer-motion/src/app/_components/Accordion.tsx
## 結果
### 1. 実装コスト
**85**行、**2386**文字で実装することができた。
変数は**2つ**。
・開閉フラグのstate
・アニメーションを操作するためのライブラリ関数から取得した変数(`controls`)

関数は**3つ**。
・アコーディオンを開く関数
・アコーディオンを閉じる関数
・開閉どちらを実行するかを判定する関数

#### 実装時のポイント
- `height: auto`が使える！ため、実装側でアコーディオンの中身の高さを取得する処理を実装する必要がない。
- アニメーションは全て`<motion.div>`の属性として設定することができる。しかし、今回は開閉状態をdetails要素の`open`属性で管理している。そのため、アコーディオンを閉じるアニメーション実行後に`open`属性を`false`にする必要がある。
  よって、`useAnimationControls()`を用いてアニメーションを実行する関数を作成し、その関数を実行することでアニメーション実行後に`open`属性を`false`にすることができるようにした。


### 2. ビルドサイズ
`yarn build`を行った結果
```
Route (app)                                Size     First Load JS
┌ ○ /                                      35.2 kB         112 kB
└ ○ /favicon.ico                           0 B                0 B
+ First Load JS shared by all              77.3 kB
  ├ chunks/62-027e33f9bf1dc1e8.js          24.8 kB
  ├ chunks/d4618404-46b7da6a3feab3af.js    50.5 kB
  ├ chunks/main-app-f86c3309ceff16b4.js    211 B
  └ chunks/webpack-0d81cf5b3d6f867f.js     1.71 kB
```

### 3. パフォーマンス
スコアにばらつきはあるが、平均で**80**pt程度のスコアを出すことができた。
![](https://storage.googleapis.com/zenn-user-upload/f03e11aa080a-20230620.png)





# 解説3：react-spring
次にreact-springを使用してアニメーションを実装してみます。

## 実装したコード
https://github.com/takuma-ru/next-anim-lib-comparison/blob/49423b385e09b5e672f78e19d785aa8407bac9b4/react-spring/src/app/_components/Accordion.tsx

## 結果
### 1. 実装コスト
**83**行、**2474**文字で実装することができた。
変数は**4つ**。
・開閉フラグのstate
・アコーディオンの中身要素の参照を行うref
・アニメーション用のstyleを保存するライブラリ関数から取得した変数(`springs`)
・アニメーションの制御を行うライブラリ変数から取得した変数(`api`)

関数は**3つ**。
・アコーディオンを開く関数
・アコーディオンを閉じる関数
・開閉どちらを実行するかを判定する関数

#### 実装時のポイント
- アコーディオンの中身の高さを`auto`にしてしまうと正常に動作しない。そのため、useRefを用いて高さを取得する処理を実装した。
- react-springではeasingに独自の考えを持っており、通常の`cubic-bezier`ベースでの実装ができない。そのため、**`bezier-easing`というライブラリを使用**し、react-springで使用できる形に変換した。
- アニメーション実行関数に完了時を示すコールバック関数を渡すことができない。そのため、`useSpring`で変数を生成する際に`onRest`というプロパティにコールバック関数を渡すことで対応した。

### 2. ビルドサイズ
`yarn build`を行った結果
```
Route (app)                                Size     First Load JS
┌ ○ /                                      17.8 kB        95.1 kB
└ ○ /favicon.ico                           0 B                0 B
+ First Load JS shared by all              77.3 kB
  ├ chunks/488-9bf80f03c6cec63c.js         24.9 kB
  ├ chunks/bce60fc1-e6ab7d63ba93d2f1.js    50.5 kB
  ├ chunks/main-app-c66ee119425b6c99.js    218 B
  └ chunks/webpack-0d81cf5b3d6f867f.js     1.71 kB
```

### 3. パフォーマンス
スコアにばらつきはあるが、平均で**80**pt程度のスコアを出すことができた。

![](https://storage.googleapis.com/zenn-user-upload/7c37b54ceafd-20230620.png)





# 考察
## 実装コストに関して
実装コストを考慮するのであれば**Framer Motion**が一番良いと考えられる。

理由としてはアコーディオンの中身の高さを`auto`に設定しても正常に動作したことや、アニメーションに関するロジックがあまり分散せず、何ヶ所かにまとまっていたことが挙げられる。(詳細は後述)

## ビルドサイズに関して
ビルドサイズを考慮するのであれば、**ライブラリを使用しないで実装**した方が良いと考えられる。

ライブラリを使用すると、ライブラリのコードが含まれるため、ビルドサイズが大きくため、こうなることは必然だろう。
しかし、全てをライブラリを使用せずに実装すると、実装側の実装量や実装・保守コストが大きくなる可能性もある。そこは考慮すべきだろう。

## パフォーマンスに関して
**小規模であればどのライブラリを使用しても問題ない**と考えられる。

しかし、アプリの規模が大きくなればなるほどライブラリ内部で行う処理増えるため、パフォーマンスに関しても差が出てくると考えられる。
そのため、アプリの規模に応じてライブラリを選定する必要があるだろう。


## 結局何がいいの？
総合的に考えた場合だと、小規模のアプリの場合は**Framer Motion**が一番良いと考えられる。
理由としては、実装量や実装のしやすさが良かったことが一番大きい。ビルドサイズは他の比べて大きかったが、実装コストが低い方が個人的には重要度が高いためというのもある。

ただ、コンポーネント数が増えた場合やアプリの規模が大きくなった場合は、ビルドサイズやパフォーマンスにも大きく影響を与える可能性もある。ここは規模に合わせて各々で考える必要でありそうだ。





# さいごに
今回はアニメーション付きのアコーディオンコンポーネントの実装を通して、各ライブラリの実装のしやすさやビルドサイズ、パフォーマンスに関して調査を行ってみました。

結論として、私は**Framer Motion**が一番良いという考えに辿り着きました。

しかし、今回は小さなコンポーネントを一つ実装して検証するというとても簡易的なものでした。
そのため、ビルドサイズやパフォーマンスに関してはあまり差が出ず、多面的な評価ができなかったのは反省点です。
次回調査する機会があれば複数のコンポーネントや複雑なアニメーションを実装して調査を行ってみようと思います！

また、今回は3つを比較しましたが、他にもアニメーションライブラリはたくさんあります。
**「これはオススメ！」** というライブラリがあれば、ぜひコメントで教えてくれると嬉しいです！


#### 参考文献
- https://developer.mozilla.org/ja/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
- https://www.framer.com/motion/
- https://www.react-spring.dev/
- https://and-engineer.com/articles/YcpgYBAAACIAupaf

#### 検証に使用したコード
https://github.com/takuma-ru/next-anim-lib-comparison

#### 作者
Vue.js好きのフロントエンドエンジニアです。
ライブラリとか作ってるのでぜひ使ってみてください。
https://github.com/takuma-ru
https://github.com/takuma-ru/vue-swipe-modal