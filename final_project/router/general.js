const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let bookPromise = new Promise(resolve => {resolve(JSON.stringify(books,null,4))})
  bookPromise.then((booklist) => {res.send(booklist)})

  //res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  let bookPromise = new Promise(resolve => {resolve(books[isbn])})
  bookPromise.then((booklist) => {res.send(booklist)})

  //res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filtered_books = (author) => {
    const filtered_books = [];
    for (const [key,value] of Object.entries(books)) { 
      if (value.author === author) filtered_books.push(books[key]);
    }
    return filtered_books;
  }

  let bookPromise = new Promise(resolve => {resolve(filtered_books(author))})
  bookPromise.then((booklist) => {res.send(booklist)})

  //res.send(filtered_books(author));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_books = (title) => {
    const filtered_books = [];
    for (const [key,value] of Object.entries(books)) { 
      if (value.title === title) filtered_books.push(books[key]);
    }
    return filtered_books;
  }

  let bookPromise = new Promise(resolve => {resolve(filtered_books(title))})
  bookPromise.then((booklist) => {res.send(booklist)})
  
  //res.send(filtered_books(title));
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send(books[isbn].reviews);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
