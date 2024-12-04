export async function getQuotes(limit: number, skip: number = 0) {
  // API_URL로부터 skip만큼 건너뛴 limit개의 명언을 가져옴.
  const API_URL = `https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`
  const response = await fetch(API_URL)
  const json = await response.json()
  return json
}
