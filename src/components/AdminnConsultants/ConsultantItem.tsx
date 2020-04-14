import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Row, Col, Image, Modal, Button } from "react-bootstrap";

import { ConsultantProfileLinkClassProfile } from "../../graphQL/types";

interface Props {
  consultant: ConsultantProfileLinkClassProfile;
  isNew?: boolean;
  key: number;
  removeConsultant: () => void;
}

// export interface ConsultantProfileLinkClassProfile {
//   consultant_profile_user_id?: number;
//   first_name?: string;
//   last_name?: string;
//   job_title?: string;
//   profile_description?: string;
//   profile_photo_url?: string;
//   phone?: string;
//   email?: string;
//   class_profile?: ClassProfile[];
// }
const UPDATE_CONSULTANT = gql`mutation UpdateConsultant($id: Int!, $first_name:String, $last_name:String, $email:String, $job_title:String, $phone:String, $profile_description:String, $profile_photo_url:String, $profile_photo_alt_text: String) {
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
      profile_photo_url: $profile_photo_url}) {
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
    }
  }
}`

const NEW_CONSULTANT = gql`mutation InsertConsultant($id: Int!, $first_name:String, $last_name:String, $email:String, $job_title:String, $phone:String, $profile_description:String, $profile_photo_url:String, $profile_photo_alt_text: String) {
  insert_consultant_profiles(objects: {
      email: $email, 
      first_name: $first_name, 
      job_title: $job_title, 
      last_name: $last_name, 
      phone: $phone, 
      profile_description: $profile_description, 
      profile_photo_alt_text: $profile_photo_alt_text, 
      profile_photo_url: $profile_photo_url}) {
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
}`

const CounsultantItem: React.FC<Props> = ({consultant, isNew, removeConsultant}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [edit, setEdit] = useState(isNew)
  const [active, setActive] = useState(consultant)
  const [NewConsultant] = useMutation(NEW_CONSULTANT)
  const [UpdateConsultant] = useMutation(UPDATE_CONSULTANT);
  const [DeleteConsultant] = useMutation(DELETE_CONSULTANT);
  const [deleting, setDeleting] = useState(false)

  const editSave = () => {
    if (edit && !isNew) {
      //updateActiveHeader({ variables: { id: item.id } })
      console.log("In the useEffectEdit")
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
          profile_photo_alt_text: active.profile_photo_alt_text
        }
      })
    }
    if(edit && isNew) {
      NewConsultant({variables: {
        id: active.consultant_profile_user_id,
        first_name: active.first_name,
        last_name: active.last_name,
        email: active.email,
        job_title: active.job_title,
        phone: active.phone,
        profile_description: active.profile_description,
        profile_photo_url: active.profile_photo_url,
        profile_photo_alt_text: active.profile_photo_alt_text
      }})
    }
    setEdit(!edit)
  }

  const deleteUndo = () => {
    if (edit) {
      setActive(consultant)
      setEdit(!edit)
    }
    if (!edit) {
      setDeleting(!deleting)
      // alert(`DELETING ${active.first_name} ${active.last_name}`)
    }
    console.log("DELETING? ", deleting)
  }

  const reallyDelete = () => {
    DeleteConsultant({ variables: { id: active.consultant_profile_user_id } })
    removeConsultant()
  }

  useEffect(() => {
    console.log(active)
  }, [active])

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
              <Image
              className="consultant-image"
                src={active.profile_photo_url}
                alt={active.profile_photo_alt_text ? active.profile_photo_alt_text : `${active.first_name} ${active.last_name}`}
                fluid
              />
              {edit && <button className="change-button">change</button>}
            </Col>
            {edit ? <Col md={7}>
              <textarea placeholder="Consultant Description" className="description" defaultValue={active.profile_description} onChange={(e) => { setActive({ ...active, profile_description: e.target.value }) }} />
              <h5>Is authorized to teach:</h5>
              {active.class_profile?.map(classProfile => (
                <p key={classProfile.class_profile_id}>
                  stuff
                  {/* {classProfile.class_title} - {classProfile.class_type?.class_type_abbreviation} */}
                </p>
              ))}
            </Col> : <Col md={7}>
                <p>{active.profile_description}</p>
                <h5>Is authorized to teach:</h5>
                {active.class_profile?.map(classProfile => (
                  <p key={classProfile.class_profile_id}>
                    stuff
                    {/* {classProfile.class_title} - {classProfile.class_type?.class_type_abbreviation} */}
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
            <Modal.Header onClick={()=> {setDeleting(!deleting)} } closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body >
          <p>You want to delete {active.first_name} f-ing {active.last_name}?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={()=> {setDeleting(!deleting)} }>Close</Button>
              <Button variant="primary" onClick={reallyDelete}>Yes! I Do.</Button>
            </Modal.Footer>
          </Modal.Dialog>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CounsultantItem;
