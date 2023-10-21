import { CSSObject } from "@emotion/react"

export const ellipsis = (line: number = 1): CSSObject => ({
  display: "-webkit-box",
  WebkitLineClamp: `${line}` /* 设置希望显示的行数 */,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordWrap: "break-word" /* 如果文本包含没有空格的长单词，可确保它们被换行 */,
})
