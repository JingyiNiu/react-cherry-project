import { useState } from "react";
import { TextField } from "@material-ui/core";
import "./test.css";

const Test = (props) => {
  const { axiosWithToken } = props;
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e) => {
    const fileToUpload = e.target.files[0];
    setFile(fileToUpload);
  };

  const handleFileSubmit = () => {
    let formData = new FormData();

    formData.append("imageFile", file);

    axiosWithToken
      .post("/Common/UploadImage", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='main-container'>
      <h1>Image Upload Test</h1>
      <TextField
        type='file'
        label='Image Upload'
        margin='normal'
        InputLabelProps={{
          shrink: true,
        }}
        variant='outlined'
        onChange={handleFileChange}
      />
      <button className='button btn-primary' onClick={handleFileSubmit}>
        Upload
      </button>
    </div>
  );
};

export default Test;
