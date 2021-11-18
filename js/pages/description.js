class Description {
    constructor(state) {
        this.state = state;
    }

    getLayout() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('bg');
        wrapper.innerHTML = (`
      <section class="settings section">
        <div class="container">
          <div class="rules">
          <h1><i>Правила игры "B r i c k s G a m e"</i></h1>
          <p>В эту игру одновременно может играть только один игрок. Суть состоит в том, чтобы не дать мячику пересечь нижнюю границу игрового поля. Игрок может управлять нижней платформой с помощью мыши или клавиш ВВЕРХ, ВНИЗ, ВЛЕВО, ВПРАВО. Игра состоит из трех уровней, с каждым новым уровнем скорость шарика увеличивается, также добавляется один ряд кирпичиков. Игрок может выиграть игру, когда пройдет все три уровня, или проиграть, если потратит все жизни (изначально их 3). </p>
          </div>
          <button class="btn">
            Back
          </button>
        </div>
      </section>
    `);
        const btnEl = wrapper.querySelector('.btn');

        btnEl.onclick = () => {
            console.log('to menu')
            window.location.hash = 'game';
        };
        return wrapper;
    }
}

export default Description;
