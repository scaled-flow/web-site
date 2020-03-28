import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { Container } from "react-bootstrap";
import { Hash, createHash } from "crypto";


interface Props extends RouteComponentProps { }

const AddImage: React.FC = () => {
    const PreSignerURL = "https://api.testscaledflow.com/v0/upload"
    const [ presignedURL, setPresignedURL ] = useState("") 
    const [image, setImage] = useState({} as File)
    const [imageUrl, setImageURL] = useState("")
    const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setImage(e.target.files[0])
    }
    const getUploadURL = (url: string) => {
        const req = new XMLHttpRequest()

        req.open("POST", "https://api.testscaledflow.com/v0/upload")
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                console.log("RESP TEXT: ", req.responseText)
              setPresignedURL(req.responseText);
            }
          }
        req.setRequestHeader("key", image.name)
        req.send()
    } 
    const uploadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        getUploadURL(PreSignerURL)
        console.log("Upload handled")
    }

    const upload = async () => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedURL, true)
        xhr.setRequestHeader('Content-Type', image.type)
        xhr.setRequestHeader('Access-Control-Allow-Origin',"*")

        xhr.onload = () => {
            if (xhr.status === 200) {
                setImageURL(xhr.responseText)
            }
        }
        xhr.onerror = () => {
            console.log("ERRORed out")
        }
        xhr.send(image)
    }

    useEffect(()=>{
        upload()
    },[presignedURL])
    return (
        <>
            <ContentContainer>
                <Container>
                    <header>
                         
                        Upload file to s3
                    </header>
                    <Form>
                        <input type="file" onChange={fileChangedHandler} accept="image/*" />
                        <button onClick={uploadHandler}>Upload!</button>
                    </Form>
                </Container>
            </ContentContainer>
        </>
    )
}

// function loadURL(url: string) {
//     var xhr = new XMLHttpRequest();
  
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//         callback(xhr.response);
//       }
//     }
  
//     xhr.open('GET', url, true);
//     xhr.send('');
//   }



// https://s3.us-east-2.amazonaws.com/www.testscaledflow.com/test.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4TLGJQ6ISH3LKAOK%2F20200324%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200324T230343Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG8aCXVzLWVhc3QtMiJIMEYCIQCG5aBTTi7FEIBqfU5FlMF4wHbwQGCWSiU%2B2tZ0QSC96QIhAJ%2BFmI4Wcq98%2B7JNOZHb1K0FpjKaN%2BT%2BNMfE1cXpFzVsKs0BCGgQABoMODY2MTg3MzE1MDg5IgwLkCfCeEVDxlNIveEqqgEo3x9CSWqzVJFfrw7oU8J4zB%2BHno1wblg36N29YWwhNWuXX9SMNzQv0ZFFP%2BQreb5ct%2FeF%2B%2FYgGwtIpz8y8sB4YaAfsIApLNozf2Y8ApwlSdjiraA6HLG74iSG%2Bo470ZD1U7mobiS0xhGoq8Vh%2FFRG9wyYKjsJbszRHkA8oUQZX0ucslLuIm3oDykLvZOHF31fG3pGzhQSb2RGKj0rGmfidg0XZXcvEoOJ1zDPo%2BrzBTrfARHwkT9tZl5HuHHjuJtugVnGeNXRO9yzNS9f8zP4CzK0L0bexDnZ9wYTvXxV3NqyV6%2BdfiRmhL5InedYYxb4ZHm3lqUERRBsx5Oy%2B7pF1ryJPplHiUXGV2kJhbkON%2FoXebMcrzatTCdUPOzHCciN4ilOHNRWuGvOvz2i5u2ht3Zg1VMCjKPMo7Qzn6cmjGnbmZfL%2FZSQws2mEGuslVYf3CMCNr23b9BZPDfCkCGjqKu7xu9%2F%2BFKFmj9o8E2wiTI7dc1iiHcB9EepH1OKfgfn7z8kjzCc4fA03RpAtml7RAo%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a507ae21e127acb4bfe2cd6e07508fa6b363bf907e08bfd473bd449bcb3a4f2b




export default AddImage
