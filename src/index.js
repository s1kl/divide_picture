import "./main.css";
import Cropper from 'cropperjs';

const cropperImg = document.getElementById('cropper-img');
const cropper = new Cropper(cropperImg, { aspectRatio: 16/9 });
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
const cropBtn4 = document.getElementById('crop-btn4');
const cropBtn3 = document.getElementById('crop-btn3');
const cropBtn2 = document.getElementById('crop-btn2');
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
  if (n == 4) {
    combine4();
  } else if (n ==3) {
    combine3();
  } else {
    combine2();
  }
}

function combine4() {
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

function combine3() {
  cropped_image_width = result.naturalWidth / 2;
  cropped_image_height = result.naturalHeight / 2;
  canvas1.width = cropped_image_width;
  canvas1.height = result.naturalHeight;
  canvas2.width = cropped_image_width;
  canvas2.height = cropped_image_height;
  canvas3.width = cropped_image_width;
  canvas3.height = cropped_image_height;
  cropped_pict.src = result.src;
  ctx1.drawImage(cropped_pict, 0, 0);
  ctx2.drawImage(cropped_pict, -cropped_image_width, 0);
  ctx3.drawImage(cropped_pict, -cropped_image_width, -cropped_image_height);
  ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

  image1.src = canvas1.toDataURL();
  image2.src = canvas2.toDataURL();
  image3.src = canvas3.toDataURL();
  image4.src = canvas4.toDataURL();
}

function combine2() {
  cropped_image_width = result.naturalWidth / 2;
  canvas1.width = cropped_image_width;
  canvas1.height = result.naturalHeight;
  canvas2.width = cropped_image_width;
  canvas2.height = result.naturalHeight;
  cropped_pict.src = result.src;
  ctx1.drawImage(cropped_pict, 0, 0);
  ctx2.drawImage(cropped_pict, -cropped_image_width, 0);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

  image1.src = canvas1.toDataURL();
  image2.src = canvas2.toDataURL();
  image3.src = canvas3.toDataURL();
  image4.src = canvas4.toDataURL();
}

let n;
function select4() {
  n = 4;
  outCropped();
}
function select3() {
  n = 3;
  outCropped();
}
function select2() {
  n = 2;
  outCropped();
}

cropInput.addEventListener('change', cropDisplayImage);
cropBtn4.addEventListener('click', select4);
cropBtn3.addEventListener('click', select3);
cropBtn2.addEventListener('click', select2);
