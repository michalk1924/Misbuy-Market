const fs=require('fs');
const path=require('path');
async function convertUrlToImage(url){
    const imgPath=path.join(__dirname,"./images/1.png");
    if(fs.existsSync(imgPath)){
        const imgBuffer=fs.readFileSync(imgPath);
        const imgBase64=Buffer.from(imgBuffer).toString('base64');
        return imgBase64;
    }
}

module.exports={
    convertUrlToImage, 
}