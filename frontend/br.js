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
