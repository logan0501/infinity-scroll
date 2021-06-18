const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

const count =30;
const apikey = `8bSg8hYwrCq7Lrbn0a3wm2Gix1QRBtGUBpmGfrafT4s`;
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`
let imagearray = [];
let imagesloaded = 0;
let totalimages = 0;
let ready =false;

function imageLoaded(){
   
    console.log("loaded");
    imagesloaded++;
    if(imagesloaded===totalimages){
        ready = true;
        loader.hidden =true;
        console.log("hello");
    }
}
function setAttributes(element,attributes){
 for(const key in attributes){
     element.setAttribute(key,attributes[key]);
 }
}


function displayimages(){
    imagesloaded=0;
    totalimages = imagearray.length;
    console.log(totalimages);
    imagearray.forEach((photo)=>{

        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        

        const img = document.createElement('img');

        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })

        img.addEventListener('load',imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);

    });

}


async function getData(){
try{
    const response =  await fetch(apiurl);
    if(response.status==200){
        imagearray = await response.json();
        displayimages();
    }
   
}catch(error){
    console.log(error);
}
    
}

getData();

window.addEventListener('scroll',()=>{
   if(window.innerHeight + window.scrollY  >= document.body.offsetHeight-1000 && ready){
    ready=false;
    getData();   
    
   }
})

