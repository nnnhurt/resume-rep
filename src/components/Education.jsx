const education = [
  {
    school: 'СПБГТИ (ТУ)',
    detail: 'Бакалавриат, заочное обучение. Системный анализ и управление (2026—2031)',
  },
  {
    school: 'Университет «Сириус»',
    detail: 'СПО. Информационные системы и программирование (2024—2026)',
  },
];

function Education() {
  return (
    <section className="section">
      <div className="card delay-5">
        <h2 className="card-title">Образование</h2>
        {education.map((item) => (
          <div key={item.school} className="education-item">
            <h3 className="education-school">{item.school}</h3>
            <p className="education-detail">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
