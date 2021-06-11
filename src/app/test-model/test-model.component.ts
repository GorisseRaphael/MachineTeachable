import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.scss']
})
export class TestModelComponent implements AfterViewInit {

  @ViewChild('video', { static: false })
  video: ElementRef;



  pausePlay = 'Camera play';
  isChecked = true;
  model;
  predictions;
  webcam;
  maxPredictions;
  vid;
  constructor() { }

  ngAfterViewInit() {
    this.initCam();
    this.loadModel();
  }

  async initCam() {
    this.vid = this.video.nativeElement;
    console.log("dans le initCam");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          console.log('affect cam');
          this.vid.srcObject = stream;
        })
        .catch((err0r) => {
          console.log('Something went wrong!');
        });
    }
  }

  async loadModel() {
    const modelURL = 'assets/model.json';
    const metadataURL = 'assets/metadata.json';
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    this.webcam = new tmImage.Webcam(200, 200, flip);
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    requestAnimationFrame(() =>
      this.loop()
    );
    this.video.nativeElement.appendChild(this.webcam.canvas);
    // this.model = await tf.loadGraphModel('/assets/model.json');
  }

  async loadModelFromFiles(model: File, weights: File, metadata: File) {
    this.model = await tmImage.loadFromFiles(model, weights, metadata);
    this.maxPredictions = this.model.getTotalClasses();
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    this.webcam = new tmImage.Webcam(200, 200, flip);
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    requestAnimationFrame(() =>
      this.loop()
    );
    this.video.nativeElement.appendChild(this.webcam.canvas);
    // this.model = await tf.loadGraphModel('/assets/model.json');
  }

  async loop() {
    this.webcam.update(); // update the webcam frame
    this.predictions = await this.model.predict(this.webcam.canvas, true);
    requestAnimationFrame(() =>
      this.loop()
    );
  }

  async changePlay() {
    if (!this.isChecked === true) {
      this.vid.pause();
      this.pausePlay = 'Camera pause';
      // this.pause();
    } else {
      this.vid.play();
      this.pausePlay = 'Camera play';
    }
  }

  async handleFileInput(files: FileList) {

    let metadata: File = null;
    let model: File = null;
    let weights: File = null;

    metadata = files.item(0);
    model = files.item(1);
    weights = files.item(2);

    this.loadModelFromFiles(model, weights, metadata);
  }

}
