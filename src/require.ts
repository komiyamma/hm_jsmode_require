/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 * 
 * require v1.0.3
 */

declare var require: any;

(function () {
    var guid = "{23CF9A38-A169-48D6-9C70-81951FEA88C8}";

    var op_dllobj: hidemaru.ILoadDllResult = null;

    function output(msg: string): boolean {

        if (!op_dllobj) {
            op_dllobj = hidemaru.loadDll(hidemaruGlobal.hidemarudir() + "\\HmOutputPane.dll");
        }

        if (op_dllobj) {
            var msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            return op_dllobj.dllFunc.Output(hidemaruGlobal.hidemaruhandle(0), msg_replaced);
        }

        return false;
    }

    function tryfindpath(try_path: string, condition?: any = true) {
        if (hidemaruGlobal.existfile(try_path) && condition) {
            return try_path;
        }
        return "";
    }

    function _require(module_path: string): any {
        var found_path: string = "";
        var cmdir: string = hidemaruGlobal.currentmacrodirectory();
        var mdir: string = hidemaruGlobal.macrodir();
        var hdir: string = hidemaruGlobal.hidemarudir();

        if (module_path.match(/\.json$/i)) {
            found_path =
                tryfindpath(cmdir + "\\" + module_path) ||
                tryfindpath(mdir + "\\jsmode_modules\\" + module_path) ||
                tryfindpath(hdir + "\\jsmode_modules\\" + module_path) ||
                tryfindpath(module_path, module_path.match(/[\/\\]/));

            if (!found_path) {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + module_path);
            }

            var json_data: string | undefined = hidemaru.loadTextFile(found_path);
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

        var module_text = hidemaru.loadTextFile(found_path);
        var found_dir = found_path.replace(/[\/\\][^\/\\]+?$/, "");
        var expression = "(function(){ var module = { filename:found_path, directory:found_dir, exports: {} }; var exports = module.exports; " +
            module_text + "; " + "\nreturn module.exports; })()";

        var eval_obj = null;
        try {
            eval_obj = eval(expression);
        }
        catch (e) {
            throw new Error("in " + found_path + "\r\n" + e.message + "\r\n" + e.stack);
        }
        return eval_obj;
    }

    if (typeof (require) != 'undefined') {
        if (require.guid == null || require.guid != guid) {
            output("本モジュールとは異なるrequireが、すでに定義されています。\r\n上書きします。\r\n");
        }
    }
    require = _require;
    require.guid = guid;
})();




