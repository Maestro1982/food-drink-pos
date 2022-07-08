import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (value) => {
    //console.log(value);
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const res = await axios.post('/api/users/login');
      message.success('User Login Successfully!');
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/');
      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      message.error('Error Login Failed!');
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
      <p>Login</p>
      <div className='form-group'>
        <Form layout='vertical' onFinish={submitHandler}>
          <FormItem name='userId' label='User ID'>
            <Input />
          </FormItem>
          <FormItem name='password' label='Password'>
            <Input type='password' />
          </FormItem>
          <div className='form-btn-add'>
            <Button htmlType='submit' className='add-new'>
              Login
            </Button>
            <Link className='other-form' to='/register'>
              Register Here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
