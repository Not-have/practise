import React, { useState } from "react";
import { Button, Input, Card, Space, message, Typography, Divider } from "antd";
import { CopyOutlined, SwapOutlined } from "@ant-design/icons";
import * as iconv from "iconv-lite";

const { TextArea } = Input;
const { Title, Text } = Typography;

function TextConverter(): React.ReactElement {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleConvertToGB2312 = (): void => {
    if (!inputText.trim()) {
      message.warning("请输入要转换的文本");
      return;
    }

    setIsConverting(true);
    try {
      // 使用 iconv-lite 直接转换字符串
      const gb2312Buffer = iconv.encode(inputText, "gb2312");
      const hexString = gb2312Buffer.toString("hex").toUpperCase();
      const formattedHex = hexString.match(/.{1,2}/g)?.join(" ") || "";
      
      setOutputText(formattedHex);
      message.success("转换成功！");
    } catch (error) {
      console.error("转换失败:", error);
      message.error("转换失败，请检查输入文本");
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopyToClipboard = async (): Promise<void> => {
    if (!outputText) {
      message.warning("没有可复制的内容");
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      message.success("已复制到剪贴板！");
    } catch (error) {
      console.error("复制失败:", error);
      const textArea = document.createElement("textarea");
      textArea.value = outputText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      message.success("已复制到剪贴板！");
    }
  };

  const handleClearInput = (): void => {
    setInputText("");
    setOutputText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputText(e.target.value);
  };

  const instructionText = (
    <>
      <strong>使用说明：</strong><br />
      1. 在上方输入框中输入汉字文本<br />
      2. 点击"转换为 GB2312"按钮进行转换<br />
      3. 转换结果以十六进制格式显示<br />
      4. 点击"复制结果"按钮将结果复制到剪贴板<br />
      5. 点击"清空"按钮清除所有内容
    </>
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          汉字 UTF-8 转 GB2312 转换器
        </Title>
        
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text strong>输入文本 (UTF-8):</Text>
            <TextArea
              value={inputText}
              onChange={handleInputChange}
              placeholder="请输入要转换的汉字文本..."
              rows={4}
              style={{ marginTop: "8px" }}
            />
          </div>

          <Space wrap>
            <Button
              type="primary"
              icon={<SwapOutlined />}
              onClick={handleConvertToGB2312}
              loading={isConverting}
              size="large"
            >
              转换为 GB2312
            </Button>
            <Button
              icon={<CopyOutlined />}
              onClick={handleCopyToClipboard}
              disabled={!outputText}
              size="large"
            >
              复制结果
            </Button>
            <Button onClick={handleClearInput} size="large">
              清空
            </Button>
          </Space>

          <Divider />

          <div>
            <Text strong>转换结果 (GB2312 十六进制):</Text>
            <TextArea
              value={outputText}
              readOnly
              rows={4}
              style={{ 
                marginTop: "8px",
                fontFamily: "monospace",
                backgroundColor: "#f5f5f5"
              }}
              placeholder="转换结果将显示在这里..."
            />
          </div>

          <Card size="small" style={{ backgroundColor: "#f0f8ff" }}>
            <Text type="secondary">
              {instructionText}
            </Text>
          </Card>
        </Space>
      </Card>
    </div>
  );
}

export default TextConverter;