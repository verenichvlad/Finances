System.register(['./file-like-object', './file-item', "./../../helpers/LiteEvent"], function(exports_1) {
    var file_like_object_1, file_item_1, LiteEvent_1;
    var FileUploader;
    function isFile(value) {
        return (File && value instanceof File);
    }
    function isFileLikeObject(value) {
        return value instanceof file_like_object_1.FileLikeObject;
    }
    return {
        setters:[
            function (file_like_object_1_1) {
                file_like_object_1 = file_like_object_1_1;
            },
            function (file_item_1_1) {
                file_item_1 = file_item_1_1;
            },
            function (LiteEvent_1_1) {
                LiteEvent_1 = LiteEvent_1_1;
            }],
        execute: function() {
            FileUploader = (function () {
                function FileUploader(options) {
                    this.options = options;
                    this.isUploading = false;
                    this.queue = [];
                    this.progress = 0;
                    this.autoUpload = false;
                    this.isHTML5 = true;
                    this.removeAfterUpload = false;
                    this._nextIndex = 0;
                    this.filters = [];
                    this.onUploadComplete = new LiteEvent_1.LiteEvent();
                    // Object.assign(this, options);
                    this.url = options.url;
                    this.authToken = options.authToken;
                    this.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
                    this.filters.unshift({ name: 'folder', fn: this._folderFilter });
                }
                FileUploader.prototype.addToQueue = function (files, options, filters) {
                    var _this = this;
                    var list = [];
                    for (var _i = 0; _i < files.length; _i++) {
                        var file = files[_i];
                        list.push(file);
                    }
                    var arrayOfFilters = this._getFilters(filters);
                    var count = this.queue.length;
                    var addedFileItems = [];
                    list.map(function (some) {
                        var temp = new file_like_object_1.FileLikeObject(some);
                        var fileItem = new file_item_1.FileItem(_this, some, options);
                        addedFileItems.push(fileItem);
                        _this.queue.push(fileItem);
                        _this._onAfterAddingFile(fileItem);
                    });
                    if (this.queue.length !== count) {
                        this._onAfterAddingAll(addedFileItems);
                        this.progress = this._getTotalProgress();
                    }
                    this._render();
                    if (this.autoUpload) {
                        this.uploadAll();
                    }
                };
                FileUploader.prototype.removeFromQueue = function (value) {
                    var index = this.getIndexOfItem(value);
                    var item = this.queue[index];
                    if (item.isUploading) {
                        item.cancel();
                    }
                    this.queue.splice(index, 1);
                    this.progress = this._getTotalProgress();
                };
                FileUploader.prototype.clearQueue = function () {
                    while (this.queue.length) {
                        this.queue[0].remove();
                    }
                    this.progress = 0;
                };
                FileUploader.prototype.uploadItem = function (value) {
                    var index = this.getIndexOfItem(value);
                    var item = this.queue[index];
                    var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';
                    item._prepareToUploading();
                    if (this.isUploading) {
                        return;
                    }
                    this.isUploading = true;
                    this[transport](item);
                };
                FileUploader.prototype.cancelItem = function (value) {
                    var index = this.getIndexOfItem(value);
                    var item = this.queue[index];
                    var prop = this.isHTML5 ? '_xhr' : '_form';
                    if (item && item.isUploading) {
                        item[prop].abort();
                    }
                };
                FileUploader.prototype.uploadAll = function () {
                    var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
                    if (!items.length) {
                        return;
                    }
                    items.map(function (item) { return item._prepareToUploading(); });
                    items[0].upload();
                };
                FileUploader.prototype.cancelAll = function () {
                    var items = this.getNotUploadedItems();
                    items.map(function (item) { return item.cancel(); });
                };
                FileUploader.prototype.isFile = function (value) {
                    return isFile(value);
                };
                FileUploader.prototype.isFileLikeObject = function (value) {
                    return value instanceof file_like_object_1.FileLikeObject;
                };
                FileUploader.prototype.getIndexOfItem = function (value) {
                    return typeof value === 'number' ? value : this.queue.indexOf(value);
                };
                FileUploader.prototype.getNotUploadedItems = function () {
                    return this.queue.filter(function (item) { return !item.isUploaded; });
                };
                FileUploader.prototype.getReadyItems = function () {
                    return this.queue
                        .filter(function (item) { return (item.isReady && !item.isUploading); })
                        .sort(function (item1, item2) { return item1.index - item2.index; });
                };
                FileUploader.prototype.destroy = function () {
                    /*forEach(this._directives, (key) => {
                     forEach(this._directives[key], (object) => {
                     object.destroy();
                     });
                     });*/
                };
                FileUploader.prototype.onAfterAddingAll = function (fileItems) {
                };
                FileUploader.prototype.onAfterAddingFile = function (fileItem) {
                };
                FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
                };
                FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
                };
                FileUploader.prototype.onProgressItem = function (fileItem, progress) {
                };
                FileUploader.prototype.onProgressAll = function (progress) {
                };
                FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
                };
                FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
                };
                FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
                };
                FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
                };
                Object.defineProperty(FileUploader.prototype, "UploadCompleted", {
                    get: function () { return this.onUploadComplete; },
                    enumerable: true,
                    configurable: true
                });
                FileUploader.prototype.onCompleteAll = function () {
                    this.onUploadComplete.trigger(true);
                };
                FileUploader.prototype._getTotalProgress = function (value) {
                    if (value === void 0) { value = 0; }
                    if (this.removeAfterUpload) {
                        return value;
                    }
                    var notUploaded = this.getNotUploadedItems().length;
                    var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
                    var ratio = 100 / this.queue.length;
                    var current = value * ratio / 100;
                    return Math.round(uploaded * ratio + current);
                };
                FileUploader.prototype._getFilters = function (filters) {
                    if (!filters) {
                        return this.filters;
                    }
                    if (Array.isArray(filters)) {
                        return filters;
                    }
                    var names = filters.match(/[^\s,]+/g);
                    return this.filters
                        .filter(function (filter) { return names.indexOf(filter.name) !== -1; });
                };
                FileUploader.prototype._render = function () {
                    // todo: ?
                };
                FileUploader.prototype._folderFilter = function (item) {
                    return !!(item.size || item.type);
                };
                FileUploader.prototype._queueLimitFilter = function () {
                    return this.queue.length < this.queueLimit;
                };
                FileUploader.prototype._isSuccessCode = function (status) {
                    return (status >= 200 && status < 300) || status === 304;
                };
                FileUploader.prototype._transformResponse = function (response, headers) {
                    // todo: ?
                    /*var headersGetter = this._headersGetter(headers);
                     forEach($http.defaults.transformResponse, (transformFn) => {
                     response = transformFn(response, headersGetter);
                     });*/
                    return response;
                };
                FileUploader.prototype._parseHeaders = function (headers) {
                    var parsed = {}, key, val, i;
                    if (!headers) {
                        return parsed;
                    }
                    headers.split('\n').map(function (line) {
                        i = line.indexOf(':');
                        key = line.slice(0, i).trim().toLowerCase();
                        val = line.slice(i + 1).trim();
                        if (key) {
                            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
                        }
                    });
                    return parsed;
                };
                FileUploader.prototype._headersGetter = function (parsedHeaders) {
                    return function (name) {
                        if (name) {
                            return parsedHeaders[name.toLowerCase()] || null;
                        }
                        return parsedHeaders;
                    };
                };
                FileUploader.prototype._xhrTransport = function (item) {
                    var _this = this;
                    var xhr = item._xhr = new XMLHttpRequest();
                    var form = new FormData();
                    this._onBeforeUploadItem(item);
                    // todo
                    /*item.formData.map(obj => {
                     obj.map((value, key) => {
                     form.append(key, value);
                     });
                     });*/
                    if (typeof item._file.size !== 'number') {
                        throw new TypeError('The file specified is no longer valid');
                    }
                    form.append(item.alias, item._file, item.file.name);
                    xhr.upload.onprogress = function (event) {
                        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
                        _this._onProgressItem(item, progress);
                    };
                    xhr.onload = function () {
                        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
                        var response = _this._transformResponse(xhr.response, headers);
                        var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
                        var method = '_on' + gist + 'Item';
                        _this[method](item, response, xhr.status, headers);
                        _this._onCompleteItem(item, response, xhr.status, headers);
                    };
                    xhr.onerror = function () {
                        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
                        var response = _this._transformResponse(xhr.response, headers);
                        _this._onErrorItem(item, response, xhr.status, headers);
                        _this._onCompleteItem(item, response, xhr.status, headers);
                    };
                    xhr.onabort = function () {
                        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
                        var response = _this._transformResponse(xhr.response, headers);
                        _this._onCancelItem(item, response, xhr.status, headers);
                        _this._onCompleteItem(item, response, xhr.status, headers);
                    };
                    xhr.open(item.method, item.url, true);
                    xhr.withCredentials = item.withCredentials;
                    // todo
                    /*item.headers.map((value, name) => {
                     xhr.setRequestHeader(name, value);
                     });*/
                    if (this.authToken) {
                        xhr.setRequestHeader('Authorization', this.authToken);
                    }
                    xhr.send(form);
                    this._render();
                };
                FileUploader.prototype._iframeTransport = function (item) {
                    // todo: implement it later
                };
                FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
                    this.onWhenAddingFileFailed(item, filter, options);
                };
                FileUploader.prototype._onAfterAddingFile = function (item) {
                    this.onAfterAddingFile(item);
                };
                FileUploader.prototype._onAfterAddingAll = function (items) {
                    this.onAfterAddingAll(items);
                };
                FileUploader.prototype._onBeforeUploadItem = function (item) {
                    item._onBeforeUpload();
                    this.onBeforeUploadItem(item);
                };
                FileUploader.prototype._onProgressItem = function (item, progress) {
                    var total = this._getTotalProgress(progress);
                    this.progress = total;
                    item._onProgress(progress);
                    this.onProgressItem(item, progress);
                    this.onProgressAll(total);
                    this._render();
                };
                FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
                    item._onSuccess(response, status, headers);
                    this.onSuccessItem(item, response, status, headers);
                };
                FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
                    item._onError(response, status, headers);
                    this.onErrorItem(item, response, status, headers);
                };
                FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
                    item._onCancel(response, status, headers);
                    this.onCancelItem(item, response, status, headers);
                };
                FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
                    item._onComplete(response, status, headers);
                    this.onCompleteItem(item, response, status, headers);
                    var nextItem = this.getReadyItems()[0];
                    this.isUploading = false;
                    if (nextItem) {
                        nextItem.upload();
                        return;
                    }
                    this.onCompleteAll();
                    this.progress = this._getTotalProgress();
                    this._render();
                };
                return FileUploader;
            })();
            exports_1("FileUploader", FileUploader);
        }
    }
});
//# sourceMappingURL=file-uploader.js.map