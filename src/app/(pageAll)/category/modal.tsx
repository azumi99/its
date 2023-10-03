import { FormControl, TextField, InputLabel, Select, MenuItem, Button, SelectChangeEvent,  } from "@mui/material";
import { useState } from "react";
import { categoryInterface } from "./interfaces";
import { categoryStore } from "./services";
import { showErrorToast, showSuccessToast } from "../components/toast/ToastComponenet";

type CategoryModal = {
    handleClose: () => void;
}
const ModalCategory: React.FC<CategoryModal> = ({handleClose}) => {
  const [value, setValue] = useState('');
  const [categoryValue, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as string);
  };
  const successFunc = (message: string) => {
    showSuccessToast(message);
    handleClose()
  }
  const failFunc = (message: string) => {
    showErrorToast(message); 
  }
  const saveCategory = async () => {
    const param: categoryInterface = {
      category: categoryValue,
      status: value,
    }
    try {
      await categoryStore(param, successFunc, failFunc);
    } catch (error) {
      console.log('error')
    }
  }
    return (
      <>
          <FormControl fullWidth>
            <TextField
              required
              id="category"
              label="Category"
              type="search"
              style={{ marginBottom: '20px' }}
              onChange={handleCategory}
              fullWidth />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <div style={{marginTop: 20, textAlign: 'right'}}>
            <Button style={{margin:3}} color='warning' variant='contained' size='small' onClick={handleClose}>Cancel</Button>
            <Button style={{margin:3}} variant='contained' size='small' onClick={saveCategory} >Save</Button>
            </div>
            </>
    )
  }
  export {ModalCategory}

