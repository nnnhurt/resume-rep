const softSkills = [
  { icon: 'nf nf-fa-comments', title: 'Коммуникативность', desc: 'Умею находить общий язык с заказчиками, разработчиками и бизнесом.' },
  { icon: 'nf nf-fa-users', title: 'Работа в команде', desc: 'Эффективно взаимодействую в кросс-функциональных командах.' },
  { icon: 'nf nf-fa-lightbulb', title: 'Критическое мышление', desc: 'Разбираю сложные задачи и нахожу узкие места в процессах.' },
  { icon: 'nf nf-fa-eye', title: 'Внимание к деталям', desc: 'Проверяю требования, схемы и метрики на каждом этапе.' },
  { icon: 'nf nf-fa-bar_chart', title: 'Презентация идей', desc: 'Чётко формулирую выводы и обосновываю решения данными.' },
  { icon: 'nf nf-fa-refresh', title: 'Адаптивность', desc: 'Быстро переключаюсь между задачами и вникаю в новые домены.' },
];

function SoftSkills() {
  return (
    <section className="section">
      <div className="card delay-4">
        <h2 className="card-title">Софт-скиллы</h2>
        <ul className="soft-skills-list">
          {softSkills.map((skill) => (
            <li key={skill.title} className="soft-skill-item">
              <i className={`soft-skill-icon ${skill.icon}`} />
              <div>
                <h3 className="soft-skill-title">{skill.title}</h3>
                <p className="soft-skill-desc">{skill.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SoftSkills;
