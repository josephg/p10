const choo = require('choo');
const app = choo();

const mainMenu = (params, state, send) => choo.view`
  <div><h1>Hi!</h1></div>
`;

app.router(route => [
  route('/', mainMenu)
]);


const tree = app.start();
document.body.appendChild(tree);


window.app = app;

