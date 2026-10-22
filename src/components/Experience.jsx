const jobs = [
  {
    company: 'СБЕР',
    role: 'Системный аналитик',
    period: 'Июль 2025 — Июль 2026',
    description:
      'Разработка требований и сценариев использования в ЕРМ.ГОЛОС (связь с клиентами банка с помощью звонков).',
    highlights: [
      'Актуализация требований: проверка JSON-схем, скриншотов и логики работы бэкенда.',
      'Проектирование Use Case для исходящих звонков, идентификации клиента, блокировки/перевыпуска карт.',
      'Оптимизация UX: сокращение типового звонка с 15 до 8 минут.',
      'Анализ транскриптов и метрик: снижение ошибочных переадресаций на 71%.',
      'Автоматизация сбора метрик производительности и оптимизация инфраструктуры.',
    ],
  },
  {
    company: 'Университет «Сириус»',
    role: 'Python-разработчик / Системный аналитик',
    period: 'Декабрь 2024 — Май 2025',
    description:
      'Разработка и запуск Telegram-бота для онбординга новых сотрудников Университета «Сириус».',
    highlights: [
      'Сбор и формализация требований, пользовательских сценариев и критериев приёмки.',
      'Бэкенд на Django и интеграция с Telegram через aiogram 3.',
      'База знаний на PostgreSQL для хранения вопросов, ответов и логов обращений.',
      'Деплой в Docker-контейнерах для стабильной работы 24/7.',
      'Снижение операционной нагрузки на HR и ускорение получения ответов до 15–20 секунд.',
    ],
  },
  {
    company: 'GlobalVerse (Carbon Group)',
    role: 'Аналитик данных / Системный аналитик',
    period: 'Сентябрь 2023 — Февраль 2024',
    description:
      'Работа над сервисом агрегации и перевода новостей из зарубежных источников.',
    highlights: [
      'Разработка и поддержка парсеров на Python (Beautiful Soup, Scrapy, Selenium).',
      'Написание ТЗ и user stories для сервиса и парсеров.',
      'Валидация, очистка данных и проверка на дубликаты.',
      'Увеличение числа стабильных источников с 2 до 8 за неделю.',
      'Время между публикацией новости и её появлением в системе — менее 10 минут.',
    ],
  },
];

function Experience() {
  return (
    <section className="section">
      <div className="card experience-card delay-4">
        <h2 className="card-title">Опыт работы — 2 года</h2>
        <div className="experience-list">
          {jobs.map((job) => (
            <article key={job.company}>
              <div className="job-header">
                <div>
                  <h3 className="job-company">{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                </div>
                <span className="job-period">{job.period}</span>
              </div>
              <p className="job-desc">{job.description}</p>
              <ul className="job-list">
                {job.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
