import Spinner from '../components/spinner.js';
import {getListBestPlayers} from "../utils/services.js";

class Score {
    constructor(state) {
        this.state = state;
    }

    getLayout() {
        let listOfPlayers = '';
        // let players = ; // data of players
        let isLoaded = false;

        const wrapper = document.createElement('div');
        wrapper.classList.add('bg');
        wrapper.innerHTML = (`
      <section class="score section">
        <div class="container">
          <h1>Score</h1>
          <ul class="player-list">
          ${isLoaded ? Spinner : listOfPlayers}
          </ul>
          <button class="btn">
            to Menu
          </button>
        </div>
      </section>
    `);
        const btnEl = wrapper.querySelector('.btn');
        const playerList = wrapper.querySelector('.player-list');

        const updateOfList = () => {
            console.log(isLoaded, listOfPlayers)
            if (isLoaded) {
                playerList.innerHTML = listOfPlayers;
            } else {
                console.log()
                playerList.appendChild(Spinner())
            }
        }

      updateOfList()


      getListBestPlayers()
            .then(players => {
                console.log(players);
                isLoaded = true;
                for (let {name, score} of players) {
                    listOfPlayers += `<li class="player-list-item">${name}: ${score}</li>`
                }
                updateOfList()
            })

        btnEl.onclick = () => {
            console.log('to menu')
            window.location.hash = 'game';
        };

        return wrapper;
    }
}

export default Score;