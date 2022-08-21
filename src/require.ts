/*!
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 */

declare var require: any;

(function () {

    var _outputpane_dllobj: hidemaru.ILoadDllResult = null;

    function _output(msg: string): boolean {

        if (!_outputpane_dllobj) {
            _outputpane_dllobj = hidemaru.loadDll(hidemaruGlobal.hidemarudir() + "/HmOutputPane.dll");
        }

        if (_outputpane_dllobj) {
            var msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            return _outputpane_dllobj.dllFunc.Output(hidemaruGlobal.hidemaruhandle(0), msg_replaced);
        }

        return false;
    }

    function _require(filepath: string): any {
        var m_file_path: string = "";
        var m_currentmacrodirectory: string = hidemaruGlobal.currentmacrodirectory();
        var m_macrodir: string = hidemaruGlobal.macrodir();
        var m_hidemardir: string = hidemaruGlobal.hidemarudir();
        if (filepath.match(/\.json$/i)) {
            if (hidemaruGlobal.existfile(m_currentmacrodirectory + "\\" + filepath)) {
                m_file_path = m_currentmacrodirectory + "\\" + filepath;
            }
            else if (hidemaruGlobal.existfile(m_macrodir + "\\jsmode_modules\\" + filepath)) {
                m_file_path = m_macrodir + "\\jsmode_modules\\" + filepath;
            }
            else if (hidemaruGlobal.existfile(m_hidemardir + "\\jsmode_modules\\" + filepath)) {
                m_file_path = m_hidemardir + "\\jsmode_modules\\" + filepath;
            }
            else if (hidemaruGlobal.existfile(filepath)) {
                m_file_path = filepath;
            }

            if (m_file_path == "") {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + filepath);
            }

            var json_data: string | undefined = hidemaru.loadTextFile(m_file_path);
            return JSON.parse(json_data);
        }

        if (filepath.match(/\.js$/i)) {
	        if (hidemaruGlobal.existfile(m_currentmacrodirectory + "\\" + filepath)) {
	            m_file_path = m_currentmacrodirectory + "\\" + filepath;
	        }
	        else if (hidemaruGlobal.existfile(m_macrodir + "\\jsmode_modules\\"  + filepath)) {
	            m_file_path = m_macrodir + "\\jsmode_modules\\" + filepath;
	        }
	        else if (hidemaruGlobal.existfile(m_hidemardir + "\\jsmode_modules\\"  + filepath)) {
	            m_file_path = m_hidemardir + "\\jsmode_modules\\" + filepath;
	        }
	        else if (hidemaruGlobal.existfile(filepath)) {
	            m_file_path = filepath;
	        }
        } else {
            if (hidemaruGlobal.existfile(m_currentmacrodirectory + "\\" + filepath + ".js")) {
                m_file_path = m_currentmacrodirectory + "\\" + filepath + ".js";
            }
            else if (hidemaruGlobal.existfile(m_macrodir + "\\jsmode_modules\\" + filepath + ".js")) {
                m_file_path = m_macrodir + "\\jsmode_modules\\" + filepath + ".js";
            }
            else if (hidemaruGlobal.existfile(m_macrodir + "\\jsmode_modules\\" + filepath + "\\" + filepath + ".js")) {
                m_file_path = m_macrodir + "\\jsmode_modules\\" + filepath + "\\" + filepath + ".js";
            }
            else if (hidemaruGlobal.existfile(m_hidemardir + "\\jsmode_modules\\" + filepath + ".js")) {
                m_file_path = m_hidemardir + "\\jsmode_modules\\" + filepath + ".js";
            }
            else if (hidemaruGlobal.existfile(m_hidemardir + "\\jsmode_modules\\" + filepath + "\\" + filepath + ".js")) {
                m_file_path = m_hidemardir + "\\jsmode_modules\\" + filepath + "\\" + filepath + ".js";
            }
            else if (hidemaruGlobal.existfile(filepath + ".js")) {
                m_file_path = filepath;
            }
        }

        if (m_file_path == "") {
            if (filepath.match(/\.js$/i)) {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + filepath);
            }
            else {
                throw new Error("HidemaruMacroRequireFileNotFoundException: \n" + filepath + ".js");
            }
        }

        var module_code = hidemaru.loadTextFile(m_file_path);
        var module_dir = m_file_path.replace(/[\/\\][^\/\\]+?$/, "");
        var expression = "(function(){ var module = { filename:m_file_path, directory:module_dir, exports: {} }; var exports = module.exports; " +
            module_code + "; " + "\nreturn module.exports; })()";

        var eval_obj = null;
        try {
            eval_obj = eval(expression);
        }
        catch (e) {
            throw new Error("in " + m_file_path + "\r\n" + e.message + "\r\n" + e.stack);
        }
        return eval_obj;
    }

    require = _require;
})();




