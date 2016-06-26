const choo = require('choo');
const app = choo();

const start = send => () => {
  send('app:location', {location: '/blah'});
  window.history.pushState({}, null, '/blah');
  console.log('start');

};

const mainMenu = (params, state, send) => choo.view`
  <div>
    <h1>Hi!</h1>
    <button onclick=${start(send)}>Start game</button>
  </div>
`;

window.router = app.router(route => [
  route('/', mainMenu),
  route('/blah', () => choo.view`<h1>blah</h1>`)
]);


const tree = app.start();
document.body.appendChild(tree);


window.app = app;

