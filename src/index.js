import "./main.scss";
import Cropper from 'cropperjs';

const cropperImg = document.getElementById('cropper-img');
const cropper = new Cropper(cropperImg, { aspectRatio: 16/9, viewMode: 1, autoCropArea:1, zoomOnWheel:false });
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
let image = document.getElementsByClassName('image');
image = Array.from(image);
const cropBtn4 = document.getElementById('crop-btn4');
const cropBtn3 = document.getElementById('crop-btn3');
const cropBtn2 = document.getElementById('crop-btn2');
const result = document.getElementById('result-img');
const cropInput = document.getElementById('crop-input');
const dlBtn = document.getElementById('button');

let extension = 'image/png';
let file_name = 'image'
function cropDisplayImage(event) {
  n = 1;
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    cropper.replace(event.target.result)
    extension = reader.result.slice(reader.result.indexOf(':') + 1, reader.result.indexOf(';'));
  }
  file_name = cropInput.value.slice(cropInput.value.lastIndexOf('\\') + 1, cropInput.value.lastIndexOf('.')) + '_';
  console.log(cropInput.value);
  console.log(file_name);
  reader.readAsDataURL(file)
}

let resultImgUrl;
function outCropped() {
  resultImgUrl = cropper.getCroppedCanvas().toDataURL(extension);
  result.src = resultImgUrl;
  window.setTimeout(cropped_canvasImage, 100);
}

let cropped_image_width;
let cropped_image_height;
const cropped_pict = new Image();
function cropped_canvasImage() {
  if (n == 4) {
    combine4();
  } else if (n == 3) {
    combine3();
  } else if (n == 2){
    combine2();
  } else {
    return;
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
  image1.src = canvas1.toDataURL(extension);
  image2.src = canvas2.toDataURL(extension);
  image3.src = canvas3.toDataURL(extension);
  image4.src = canvas4.toDataURL(extension);
  image1.style.top = '1%';
  image2.style.top = '1%';
  image3.style.left = '1%';
  image3.style.bottom = '-1%';
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
  image1.src = canvas1.toDataURL(extension);
  image2.src = canvas2.toDataURL(extension);
  image3.src = canvas3.toDataURL(extension);
  image4.src = canvas4.toDataURL();
  image1.style.top = '2%';
  image2.style.top = '1.2%';
  image3.style.left = '49.8%';
  if (window.innerHeight > window.innerWidth) {
    image3.style.bottom = '97%';
  } else {
    image3.style.bottom = '47%';
  }
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
  image1.src = canvas1.toDataURL(extension);
  image2.src = canvas2.toDataURL(extension);
  image3.src = canvas3.toDataURL();
  image4.src = canvas4.toDataURL();
  image1.style.top = '2%';
  image2.style.top = '2%';
  image3.style.left = '1%';
  image3.style.bottom = '-1%';
}

let n = 0;
function select4() {
  if (n == 0) {return;}
  n = 4;
  outCropped();
}
function select3() {
  if (n == 0) {return;}
  n = 3;
  outCropped();
}
function select2() {
  if (n == 0) {return;}
  n = 2;
  outCropped();
}

function download(evt) {
  evt.preventDefault();
  const a = document.createElement("a");
  document.body.appendChild(a);
  if (n == 4) {
    a.download = file_name + 1;
    a.href = canvas1.toDataURL(extension);
    a.click();
    a.download = file_name + 2;
    a.href = canvas2.toDataURL(extension);
    a.click();
    a.download = file_name + 3;
    a.href = canvas3.toDataURL(extension);
    a.click();
    a.download = file_name + 4;
    a.href = canvas4.toDataURL(extension);
    a.click();
  } else if (n == 3) {
    a.download = file_name + 1;
    a.href = canvas1.toDataURL(extension);
    a.click();
    a.download = file_name + 2;
    a.href = canvas2.toDataURL(extension);
    a.click();
    a.download = file_name + 3;
    a.href = canvas3.toDataURL(extension);
    a.click();
  } else if (n == 2) {
    a.download = file_name + 1;
    a.href = canvas1.toDataURL(extension);
    a.click();
    a.download = file_name + 2;
    a.href = canvas2.toDataURL(extension);
    a.click();
  } else {
    return;
  }
  a.remove();
}


cropInput.addEventListener('change', cropDisplayImage);
cropBtn4.addEventListener('click', select4);
cropBtn3.addEventListener('click', select3);
cropBtn2.addEventListener('click', select2);
dlBtn.addEventListener('click', download);
