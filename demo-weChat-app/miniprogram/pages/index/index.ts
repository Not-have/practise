// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    isGenerating: false,
    displayText: '',
    fullText: "",
    typingInterval: 0  // 打字定时器
  },
  methods: {
    handleTap() {
      const aiResponse = "这是一段AI生成的回复文本，用于演示文字逐个显示的效果。在实际应用中，这里的内容会从后端API获取，然后通过打字机效果逐字展示给用户，提升交互体验。";

      this.setData({
        fullText: aiResponse,
        isGenerating: true,
        displayText: ""
      })

      if (this.data.typingInterval) {
        clearInterval(this.data.typingInterval);
      }

      let index = 0;
      const interval = setInterval(() => {
        if (index < this.data.fullText.length) {
          // 每次增加一个字符
          this.setData({
            displayText: this.data.fullText.substring(0, index + 1)
          });
          index++;
        } else {
          // 显示完成，清除定时器
          clearInterval(interval);
          this.setData({
            typingInterval: 0
          });
        }
      }, 500); // 每个字符间隔50ms，可以根据需要调整

      this.setData({
        typingInterval: interval
      });
    }
  },
})
