/* eslint-disable react/prop-types */
// import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field,  Form } from 'formik';
import { Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
  birthday: Yup.date().required('Birthday is required'),
});

const UpdateProfileForm = ({ isSubmitting }) => {
  const { token } = useParams();

//   useEffect(() => {
//     // Send the token back to the server
//     if (token) {
//       axios.post('your_backend_token_verification_endpoint', { token })
//         .then(response => {
//           console.log('Token verified');
//         })
//         .catch(error => {
//           console.error('Token verification failed:', error);
//         });
//     }
//   }, [token]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request with the updated user profile data and the token in the request header
      await axios.post('your_api_endpoint', { ...values }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile updated successfully!');
      // Optionally, you can show a success message here
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error case if needed
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
        birthday: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="name">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.name && form.touched.name}>
              <Input {...field} placeholder="Name" />
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="password">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
              <Input {...field} type="password" placeholder="Password" />
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="birthday">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.birthday && form.touched.birthday}>
              <Input {...field} type="date" placeholder="Birthday (yyyy/mm/dd)" />
              <FormErrorMessage>{form.errors.birthday}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Update Profile
        </Button>
      </Form>
    </Formik>
  );
};

export default UpdateProfileForm;
