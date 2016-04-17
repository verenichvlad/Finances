System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var FileSelect, fileUpload;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // todo: filters
            FileSelect = (function () {
                function FileSelect(element) {
                    this.element = element;
                }
                FileSelect.prototype.getOptions = function () {
                    return this.uploader.options;
                };
                FileSelect.prototype.getFilters = function () {
                };
                FileSelect.prototype.isEmptyAfterSelection = function () {
                    return !!this.element.nativeElement.attributes.multiple;
                };
                FileSelect.prototype.onChange = function () {
                    // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
                    var files = this.element.nativeElement.files;
                    var options = this.getOptions();
                    var filters = this.getFilters();
                    // if(!this.uploader.isHTML5) this.destroy();
                    this.uploader.addToQueue(files, options, filters);
                    if (this.isEmptyAfterSelection()) {
                    }
                };
                FileSelect = __decorate([
                    core_1.Directive({
                        selector: '[ng2-file-select]',
                        properties: ['uploader'],
                        host: {
                            '(change)': 'onChange()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], FileSelect);
                return FileSelect;
            })();
            exports_1("FileSelect", FileSelect);
            exports_1("fileUpload", fileUpload = [FileSelect]);
        }
    }
});
//# sourceMappingURL=file-select.js.map