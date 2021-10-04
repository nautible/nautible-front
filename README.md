# nautible-frontend

nautibleのサービスを確認するためのフロントエンドアプリケーション  
React+Typescriptで構築  

## 開発環境構築

### 前提条件

- Docker
- Docker-Compose
- npm (6.x)

Dockerfileをビルドし、ローカルにイメージを作成

プロキシ配下の場合

```
$ docker-compose build --build-arg http_proxy=<プロキシURL> --build-arg https_proxy=<プロキシURL>
$ docker images

REPOSITORY                   TAG                  IMAGE ID            CREATED             SIZE
nautible-front_nautible      latest               eaaa3de2f4c1        14 seconds ago      117MB
node                         14.11.0-alpine3.11   b85fc218c00b        16 hours ago        117MB
```

プロキシ配下でなければDockerfileからnpmのプロキシ設定をコメントアウトして以下を実行

```
$ docker-compose build
```

## 実行

### 初回実行

package.jsonの内容をローカルにインストール

```
$ cd app
$ npm install
```

```
$ docker-compose up
```

## 終了

```
$ docker-compose down
```


## 参考

### バックエンドのURLPrefix
バックエンドのURLのPrefixを環境変数に設定することで変更できます。必要に応じて活用してください。  
「/app/.env.sample」にあるサンプルを「/app/.env」にリネームすることで利用できます。

### プロジェクトの作成

初回は下記コマンドでプロジェクトを生成している

```
$ docker-compose run --rm nautible sh -c 'npx create-react-app nautible --template typescript'
```

### 初期作成時に導入したライブラリ

```
$ npm install react-router-dom
$ npm install @material-ui/core
$ npm install @material-ui/icons
$ npm install axios
```


# カラーパレット

```
https://material-ui.com/customization/default-theme/?expand-path=$.palette
```

# フォーム

```
https://react-hook-form.com/jp/
```
