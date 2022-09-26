/**
 * @file 秀丸のjsmode用のTypeScript定義ファイル
 * @author Akitsugu Komiyama
 * @license MIT
 * @version v1.0.4
 */

/**
 *
 * require関数は、node-js の require の超簡易版です。    
 * JSONファイル、もしくは、JavaScriptファイルを読み込むことが出来ます。    
 *
 * @param module_path
 * モジュールのパスを指定します。
 * 
 * 検索対象・検索順序    
 * 1. currentmacrodirectory/[module_path(.js)]
 *     (現在実行しているマクロのディレクトリ)    
 * 2. macrodir/jsmode_modules/[module_path(.js)]
 *     (指定のマクロ用フォルダのjsmode_modulesというサブディレクトリ)    
 * 3. macrodir/jsmode_modules/[module_path]/[module_path(.js)]
 *     (指定のマクロ用フォルダのjsmode_modulesというサブディレクトリ下の指定の文字列と同じサブディレクトリ)    
 * 4. hidemarudir/jsmode_modules/[module_path(.js)]    
 *     (秀丸本体ディレクトリのjsmode_modulesというサブディレクトリ)    
 * 5. hidemarudir/jsmode_modules/[module_path]/[module_path(.js)]    
 *     (秀丸本体ディレクトリのjsmode_modulesというサブディレクトリ下の指定の文字列と同じサブディレクトリ)    
 * 6. カレントフォルダ    
 *
 * の順番にファイルを探します。
 * 
 * - module.exports    
 * - exports     
 * 
 * のみが実装されています。    
 * 
 * - nodeのrequireにあるような、他の様々な機能やプロパティはありません。    
 * - nodeのrequireにあるような、キャッシュ機能はありません。
 * 
 * @see jsmode の require 関数
 * @link https://xn--pckzexbx21r8q9b.net/?page=nobu_tool_hm_jsmode_require
 *
 * @returns
 * 指定のモジュールのオブジェクト。    
 * 読み込みに失敗した場合は例外が発生する。    
 */
declare function require(module_path: string): any;
