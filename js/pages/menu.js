import {changeLayout} from "../navigation.js";
import Game from "./game.js";
import addLogicGame from "../../new_index.js";
import {postScore} from "../utils/services.js";

class Menu {
    constructor(state) {
        this.state = state;
    }

    getLayout() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('bg');
        wrapper.innerHTML = (`
      <section class="menu section">
        <div class="container">
          <h1 class="title">Menu</h1>
          <ul class="menu-list">
            <li class="menu-list-item">
              <button class="btn" id="link-game">
                game
              </button>
            </li>
            <li class="menu-list-item">
              <button class="btn" id="link-score">
                score
              </button>
            </li>
            <li class="menu-list-item">
              <button class="btn" id="link-description">
                description
              </button>
            </li>
          </ul>
        </div>
        <div class="overlay"> 
          <div class="modal start-game"> 
            <button class="close">&times</button> 
            <div class="modal-wrapper"> 
              <label class="label" for="name">enter player name</label> 
              <input type="text" name="name" class="name"> 
            </div>  
            <button class="btn start">Start game</button> 
          </div> 
        </div>
      </section>
    `);
        const btnToGame = wrapper.querySelector('#link-game');
        const btnEl2 = wrapper.querySelector('#link-score');
        const container = wrapper.querySelector('.container');
        const closeEl = wrapper.querySelector('.close');
        const overlay = wrapper.querySelector('.overlay');
        const startGameEl = wrapper.querySelector('.start');
        const nameEl = wrapper.querySelector('.name');
        const descrEl = wrapper.querySelector('#link-description');
        //send btn el
        //input name el
        closeEl.onclick = () => {
            overlay.classList.remove('active');
        }

        startGameEl.onclick = () => {
            const name = nameEl.value;
            console.log(name);
            if (name.trim().length > 0) {
                changeLayout(Game);
                addLogicGame(name);
            } else {
                alert('Entered incorrect name');
            }
        }

        descrEl.onclick = () => {
            window.location.hash = 'description';
        }

        btnToGame.onclick = () => {
            overlay.classList.add('active');
        };
        btnEl2.onclick = () => {
            console.log('to score')
            window.location.hash = 'score';
        };

        return wrapper;
    }
}

export default Menu;
