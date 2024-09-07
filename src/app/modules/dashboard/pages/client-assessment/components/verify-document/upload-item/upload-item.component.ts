import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { DndDirective } from "./upload-directive/dnd.directive";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
export interface ImageProps {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}
@Component({
  selector: "app-upload-item",
  templateUrl: "./upload-item.component.html",
  styleUrl: "./upload-item.component.scss",
  standalone: true,
  imports: [CommonModule, DndDirective, MatButtonModule, MatIcon],
})
export class UploadItemComponent {
  assetUrl = environment.assetsUrl;
  fileURL!: string;
  sizeInMB!: number;
  progress = 0;
  uploadedFiles: ImageProps[] = [];
  @Output() sendFileUrl = new EventEmitter<ImageProps[]>();

  private isSizeValid(file: File): boolean {
    const maxSizeInBytes = 10 * 1024 * 1024; //10MB
    return file.size <= maxSizeInBytes;
  }
  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length) {
      this.onFileDropped(files);
    }
  }
  async onFileDropped(files: FileList) {
    try {
      Array.from(files).forEach(async (file: File) => {
        this.progress = 0;
        const fileData = await this.getImgUrl(file);
        this.uploadedFiles.push(fileData);
        const progressInterval = setInterval(() => {
          if (this.progress === 100) {
            clearInterval(progressInterval);
          } else {
            this.progress += 5;
          }
        }, 90);
      });
      this.sendFileUrl.emit(this.uploadedFiles);
    } catch (error) {
      console.error(error);
    }
  }
  getImgUrl(file: File): Promise<ImageProps> {
    {
      return new Promise((resolve, reject) => {
        if (this.isSizeValid(file)) {
          const reader = new FileReader();
          reader.onload = () => {
            this.fileURL = reader.result as string;
            this.sizeInMB = Math.floor(file.size / (1024 * 1024));
            const fileData: ImageProps = {
              fileUrl: this.fileURL,
              fileName: file.name,
              fileSize: this.sizeInMB,
            };
            resolve(fileData);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
          reader.readAsDataURL(file);
        } else {
          reject(new Error("Invalid image or size"));
        }
      });
    }
  }
  removeFile(index: number) {
    if (index >= 0 && index < this.uploadedFiles.length) {
      this.uploadedFiles.splice(index, 1);
    }
  }
}
