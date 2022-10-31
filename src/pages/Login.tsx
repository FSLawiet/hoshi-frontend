import "./Login.css";

export const Login = () => {
  return (
    <>
      <section className="Container__Formulario">
        <h2 className="Formulario__Titulo">Registrar</h2>
        <h3 className="Formulario__Titulo-Secundario">
          Preencha as informações abaixo:
        </h3>

        <div className="Formulario__Cadastro">
          <form action="#" className="Formulario__Dados">
            <div className="Formulario__Lista">
              <label className="Formulario__Label" htmlFor="nome">
                Nome completo
              </label>
              <input
                className="Formulario__Input"
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome "
                required
              />
            </div>

            <div className="Formulario__Lista">
              <label className="Formulario__Label" htmlFor="email">
                E-mail
              </label>
              <input
                className="Formulario__Input"
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                required
              />
            </div>

            <div className="Formulario__Lista">
              <label className="Formulario__Label" htmlFor="senha">
                Senha
              </label>
              <input
                className="Formulario__Input"
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                required
              />
            </div>

            <div className="Formulario__Lista">
              <label className="Formulario__Label" htmlFor="celular">
                Celular
              </label>
              <input
                className="Formulario__Input"
                type="tel"
                pattern="+[0-9]{2}([0-9]{2})[0-9]{5}-[0-9]{4}"
                id="celular"
                name="celular"
                placeholder="+xx(xx)xxxxx-xxxx"
                required
              />
            </div>

            <div className="Formulario__Botao">
              <input
                className="Formulario__Botao-Input"
                type="submit"
                value="Criar conta"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
