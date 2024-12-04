'use server'

import { ProductDetail, productDetailSchema } from '@/schemas/product'
import { ActionResult } from '@/actions/action-result'

export const getProduct = async (
  id: string
): Promise<ActionResult<ProductDetail>> => {
  try {
    const url = `https://dummyjson.com/products/${id}`

    const response = await fetch(url)
    const result = await response.json()

    const { success, data } = productDetailSchema.safeParse(result)

    if (success) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        error: '데이터 형식이 올바르지 않습니다.',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        error: error.message,
      }
    }

    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    }
  }
}
