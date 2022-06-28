import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;


const NoteForm = props => {

  
  const [value, setValue] = useState({ content: props.content || ''});

  const onChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Form
      onSubmit={e => {
        e.preventDefault();
        props.action({
          variables: {
            ...value
          }
          
        });
        navigate('/');
      }}>
        <TextArea 
          required
          type='text'
          name='content'
          placeholder='Notecontent'
          value={value.content}
          onChange={onChange}
        />
        <Button type='submit'>Save</Button>
      </Form>
    </Wrapper>
  )
}

export default NoteForm