import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  shortDescription: z.string().min(1, 'Short description is required').max(300, 'Short description must be less than 300 characters'),
  body: z.string().min(1, 'Content is required'),
  featuredImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').optional().or(z.literal('')),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').optional().or(z.literal('')),
  readTime: z.number().min(1).optional()
})

export const blogPostUpdateSchema = blogPostSchema.partial()

export type BlogPostFormData = z.infer<typeof blogPostSchema>
export type BlogPostUpdateData = z.infer<typeof blogPostUpdateSchema>

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to calculate read time
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}