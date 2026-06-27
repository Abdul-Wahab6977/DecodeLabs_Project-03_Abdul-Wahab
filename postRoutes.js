const express = require('express')
const { body, validationResult } = require('express-validator')
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController')

const router = express.Router()

// ─────────────────────────────────────────
// Input Validation Middleware
// Enforces data integrity at the route level
// before any database operation is performed
// ─────────────────────────────────────────
const validatePost = [
  body('title')
    .notEmpty()
    .withMessage('Post title is a required field.')
    .isLength({ max: 100 })
    .withMessage('Post title must not exceed 100 characters.'),

  body('content')
    .notEmpty()
    .withMessage('Post content is a required field.'),

  body('userId')
    .notEmpty()
    .withMessage('A valid userId is required to associate this post with a user.')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive integer.'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }
    next()
  }
]

// ─────────────────────────────────────────
// RESTful Route Definitions
// Mapping CRUD operations to HTTP methods
// as per Project 3 requirements
// ─────────────────────────────────────────

// CREATE  → HTTP POST   → SQL INSERT
router.post('/', validatePost, createPost)

// READ ALL → HTTP GET   → SQL SELECT
router.get('/', getAllPosts)

// READ ONE → HTTP GET   → SQL SELECT WHERE id
router.get('/:id', getPostById)

// UPDATE  → HTTP PUT   → SQL UPDATE
router.put('/:id', updatePost)

// DELETE  → HTTP DELETE → SQL DELETE
router.delete('/:id', deletePost)

module.exports = router