import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

// 启动时背景蓝色方块会从很大缩小到正常大小。
// 这里用屏幕高度除以图标尺寸，得到一个“足够覆盖全屏”的初始缩放倍数。
const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;

// 页面入场动画的统一时长，单位是毫秒。
const DURATION = 600;

/**
 * 自定义启动遮罩。
 *
 * 原生启动屏先显示静态图片；React 页面布局完成后，我们手动隐藏原生启动屏，
 * 再显示这个 React 版本的遮罩动画。这样启动过程更连贯。
 */
export function AnimatedSplashOverlay() {
  // animate=false 时先渲染普通 View，用它的 onLayout 判断页面已经布局完成。
  const [animate, setAnimate] = useState(false);

  // 动画播放完后，把遮罩从组件树中移除；否则它会一直挡在页面上。
  const [visible, setVisible] = useState(true);

  // 不可见时直接返回 null，React 就不会渲染这个遮罩。
  if (!visible) return null;

  /**
   * Reanimated 的 Keyframe：用百分比描述动画过程。
   * 这里主要做淡出，结束后通过 callback 把 visible 设为 false。
   */
  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  // 启动遮罩中间显示的 Expo logo。
  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        // callback 运行在 UI/worklet 线程，不能直接调用 React 的 setState。
        'worklet';
        if (finished) {
          // scheduleOnRN 会把 setVisible 调回 React Native JS 线程执行。
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        // 等这个遮罩 View 布局完成后，再隐藏原生启动屏，视觉上更顺滑。
        SplashScreen.hideAsync().finally(() => {
          // 原生启动屏隐藏后，开始播放 React/Reanimated 动画。
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

// 蓝色背景块的缩放动画：从铺满屏幕的巨大尺寸缩小到图标大小。
const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

// logo 的入场动画：稍微延迟后，从透明且偏大的状态弹入。
const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

// 发光背景的旋转动画：很慢地持续旋转，制造一点动态氛围。
const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

/**
 * 首页中间的动画图标。
 *
 * 它由三层组成：
 * 1. 最底层的 glow 发光图片；
 * 2. 中间的蓝色圆角背景；
 * 3. 最上层的 Expo logo 图片。
 */
export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      {/* 发光图片做长时间旋转，duration 是 4 分钟。 */}
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      {/* 蓝色背景块从大到小弹入。 */}
      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      {/* Expo logo 延迟感弹入，叠在背景块上方。 */}
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
