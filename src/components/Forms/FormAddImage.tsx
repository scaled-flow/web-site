import React, { useState, useEffect } from "react";
import './Forms.css'

const AddImage: React.FC = () => {
    const PreSignerURL = "https://api.testscaledflow.com/v0/upload"
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState({} as File)

    const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setImage(e.target.files[0])
    }
    const imageUploader = (url: string) => (image: File) => (stateSetter: React.Dispatch<React.SetStateAction<string>>) => {
        const req = new XMLHttpRequest()

        const upload = async (presignedURL: string) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', presignedURL, true)
            xhr.setRequestHeader('Content-Type', image.type)
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*")

            xhr.onload = () => {
                if (xhr.status === 200) {
                    stateSetter(`http://www.testscaledflow.com/${image.name}`)
                }
            }
            xhr.onerror = () => {
                console.log("ERRORed out")
            }
            xhr.send(image)
        }

        req.open("POST", url)
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                console.log("RESP TEXT: ", req.responseText)
                upload(req.responseText);
            }
        }
        req.setRequestHeader("key", image.name)
        req.send()
    }

    const myUploader = imageUploader(PreSignerURL)

    const uploadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        fileUploader(setImageUrl)
        console.log("Upload handled")
    }

    let fileUploader: (stateSetter: React.Dispatch<React.SetStateAction<string>>) => void

    useEffect(() => {
        fileUploader = myUploader(image)
    }, [image])
    return (
        <>

            <input type="file" onChange={fileChangedHandler} accept="image/*" />
            <input type="text" placeholder="image description" />
            <button disabled={typeof image.name === 'undefined'} onClick={uploadHandler}>Upload!</button>
            {typeof image.name !== 'undefined' && <img className="preview" height='251' src={URL.createObjectURL(image)} alt="recently uploaded image" />}

        </>
    )
}

export default AddImage
