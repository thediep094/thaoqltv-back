const path = require("path");
const Book = require("../model/Book");

const BookController = {
  create: async (req, res) => {
    try {
      const { images } = req.files;
      const savedImages = images.map((image) => {
        const imagePath = path.join(image.originalname);
        return imagePath;
      });

      req.body.images = savedImages;
      const newBook = await Book.create(req.body);
      return res.status(200).json({
        message: "Tạo sách thành công",
        book: newBook,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const bookId = req.params.id;
      await Book.findByIdAndRemove(bookId);
      return res.status(200).json({
        message: "Book deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { images } = req.files;
      const savedImages = images.map((image) => {
        const imagePath = path.join(image.originalname);
        return imagePath;
      });

      req.body.images = savedImages;
      const data = await Book.findByIdAndUpdate(id, req.body);
      if (data) {
        return res.status(200).json({
          message: "Sửa thông tin sách thành công",
        });
      }
      return res.status(404).json({
        message: "sách không tồn tại",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  get: async (req, res) => {
    try {
      const leaves = await Book.find();
      return res.status(200).json({
        message: "Success",
        data: leaves,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
      return res.status(200).json({
        message: "Success",
        data: book,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
  getAllBook: async (req, res) => {
    try {
      const { page, limit } = req.query;

      const aggregateQuery = [
        { $skip: (Number(page) - 1) * Number(limit) },

        { $limit: Number(limit) },
      ];
      const bookData = await Book.aggregate(aggregateQuery).allowDiskUse(true);

      if (bookData.length > 0) {
        return res.status(200).json({
          message: "Thành công",
          data: bookData,
        });
      }
      return res.status(404).json({
        message: "Không có sách nào",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error,
      });
    }
  },
};

module.exports = BookController;
