function Hero() {
  return (
    <header className="hero animate delay-1">
      <h1 className="hero-name">Загора Анна</h1>
      <p className="hero-subtitle">
        Системный аналитик · FinTech · Санкт-Петербург
      </p>
      <div className="hero-contacts">
        <a href="tel:+79891425777" className="hero-contact-link">
          <i className="nf nf-fa-phone" />
          +7 (989) 142-57-77
        </a>
        <span className="hero-contact-divider">·</span>
        <a href="mailto:nnnzagora625@mail.ru" className="hero-contact-link">
          <i className="nf nf-fa-envelope" />
          nnnzagora625@mail.ru
        </a>
      </div>
    </header>
  );
}

export default Hero;
