export interface IDiary {
  user_desc: string | (readonly string[] & string) | undefined
  user_image: any
  created_at: any
  diary_number: number
  user_id: string
  user_name: string
  diary_title: string
  diary_content: string
  diary_emotion: {
    중립?: string
    슬픔?: string
    분노?: string
    놀람?: string
    행복?: string
    불안?: string
  }
  diary_weather: string
  diary_font: string
  diary_theme: string
  diary_advice: string
  crated_at: Date
  updated_at: Date
  image_src: string
  diary_userEmo: string
  diary_userDate: Date
}
