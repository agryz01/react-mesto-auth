export default function Login() {
  return (
    <section className="auth">
      <form className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <input type="email" name="login" placeholder="Email" className="auth__input"></input>
        <input type="password" name="password" placeholder="Пароль" className="auth__input"></input>
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </section>
  )
}