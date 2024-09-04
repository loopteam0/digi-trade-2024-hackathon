import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.development";
import { StorageService } from "./storage.service";
interface IUploadResponse {
  responseCode: string;
  responseMessage: string;
  fileUrl: string;
  fileName: string;
  filePath: string;
}
@Injectable({
  providedIn: "root",
})
export class UploadService {
  private deployBase = environment.uploadUrl;
  http = inject(HttpClient);
  store = inject(StorageService);

  private httpHeaders = new HttpHeaders()
    .set("countryCode", "GH")
    .set("X-User-Type", "Guest")
    .set("sourceCode", environment.app)
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  private options = {
    headers: this.httpHeaders,
  };

  upload(docType: string, file: File) {
    const formData: FormData = new FormData();

    formData.append("file", file);
    return this.http
      .post<IUploadResponse>(this.deployBase + "upload?documenttype=" + docType, formData, this.options)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
