import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { blogPostUpdateSchema, generateSlug, calculateReadTime } from '@/lib/validations/blog'
import { z } from 'zod'

interface RouteParams {
  params: {
    id: string
  }
}

// GET - Fetch single blog post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate the request body
    const validatedData = blogPostUpdateSchema.parse(body)
    
    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    // Handle slug update
    let slug = existingPost.slug
    if (validatedData.title && validatedData.title !== existingPost.title) {
      const newSlug = generateSlug(validatedData.title)
      
      // Check if new slug already exists (excluding current post)
      const slugExists = await prisma.blogPost.findFirst({
        where: {
          slug: newSlug,
          id: { not: params.id }
        }
      })
      
      if (!slugExists) {
        slug = newSlug
      }
    }
    
    // Calculate read time if body is updated
    let readTime = existingPost.readTime
    if (validatedData.body) {
      readTime = calculateReadTime(validatedData.body)
    }
    
    // Handle publish status
    let publishedAt = existingPost.publishedAt
    if (validatedData.isPublished !== undefined) {
      if (validatedData.isPublished && !existingPost.isPublished) {
        publishedAt = new Date()
      } else if (!validatedData.isPublished) {
        publishedAt = null
      }
    }
    
    const updatedPost = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        slug,
        readTime,
        publishedAt
      }
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete blog post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    await prisma.blogPost.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}