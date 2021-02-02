import React from 'react';

export default function Guide() {
    let guide = [
        { icon: "icon2.svg", text: "В файле нет размеров/текста" },
        { icon: "icon4.svg", text: "Без основной подписи" },
        { icon: "icon1.svg", text: "Линии должны образовывать замкнутый контур" },
        { icon: "icon3.svg", text: "Файл должен содержать только одну деталь" },
        { icon: "icon5.svg", text: "Масштаб должен быть 1:1" },
    ];

    return (
        <div className="guide-row">
            {guide.map((g, i) =>
                <div className="guide" key={i}>
                    <img src={'/img/guide/' + g.icon} alt={g.text} />
                    <span>{g.text}</span>
                </div>
            )}
        </div>
    );
} 
