/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 * 
 * require v1.0.8
 */
/// <reference path="../../hm_jsmode_ts_difinition/types/hm_jsmode_strict.d.ts" />

declare var require: any;

(function () {
    // requireの読み込み先から見た際に、これらの変数名を隠蔽するため。
    (function () {
        const __guid = "{23CF9A38-A169-48D6-9C70-81951FEA88C8}";
        if (typeof (require) != 'undefined') {
            // 一致していたら上書きはしない
            if (require.guid && require.guid == __guid) {
                return;
            }
        }
        let modules: object = {};

        function output(msg: string): number {
            let msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            let op_dllobj = hidemaru.loadDll("HmOutputPane.dll");
            return op_dllobj.dllFunc.Output(hidemaru.getCurrentWindowHandle(), msg_replaced);
        }

        function tryfindpath(try_path: string, condition?: any): string {
            if (condition == null) {
                condition = true;
            }
            if (hidemaruGlobal.existfile(try_path) && condition) {
                return try_path;
            }
            return "";
        }

        function _require(module_path: string): any {

            let found_path: string = "";
            const cmdir: string = hidemaruGlobal.currentmacrodirectory();
            const mdir: string = hidemaruGlobal.macrodir();
            const hdir: string = hidemaruGlobal.hidemarudir();

            if (module_path.match(/\.json$/i)) {
                found_path =
                    tryfindpath(cmdir + "\\" + module_path) ||
                    tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                    tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                    tryfindpath(module_path, module_path.match(/[\/\\]/));

                if (!found_path) {
                    throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
                }

                let json_data: string | undefined = hidemaru.loadTextFile(found_path);
                return JSON.parse(json_data);
            }

            if (module_path.match(/\.js$/i)) {
                found_path =
                    tryfindpath(cmdir + "\\" + module_path) ||
                    tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                    tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                    tryfindpath(module_path, module_path.match(/[\/\\]/));

                if (!found_path) {
                    throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
                }
            } else {
                found_path =
                    tryfindpath(cmdir + "\\" + module_path + ".js") ||
                    tryfindpath(mdir + "\\jsmode_modules\\" + module_path + ".js") ||
                    tryfindpath(mdir + "\\jsmode_modules\\" + module_path + "\\" + module_path + ".js") ||
                    tryfindpath(hdir + "\\jsmode_modules\\" + module_path + ".js") ||
                    tryfindpath(hdir + "\\jsmode_modules\\" + module_path + "\\" + module_path + ".js") ||
                    tryfindpath(module_path + ".js", module_path.match(/[\/\\]/));

                if (!found_path) {
                    throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path + ".js");
                }
            }

            modules[found_path] = { exports: {} };

            const module_text = hidemaru.loadTextFile(found_path);
            const found_dir = found_path.replace(/[\/\\][^\/\\]+?$/, "");
            return __require(module_text,modules[found_path], found_path, found_dir);
        }

        if (typeof (require) != 'undefined') {
            if (require.guid == null || require.guid != __guid) {
                output("本モジュールとは異なるrequireが、すでに定義されています。\r\n上書きします。\r\n");
            }
        }
        require = _require;
        require.guid = __guid;
    })();

    function __require(__module_text: string, module: any, __filename: string, __dirname: string): any {
        try {
            // __module_text や __require を見えなくするために、引数に空宣言する
            return eval("(function(module, exports, __require, __module_text){ " + __module_text + "; " + "\nreturn module.exports; })(module, module.exports)");
        }
        catch (e) {
            let m = e.message.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            let s = e.stack.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            throw new Error("in " + __filename + "\r\n" + m + "\r\n" + s);
        }
        return null;
    }

})();




