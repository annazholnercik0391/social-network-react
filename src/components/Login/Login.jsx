import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormControls/FormControls";
import { login } from "./../redux/authReducer"

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Email"} name={"email"}
          validate={[required]}
          component={Input} />

      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} type={'password'}
          validate={[required]}
          component={Input} />
      </div>
      <div>
        <Field type="checkbox" name={"rememberMe"} component={Input} />remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginFormRedux = reduxForm({
  form: 'login'
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }
  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }
  return <div>
    <h1>Login</h1>
    <LoginFormRedux onSubmit={onSubmit} />
  </div>
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login)