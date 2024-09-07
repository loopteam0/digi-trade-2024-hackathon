import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
  selector: "[appDnd]",
  standalone: true,
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostBinding("class.fileover") private fileOver = false;

  @HostListener("dragover", ["$event"]) onDragOver(event: DragEvent) {
    event.preventDefault();

    event.stopPropagation();
    // console.log('drag over')
    this.fileOver = true;
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // console.log('drag leave')
    this.fileOver = false;
  }

  @HostListener("drop", ["$event"]) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const data = event.dataTransfer?.files;
    if (data) {
      this.fileDropped.emit(data);
      this.fileOver = false;
    }
  }
}
