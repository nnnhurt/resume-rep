const hobbies = [
  { icon: 'nf nf-fa-book', title: 'Чтение', desc: 'Люблю читать — от профессиональной литературы до художественных книг.' },
  { icon: 'nf nf-fa-heart', title: 'Йога', desc: 'Занимаюсь йогой, чтобы держать фокус и баланс в насыщенных проектах.' },
  { icon: 'nf nf-fa-paint_brush', title: 'Рисование', desc: 'Рисую в свободное время — это помогает развивать креативность и внимание.' },
];

function Hobbies() {
  return (
    <section className="section">
      <div className="card delay-5">
        <h2 className="card-title">Хобби и интересы</h2>
        <ul className="hobbies-list">
          {hobbies.map((hobby) => (
            <li key={hobby.title} className="hobby-item">
              <i className={`hobby-icon ${hobby.icon}`} />
              <div>
                <h3 className="hobby-title">{hobby.title}</h3>
                <p className="hobby-desc">{hobby.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hobbies;
