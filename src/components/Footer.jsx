import DownloadButton from './DownloadButton';

function Footer() {
  return (
    <footer className="footer">
      <div className="card footer-card delay-5">
        <img
          src="/snopy.png"
          alt="Snoopy за ноутбуком"
          className="snopy-image"
        />
        <DownloadButton />
        <p className="footer-note">
          Санкт-Петербург · готова к командировкам · удалённо / гибрид / в офисе
        </p>
      </div>
    </footer>
  );
}

export default Footer;
