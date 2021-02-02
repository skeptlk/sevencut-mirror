import React, { useContext } from 'react';
import { Card, Accordion, AccordionContext, useAccordionToggle }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const questions = [
    { 
        q: 'Как это работает?', 
        a: 'Вы чертите необходимые детали в любой CAD программе. После этого необходимо сохранить получившийся результат в универсальном формате "*.dxf". Теперь можно загрузить чертежи на сайт, а дальше мы рассчитаем за вас стоимость заказа. Простота – залог успеха! ; )' 
    }, { 
        q: 'Выбор материалов', 
        a: <>На данный момент доступны следующие материалы:
                <ul>
                    <li>Сталь - толщины от 0.5 мм до 10 мм. Дешёвый и самый популярный материал </li>
                    <li>Нержавеющая сталь – толщины от 0.5 мм до 10 мм </li>
                    <li>Оцинкованная сталь – толщины от 0.5 мм до 10 мм </li>
                    <li>Фанера и дерево – толщины от 0.5 мм до 10 мм </li>
                    <li>Деревянный щит </li>
                </ul></> 
    }, { 
        q: 'Способы обработки', 
        a: <><p>Мы производим лазерную резку, плазменную резку, а также раскрой материалов на фрезерном станке.</p>
            <p>Каждый из этих видов обработки имеет свои плюсы, минусы и ограничения.</p>
            <p>Лазерная резка имеет высокое качество кромки реза, что позволяет получать почти готовые детали, не нуждающиеся в дальнейшей обработке.</p>
            <p>Плазменная резка ограничивается обработкой только металлов, что обусловлено особенностями работы плазменного резака. Также итоговое качество реза ниже в сравнении с лазером. Но есть и преимущества: стоимость реза ниже, а максимальная толщина разрезаемого металла выше.</p>
            <p>Фрезерная обработка работает только с мягкими материалами, такими как фанера, дерево и композиты. Позволяет получить высокую точность реза и ровный край.</p>
            </>
    }, { 
        q: 'Качество изделий', 
        a: 'Мы серьезно относимся к любым заказам - для нас не имеет значения, будь то одна маленькая деталь или партия. За каждый заказ мы можем поручиться и всегда готовы помочь, если вдруг что-то пошло не так.' 
    }, { 
        q: 'Способы оплаты', 
        a: 'Если вы являетесь физическим лицом, то можно оплатить заказ при помощи банковской карты. Если же действуете от лица организации, то после оформления заказа, мы выставим вам счёт-оферту для оплаты. Как только будет получено подтверждение оплаты, мы сразу отправим детали в производство.' 
    }, { 
        q: 'Доставка', 
        a: 'Мы делаем всё возможное, чтобы ваш заказ как можно скорее оказался у вас в руках. Поэтому мы можем выслать вам заказ почтой или транспортной компанией. Если же вы находитесь недалеко от нас, можно приехать и забрать заказ самовывозом.' 
    }, { 
        q: 'О нас', 
        a: 'С самого начала и по сей день мы занимаемся тем, что помогаем воплотить самые невероятные идеи в реальность. Потому что любые, даже самые смелые идеи, имеют право на жизнь.' 
    }, { 
        q: 'Остались вопросы?', 
        a: 'Важна каждая мелочь. Мы придерживаемся точки зрения, что любая обратная связь важна. Поэтому, если у вас остались вопросы или есть что предложить нам, мы всегда на связи.' 
    }
];

export default function FAQSection() {
    return (
        <section className="faq" id="faq">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Вопросы и ответы</h2>
                    </div>
                    <div className="col-12">
                        <Accordion>
                            {questions.map(
                                (item, i) =>
                                    <Card key={i + 1}>
                                        <Card.Header>
                                            <FAQAccordionToggle eventKey={i + 1}>
                                                {item.q}
                                            </FAQAccordionToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i + 1}>
                                            <Card.Body>
                                                {item.a}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQAccordionToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    );

    return (
        <div className="accordion-header" onClick={decoratedOnClick}>
            <div className="inner">{children}</div>
            <div className="accordion-icon">
                <FontAwesomeIcon icon={(currentEventKey === eventKey) ? faMinus : faPlus} />
            </div>
        </div>
    );
}