import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useDialog } from '../DialogProvider/DialogProvider';
import { COVER_IMAGES } from '../../Utils/constants';
import './CoverImage.styles.scss'

const CoverImage = () => {
  const { setFormImageLink, closeDialog } = useDialog();

  const [image, setImage] = useState<string>('');

  const selectImage = () => {
    setFormImageLink(image);
    closeDialog();
  }

  return (
    <div className='flex-centered-column padding grid-container'>
      <span>Select Cover Image for Blog</span>

      <div className='full-width image-grid'>
        {COVER_IMAGES.map((img: string) => (
          <div key={img} onClick={() => setImage(img)}
            className={`image ${img == image && 'selected'}`}>
            <img src={img} alt={img} className='full-width' />
          </div>
        ))}
      </div>

      <div className='flex-right full-width'>
        <Button onClick={closeDialog} variant="contained" color="error" disableElevation size='small'>Cancel</Button>
        <Button onClick={selectImage} variant="contained" color="info" disableElevation size='small'>Confirm</Button>
      </div>
    </div>
  )
}

export default CoverImage