const skills = [
  'Сбор требований',
  'Use Case',
  'User Story',
  'BPMN',
  'UML',
  'REST API',
  'SOAP',
  'GraphQL',
  'JSON',
  'SQL',
  'Python',
  'Docker',
  'Jira / Confluence',
  'Swagger',
  'AI агенты',
  'Git',
  'Grafana',
  'Power BI',
];

function Skills() {
  return (
    <section className="section">
      <div className="card delay-3">
        <h2 className="card-title">Ключевые навыки</h2>
        <div className="skills-list">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
