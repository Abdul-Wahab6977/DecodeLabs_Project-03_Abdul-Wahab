const prisma = require('../db/prismaClient')

// ─────────────────────────────────────────
// CREATE — POST /api/posts
// Creates a new post linked to an existing user
// ─────────────────────────────────────────
const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body

    if (!title || !content || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Title, content, and userId are all required fields.'
      })
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId: parseInt(userId)
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    return res.status(201).json({
      success: true,
      message: 'Post created and persisted to the database successfully.',
      post: newPost
    })

  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(404).json({
        success: false,
        error: 'The provided userId does not reference a valid user record.'
      })
    }
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while creating the post.'
    })
  }
}

// ─────────────────────────────────────────
// READ ALL — GET /api/posts
// Retrieves all posts with their associated user info
// Demonstrates 1:Many relationship (User → Posts)
// ─────────────────────────────────────────
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while retrieving posts.'
    })
  }
}

// ─────────────────────────────────────────
// READ ONE — GET /api/posts/:id
// Retrieves a single post by its primary key
// ─────────────────────────────────────────
const getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'No post record was found with the provided ID.'
      })
    }

    return res.status(200).json({
      success: true,
      post
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while retrieving the post.'
    })
  }
}

// ─────────────────────────────────────────
// UPDATE — PUT /api/posts/:id
// Modifies the title and/or content of an existing post
// ─────────────────────────────────────────
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title && !content) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (title or content) must be provided for an update.'
      })
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { title, content }
    })

    return res.status(200).json({
      success: true,
      message: 'Post record updated successfully in the database.',
      post: updatedPost
    })

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'No post record was found with the provided ID to update.'
      })
    }
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while updating the post.'
    })
  }
}

// ─────────────────────────────────────────
// DELETE — DELETE /api/posts/:id
// Permanently removes a post record from the database
// ─────────────────────────────────────────
const deletePost = async (req, res) => {
  try {
    await prisma.post.delete({
      where: { id: parseInt(req.params.id) }
    })

    return res.status(200).json({
      success: true,
      message: 'Post record has been permanently deleted from the database.'
    })

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'No post record was found with the provided ID to delete.'
      })
    }
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while deleting the post.'
    })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
}