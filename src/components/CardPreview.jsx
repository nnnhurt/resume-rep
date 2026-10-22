import { useState } from 'react';

function CardPreview() {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setFlipped((prev) => !prev);
  };

  return (
    <section className="section preview-section">
      <div className="card delay-5">
        <h2 className="card-title">Моя карточка</h2>
        <p className="flip-hint">Нажмите на карточку, чтобы перевернуть</p>
        <div
          className={`card-flip-container ${flipped ? 'flipped' : ''}`}
          onClick={handleToggle}
          onTouchEnd={handleToggle}
          role="button"
          tabIndex={0}
          aria-label="Перевернуть карточку"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFlipped((prev) => !prev);
            }
          }}
        >
          <div className="card-flipper">
            <div className="card-face card-face-front">
              <img
                src="/card-front.png"
                alt="Передняя сторона карточки резюме"
                className="card-face-img"
                loading="lazy"
              />
            </div>
            <div className="card-face card-face-back">
              <img
                src="/card-back.png"
                alt="Обратная сторона карточки резюме"
                className="card-face-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardPreview;
