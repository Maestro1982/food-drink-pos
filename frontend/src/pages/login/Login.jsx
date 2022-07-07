import { Button, Form, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const submitHandler = (value) => {
    console.log(value);
  };

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
