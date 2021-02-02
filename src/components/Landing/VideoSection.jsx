import React from 'react';

export default function VideoSection() {
    return (
        <div className="row video">
            <div className="col-12">
                <h2>Видео</h2>
            </div>
            <div className="col-lg-7">
                <iframe height="315" title="video" frameBorder="0" allowFullScreen
                src="https://www.youtube.com/embed/2vhWfMSr4YM?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            <div className="col-lg-5 video-text-container">
                <p> Мы предоставляем сервис заказа раскроя листовых материалов от металлов до полимеров.</p>
            </div>
        </div>
    );
}
