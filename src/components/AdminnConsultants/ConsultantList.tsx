import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { ConsultantProfile, ConsultantProfileLinkClassProfile } from "../../graphQL/types";
import { GET_ALL_CONSULTANTS } from "../../graphQL/queries";
import "./AdminConsultants.css";
import ConsultantItem from "./ConsultantItem";

const bucket = 'sf-consultants'
const region = 'us-east-1'

interface Props { }

interface imageListResponse {
  ETag: string
  Key: string
  LastModified: Date
  Size: number
  StorageClass: string
}


const ConsultantList: React.FC<Props> = () => {
  const [consultants, setConsultants] = useState<ConsultantProfile[]>(
    [] as ConsultantProfileLinkClassProfile[]
  );
  // const [consultantImages, setConsultantImages] = useState([] as string[])
  const [newConsultantIndex, setNewConsultantIndex] = useState(0)
  const newConsultant = () => {
    const newid = consultants.map(consultant => consultant.consultant_profile_user_id).reduce((max, id) => {
      if (id) {
        max = max === undefined || id >= max ? id + 1 : max
      }
      if (max === undefined) {
        max = 0
      }
      return max
    }, 0)
    const newConsultant: ConsultantProfile = {
      consultant_profile_user_id: newid,
      profile_photo_url: "http://www.testscaledflow.com/jitterbeast.gif"
    }
    setConsultants([...consultants, newConsultant])
  }

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch('https://api.testscaledflow.com/v0/storage', {
  //       method: "POST",
  //       headers: { "bucket": bucket, "region": region }
  //     })
  //     const response: imageListResponse[] = await res.json()
  //     // let cimgs = consultants.filter(consultant => consultant.profile_photo_url !== undefined).map(cons => `${cons.profile_photo_url}`)
  //     let imgs = response.map(content => `https://${bucket}.s3.amazonaws.com/${content.Key.replace(/ /g, "+")}`)
  //     // imgs.push(...cimgs)
  //     // console.log("IMAGES AFTER CONCAT: ", imgs, "\nCIMAGES: ", cimgs)
  //     setConsultantImages(imgs)
  //   })()
  // }, [consultants])

  // console.log("CONULTANT IMAGES: ", consultantImages)
  const removeConsultant = (id: number) => () => {
    const filteredConsultants = consultants.filter((consultant) => consultant.consultant_profile_user_id !== id)
    setConsultants(filteredConsultants)
  }

  const { loading, error, data } = useQuery(GET_ALL_CONSULTANTS);
  useEffect(() => {
    const temp = !loading && !error ? data.consultant_profiles : [];
    setConsultants(temp);
    setNewConsultantIndex(temp.length)
  }, [loading, data]);

  return (
    <>
      {consultants.map((consultant, i) => (
        newConsultantIndex === i ?
          <ConsultantItem key={consultant.consultant_profile_user_id} removeConsultant={removeConsultant(consultant.consultant_profile_user_id)} isNew consultant={consultant} /> :
          <ConsultantItem key={consultant.consultant_profile_user_id} removeConsultant={removeConsultant(consultant.consultant_profile_user_id)} consultant={consultant} />
      ))}
      <Button onClick={newConsultant}>NEW</Button>
    </>
  );
};

export default ConsultantList;
