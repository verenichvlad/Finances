System.register(['./file-select', './file-drop', './file-uploader'], function(exports_1) {
    var file_select_1, file_drop_1;
    var FILE_UPLOAD_DIRECTIVES;
    var exportedNames_1 = {
        'FILE_UPLOAD_DIRECTIVES': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (file_select_2_1) {
                exportStar_1(file_select_2_1);
                file_select_1 = file_select_2_1;
            },
            function (file_drop_2_1) {
                exportStar_1(file_drop_2_1);
                file_drop_1 = file_drop_2_1;
            },
            function (file_uploader_1_1) {
                exportStar_1(file_uploader_1_1);
            }],
        execute: function() {
            exports_1("FILE_UPLOAD_DIRECTIVES", FILE_UPLOAD_DIRECTIVES = [file_select_1.FileSelect, file_drop_1.FileDrop]);
        }
    }
});
//# sourceMappingURL=ng2-file-upload.js.map