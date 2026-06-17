import ImageKit from "imagekit"

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/foodpartner",
})
export async function uploadFile(file,fileName){
    const result = await imagekit.upload({
        file: file,
        fileName:fileName
    })
    return result
}

export default imagekit