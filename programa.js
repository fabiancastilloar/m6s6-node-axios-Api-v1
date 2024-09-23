
import axios from 'axios';

import fs from 'fs';

import yargs from 'yargs';
//const yargs = require('yargs');
//npm i yargs
import { hideBin } from 'yargs/helpers';  // Para manejar correctamente los argumentos


let urlApi = 'https://jsonplaceholder.typicode.com/';
let limite = '?_limit=1';

/*
const args = yargs
.command('comments',async (argv) => 
{
 console.log('ok comments');
// await consultaAPI(`${urlApi}/comments${limite}` , 'comments.txt')
})
//.command('photos',async (argv) => 
//{await consultaAPI(`${urlApi}/photos${limite}`, 'photos.txt')})
*/

const funcionDiscrimina = (pargs) => {
  //necesito capturar el o los comandos ingresados
 console.log(`\n *** comando ingresado: ${pargs} \n ` );
}

const args = yargs(hideBin(process.argv))
  .command('comments', 'Consulta los comentarios y los guarda en un archivo',
  (args) => funcionDiscrimina (args),
    async () => {
      await consultaAPI(`${urlApi}/comments${limite}`, 'comments.txt');
    })
  .command('photos', 'Consulta las fotos y las guarda en un archivo',
    async () => {
      await consultaAPI(`${urlApi}/photos${limite}`, 'photos.txt');
    })
  .command('albums', 'Consulta los albums y los guarda en un archivo',
    async () => {
      await consultaAPI(`${urlApi}/albums${limite}`, 'albums.txt');
    })
  .command('todos', 'Consulta todos y los guarda en un archivo',
    async () => {
      await consultaAPI(`${urlApi}/todos${limite}`, 'todos.txt');
    })
  .command('posts', 'Consulta posts y los guarda en un archivo',
    async () => {
      await consultaAPI(`${urlApi}/posts${limite}`, 'posts.txt');
    })
  .command('users', 'Consulta users y los guarda en un archivo',
    async () => {
      await consultaAPI(`${urlApi}/users${limite}`, 'users.txt');
    })
  .help()
  .argv;


const main = async () => {
  const [, , comando] = process.argv;


  //urlFinal = urlApi + "comments" + limite;

  switch (comando) {
    case 'commentss':
      // await consultaAPI(`${urlApi}/comments${limite}` , 'comments.txt');
      // await consultaAPI(`${urlApi}/comments?_limit=5` , 'comments.txt');
      await consultaAPI(`${urlApi}/comments${limite}`, 'comments.txt');
      break;
    case 'photoss':
      await consultaAPI(`${urlApi}/photos${limite}`, 'photos.txt');
      break;
    case 'albumss':
      await consultaAPI(`${urlApi}/albums${limite}`, 'albums.txt');
      break;
    case 'todoss':
      //await consultaAPI(`${urlApi}/todos?_limit=5`, 'todos.txt');
      await consultaAPI(`${urlApi}/todos${limite}`, 'todos.txt');
      break;
    case 'postss':
      await consultaAPI(`${urlApi}/posts${limite}`, 'posts.txt');
      break;
    case 'userss':
      await consultaAPI(`${urlApi}/users${limite}`, 'users.txt');
      break;
    default:
      console.error(`Comando no reconocido. 
      Usar "comments", "photos", "albums", "todos" o "posts".`);
  }
};


async function consultaAPI(url, archivo) {
  try {
    const response = await axios.get(url);//requerir la api
    //si el error es distinto del codigo de estado correcto entonces...
    if (response.status !== 200) {
      console.log(`Error en la respuesta de la API: ${response.statusText}`);
    }
    //se almacena la respuesta en const data 
    const data = response.data;
    //se espera la promesa de escritura de archivo
    // JSON.stringify se utiliza para convertir un objeto de JavaScript en una cadena de texto JSON.
    //null:  "replacer".  permite definir cómo se procesan ciertos valores durante la conversión. 
    //2: Es el tercer argumento, llamado "space" (espacio). 
    //Este argumento determina la cantidad de espacios utilizados para la indentación del resultado,
    await fs.promises.writeFile(archivo, JSON.stringify(data, null, 2), 'utf8');

    const contenidoData = await fs.promises.readFile(archivo, 'utf8');
    console.log(`Contenido de API almacenado en ${archivo}`);
    console.log(contenidoData);


  } catch (error) {
    console.error(`Error al consultar la API: ${error.message}`);
  }
}

//urlFinal = urlApi + "comments" + limite;

//consultaAPI(urlFinal, 'comments.txt');

//main();


/*
comandos para ocupar:

node programa.js comments
node programa.js photos 
node programa.js posts 
node programa.js analytics
node programa.js albums
node programa.js todos 
node programa.js users 
*/


/*
comandos para ocupar:
 comments
 photos 
 posts 
 analytics
 albums
 todos 
 users 
*/