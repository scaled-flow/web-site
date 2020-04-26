import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Row, Col, Image, Modal, Button } from "react-bootstrap";
import AddImage from "../Forms/FormAddImage"

import { ConsultantProfile } from "../../graphQL/types";

interface Props {
  consultant: ConsultantProfile;
  isNew?: boolean;
  images?: string[];
  key: number;
  removeConsultant: () => void;
}

const UPDATE_CONSULTANT = gql`mutation UpdateConsultant($id: Int!, $first_name:String, $last_name:String, $email:String, $job_title:String, $phone:String, $profile_description:String, $profile_photo_url:String, $profile_photo_alt_text: String, $photos:jsonb) {
  update_consultant_profiles(where: 
    {consultant_profile_user_id: {_eq: $id}}, 
    _set: {
      email: $email, 
      first_name: $first_name, 
      job_title: $job_title, 
      last_name: $last_name, 
      phone: $phone, 
      profile_description: $profile_description, 
      profile_photo_alt_text: $profile_photo_alt_text, 
      profile_photo_url: $profile_photo_url,
      photos: $photos }) {
    returning {
      consultant_profile_user_id
      email
      first_name
      job_title
      last_name
      phone
      profile_description
      profile_photo_alt_text
      profile_photo_url
      photos
    }
  }
}`

const NEW_CONSULTANT = gql`mutation InsertConsultant($first_name:String, $last_name:String, $email:String, $job_title:String, $phone:String, $profile_description:String, $profile_photo_url:String, $profile_photo_alt_text: String, $photos:jsonb) {
  insert_consultant_profiles(objects: {
      email: $email, 
      first_name: $first_name, 
      job_title: $job_title, 
      last_name: $last_name, 
      phone: $phone, 
      profile_description: $profile_description, 
      profile_photo_alt_text: $profile_photo_alt_text, 
      profile_photo_url: $profile_photo_url,
  		photos: $photos}) {
    returning {
      consultant_profile_user_id
      email
      first_name
      job_title
      last_name
      phone
      profile_description
      profile_photo_alt_text
      profile_photo_url
      photos
    }
  }
}`

const DELETE_CONSULTANT = gql`
  mutation DeleteConsultant($id:Int!) {
    delete_consultant_profiles(where: {consultant_profile_user_id: {_eq: $id}}) {
      returning {
        consultant_profile_user_id
      }
    }
  }
`

const AUTHORIZED_TO_TEACH = gql`
  query AuthorizedToTeach($id: Int!) {
    counsultant_profiles_link_class_profiles(where: {consultant_profile_id_fk: {_eq: $id}}) {
      class_profile {
        class_title
        class_type {
          class_type_full_name
          class_type_abbreviation
        }
      }
    }
  }
`

