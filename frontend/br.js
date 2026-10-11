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
import { pipline } from "@huggingface/transformers";
import { error } from "node:console";
import { createECDH } from "node:crypto";
let backgroundRemover=null;
let processedImageUrl=null;
async function loadBackgroundRemover()
{
    if(backgroundRemover) return backgroundRemover;
    status.textContent="Loading model...";
    backgroundRemover=await pipline(
        "Background-removal",
        "briaai/RMBG-1.4",
        {device: "webgpu"}
    );
    return backgroundRemover;
}
removeButton.addEventListener("click",async()=>{
    if(!selectedFile)return;
    removeButton.disabled=true;
    status.textContent="Removing background";

    try{
        const remover =await loadBackgroundRemover();
        const result=await remover(URL,createObjectURL(selectedFile));
        const output=results[0];
        if (processedImageUrl){
            URL.revokeObjectURL(processedImageUrl);

        }
        processedImageUrl=URL.createObjectURL(output.blob);
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
    link.herf=processedImageUrl;
    link.download="cutout.png";
    link.click();
});