//video object contains video from video tag
//let video = document.querySelector("video");
//let vidBtn = document.querySelector("button#record");
//let capBtn = document.querySelector("button#capture");
//wo media device use karna hai jisse audio aur 
//video mil jaye
//let constraints = { video: true, audio: true };
//let mediaRecorder;
//let isRecording = false;
//this array store video in the form of chunks
//let chunks = [];
//if we click on addEventListner 
//btn.addEventListener("click", function () {
    //if it was already recording than stop recording on click and make it false
//    if (isRecording) {
//        mediaRecorder.stop();
//        isRecording = false;
//        vidBtn.innerText = "Record";
//    } else {
        //if it was not recording than on clicking start recording
//        mediaRecorder.start();
//        isRecording = true;
//        vidBtn.innerText = "Recording.."
//    }
//});

//capBtn.addEventListener("click",function(){
//    capture();
//})
//navigator object browser me rahta hai aur isko use karke ham browser ki functonality use kar sakde ne
//navigator ke andar mediaDevices object hai
//navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    //getUser media ek promised based function hai wo hamse puchhta hai mic allow ya nhi camera allow ya nhi
    //mediastream wo object hai wo stream karta hai jo ki camere pe visible hai
    //videp.srcobject me video aur audio dono aa jayega
    //audio.srcobject usme se bas audio le lega
//    video.srcObject = mediaStream;
//    let options = { mimeType: "video/webm; codecs=vp9" };
//    mediaRecorder = new MediaRecorder(mediaStream, options);
    //dataavailable is inbuilt event of mediaRecorder which gets the video from mediastream to mediarecorder after a certain period of time 
//    mediaRecorder.addEventListener("dataavailable",function (e) {
            //push the video in the form of chunks in chunk array
//            chunks.push(e.data);
//    });
        //stop is also an inbuilt event of mediarecorder which strikes when video is stopped
//    mediaRecorder.addEventListener("stop", function () {
    //blob forms a single large file from chuck array of type video
//        let blob = new Blob(chunks, { type: "video/mp4" });
        //now chunk is empty as data is stored on blob
//        chunks = [];
        //generate url of file blob
//        let url = URL.createObjectURL(blob);
        //niche ki do line <a href = url>
//        let a = document.createElement("a");
//        a.href = url;
//        a.download = "video.mp4";
        //a pe us url pe gye download kiya with file name video.mp4
//        a.click();
        //a tag remove kar diya
//        a.remove();
//    });
//});

//function capture(){
//    let c = document.createElement("canvas");
    //width and height of canvas is equal to height and width of video
//    c.width = video.videoWidth;
//    c.height = video.videoHeight;
//    let ctx = c.getContext("2d");
    //we have to draw image of current video
//    ctx.drawImage(video,0,0);
//    let a = document.createElement("a");
    //when downloaded image will be downloaded with name image
//    a.download = "image.jpg";
    //change the csnvas to url < a href = "canvas url">
//    a.href = c.toDataURL();
    //will we click on it it downloads
//    a.click();
//    a.remove();
//}

//let video = document.querySelector("video");
//let vidBtn = document.querySelector("button#record");

//let capBtn = document.querySelector("button#capture");

//let constraints = { video: true, audio: true };
//let mediaRecorder;
//let isRecording = false;
//let chunks = [];

//vidBtn.addEventListener("click", function () {
//  let innerDiv = vidBtn.querySelector("div");

//  if (isRecording) {
//    mediaRecorder.stop();
//    isRecording = false;
//    innerDiv.classList.remove("record-animation");
//  } else {
//    mediaRecorder.start();
//    isRecording = true;
    /*applied css class for recording*/ 
//    innerDiv.classList.add("record-animation");
//  }
//});

//capBtn.addEventListener("click", function () {
//  let innerDiv = capBtn.querySelector("div");
  /*applied capture animation class of css to captureBtn*/
//  innerDiv.classList.add("capture-animation");
  /*remove animation class from capBtn after 5ooms so so that btn gets into its initial state after its work of capturing is finished*/ 
//  setTimeout(function () {
//    innerDiv.classList.remove("capture-animation");
//  }, 500);
//  capture();
//});

//navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
//  video.srcObject = mediaStream;

//  mediaRecorder = new MediaRecorder(mediaStream);

//  mediaRecorder.addEventListener("dataavailable", function (e) {
//    chunks.push(e.data);
//  });

//  mediaRecorder.addEventListener("stop", function () {
//    let blob = new Blob(chunks, { type: "video/mp4" });

//    chunks = [];

//    let url = URL.createObjectURL(blob);

//    let a = document.createElement("a");
//    a.href = url;
//    a.download = "video.mp4";
//    a.click();
//    a.remove();
//  });
//});

//function capture() {
//  let c = document.createElement("canvas");
//  c.width = video.videoWidth;
//  c.height = video.videoHeight;
//  let ctx = c.getContext("2d");
//  ctx.drawImage(video, 0, 0);
//  let a = document.createElement("a");
//  a.download = "image.jpg";
//  a.href = c.toDataURL();
//  a.click();
//  a.remove();
//}


