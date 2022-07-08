import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (value) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.post('/api/users/register', value);
      message.success('User Register Successfully!');
      navigate('/login');
      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      message.error('Error Register Failed!');
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.getItem('auth');
    navigate('/');
  }, [navigate]);

  return (
    <div className='form'>
      <h2>KT POS</h2>
      <p>Register</p>
      <div className='form-group'>
        <Form layout='vertical' onFinish={submitHandler}>
          <FormItem name='name' label='Name'>
            <Input />
          </FormItem>
          <FormItem name='userId' label='User ID'>
            <Input />
          </FormItem>
          <FormItem name='password' label='Password'>
            <Input type='password' />
          </FormItem>
          <div className='form-btn-add'>
            <Button htmlType='submit' className='add-new'>
              Register
            </Button>
            <Link className='other-form' to='/login'>
              Login Here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
