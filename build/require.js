/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 *
 * require v1.0.5
 */
/// <reference path="../../hm_jsmode_ts_difinition/types/hm_jsmode_strict.d.ts" />
(function () {
    var __guid = "{23CF9A38-A169-48D6-9C70-81951FEA88C8}";
    function __output(msg) {
        var msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        var op_dllobj = hidemaru.loadDll("HmOutputPane.dll");
        return op_dllobj.dllFunc.Output(hidemaru.getCurrentWindowHandle(), msg_replaced);
    }
    function __tryfindpath(try_path, condition) {
        if (condition == null) {
            condition = true;
        }
        if (hidemaruGlobal.existfile(try_path) && condition) {
            return try_path;
        }
        return "";
    }
    function __require(module_path) {
        if (__require.modules == null) {
            __require.modules = {};
        }
        var found_path = "";
        var cmdir = hidemaruGlobal.currentmacrodirectory();
        var mdir = hidemaruGlobal.macrodir();
        var hdir = hidemaruGlobal.hidemarudir();
        if (module_path.match(/\.json$/i)) {
            found_path =
                __tryfindpath(cmdir + "\\" + module_path) ||
                    __tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                    __tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                    __tryfindpath(module_path, module_path.match(/[\/\\]/));
            if (!found_path) {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
            }
            var json_data = hidemaru.loadTextFile(found_path);
            return JSON.parse(json_data);
        }
        if (module_path.match(/\.js$/i)) {
            found_path =
                __tryfindpath(cmdir + "\\" + module_path) ||
                    __tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                    __tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                    __tryfindpath(module_path, module_path.match(/[\/\\]/));
            if (!found_path) {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
            }
        }
        else {
            found_path =
                __tryfindpath(cmdir + "\\" + module_path + ".js") ||
                    __tryfindpath(mdir + "\\jsmode_modules\\" + module_path + ".js") ||
                    __tryfindpath(mdir + "\\jsmode_modules\\" + module_path + "\\" + module_path + ".js") ||
                    __tryfindpath(hdir + "\\jsmode_modules\\" + module_path + ".js") ||
                    __tryfindpath(hdir + "\\jsmode_modules\\" + module_path + "\\" + module_path + ".js") ||
                    __tryfindpath(module_path + ".js", module_path.match(/[\/\\]/));
            if (!found_path) {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path + ".js");
            }
        }
        // if (__require.modules[found_path]) {
        //     return __require.modules[found_path];
        // } else {
        __require.modules[found_path] = { exports: {} };
        // }
        var module_text = hidemaru.loadTextFile(found_path);
        var found_dir = found_path.replace(/[\/\\][^\/\\]+?$/, "");
        return __require_expression(module_text, __require.modules[found_path], found_path, found_dir);
    }
    function __require_expression(__module_text, module, __filename, __dirname) {
        try {
            return eval("(function(module, exports){ " + __module_text + "; " + "\nreturn module.exports; })(module, module.exports)");
        }
        catch (e) {
            throw new Error("in " + __filename + "\r\n" + e.message + "\r\n" + e.stack);
        }
        return null;
    }
    if (typeof (require) != 'undefined') {
        if (require.guid == null || require.guid != __guid) {
            __output("本モジュールとは異なるrequireが、すでに定義されています。\r\n上書きします。\r\n");
        }
    }
    require = __require;
    require.guid = __guid;
})();
