# Doc For Renderer

## Requirements

做一个 `RichText()` component，interface 如下：

```ts
type Props =  {
    data: string;
}
```

支持渲染富文本：

- 段落
- 加粗、下划线的文字
- 图片
- 填空题的空格: filler

## Implementation

### 数据结构

使用 Slate.js 富文本的数据结构。

### UI

试试直接用 Tailwind？
