import { z } from 'zod'

export const productListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  discountPercentage: z.number(),
  thumbnail: z.string().url(),
})

export type ProductListItem = z.infer<typeof productListItemSchema>

export const getProductsResponseSchema = z.object({
  products: z.array(productListItemSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type GetProductsResponse = z.infer<typeof getProductsResponseSchema>

const dimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
})

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
})

export const productDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number(),
  dimensions: dimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(reviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  images: z.array(z.string()),
  thumbnail: z.string(),
})

export type ProductDetail = z.infer<typeof productDetailSchema>