let video = document.querySelector("video");
let vidBtn = document.querySelector("button#record");
let body = document.querySelector("body")
let capBtn = document.querySelector("button#capture");
let galleryBtn = document.querySelector("#gallery");
let filters = document.querySelectorAll(".filter")
let zoomin = document.querySelector(".zoom-in");
let zoomout = document.querySelector(".zoom-out")
let constraints = { video: true, audio: false };
let mediaRecorder;
let isRecording = false;
let chunks = [];
//minzoom se chhota aur nhi kar sakte aur maxzoom se aur bda nhi kar sakde ne
let minzoom = 1;
let maxzoom = 3;
let currzoom = 1;

galleryBtn.addEventListener("click",function() {
  //location is a object given by browser is object ka ek function hai assign jisme ham dete hai path (assign hmare current domain ko use karke path pe chala jata hai)
  //example a url(http(protocol)://www.google.com(domain)/example(path)/1?a=1+b=2(query))
  //here path is gallery.html and domain is the index.html page url
  location.assign("gallery.html");
})
//isme filter ka background color save karunga
let filter = "";

for(let i =0 ; i < filters.length ; i++){

  filters[i].addEventListener("click", function(e){
      //sare filters ka background color extract kar dunga uspe click karne par
    filter = e.currentTarget.style.backgroundColor;
    //jo pahle se filter lga tha use remove karunga uske baad nya filter lgaunga
    removefilter();
    applyfilter(filter);

  })
}
zoomin.addEventListener("click" , function(){
    //this is current scale of video ["scale","1)"], ["1",""] ka 0 == 1(given in html initially)
    //video element html me diya hai
 let videocurrscale = video.style.transform.split("(")[1].split(")")[0];
if(videocurrscale > maxzoom){
  return;
}else{
  currzoom = Number(videocurrscale) + 0.1;
  video.style.transform = `scale(${currzoom})`;
}
});
zoomout.addEventListener("click" , function(){
 
 if(currzoom > minzoom){
  currzoom-= 0.1;
  video.style.transform = `scale(${currzoom})`;
 }
 })
vidBtn.addEventListener("click", function () {
  let innerDiv = vidBtn.querySelector("div");

  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    innerDiv.classList.remove("record-animation");
  } else {
    mediaRecorder.start();
    //ham first method se filter nikalne wala tarika use nhi karenge because it is gp extensive
    //therefore ham jab recording karne jayenge to filter ko empty karenge aur remove kardenge use record karte time
    filter=""
    removefilter();
    //jab video start kare to zoom in zoom out ko bhi khatam kar de
    video.style.transform = `scale(1)`
    currzoom = 1;
    isRecording = true;
    innerDiv.classList.add("record-animation");
  }
});

capBtn.addEventListener("click", function () {
  let innerDiv = capBtn.querySelector("div");
  innerDiv.classList.add("capture-animation");
  setTimeout(function () {
    innerDiv.classList.remove("capture-animation");
  }, 500);
  capture();
});

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
  video.srcObject = mediaStream;

  mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunks.push(e.data);
  });

  mediaRecorder.addEventListener("stop", function () {
    let blob = new Blob(chunks, { type: "video/mp4" });
    //used to save in objectstore function in dbscript.js
    //blob ek object hai jiska url ram ko pointout karta hai jb ham refresh karte hai to ram khatam ho jata hai aur url null ko point karne lagta hai isliye ham pure blob ko hi store kar rahe hai
    addMedia("video",blob);
    chunks = [];

    //we have commented this we will no longer download on clicking instead store it on media query
    //let url = URL.createObjectURL(blob);

    //let a = document.createElement("a");
    //a.href = url;
    //a.download = "video.mp4";
    //a.click();
    //a.remove();
  });
});

function capture() {
  let c = document.createElement("canvas");
  c.width = video.videoWidth;
  c.height = video.videoHeight;
  let ctx = c.getContext("2d");

  //jab ham canvas ko zoom karte hai to canas khud zoom nhi hota balki uske ander ke objects zoom hojate hai
  //to bring (x,y) cordinates of canvas in the center instead of vertical
  ctx.translate(c.width/2 , c.height/2);
  //now zoom our image on canvas
  ctx.scale(currzoom , currzoom);
  //image is zoomed from taking middle at center along south east direction so again bring (0,0) (-50%) back
  ctx.translate(-c.width/2 , -c.height/2);

  ctx.drawImage(video, 0, 0);
  //agar filter ka background color wala element empty nhi hai
  if(filter!= ""){
      //to fir image ke upar filter ka color chadha do
    ctx.fillStyle=filter;
    ctx.fillRect(0,0,c.width , c.height)
  }
  //coomented as we no longer want to download on clicking
  //let a = document.createElement("a");
  //a.download = "image.jpg";
  //a.href = c.toDataURL();
  //this function used for save in objectstore from function in dbscript.js
  //dataurl pure image ko binary ke form me contain karta hai
  addMedia("img",c.toDataURL());
  a.click();
  a.remove();
}
function applyfilter(filterColor){
    //filter apply hoga to uska div(filterdiv) banega jo pure body ko cover karega jamne iske class ko css me properties di hai filter-div ke naam se hai class
let filterdiv= document.createElement("div")
filterdiv.classList.add("filter-div");
filterdiv.style.backgroundColor = filterColor;
body.appendChild(filterdiv)
}
function removefilter(){
  let filterdiv = document.querySelector(".filter-div")
if(filterdiv) filterdiv.remove()

}