import { PerspectiveCamera, Vector3 } from "three";
import { gsap } from "gsap";
import type { CameraPose } from "../types";

interface EnterGalaxyOptions {
  camera: PerspectiveCamera;
  target: Vector3;
  galaxyPosition: Vector3;
  reducedMotion: boolean;
  onAlign?: () => void;
  onRush?: () => void;
  onArrive?: () => void;
  onComplete?: () => void;
}

interface FocusPlanetOptions {
  camera: PerspectiveCamera;
  target: Vector3;
  planetPosition: Vector3;
  reducedMotion: boolean;
  onComplete?: () => void;
}

export class CameraTransition {
  private activeTimeline?: gsap.core.Timeline;

  private readonly aiDefaultPose: CameraPose = {
    position: new Vector3(0, 5.2, 14.5),
    target: new Vector3(0, 0.35, 0)
  };

  enterGalaxy(options: EnterGalaxyOptions): gsap.core.Timeline {
    this.kill();

    const durationScale = options.reducedMotion ? 0.18 : 1;
    const startDirection = options.camera.position.clone().sub(options.galaxyPosition).normalize();
    const alignPosition = options.galaxyPosition.clone().add(startDirection.clone().multiplyScalar(15));
    const rushPosition = options.galaxyPosition.clone().add(startDirection.clone().multiplyScalar(2.2));

    const timeline = gsap.timeline({
      defaults: {
        ease: "power2.inOut"
      },
      onComplete: options.onComplete
    });

    timeline.to(options.target, {
      x: options.galaxyPosition.x,
      y: options.galaxyPosition.y,
      z: options.galaxyPosition.z,
      duration: 0.5 * durationScale,
      onStart: options.onAlign
    }, 0);

    timeline.to(options.camera.position, {
      x: alignPosition.x,
      y: alignPosition.y + 1.2,
      z: alignPosition.z,
      duration: 0.5 * durationScale
    }, 0);

    timeline.to(options.camera.position, {
      x: rushPosition.x,
      y: rushPosition.y,
      z: rushPosition.z,
      duration: 1.45 * durationScale,
      ease: "power3.in",
      onStart: options.onRush
    });

    timeline.to(options.camera.position, {
      x: this.aiDefaultPose.position.x,
      y: this.aiDefaultPose.position.y,
      z: this.aiDefaultPose.position.z,
      duration: 0.8 * durationScale,
      ease: "power2.out",
      onStart: options.onArrive
    });

    timeline.to(options.target, {
      x: this.aiDefaultPose.target.x,
      y: this.aiDefaultPose.target.y,
      z: this.aiDefaultPose.target.z,
      duration: 0.8 * durationScale,
      ease: "power2.out"
    }, "<");

    this.activeTimeline = timeline;
    return timeline;
  }

  focusPlanet(options: FocusPlanetOptions): gsap.core.Timeline {
    this.kill();

    const duration = options.reducedMotion ? 0.18 : 0.78;
    const direction = options.camera.position.clone().sub(options.planetPosition).normalize();
    const cameraPosition = options.planetPosition.clone().add(direction.multiplyScalar(5.2));
    cameraPosition.y += 1.1;

    const timeline = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        duration
      },
      onComplete: options.onComplete
    });

    timeline.to(options.camera.position, {
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z
    }, 0);

    timeline.to(options.target, {
      x: options.planetPosition.x,
      y: options.planetPosition.y,
      z: options.planetPosition.z
    }, 0);

    this.activeTimeline = timeline;
    return timeline;
  }

  resetToAISystem(camera: PerspectiveCamera, target: Vector3, reducedMotion: boolean): gsap.core.Timeline {
    this.kill();

    const duration = reducedMotion ? 0.16 : 0.72;
    const timeline = gsap.timeline({
      defaults: {
        duration,
        ease: "power2.inOut"
      }
    });

    timeline.to(camera.position, {
      x: this.aiDefaultPose.position.x,
      y: this.aiDefaultPose.position.y,
      z: this.aiDefaultPose.position.z
    }, 0);

    timeline.to(target, {
      x: this.aiDefaultPose.target.x,
      y: this.aiDefaultPose.target.y,
      z: this.aiDefaultPose.target.z
    }, 0);

    this.activeTimeline = timeline;
    return timeline;
  }

  kill(): void {
    this.activeTimeline?.kill();
    this.activeTimeline = undefined;
  }

  getDefaultPose(): CameraPose {
    return {
      position: this.aiDefaultPose.position.clone(),
      target: this.aiDefaultPose.target.clone()
    };
  }
}
