import React, {useState} from "react";
import AddImage from "../Forms/FormAddImage"
import FormInput from "../Forms/FormInput"
import { Form } from "react-bootstrap";

interface Props {}

const ConsultantAddForm: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('')
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('')

  return (
    <>
      <p>ConsultantAddForm</p>
      <Form>
      <FormInput title="name" cb={setName} action="" type="text" />
      </Form>
    </>
  );
};

export default ConsultantAddForm;
