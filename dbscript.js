//jaise hi dbscript.js load hoga hamare pas db ki access aa jayegi
let dbAccess;
let container = document.querySelector(".container");
//create a database named camera of version 1
let request=indexedDB.open("Camera",1);

request.addEventListener("success",function(){
    dbAccess=request.result;
});
//creted objectstore of name gallery of keypath:nid
request.addEventListener("upgradeneeded",function(){
    let db=request.result;
    db.createObjectStore("gallery",{keyPath: "mId" });
});

request.addEventListener("error",function(){
    alert("some error occured");
});
//used for save called from script.js function addMedia from function capture and mediarecorder
//ham image ke time jo url hai wo data hai aur video ke time pe jo url hai wo pointer hai isliye image ka direct url pass kar rahe hai aur video ka blob kyoki pointer page refresh karne pe khatam ho jata hai
//ye function tabhi chalega jab db access hoga
function addMedia(type,media){
    //gallery me ek readwrite transaction create kro
    let tx=dbAccess.transaction("gallery","readwrite");
    //gallery me jo hamara object store hai wo nikallo
    let galleryObjectStore=tx.objectStore("gallery");
    let data={
        mId:Date.now(),
        //type is image and media is dataurl for capture 
        type,
        media,
    };
    //object store me data stored
    galleryObjectStore.add(data);
}
//isse cursor bna ke ek ek object pe traverse karenge aur use gallery.html me store karenge
//ye viewresult function jo bnaya tha indexed.html me uske jaisa hai aur tabhi chalta hai jab db access mil jata hai
function viewMedia(){
    let tx=dbAccess.transaction("gallery","readonly");
    let galleryObjectStore=tx.objectStore("gallery");
    let req = galleryObjectStore.openCursor();
    req.addEventListener("success" , function(){
        let cursor = req.result;

       if(cursor){
           //sab object pe jake unka div bna rhe hai
            let div = document.createElement("div");
            div.classList.add("media-card");
            div.innerHTML= `<div class = "media-container">
                ${cursor.value.type}
            </div>
                    <div class = "action-container">
                        <button class = "media-download" data-id="${cursor.value.mId}">Download</button>
                        <button class = "media-delete" data-id="${cursor.value.mId}">Delete</button>
            </div>`;
            let downloadbtn = div.querySelector(".media-download");
            let deletebtn = div.querySelector(".media-delete");
            deletebtn.addEventListener("click" , function(e){
                //deletebutton se data id attribute nikal liya
                let mId = e.currentTarget.getAttribute("data-id");
                //media container ko remove kar diya UI se
                e.currentTarget.parentElement.parentElement.remove();
                //ab db se media delete kar do
                deleteMediaFromDB(mId);
            })
            if(cursor.value.type == "img"){
                let img = document.createElement("img")
                img.classList.add("media-gallery");
                //ek baaar addmedia ka data object dekho whi se parameters la rhe hai type aur media dono whi se laae hai
                img.src = cursor.value.media;
                let mediaContainer = div.querySelector(".media-container");
                //mediacontainer media-card me hai
                mediaContainer.appendChild(img)

                downloadbtn.addEventListener("click" , function(e){
                    //ye code script.js me comment kita hai
                    let a = document.createElement("a")
                    a.download = "image.jpg";
                    //e.currentTarget current event ko target karta hai jo ki hai download button fir uska parentelement hai (action button) than iska parentelement hai media card than usse media container select kar liya 
                    //ab media container me image ya video hai to uska source nikal liya
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.click();
                    a.remove();
                })
            }
            else{
                let video = document.createElement("video")
                video.classList.add("media-gallery");
                //cursor.value.media jo aa rha hai hmare pass wo blob hai , ise convert karte hai url me jo is us blob ko point karta hai
                video.src = window.URL.createObjectURL(cursor.value.media);
                //jab ham cursor ko video pe le ke jaye to video play ho jaye
                video.addEventListener("mouseenter" , function(){
                    video.currentTime = 0;
                    video.play();
                })
                video.addEventListener("mouseleave" , function(){
                    video.pause();
                })
                video.controls = true;
                video.loop = true;
                video.muted=true;

                let mediaContainer = div.querySelector(".media-container");
                mediaContainer.appendChild(video)

                downloadbtn.addEventListener("click" , function(e){
                    let a = document.createElement("a")
                    a.download = "video.mp4";
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.click();
                    a.remove();
                });
            }
            container.appendChild(div);
            cursor.continue();
        }
    })
}
function deleteMediaFromDB(mId){
    let tx=dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore=tx.objectStore("gallery");
    //conveeted mid into number as it is stored in data object in the form of number
    galleryObjectStore.delete(Number(mId))
}