import './App.css';
import Wheel from './components/wheel/Wheel';
import FrontPage from './components/frontpage/frontpage';
import Dice from './components/dice/Dice';
import Board from './components/board/Board';
import Game1 from './components/game1_menu/Game1';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Wheel />
    </BrowserRouter>
  );
}

export default App;
