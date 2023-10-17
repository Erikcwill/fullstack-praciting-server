const {
  getAllBooks,
  getBookById,
  insertBook,
  modifyBook,
  deleteBookById,
} = require("../services/book");

function getBooks(req, res) {
  try {
    const books = getAllBooks();
    res.send(books);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function getBook(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const book = getBookById(id);
      res.send(book);
    } else {
      res.status(422);
      res.send("Id Inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function postBook(req, res) {
  try {
    const newBook = req.body;

    if (req.body.nome && req.body.id)  {
      insertBook(newBook);
      res.status(201);
      res.send("Livro inserido com sucesso");
    } else {
      res.status(422);
      res.send("Os campos nome e id são obrigatórios, verifique se ambos existem");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function patchBook(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      const body = req.body;
      modifyBook(body, id);
      res.send("Dados modificados com sucesso");
    } else {
      res.status(422);
      res.send("Id Inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function deleteBook(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deleteBookById(id);
      res.send("Livro deletado com sucesso");
    } else {
      res.status(422);
      res.send("Id Inválido");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getBooks,
  getBook,
  postBook,
  patchBook,
  deleteBook,
};
