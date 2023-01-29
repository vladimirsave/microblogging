import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from './context/AppContext';
import { Button, Form } from "react-bootstrap";
import { addMediaDoc, uploadImage } from "../firebase/firebase";

export default function Login() {
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState();
    const navigate = useNavigate();
    const { setUserNameNew, userNameNew } = useContext(AppContext);
 
    // console.log ('profile 12', userNameNew)
    
    const handleLogIn = async (e) => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = await uploadImage(imageFile);
        console.log('URL', url);
        // setImageFile (url);
        addMediaDoc(url, caption);
    }

    // useEffect(() => {

    //     if (imageFile) {
    //       console.log(imageFile);
      
    //     }
    //   }, [imageFile])

    const handleFileChange = (e) => {
        console.log('File changed', e.target.files);
        setImageFile(e.target.files[0]);
    }


    return (
        <div>
        <div className='writecontainer'>
            <form className='userForm'>
                <h2>Profile: {userNameNew} </h2>
                <label className='' htmlFor='userNameNew'>User Name</label>
                <input onChange={(e) => setUserNameNew(e.target.value)} type='text' id='userNameNew' />
                <div className='saveButton'>
                    <button className='save' onClick={handleLogIn}>
                        Change
                    </button>
                </div>
            </form>
            </div>
         <div className='writecontainer'>
         
         <Form onSubmit={handleSubmit} className='userForm'>
         <h2>Upload an image</h2>
             <label>Caption</label>
             <Form.Control value={caption} onChange={(({ target }) => setCaption(target.value))} type="text" />
             <label>Image</label>
             <Form.Control type="file" onChange={handleFileChange} />
             {
                 imageFile &&
                 <div>
                     <img src={URL.createObjectURL(imageFile)} style={{ maxWidth: 300 }} />
                 </div>
             }
             <Button type="submit" className='save'>Save</Button>
         </Form>
         </div>
     </div>
    );
}
