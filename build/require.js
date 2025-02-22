/*
 * Copyright (C) 2022-2025 Akitsugu Komiyama
 * under the MIT License
 *
 * require v1.0.8.1
 */
/// <reference path="../../hm_jsmode_ts_definition/types/hm_jsmode_strict.d.ts" />
(function () {
    // requireの読み込み先から見た際に、これらの変数名を隠蔽するため。
    (function () {
        var guid = "{23CF9A38-A169-48D6-9C70-81951FEA88C8}";
        if (typeof (require) != 'undefined') {
            // 一致していたら上書きはしない
            if (require.guid && require.guid == guid) {
                return;
            }
        }
        function output(msg) {
            var msg_replaced = msg === null || msg === void 0 ? void 0 : msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            var op_dllobj = hidemaru.loadDll("HmOutputPane.dll");
            return op_dllobj.dllFunc.Output(hidemaru.getCurrentWindowHandle(), msg_replaced);
        }
        function tryfindpath(try_path, condition) {
            if (condition == null) {
                condition = true;
            }
            if (hidemaruGlobal.existfile(try_path) && condition) {
                return try_path;
            }
            return "";
        }
        function _require(module_path) {
            var found_path = "";
            var cmdir = hidemaruGlobal.currentmacrodirectory();
            var mdir = hidemaruGlobal.macrodir();
            var hdir = hidemaruGlobal.hidemarudir();
            if (module_path.match(/\.json$/i)) {
                found_path =
                    tryfindpath(cmdir + "\\" + module_path) ||
                        tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                        tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                        tryfindpath(module_path, module_path.match(/[\/\\]/));
                if (!found_path) {
                    throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
                }
                var json_data = hidemaru.loadTextFile(found_path);
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
            }
            else {
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
            var module_text = hidemaru.loadTextFile(found_path);
            var found_dir = found_path === null || found_path === void 0 ? void 0 : found_path.replace(/[\/\\][^\/\\]+?$/, "");
            return __require(module_text, { exports: {} }, found_path, found_dir);
        }
        if (typeof (require) != 'undefined') {
            if (require.guid == null || require.guid != guid) {
                output("本モジュールとは異なるrequireが、すでに定義されています。\r\n上書きします。\r\n");
            }
        }
        require = _require;
        require.guid = guid;
    })();
    function __require(__module_text, module, __filename, __dirname) {
        var _a, _b;
        try {
            // __module_text や __require を見えなくするために、引数に空宣言する
            return eval("(function(module, exports, __require, __module_text){ " + __module_text + "; " + "\nreturn module.exports; })(module, module.exports)");
        }
        catch (e) {
            var m = (_a = e.message) === null || _a === void 0 ? void 0 : _a.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            var s = (_b = e.stack) === null || _b === void 0 ? void 0 : _b.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            m = m || "";
            s = s || "";
            throw new Error("in " + __filename + "\r\n" + m + "\r\n" + s);
        }
        return null;
    }
})();
