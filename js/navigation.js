import Menu from './pages/menu.js';
import Score from './pages/score.js';
import Description from "./pages/description.js";

const changeLayout = (ClassOfPage) => {
    const root = document.querySelector('#root');
    const layout = new ClassOfPage().getLayout();

    root.innerHTML = '';
    root.insertAdjacentElement('afterbegin', layout);
};

const navigate = () => {
    const {hash} = document.location;
    switch (hash) {
        case '':
            changeLayout(Menu);
            break;
        case '#description':
            changeLayout(Description);
            break;
        case '#score':
            changeLayout(Score);
            break;
        default:
            changeLayout(Menu);
            break;
    }
};

const addNavigation = () => {
    navigate();

    window.onhashchange = () => {
        navigate();
    };
};

export {changeLayout, addNavigation};
