import React, { useState, useEffect } from "react";
import "./CookiesModal.css"

//ask user for cookie preferences if haven't already 
//@ts-ignore
// let preference = JSON.parse(localStorage.getItem("cookies"))
// let preference = true
// if (preference === null){
//   const cookiesOrNah = window.confirm("Accept cookies?")
//   console.log(cookiesOrNah)
//   localStorage.setItem("cookies", JSON.stringify(cookiesOrNah))
// }

const CookiesModal = () => {

    const [showCookieModal, setShowCookieModal] = useState<boolean>(true)
    useEffect(() => {
        //@ts-ignore
        if (JSON.parse(localStorage.getItem("cookies")) === null) {
            setShowCookieModal(false)
        };
        //@ts-ignore
        if (JSON.parse(localStorage.getItem("cookies")) === true || false) {
            setShowCookieModal(true)
        };

    }, [])

    function setCookiePreference(value: string) {
        switch (value) {
            case "ok":
                console.log("ok")
                localStorage.setItem("cookies", JSON.stringify(true))
                setShowCookieModal(true)
                break
            case "not ok":
                console.log("not ok")
                localStorage.setItem("cookies", JSON.stringify(false))
                setShowCookieModal(true)
                break
        }
    }

    switch (showCookieModal) {
        case false:
            return (
                <div className="cookies-modal">
                    <div className="cookies-modal__content">
                        <div className="cookies-modal__text">By using our website, you agree to the use of cookies.</div>
                        <button
                            className="cookies-modal__button"
                            onClick={() => { setCookiePreference("ok") }}
                        >
                            Confirm</button>
                    </div>
                    <div
                        className="cookies-modal__close"
                        onClick={() => { setCookiePreference("not ok") }}
                    >
                        X
                    </div>
                </div>

            )
        case true:
            return (
                <>
                </>
            )

    }

}

export default CookiesModal;