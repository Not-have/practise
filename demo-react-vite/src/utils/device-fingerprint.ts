// 设备指纹类型定义
interface INavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
  msDoNotTrack?: string;
}

interface IDeviceFingerprint {
  ua: string;
  platform: string;
  languages: string;
  hwConcurrency: number | null;
  deviceMemory: number | null;
  cookieEnabled: boolean;
  doNotTrack: string;
  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };
  timezone: string;
  timezoneOffset: number;
  fonts: string;
  canvas: string;
  webgl: string;
  audio: string;
}

interface IFingerprintResult {
  hash: string;
  raw: IDeviceFingerprint;
}

interface IFlattenedFingerprint {
  [key: string]: string;
}

/**
 * 收集设备指纹信息
 * @returns Promise<IFingerprintResult> 包含哈希值和原始指纹数据的对象
 */
async function collectFingerprint(): Promise<IFingerprintResult> {
  try {
    const nav = window.navigator || {};

    const screenInfo = window.screen || {};

    // 并行收集所有指纹数据以提高性能
    const [
      fonts,
      canvas,
      webgl,
      audio
    ] = await Promise.allSettled([
      detectFonts(),
      getCanvasFingerprint(),
      Promise.resolve(getWebglFingerprintData()),
      getAudioFingerprint()
    ]);

    // 基础字段
    const fp: IDeviceFingerprint = {
      ua: nav.userAgent || "",
      platform: nav.platform || "",
      languages: nav.languages ? nav.languages.join(",") : nav.language || "",
      hwConcurrency: nav.hardwareConcurrency || null,
      deviceMemory: (nav as INavigatorWithDeviceMemory).deviceMemory || null,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || (navigator as INavigatorWithDeviceMemory).msDoNotTrack || "",
      screen: {
        width: screenInfo.width || 0,
        height: screenInfo.height || 0,
        colorDepth: screenInfo.colorDepth || 0
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      timezoneOffset: new Date().getTimezoneOffset(),
      fonts: fonts.status === "fulfilled" ? fonts.value : "",
      canvas: canvas.status === "fulfilled" ? canvas.value : "",
      webgl: webgl.status === "fulfilled" ? webgl.value : "",
      audio: audio.status === "fulfilled" ? audio.value : ""
    };

    // 规范化：按 key 排序
    const flat = flattenAndSort(fp as unknown as Record<string, unknown>);

    const json = JSON.stringify(flat);

    const hash = await sha256Base64(json);

    return {
      hash,
      raw: fp
    };
  } catch (error) {
    console.error("Failed to collect device fingerprint:", error);

    throw new Error("Device fingerprint collection failed");
  }
}

/* ---------- helpers ---------- */

/**
 * 将对象扁平化为键值对并按键排序（确保确定性）
 * @param obj 要扁平化的对象
 * @param prefix 键前缀
 * @returns 扁平化的对象
 */
function flattenAndSort(obj: Record<string, unknown>, prefix = ""): IFlattenedFingerprint {
  const out: IFlattenedFingerprint = {};

  for (const k of Object.keys(obj).sort()) {
    const val = obj[k];

    const key = prefix ? `${prefix}.${k}` : k;

    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(out, flattenAndSort(val as Record<string, unknown>, key));
    } else {
      out[key] = val === undefined || val === null ? "" : String(val);
    }
  }

  return out;
}

/**
 * 将字符串转换为SHA-256哈希的Base64编码
 * @param str 要哈希的字符串
 * @returns Promise<string> Base64编码的哈希值
 */
async function sha256Base64(str: string): Promise<string> {
  try {
    const enc = new TextEncoder().encode(str);

    const digest = await crypto.subtle.digest("SHA-256", enc);

    return arrayBufferToBase64(digest);
  } catch (error) {
    console.error("SHA-256 hashing failed:", error);

    throw new Error("Hash generation failed");
  }
}

/**
 * 将ArrayBuffer转换为Base64字符串
 * @param buffer ArrayBuffer
 * @returns Base64字符串
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  try {
    const bytes = new Uint8Array(buffer);

    let binary = "";

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCodePoint(bytes[i]);
    }

    return btoa(binary);
  } catch (error) {
    console.error("Base64 encoding failed:", error);

    throw new Error("Base64 encoding failed");
  }
}

/* ---------- Feature collectors (简洁版本) ---------- */

