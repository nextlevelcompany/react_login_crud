import "../Styles/Login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/database.svg"
import { Link } from 'react-router-dom';

function Login({logado=false}) {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {

      const page = response.data;

      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.reload();
      } else {
        alert(response.data.msg);
      }

    });
  };


  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("El correo electrónico es obligatorio."),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es obligatoria"),
  });


  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />

      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Inicio</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/cadastro">Registrar</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Usuario</label>

                <Field name="email" type='email' className="form-field" placeholder="Email" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <label form="email">Contraseña</label>
                <Field name="password" type='password' className="form-field" placeholder="Contraseña" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                ENTRAR
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;