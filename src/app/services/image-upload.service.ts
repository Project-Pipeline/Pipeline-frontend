import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {CloudinarySignature} from "../models/model classes/image-upload/CloudinarySignature";
import {apiRoot} from "../models/ApiRoot";
import {CloudinaryUploadResponse} from "../models/model classes/image-upload/CloudinaryUploadResponse";
import {mergeMap} from "rxjs/operators";
import {ConfigType} from "../models/ConfigType";

@Injectable({
    providedIn: 'root'
})
export class ImageUploadService {
    private config: ConfigType;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.http.get<ConfigType>('../../assets/config.json')
            .subscribe((config) => this.config = config);
    }

    /* form data format:
        {
          "file": stream of bytes,
          "api_key": "your api key",
          "timestamp": time stamp in UNIX seconds since epoch from backend,
          "public_id": id of image, ideally starting with user's id,
          "signature": signature from an backend API
        }
        How to use example:
        <input type="file" accept=".png" name="cv" (change)="imageUploader.uploadFile($event, 'image_name')">
     */
    uploadFile(fileEvent: any, publicID: string): Observable<CloudinaryUploadResponse> {
        const files = fileEvent.target.files as FileList;
        const fileToUpload = files.item(0);

        return this.http
            // get the signature and timestamp from backend
            .get<CloudinarySignature>(
                `${apiRoot}api/images/signature?public_id=${publicID}`,
                this.authService.authHeaders()
            )
            // upload to Cloudinary, returns the url of uploaded image, should be re-sent to server for proper storage
            .pipe(mergeMap((signature) => {
                const formData: FormData = new FormData();
                formData.append('file', fileToUpload);
                formData.append('api_key', this.config.cloudinary_api_key);
                formData.append('timestamp', `${signature.timeStamp}`);
                formData.append('public_id', publicID);
                formData.append('signature', signature.signature);
                return this.http.post<CloudinaryUploadResponse>(
                    `https://api.cloudinary.com/v1_1/${this.config.cloudinary_cloud_name}/image/upload`, formData
                );
            }));
    }
}
