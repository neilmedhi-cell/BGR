const imageInput = document.querySelector("#imageInput");
const previewArea = document.querySelector("#previewArea");
const previewImage = document.querySelector("#previewImage");
const removeButton = document.querySelector("#removeButton");
const downloadButton = document.querySelector("#downloadButton");
const status=document.querySelector("#status");
let selectedFile=null;
imageInput.addEventListener("change", () =>{const file=imageInput.files[0];
    if (!file) return;
    if(!file.type.startsWith("image/")){
        status.textContent="Please select an image.";
        return;
    }
    selectedFile=file;
    previewImage.src=URL.createObjectURL(file);
    previewArea.hidden=false;
    removeButton.disabled=false;
    downloadButton.hidden=true;
    status.textContent="Image ready.";
});
import { pipeline } from "@huggingface/transformers";

let backgroundRemover=null;
let processedImageUrl=null;
async function loadBackgroundRemover()
{
    if(backgroundRemover) return backgroundRemover;
    status.textContent="Loading model...";
    backgroundRemover=await pipeline(
        "background-removal",
        "Xenova/modnet",
       
    );
    return backgroundRemover;
}
removeButton.addEventListener("click",async()=>{
    if(!selectedFile)return;
    removeButton.disabled=true;
    status.textContent="Removing background";

    try{
        const remover =await loadBackgroundRemover();
        const output=await remover(selectedFile);
        const canvas =document.createElement("canvas");
        canvas.width=output.width;
        canvas.height=output.height;
        const ctx=canvas.getContext("2d");
        const imageData=new ImageData(
            new Uint8ClampedArray(output.data),
            output.width,
            output.height
        );
        ctx.putImageData(imageData, 0, 0);
        const blob=await new Promise((resolve, reject)=>{
            canvas.toBlob((result) => {
                if(result) resolve(result);
                else reject(new Error("Could not export the image"));
            }, "image/png");
        });
        if (processedImageUrl){
            URL.revokeObjectURL(processedImageUrl);

        }
        processedImageUrl=URL.createObjectURL(blob);
        previewImage.src=processedImageUrl;
        downloadButton.hidden=false;
        status.textContent="Background Removed Successfully";
    }catch(error)
    { 
        console.error(error);
        status.textContent="Processing failed. Check the console.";

    }finally{
        removeButton.disabled=false;
    }
});
downloadButton.addEventListener("click", () =>{
    if(!processedImageUrl)return;
    const link=document.createElement("a");
    link.href=processedImageUrl;
    link.download="cutout.png";
    link.click();
});