export default function Register() {
  return (
    <section className="auth">
    <form className="auth__container">
      <h2 className="auth__title">Регистрация</h2>
      <input type="email" name="login" placeholder="Email" className="auth__input"></input>
      <input type="password" name="password" placeholder="Пароль" className="auth__input"></input>
      <button type="submit" className="auth__button">Зарегистрироваться</button>
      <a href="/sign-in" className="auth__link">Уже зарегистрированы? Войти</a>
    </form>
  </section>
  )
}