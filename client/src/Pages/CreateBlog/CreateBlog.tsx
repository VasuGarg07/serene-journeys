import { yupResolver } from '@hookform/resolvers/yup';
import { Clear, PanoramaRounded } from '@mui/icons-material';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomIconButton } from '../../Components/CustomIconButton/CustomIconButton';
import InfiniteSpinner from '../../Components/Spinner/InfiniteSpinner';
import { postBlog } from '../../Utils/api.service';
import { BlogCreated, CATEGORIES, MAX_TAG_LIMIT, miscErr } from '../../Utils/constants';
import { SEVERITY } from '../../Utils/enums';
import { BlogForm, BlogRequest } from '../../Utils/interfaces';
import { blogValidationSchema, showNotification, stringToColor } from '../../Utils/utilities';
import './CreateBlog.styles.scss';
import { useDialog } from '../../Components/DialogProvider/DialogProvider';
import CoverImage from '../../Components/CoverImage/CoverImage';
import { StorageHelper } from '../../Utils/storage.helper';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {

  const { formImageLink, setFormImageLink, openDialog } = useDialog();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<BlogForm>({ resolver: yupResolver(blogValidationSchema) });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
  };

  const handleAddCategory = () => {
    if (inputValue.trim() !== '' && !categories.includes(inputValue.trim())) {
      setCategories((options) => [...options, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveCategory = (value: string) => {
    setCategories((options) => options.filter(op => op !== value));
  };

  const filteredCategories = CATEGORIES.filter((category) => !categories.includes(category));

  // Image Picker Utils
  const handleOpenDialog = () => {
    const content = <CoverImage />;
    openDialog(content);
  };

  useEffect(() => {
    setValue('imageLink', formImageLink);
  }, [formImageLink, setValue]);

  // Submit Blog On server
  const submitForm: SubmitHandler<BlogForm> = async (data: BlogForm) => {
    setIsLoading(true);

    const request: BlogRequest = {
      title: data.title.trim(),
      description: data.description.trim(),
      imageLink: data.imageLink.trim(),
      categories,
      user: StorageHelper.userProfile!._id
    }

    console.log(request)

    try {
      const _ = await postBlog(request);
      showNotification(SEVERITY.Success, BlogCreated);
      setFormImageLink('');
      navigate('/home');

    } catch (error: any) {

      if (error.response.status === 400) {
        showNotification(SEVERITY.Error, error.response.data.error);
      } else {
        showNotification(SEVERITY.Error, miscErr);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='post-container full-width full-vp-height padding flex-centered-column'>
      <Typography variant="button" textAlign="center" className='heading'>Write New Blog</Typography>

      <div className='post-section padding flex-centered-column'>

        <div className="full-width form-field">
          <Typography variant="button">Blog Title</Typography>
          <TextField {...register("title")} fullWidth className='input-section'
            placeholder="Serenity in Nature" size="small" variant="outlined" disabled={isLoading} />
          <Typography variant="caption" color={"error.main"} className="error-text">
            {errors.title?.message}
          </Typography>
        </div>

        <div className="full-width form-field">
          <Typography variant="button">Cover Image (jpg/png/webp) </Typography>

          <div className='flex-centered-container-vr'>
            <TextField {...register("imageLink")} fullWidth className='input-section'
              placeholder="https://..." size="small" variant="outlined" disabled={isLoading} />

            <CustomIconButton className='icon-btn' onClick={handleOpenDialog}>
              <PanoramaRounded />
            </CustomIconButton>
          </div>

          <Typography variant="caption" color={"error.main"} className="error-text">
            {errors.imageLink?.message}
          </Typography>
        </div>

        <div className="full-width form-field">
          <Typography variant="button">Categories</Typography>
          <Autocomplete freeSolo options={filteredCategories} inputValue={inputValue} size='small'
            disabled={isLoading || categories.length >= MAX_TAG_LIMIT} onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth className='input-section'
                placeholder="Press enter to add"
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} />
            )}
          />

          <div className='tags flex-centered-container-vr'>
            {categories.map((val: string) => (
              <Chip key={val} label={val} size='small' sx={{ background: stringToColor(val) }}
                deleteIcon={<Clear />}
                onDelete={() => handleRemoveCategory(val)} />
            ))}
          </div>

          {categories.length >= MAX_TAG_LIMIT && <Typography variant="caption" color={"error.main"} className="error-text">
            Categories can have at most {MAX_TAG_LIMIT} items
          </Typography>}
        </div>

        <div className="full-width form-field">
          <Typography variant="button">Blog Content</Typography>
          <TextField {...register("description")} multiline fullWidth className='input-section' minRows={4}
            placeholder="Start writing here..." size="small" variant="outlined" disabled={isLoading} />
          <Typography variant="caption" color={"error.main"} className="error-text">
            {errors.description?.message}
          </Typography>
        </div>
      </div>

      {!isLoading ?
        <Button onClick={handleSubmit(submitForm)} className="form-submit-btn" variant="contained" color="primary" disableElevation>
          Upload Blog
        </Button> :
        <InfiniteSpinner sx={{ marginTop: "16px" }} color="primary" />
      }

    </div>
  )
}

export default CreateBlog