const Book = require('../models/Book');

exports.findAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = new Book({
            name: req.body.name,
            author: req.body.author,
            status: req.body.status ? req.body.status : false
        });
        const bookSaved = await newBook.save();
        res.json(bookSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a book"
        })
    }
};

exports.findOneBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
        if(!book) return res.status(404).json({
            message: `Book with id ${id} does not exists!`
        });
        res.json(book)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving book with id: ${id}`
        })
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Book.findByIdAndDelete(id)
        res.json({
            message: `${data.name} - Book were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete book with id ${id}`
        })
    }
}

exports.updateBook = async (req, res) => {
    const {id} = req.params;
    try {
        await Book.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Book was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update book with id: ${id}`
        })
    }
}