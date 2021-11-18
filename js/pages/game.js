import addLogicGame from "../../new_index.js";

class Game {
    constructor(state) {
        this.state = state;
    }

    getLayout() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('bg');
        wrapper.innerHTML = (`
            <div id="back">
                <img id="to_menu" src="images/back.png" alt="">
            </div>
            <div id="full">
                <img id="max" src="images/maximize.png" alt="">
            </div>
            <div>
                <img src="images/sound-on.png" id="sound" alt="">
            </div>
            <div id="gameover">
                <div id="win">Congratulations! You win!</div>
                <img src="images/you_win.png" id="youwin" alt="">
                <img src="images/game_over.png" id="youlose" alt="">
            
                <div id="restart">Play Again!</div>
            </div>
      <canvas id="myCanvas" width="790" height="550"></canvas>
    `);
        const backArrow = wrapper.querySelector('#back');
        const maxScreen = wrapper.querySelector('#full');

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        console.log(backArrow);
        backArrow.onclick = () => {
            console.log('haha')
            window.location = '';
        }

        maxScreen.onclick = () => {
            toggleFullScreen();
        }
        return wrapper;
    }
}

export default Game;