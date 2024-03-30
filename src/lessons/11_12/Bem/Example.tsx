const BemExample = () => (
    // BEM == Block Element Modificator
    <div>
        {/* (!) Название блока семантически должно отвечать на поврос "что это?"*/}
        <div className="header">
            {/* Блоки могут быть вложены друг в друга */}
            <div className="logo">


                {/* (!) Название элемента семантически должно отвечать на поврос "что это?"*/}

                {/* элементы должны быть строго внутри блока */}
                <div className="logo__title"></div>
                <img className="logo__image" src="" alt="" />
            </div>
            <div className="menu">
                <div className="menu__list">

                    {/* Допустима вложенность элементов друг в друга, но блок у элементов все равно один и тот же */}
                    <div className="menu__list-item">

                    </div>
                </div>
            </div>


            <div className="block">

                {/* Допустима глубокая вложенность элементов, но привязаны он должны быть к одному блоку */}
                <div className="block__elem1">
                    <div className="block__elem2">
                        <div className="blok__elem3"></div>
                    </div>
                </div>
            </div>

            <div className="page-block">
                {/* Название блока и элемента составное, это допустимо */}
                <div className="page-block__inner-page-block"></div>
            </div>

            {/* недопустимо доставать элементы за пределы блока */}
            <div className="blok__elem3"></div>




            {/* (!) Название модификатора семантически должно отвечать на поврос "какой он?"*/}

            {/* Модификаторы через двойное тире --disabled – так принято во всем мире */}
            <div className="block__element--disabled"></div>


            {/* Модификаторы через нижнее подчеркинвание _disabled – так принято в Яндексе */}
            <div className="block__element_disabled"></div>


            {/* Имя модификатора может быть составным */}
            <div className="block__element--theme-winter"></div>
            <div className="block__element--size-lg"></div>


            {/* Имя модификатора может быть булевым значением */}
            <div className="block__ele--focus"></div>

            {/* Модификатор может быть без элемента, напримре, у блока */}
            <div className="block__ele--focus"></div>


            {/* Модификатор НЕ может быть сам по себе */}
            <div className="--focus"></div>

        </div>
    </div>
)