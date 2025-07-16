'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogPostUpdateSchema } from '@/lib/validations/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Loader2, Upload, X, Save, Eye, ArrowLeft, Image as ImageIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '@/lib/cloudinary'
import { z } from 'zod'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'

type BlogUpdateData = z.infer<typeof blogPostUpdateSchema>

interface BlogPost {
  id: string
  title: string
  slug: string
  shortDescription: string
  body: string
  featuredImage?: string
  isPublished: boolean
  publishedAt?: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  readTime?: number
  views: number
  createdAt: string
  updatedAt: string
}

export default function EditBlogPost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const blogId = params.id as string
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string>('')
  const [originalImage, setOriginalImage] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<BlogUpdateData>({
    resolver: zodResolver(blogPostUpdateSchema)
  })

  const isPublished = watch('isPublished')

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.role !== 'admin') {
      router.push('/admin/auth')
      return
    }

    fetchBlogPost()
  }, [session, status, router, blogId])

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`)
      if (response.ok) {
        const post: BlogPost = await response.json()
        setBlogPost(post)
        
        // Populate form with existing data
        reset({
          title: post.title,
          shortDescription: post.shortDescription,
          body: post.body,
          featuredImage: post.featuredImage,
          isPublished: post.isPublished,
          tags: post.tags,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription
        })
        
        setBody(post.body)
        setTags(post.tags)
        setFeaturedImage(post.featuredImage || '')
        setOriginalImage(post.featuredImage || '')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      router.push('/admin/dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setValue('tags', tags)
  }, [tags, setValue])

  useEffect(() => {
    setValue('body', body)
  }, [body, setValue])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      // Delete old image if it exists and is different
      if (originalImage && originalImage !== featuredImage) {
        const publicId = extractPublicId(originalImage)
        if (publicId) {
          await deleteFromCloudinary(publicId)
        }
      }
      
      const imageUrl = await uploadToCloudinary(file)
      setFeaturedImage(imageUrl)
      setValue('featuredImage', imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = async () => {
    if (featuredImage) {
      try {
        const publicId = extractPublicId(featuredImage)
        if (publicId) {
          await deleteFromCloudinary(publicId)
        }
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
    setFeaturedImage('')
    setValue('featuredImage', '')
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const onSubmit = async (data: BlogUpdateData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          featuredImage,
          tags,
          body
        })
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update blog post')
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
      alert('Failed to update blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
      alert('Failed to delete blog post. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin' || !blogPost) {
    return null
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete Post
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Blog Post
          </h1>
          <p className="text-gray-600">
            Update your blog content with rich text formatting.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Details</CardTitle>
                  <CardDescription>
                    Basic information about your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Enter blog post title"
                      className="mt-1"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      {...register('shortDescription')}
                      placeholder="Brief description of your blog post"
                      rows={3}
                      className="mt-1"
                    />
                    {errors.shortDescription && (
                      <p className="text-sm text-red-600 mt-1">{errors.shortDescription.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>
                    Edit your blog post content using the rich text editor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[400px]">
                    <ReactQuill
                      theme="snow"
                      value={body}
                      onChange={setBody}
                      modules={quillModules}
                      placeholder="Start writing your blog post..."
                      style={{ height: '350px' }}
                    />
                  </div>
                  {errors.body && (
                    <p className="text-sm text-red-600 mt-1">{errors.body.message}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updated:</span>
                    <span>{new Date(blogPost.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span>{blogPost.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Read Time:</span>
                    <span>{blogPost.readTime || 5} min</span>
                  </div>
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPublished" className="text-sm font-medium">
                      Published
                    </Label>
                    <Switch
                      id="isPublished"
                      {...register('isPublished')}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {isPublished ? 'Post is live and visible to readers' : 'Post is saved as draft'}
                  </p>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>
                    Upload a featured image for your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {featuredImage ? (
                    <div className="relative">
                      <div className="relative h-48 w-full rounded-lg overflow-hidden">
                        <Image
                          src={featuredImage}
                          alt="Featured image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeImage}
                        className="mt-2 w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={imageUploading}
                      />
                      <Label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        {imageUploading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        ) : (
                          <>
                            <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload image</span>
                          </>
                        )}
                      </Label>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Add tags to categorize your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Add
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Optimize your post for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      {...register('metaTitle')}
                      placeholder="SEO title (optional)"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      {...register('metaDescription')}
                      placeholder="SEO description (optional)"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href="/admin/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}