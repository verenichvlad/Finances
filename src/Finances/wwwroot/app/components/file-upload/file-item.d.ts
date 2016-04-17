import { FileLikeObject } from './file-like-object';
import { FileUploader } from './file-uploader';
export declare class FileItem {
    private uploader;
    private some;
    private options;
    file: FileLikeObject;
    _file: File;
    alias: string;
    url: string;
    method: string;
    headers: any;
    withCredentials: boolean;
    formData: any;
    isReady: boolean;
    isUploading: boolean;
    isUploaded: boolean;
    isSuccess: boolean;
    isCancel: boolean;
    isError: boolean;
    progress: number;
    index: number;
    constructor(uploader: FileUploader, some: any, options: any);
    upload(): void;
    cancel(): void;
    remove(): void;
    onBeforeUpload(): void;
    onProgress(progress: number): void;
    onSuccess(response: any, status: any, headers: any): void;
    onError(response: any, status: any, headers: any): void;
    onCancel(response: any, status: any, headers: any): void;
    onComplete(response: any, status: any, headers: any): void;
    private _onBeforeUpload();
    private _onProgress(progress);
    private _onSuccess(response, status, headers);
    private _onError(response, status, headers);
    private _onCancel(response, status, headers);
    private _onComplete(response, status, headers);
    private _prepareToUploading();
}
