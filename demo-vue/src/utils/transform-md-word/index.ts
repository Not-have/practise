import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel
} from "docx";
import {
  marked,
  type Tokens
} from "marked";

/**
 * 将 Markdown 字符串转换为 Word 文档并下载
 * @param markdown - Markdown 字符串
 * @param filename - 下载的文件名，默认为 'document.docx'
 */
export async function markdownToWord(markdown: string, filename: string = "document.docx"): Promise<void> {
  try {

    // 解析 markdown 为 tokens
    const tokens = marked.lexer(markdown);

    // 将 tokens 转换为 docx 段落
    const children: Paragraph[] = [];

    for (const token of tokens) {
      switch (token.type) {
        case "heading": {
          const heading = token as Tokens.Heading;

          // 将 markdown 的 depth (1-6) 映射到 HeadingLevel
          const levelMap: Record<number, typeof HeadingLevel[keyof typeof HeadingLevel]> = {
            1: HeadingLevel.HEADING_1,
            2: HeadingLevel.HEADING_2,
            3: HeadingLevel.HEADING_3,
            4: HeadingLevel.HEADING_4,
            5: HeadingLevel.HEADING_5,
            6: HeadingLevel.HEADING_6
          };

          const level = levelMap[heading.depth] || HeadingLevel.HEADING_1;

          const {
            text
          } = heading;

          children.push(new Paragraph({
            text,
            heading: level,
            spacing: {
              after: 200
            }
          }));

          break;
        }
        case "paragraph": {
          const paragraph = token as Tokens.Paragraph;

          const {
            text
          } = paragraph;

          // 处理段落中的粗体、斜体等格式
          const runs = parseInlineText(text);

          children.push(new Paragraph({
            children: runs,
            spacing: {
              after: 200
            }
          }));

          break;
        }
        case "hr": {

          // 水平分割线，用空段落代替
          children.push(new Paragraph({
            text: "",
            spacing: {
              after: 200
            }
          }));

          break;
        }
        case "list": {
          const list = token as Tokens.List;

          for (const item of list.items) {
            const itemText = item.text;

            const runs = parseInlineText(itemText);

            children.push(new Paragraph({
              children: [
                new TextRun({
                  text: "• ",
                  bold: true
                }),
                ...runs
              ],
              spacing: {
                after: 100
              },
              indent: {
                left: 400
              }
            }));
          }

          break;
        }
        case "code": {
          const code = token as Tokens.Code;

          children.push(new Paragraph({
            children: [
              new TextRun({
                text: code.text,
                font: "Courier New"
              })
            ],
            spacing: {
              after: 200
            },
            shading: {
              fill: "F5F5F5"
            }
          }));

          break;
        }
        case "blockquote": {
          const blockquote = token as Tokens.Blockquote;

          const text = blockquote.tokens.
              map((t: Tokens.Generic) => ("text" in t ? t.text : "") || "").
              join(" ");

          const runs = parseInlineText(text);

          children.push(new Paragraph({
            children: runs,
            spacing: {
              after: 200
            },
            indent: {
              left: 400
            },
            border: {
              left: {
                color: "CCCCCC",
                size: 4,
                style: "single"
              }
            }
          }));

          break;
        }
        default: {

          // 其他类型暂时忽略或转换为普通段落
          if ("text" in token) {
            const genericToken = token as Tokens.Generic;

            children.push(new Paragraph({
              text: (genericToken.text as string) || "",
              spacing: {
                after: 200
              }
            }));
          }

          break;
        }
      }
    }

    // 创建 Word 文档
    const doc = new Document({
      sections: [
        {
          properties: {},
          children
        }
      ]
    });

    // 生成 Blob 并下载
    const blob = await Packer.toBlob(doc);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("转换 Markdown 到 Word 时出错:", error);

    throw error;
  }
}

/**
 * 解析内联文本，处理粗体、斜体等格式
 */
function parseInlineText(text: string): TextRun[] {
  const runs: TextRun[] = [];

  let currentIndex = 0;

  // 匹配粗体 **text** 或 __text__
  const boldRegex = /(\*\*|__)(.*?)\1/g;

  // 匹配斜体 *text* 或 _text_
  const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)|(?<!_)_([^_]+)_(?!_)/g;

  // 匹配删除线 ~~text~~
  const strikethroughRegex = /~~(.*?)~~/g;

  // 收集所有匹配项
  const matches: Array<{ start: number; end: number; type: string; text: string }> = [];

  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match[2]) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "bold",
        text: match[2]
      });
    }
  }

  boldRegex.lastIndex = 0;

  while ((match = italicRegex.exec(text)) !== null) {
    const start = match.index;

    const end = start + match[0].length;

    // 检查是否与粗体重叠
    const overlapsBold = matches.some(m => m.type === "bold" && start >= m.start && start < m.end);

    if (!overlapsBold) {
      const italicText = match[1] || match[2];

      if (italicText) {
        matches.push({
          start,
          end,
          type: "italic",
          text: italicText
        });
      }
    }
  }

  italicRegex.lastIndex = 0;

  while ((match = strikethroughRegex.exec(text)) !== null) {
    if (match[1]) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: "strikethrough",
        text: match[1]
      });
    }
  }

  // 按位置排序
  matches.sort((a, b) => a.start - b.start);

  // 构建 TextRun 数组
  for (const match of matches) {

    // 添加匹配前的普通文本
    if (match.start > currentIndex) {
      const plainText = text.slice(currentIndex, match.start);

      if (plainText) {
        runs.push(new TextRun(plainText));
      }
    }

    // 添加格式化的文本
    const props: {
      text: string;
      bold?: boolean;
      italics?: boolean;
      strike?: boolean;
    } = {
      text: match.text
    };

    switch (match.type) {
      case "bold": {
        props.bold = true;

        break;
      }
      case "italic": {
        props.italics = true;

        break;
      }
      case "strikethrough": {
        props.strike = true;

        break;
      }

    // No default
    }

    runs.push(new TextRun(props));
    currentIndex = match.end;
  }

  // 添加剩余的普通文本
  if (currentIndex < text.length) {
    const plainText = text.slice(Math.max(0, currentIndex));

    if (plainText) {
      runs.push(new TextRun(plainText));
    }
  }

  // 如果没有匹配项，返回普通文本
  if (runs.length === 0) {
    runs.push(new TextRun(text));
  }

  return runs;
}
