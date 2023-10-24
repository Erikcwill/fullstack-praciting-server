const fs = require("fs");

function getAllBooks() {
  return JSON.parse(fs.readFileSync("books.json"));
}

function getBookById(id) {
  const books = JSON.parse(fs.readFileSync("books.json"));

  const filteredBook = books.filter((book) => book.id === id)[0];
  return filteredBook;
}

function insertBook(newBook) {
  const books = JSON.parse(fs.readFileSync("books.json"));

  // Verifica se já existe um livro com o mesmo ID
  const bookWithSameId = books.find((book) => book.id === newBook.id);

  // Verifica se já existe um livro com o mesmo nome
  const bookWithSameName = books.find((book) => book.name === newBook.name);

  if (bookWithSameId) {
    throw new Error("Um livro com o mesmo ID já existe");
  }

  if (bookWithSameName) {
    // Retorna uma mensagem no corpo da resposta
    throw new Error("Já existe um livro com o mesmo nome no banco de dados.");
  }

  const newBooksList = [...books, newBook];

  fs.writeFileSync("books.json", JSON.stringify(newBooksList));
}

function modifyBook(patchs, id) {
  let currentBooks = JSON.parse(fs.readFileSync("books.json"));
  const patchedIndex = currentBooks.findIndex((book) => book.id === id);

  const changedContent = { ...currentBooks[patchedIndex], ...patchs };

  currentBooks[patchedIndex] = changedContent;

  fs.writeFileSync("books.json", JSON.stringify(currentBooks));
}

function deleteBookById(id) {
  const books = JSON.parse(fs.readFileSync("books.json"));

  const filteredBook = books.filter((book) => book.id !== id);
  fs.writeFileSync("books.json", JSON.stringify(filteredBook));
}

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
  modifyBook,
  deleteBookById,
};
