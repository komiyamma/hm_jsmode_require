/**
 * @file 秀丸のjsmode用のTypeScript定義ファイル
 * @author Akitsugu Komiyama
 * @license MIT
 * @version v1.0.0
 */

/**
 *
 * require関数は、node-js の require の超簡易版です。    
 * JSONファイル、もしくは、JavaScriptファイルを読み込むことが出来ます。    
 *
 * - currentmacrodirectory (現在実行しているマクロのディレクトリ)
 * - macrodir/jsmode_modules (指定のマクロ用フォルダのjsmode_modulesというサブディレクトリ)
 * - hidemarudir/jsmode_modules (秀丸本体ディレクトリのjsmode_modulesというサブディレクトリ)
 * - カレントフォルダ
 *
 * の順番にファイルを探します。
 * 
 * - module.exports
 * - exports 
 * のみが実装されています。    
 * 他の機能やプロパティはありません。    
 * キャッシュ機能はありません。
 */
declare function require(module_path: string): any;