const CounsultantItem: React.FC<Props> = ({ consultant, isNew, removeConsultant, images }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [edit, setEdit] = useState(isNew)
  const [active, setActive] = useState(consultant)
  const [NewConsultant] = useMutation(NEW_CONSULTANT)
  const [UpdateConsultant] = useMutation(UPDATE_CONSULTANT);
  const [DeleteConsultant] = useMutation(DELETE_CONSULTANT);
  const [deleting, setDeleting] = useState(false)
  const [activeImages, setActiveImages] = useState(consultant.photos || [{ url: consultant.profile_photo_url || 'https://sf-consultants.s3.amazonaws.com/Screen+Shot+2020-03-21+at+17.56.21.png', alt_text: consultant.profile_photo_alt_text || '' }] as { url: string, alt_text: string }[])
  const [activeImage, setActiveImage] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [classes, setClasses] = useState([] as { class_profile: { class_title: string, class_type: { class_type_full_name: string, class_type_abbreviation: string } } }[])
  const [newImage, setNewImage] = useState('')

  const editSave = () => {
    if (edit && !isNew) {
      //updateActiveHeader({ variables: { id: item.id } })
      console.log("In the Edit")
      UpdateConsultant({
        variables: {
          id: active.consultant_profile_user_id,
          first_name: active.first_name,
          last_name: active.last_name,
          email: active.email,
          job_title: active.job_title,
          phone: active.phone,
          profile_description: active.profile_description,
          profile_photo_url: active.profile_photo_url,
          profile_photo_alt_text: active.profile_photo_alt_text,
          photos: activeImages
        }
      })
    }
    if (edit && isNew) {
      NewConsultant({
        variables: {
          id: active.consultant_profile_user_id,
          first_name: active.first_name,
          last_name: active.last_name,
          email: active.email,
          job_title: active.job_title,
          phone: active.phone,
          profile_description: active.profile_description,
          profile_photo_url: active.profile_photo_url,
          profile_photo_alt_text: active.profile_photo_alt_text,
          photos: activeImages
        }
      })
    }
    setEdit(!edit)
  }

  const changeImage = (x: number) => {
    let next = activeImage + x
    console.log("X: ", x, "NEXT: ", next)
    if (next === activeImages.length) {
      setActive({ ...active, profile_photo_url: activeImages[0].url, profile_photo_alt_text: activeImages[0].alt_text })
      next = 0
    }
    if (next < 0) {
      setActive({ ...active, profile_photo_url: activeImages[activeImages.length - 1].url, profile_photo_alt_text: activeImages[activeImages.length - 1].alt_text })
      next = activeImages.length - 1
    }
    if (next < activeImages.length && next > 0) {
      setActive({ ...active, profile_photo_url: activeImages[next].url, profile_photo_alt_text: activeImages[next].alt_text })
    }
    console.log("NEXT BEFORE SET: ", next)
    setActiveImage(next)
    setActive({ ...active, profile_photo_url: activeImages[next].url, profile_photo_alt_text: activeImages[next].alt_text })
  }

  const deleteUndo = () => {
    if (edit) {
      setActive(consultant)
      setEdit(!edit)
    }
    if (!edit) {
      setDeleting(!deleting)
    }
    console.log("DELETING? ", deleting)
  }

  const reallyDelete = () => {
    DeleteConsultant({ variables: { id: active.consultant_profile_user_id } })
    removeConsultant()
  }

  const { loading, error, data } = useQuery(AUTHORIZED_TO_TEACH, { variables: { id: consultant.consultant_profile_user_id } })

  useEffect(() => {
    !loading && !error && setClasses(data.counsultant_profiles_link_class_profiles)
  }, [loading, error, data])

  useEffect(() => {
    const i = activeImages.map(urls => urls.url).indexOf(active.profile_photo_url || '')
    setActiveImage(i < 0 ? 0 : i)
  }, [activeImages])

  // When a new image is added using the uploader this will add it to the list of images available.
  useEffect(()=> {
    if(newImage !== '') {
      setActiveImages([...activeImages,{url:newImage, alt_text: "new image"}])
    }
  },[newImage])

  return (
    <div id="deleteModal" className="consultant-row">
      <Row>{edit ?
        <Col md={11}>
          <h4>
            <input type="text" placeholder="first name" title="firstName" defaultValue={active.first_name} onChange={(e) => setActive({ ...active, first_name: e.target.value })} /> <input type="text" placeholder="last name" title="lastName" value={active.last_name} onChange={(e) => setActive({ ...active, last_name: e.target.value })} />
          </h4>
          <p>
            <input type="text" placeholder="job title" title="jobTitle" defaultValue={active.job_title} onChange={(e) => setActive({ ...active, job_title: e.target.value })} /> - <input type="text" title="phone" placeholder="phone" defaultValue={active.phone} onChange={(e) => setActive({ ...active, phone: e.target.value })} />
          </p>
        </Col>
        :
        <Col md={11}>

          <h4>
            {active.first_name} {active.last_name}
          </h4>
          <p>
            {active.job_title} - {active.phone}
          </p>
        </Col>}

        <Col md={1} className="align-self-center">
          <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <i className="fa-2x fas fa-caret-right"></i> : <i className="fa-2x fas fa-caret-down"></i>}
          </button>
        </Col>
      </Row>
      {!isCollapsed && (
        <>
          <Row>
            <Col md={3}>
              {console.log("ACTIVE IMAGES: ", activeImages)}
              {activeImages[activeImage] &&
                <Image
                  className="consultant-image"
                  src={edit ? activeImages[activeImage].url : active.profile_photo_url}
                  alt={active.profile_photo_alt_text ? active.profile_photo_alt_text : `${active.first_name} ${active.last_name}`}
                  fluid
                />}
              {edit && <button onClick={() => setIsChanging(!isChanging)} className="change-button">change</button>}
              {edit && <button onClick={() => changeImage(1)} className="next-image-button"><i className="fa-1x fas fa-caret-right" /></button>}
              {edit && <button onClick={() => changeImage(-1)} className="prev-image-button"><i className="fa-1x fas fa-caret-left" /></button>}
            </Col>
            {edit ? <Col md={7}>
              <textarea placeholder="Consultant Description" className="description" defaultValue={active.profile_description} onChange={(e) => { setActive({ ...active, profile_description: e.target.value }) }} />
              <h5>Is authorized to teach:</h5>
              {classes.map(classProfile => (
                <p key={classProfile.class_profile.class_title}>
                  {classProfile.class_profile.class_title} - {classProfile.class_profile.class_type.class_type_abbreviation}
                </p>
              ))}
            </Col> : <Col md={7}>
                <p>{active.profile_description}</p>
                <h5>Is authorized to teach:</h5>
                {classes.map(classProfile => (
                  <p key={classProfile.class_profile.class_title}>
                    {classProfile.class_profile.class_title} - {classProfile.class_profile.class_type.class_type_abbreviation}
                  </p>
                ))}
              </Col>
            }

            <Col md={2} className="">
              <button onClick={editSave} className="no-style">
                <i className={edit ? "far fa-save fa-2x" : "far fa-edit fa-2x"}></i>
              </button>
              <button data-toggle="modal" data-target="#ModalExample" onClick={deleteUndo} className="no-style">
                <i className={edit ? "fa fa-undo fa-2x" : "far fa-trash-alt fa-2x"}></i>
              </button>
            </Col>
          </Row>
          <Modal show={deleting}>
            <Modal.Dialog>
              <Modal.Header onClick={() => { setDeleting(!deleting) }} closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>

              <Modal.Body >
                <p>You want to delete {active.first_name} f-ing {active.last_name}?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setDeleting(!deleting) }}>Close</Button>
                <Button variant="primary" onClick={reallyDelete}>Yes! I Do.</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
          <Modal show={isChanging}>
            <Modal.Dialog>
              <Modal.Header onClick={() => { setIsChanging(!isChanging) }} closeButton>
                <Modal.Title>Click an image to pick.</Modal.Title>
              </Modal.Header>

              <Modal.Body >
                {activeImages.map((i, n) =>
                  <div>
                    <Image style={{ margin: '10px' }} height="150px" src={i.url} alt={i.alt_text} onClick={() => { setActiveImage(n); setActive({ ...active, profile_photo_url: i.url, profile_photo_alt_text: i.alt_text, photos: activeImages }); setIsChanging(!isChanging) }} />
                    <Button onClick={()=>{
                      if(activeImages.length<2) {
                        alert("Must have at least 1 image")
                      } else {
                        setActiveImages(activeImages.filter((_, index)=> index !== n))
                      }}} className="far fa-trash-alt" variant="outline-dark"/>
                    
                    <textarea style={{ width: '100%' }} defaultValue={i.alt_text} onChange={(e) => {
                      setActiveImages(activeImages.map(
                        (image, index) => {
                          if (index === n) {
                            return { url: image.url, alt_text: e.target.value }
                          }
                          return image
                        }))
                    }} />
                  </div>
                )}
                <div style={{margin:'1rem'}}>
                <AddImage setImageURL={setNewImage} /><br />
                <small>Image will be displayed at a maximum of 250px wide by 360px high. Please upload appropriately proportioned images for these dimensions.</small>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setIsChanging(!isChanging) }}>Nevermind</Button>
                {/* <Button variant="primary" onClick={() => alert("cool")}>Yes! I Do.</Button> */}
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CounsultantItem;
