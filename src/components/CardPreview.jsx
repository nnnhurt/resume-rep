function CardPreview() {
  return (
    <section className="section preview-section">
      <div className="card delay-5">
        <h2 className="card-title">Моя карточка</h2>
        <div className="card-flip-container">
          <div className="card-flipper">
            <div className="card-face card-face-front">
              <img
                src="/card-front.png"
                alt="Передняя сторона карточки резюме"
                className="card-face-img"
              />
            </div>
            <div className="card-face card-face-back">
              <img
                src="/card-back.png"
                alt="Обратная сторона карточки резюме"
                className="card-face-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardPreview;
