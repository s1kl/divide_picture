import "./main.css";
import Cropper from 'cropperjs';

const cropperImg = document.getElementById('cropper-img');
const cropper = new Cropper(cropperImg);
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const cropBtn = document.getElementById('crop-btn')
const result = document.getElementById('result-img');
const cropInput = document.getElementById('crop-input');

function cropDisplayImage(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    cropper.replace(event.target.result)
  }
  reader.readAsDataURL(file)
}
let resultImgUrl;
function outCropped() {
  resultImgUrl = cropper.getCroppedCanvas().toDataURL();
  result.src = resultImgUrl;

  window.setTimeout(cropped_canvasImage, 100);
}

let cropped_image_width;
let cropped_image_height;
const cropped_pict = new Image();
function cropped_canvasImage() {
  cropped_image_width = result.naturalWidth / 2;
  cropped_image_height = result.naturalHeight / 2;
  canvas1.width = cropped_image_width;
  canvas1.height = cropped_image_height;
  canvas2.width = cropped_image_width;
  canvas2.height = cropped_image_height;
  canvas3.width = cropped_image_width;
  canvas3.height = cropped_image_height;
  canvas4.width = cropped_image_width;
  canvas4.height = cropped_image_height;
  cropped_pict.src = result.src;
  ctx1.drawImage(cropped_pict, 0, 0);
  ctx2.drawImage(cropped_pict, -cropped_image_width, 0);
  ctx3.drawImage(cropped_pict, 0, -cropped_image_height);
  ctx4.drawImage(cropped_pict, -cropped_image_width, -cropped_image_height);

  image1.src = canvas1.toDataURL();
  image2.src = canvas2.toDataURL();
  image3.src = canvas3.toDataURL();
  image4.src = canvas4.toDataURL();
}

cropInput.addEventListener('change', cropDisplayImage);
cropBtn.addEventListener('click', outCropped);








/*
const input = document.getElementById("input");
const image = document.getElementById("img");
function displayImage(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    image.src = event.target.result
  }
  reader.readAsDataURL(file)

  window.setTimeout(canvasImage, 100);
}


let image_width;
let image_height;
const pict = new Image();
function canvasImage() {
  image_width = image.naturalWidth / 2;
  image_height = image.naturalHeight / 2;
  canvas1.width = image_width;
  canvas1.height = image_height;
  canvas2.width = image_width;
  canvas2.height = image_height;
  canvas3.width = image_width;
  canvas3.height = image_height;
  canvas4.width = image_width;
  canvas4.height = image_height;
  pict.src = image.src;
  ctx1.drawImage(pict, 0, 0);
  ctx2.drawImage(pict, -image_width, 0);
  ctx3.drawImage(pict, 0, -image_height);
  ctx4.drawImage(pict, -image_width, -image_height);

  image1.src = canvas1.toDataURL();
  image2.src = canvas2.toDataURL();
  image3.src = canvas3.toDataURL();
  image4.src = canvas4.toDataURL();
}


input.addEventListener('change', displayImage);
*/

