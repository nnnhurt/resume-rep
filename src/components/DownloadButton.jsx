function DownloadButton({ className = '' }) {
  const handleDownload = async () => {
    try {
      const response = await fetch('/resume.pdf');
      if (!response.ok) {
        throw new Error('Не удалось загрузить PDF');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Загора_Анна_резюме.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка скачивания резюме:', error);
      // Fallback: открыть PDF в новой вкладке
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`download-btn ${className}`}
    >
      <i className="nf nf-fa-download" />
      Скачать резюме
    </button>
  );
}

export default DownloadButton;
