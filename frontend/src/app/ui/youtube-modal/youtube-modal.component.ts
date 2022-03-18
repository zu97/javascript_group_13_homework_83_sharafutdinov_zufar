import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-modal',
  templateUrl: './youtube-modal.component.html',
  styleUrls: ['./youtube-modal.component.css']
})
export class YoutubeModalComponent {
  safeSrc: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<YoutubeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { youtubeLink: string },
  ) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data.youtubeLink);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