/**
 * 获取Canvas指纹
 * @returns Promise<string> Canvas指纹数据
 */
async function getCanvasFingerprint(): Promise<string> {
  try {
    const canvas = document.createElement("canvas");

    canvas.width = 200;
    canvas.height = 50;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return "";
    }

    // 设置渲染属性
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.font = "11px \"Arial\"";
    ctx.fillText("Fingerprint test — 你好", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Fingerprint test — 你好", 4, 17);

    // 获取图像数据并返回前100个像素值
    const imageData = ctx.getImageData(0, 0, 200, 50);

    return imageData.data.slice(0, 100).join(",");
  } catch (error) {
    console.warn("Canvas fingerprint failed:", error);

    return "";
  }
}

/**
 * 获取WebGL指纹
 * @returns string WebGL指纹数据
 */
function getWebglFingerprintData(): string {
  try {
    const canvas = document.createElement("canvas");

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext;

    if (!gl) {
      return "";
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (!debugInfo) {
      return "";
    }

    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";

    return `${vendor}~${renderer}`;
  } catch (error) {
    console.warn("WebGL fingerprint failed:", error);

    return "";
  }
}

/**
 * 获取音频指纹
 * @returns Promise<string> 音频指纹数据
 */
async function getAudioFingerprint(): Promise<string> {
  try {
    const AudioCtx = window.OfflineAudioContext || (window as typeof window & { webkitOfflineAudioContext?: typeof OfflineAudioContext }).webkitOfflineAudioContext;

    if (!AudioCtx) {
      return "";
    }

    const ctx = new AudioCtx(1, 44_100, 44_100);

    const oscillator = ctx.createOscillator();

    const compressor = ctx.createDynamicsCompressor();

    // 配置振荡器
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(10_000, ctx.currentTime);

    // 连接音频节点
    oscillator.connect(compressor);
    compressor.connect(ctx.destination);

    // 开始渲染
    oscillator.start(0);
    const buffer = await ctx.startRendering();

    // 获取前100个样本数据
    const channelData = buffer.getChannelData(0).slice(0, 100);

    return channelData.join(",");
  } catch (error) {
    console.warn("Audio fingerprint failed:", error);

    return "";
  }
}

/**
 * 检测系统可用字体
 * @returns Promise<string> 字体检测结果
 */
async function detectFonts(): Promise<string> {
  const testFonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Roboto",
    "Noto Sans",
    "Microsoft YaHei"
  ];

  try {

    // 使用更高效的字体检测方法
    const baseWidth = measureTextWidth("mmmmmmmmmm", "monospace");

    const results: string[] = [];

    // 创建临时容器，避免频繁DOM操作
    const container = document.createElement("div");

    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    document.body.append(container);

    try {
      for (const font of testFonts) {
        const width = measureTextWidthInContainer("mmmmmmmmmm", `${font}, monospace`, container);

        results.push(`${font}:${width !== baseWidth}`);
      }
    } finally {

      // 确保清理DOM元素
      if (container.parentNode) {
        container.remove();
      }
    }

    return results.join(",");
  } catch (error) {
    console.warn("Font detection failed:", error);

    return "";
  }
}

/**
 * 在指定容器中测量文本宽度
 * @param text 要测量的文本
 * @param font 字体样式
 * @param container 容器元素
 * @returns 文本宽度
 */
function measureTextWidthInContainer(text: string, font: string, container: HTMLElement): number {
  const span = document.createElement("span");

  span.style.font = `16px ${font}`;
  span.style.whiteSpace = "nowrap";
  span.textContent = text;

  container.append(span);
  const width = span.offsetWidth;

  span.remove();

  return width;
}

/**
 * 测量文本宽度（备用方法）
 * @param text 要测量的文本
 * @param font 字体样式
 * @returns 文本宽度
 */
function measureTextWidth(text: string, font: string): number {
  const span = document.createElement("span");

  span.style.font = `16px ${font}`;
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.textContent = text;

  document.body.append(span);
  const width = span.offsetWidth;

  span.remove();

  return width;
}

export default collectFingerprint;
