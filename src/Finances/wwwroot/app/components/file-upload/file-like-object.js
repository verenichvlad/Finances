System.register([], function(exports_1) {
    var FileLikeObject;
    function isElement(node) {
        return !!(node && (node.nodeName || node.prop && node.attr && node.find));
    }
    return {
        setters:[],
        execute: function() {
            FileLikeObject = (function () {
                function FileLikeObject(fileOrInput) {
                    var isInput = isElement(fileOrInput);
                    var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
                    var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
                    var method = '_createFrom' + postfix;
                    this[method](fakePathOrObject);
                }
                FileLikeObject.prototype._createFromFakePath = function (path) {
                    this.lastModifiedDate = null;
                    this.size = null;
                    this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
                    this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
                };
                FileLikeObject.prototype._createFromObject = function (object) {
                    // this.lastModifiedDate = copy(object.lastModifiedDate);
                    this.size = object.size;
                    this.type = object.type;
                    this.name = object.name;
                };
                return FileLikeObject;
            })();
            exports_1("FileLikeObject", FileLikeObject);
        }
    }
});
//# sourceMappingURL=file-like-object.js.map