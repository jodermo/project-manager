import * as tf from '@tensorflow/tfjs-core';
import * as posedetection from '@tensorflow-models/pose-detection';
import * as mpPose from '@mediapipe/pose';
import Stats from 'stats.js';
import { Pose, PoseDetector } from '@tensorflow-models/pose-detection';
import { AFrame } from './a-frame';

export const params = {
  DEFAULT_LINE_WIDTH: 2,
  DEFAULT_RADIUS: 4,
  VIDEO_SIZE: {
    '1920 X 1440': {width: 1920, height: 1440},
    '640 X 480': {width: 640, height: 480},
    '640 X 360': {width: 640, height: 360},
    '360 X 270': {width: 360, height: 270}
  } as any,
  STATE: {
    camera: {targetFPS: 60, sizeOption: '640 X 480'},
    backend: '',
    flags: {},
    modelConfig: {
      maxPoses: 1,
      type: 'full',
      scoreThreshold: 0.65,
      render3D: true
    }
  } as any,
  BLAZEPOSE_CONFIG: {
    maxPoses: 1,
    type: 'full',
    scoreThreshold: 0.65,
    render3D: true
  } as any,
  POSENET_CONFIG: {
    maxPoses: 1,
    scoreThreshold: 0.5
  } as any,
  MOVENET_CONFIG: {
    maxPoses: 1,
    type: 'lightning',
    scoreThreshold: 0.3,
    customModel: '',
    enableTracking: false
  } as any,
  TUNABLE_FLAG_VALUE_RANGE_MAP: {
    WEBGL_VERSION: [1, 2],
    WASM_HAS_SIMD_SUPPORT: [true, false],
    WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
    WEBGL_CPU_FORWARD: [true, false],
    WEBGL_PACK: [true, false],
    WEBGL_FORCE_F16_TEXTURES: [true, false],
    WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
    WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    CHECK_COMPUTATION_FOR_ERRORS: [true, false],
  } as any,
  BACKEND_FLAGS_MAP: {
    ['tfjs-wasm']: ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT'],
    ['tfjs-webgl']: [
      'WEBGL_VERSION', 'WEBGL_CPU_FORWARD', 'WEBGL_PACK',
      'WEBGL_FORCE_F16_TEXTURES', 'WEBGL_RENDER_FLOAT32_CAPABLE',
      'WEBGL_FLUSH_THRESHOLD'
    ],
    ['mediapipe-gpu']: []
  } as any,
  MODEL_BACKEND_MAP: {
    [posedetection.SupportedModels.PoseNet]: ['tfjs-webgl'],
    [posedetection.SupportedModels.MoveNet]: ['tfjs-webgl', 'tfjs-wasm'],
    [posedetection.SupportedModels.BlazePose]: ['mediapipe-gpu', 'tfjs-webgl']
  } as any,
  TUNABLE_FLAG_NAME_MAP: {
    PROD: 'production mode',
    WEBGL_VERSION: 'webgl version',
    WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
    WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
    WEBGL_CPU_FORWARD: 'cpu forward',
    WEBGL_PACK: 'webgl pack',
    WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
    WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
    WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)'
  } as any,
  ANCHOR_POINTS: [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]],
  COLOR_PALETTE: [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
  ],
  TUNABLE_FLAG_DEFAULT_VALUE_MAP: undefined as any,
  enableTrackingController: undefined as any,
  scoreThresholdController: undefined as any,
  stringValueMap: {} as any
}
export const paramsVideo = {
  DEFAULT_LINE_WIDTH: 2,
  DEFAULT_RADIUS: 4,
  VIDEO_SIZE: {
    '1920 X 1440': {width: 1920, height: 1440},
    '640 X 480': {width: 640, height: 480},
    '640 X 360': {width: 640, height: 360},
    '360 X 270': {width: 360, height: 270}
  } as any,
  STATE: {
    camera: {targetFPS: 60, sizeOption: '640 X 480'},
    backend: '',
    flags: {},
    modelConfig: {
      render3D: undefined
    }
  } as any,
  BLAZEPOSE_CONFIG: {
    maxPoses: 1,
    type: 'full',
    scoreThreshold: 0.65,
    render3D: true
  } as any,
  POSENET_CONFIG: {
    maxPoses: 1,
    scoreThreshold: 0.5
  } as any,
  MOVENET_CONFIG: {
    maxPoses: 1,
    type: 'lightning',
    scoreThreshold: 0.3,
    customModel: '',
    enableTracking: false
  } as any,
  TUNABLE_FLAG_VALUE_RANGE_MAP: {
    WEBGL_VERSION: [1, 2],
    WASM_HAS_SIMD_SUPPORT: [true, false],
    WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
    WEBGL_CPU_FORWARD: [true, false],
    WEBGL_PACK: [true, false],
    WEBGL_FORCE_F16_TEXTURES: [true, false],
    WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
    WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    CHECK_COMPUTATION_FOR_ERRORS: [true, false],
  } as any,
  BACKEND_FLAGS_MAP: {
    ['tfjs-wasm']: ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT'],
    ['tfjs-webgl']: [
      'WEBGL_VERSION', 'WEBGL_CPU_FORWARD', 'WEBGL_PACK',
      'WEBGL_FORCE_F16_TEXTURES', 'WEBGL_RENDER_FLOAT32_CAPABLE',
      'WEBGL_FLUSH_THRESHOLD'
    ],
    ['mediapipe-gpu']: []
  } as any,
  MODEL_BACKEND_MAP: {
    [posedetection.SupportedModels.PoseNet]: ['tfjs-webgl'],
    [posedetection.SupportedModels.MoveNet]: ['tfjs-webgl', 'tfjs-wasm'],
    [posedetection.SupportedModels.BlazePose]: ['mediapipe-gpu', 'tfjs-webgl']
  } as any,
  TUNABLE_FLAG_NAME_MAP: {
    PROD: 'production mode',
    WEBGL_VERSION: 'webgl version',
    WASM_HAS_SIMD_SUPPORT: 'wasm SIMD',
    WASM_HAS_MULTITHREAD_SUPPORT: 'wasm multithread',
    WEBGL_CPU_FORWARD: 'cpu forward',
    WEBGL_PACK: 'webgl pack',
    WEBGL_FORCE_F16_TEXTURES: 'enforce float16',
    WEBGL_RENDER_FLOAT32_CAPABLE: 'enable float32',
    WEBGL_FLUSH_THRESHOLD: 'GL flush wait time(ms)'
  } as any,
  ANCHOR_POINTS: [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]],
  COLOR_PALETTE: [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
  ],
  TUNABLE_FLAG_DEFAULT_VALUE_MAP: undefined as any,
  enableTrackingController: undefined as any,
  scoreThresholdController: undefined as any,
  stringValueMap: {} as any
}

export function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isiOS();
}

export class ThreeAr {


  numInferences = 0;
  inferenceTimeSum = 0
  lastPanelUpdate = 0;
  rafId?: number;
  startInferenceTime = 0;
  endInferenceTime = 0;
  averageInferenceTime = 0;
  detector?: PoseDetector;
  camera?: Camera | undefined;
  poses?: Pose[] | null;


  constructor(public aFrame: AFrame, public video: HTMLVideoElement, public canvas: HTMLCanvasElement, public onPoseUpdate?: (poses?: Pose[] | null) => void) {
    this.init();
  }

  onResize() {

  }

  async createDetector(model = params.STATE.model) {
    params.STATE.model = model;
    switch (model) {
      case posedetection.SupportedModels.PoseNet:
        return posedetection.createDetector(model, {
          quantBytes: 4,
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: {width: 500, height: 500},
          multiplier: 0.75
        });
      case posedetection.SupportedModels.BlazePose:
        let runtime = params.STATE.backend.split('-')[0];
        if (runtime === 'tfjs') {
          return posedetection.createDetector(
            model, {runtime, modelType: params.STATE.modelConfig.type});
        } else {
          runtime = 'mediapipe';
          return posedetection.createDetector(model, {
            runtime,
            modelType: params.STATE.modelConfig.type,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`
          });
        }
      case posedetection.SupportedModels.MoveNet:
        let modelType;
        if (params.STATE.modelConfig.type == 'lightning') {
          modelType = posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
        } else if (params.STATE.modelConfig.type == 'thunder') {
          modelType = posedetection.movenet.modelType.SINGLEPOSE_THUNDER;
        } else if (params.STATE.modelConfig.type == 'multipose') {
          modelType = posedetection.movenet.modelType.MULTIPOSE_LIGHTNING;
        }
        const modelConfig: any = {modelType};
        if (params.STATE.modelConfig.customModel !== '') {
          modelConfig.modelUrl = params.STATE.modelConfig.customModel;
        }
        if (params.STATE.modelConfig.type === 'multipose') {
          modelConfig.enableTracking = params.STATE.modelConfig.enableTracking;
        }
        return posedetection.createDetector(params.STATE.model, modelConfig);
    }
    return undefined;
  }


  async checkGuiUpdate() {
    if (params.STATE.isTargetFPSChanged || params.STATE.isSizeOptionChanged) {
      this.camera = await Camera.setupCamera(params.STATE.camera);
      params.STATE.isTargetFPSChanged = false;
      params.STATE.isSizeOptionChanged = false;
    }

    if (params.STATE.isModelChanged || params.STATE.isFlagChanged || params.STATE.isBackendChanged) {
      params.STATE.isModelChanged = true;

      if (this.rafId) {
        window.cancelAnimationFrame(this.rafId);
      }


      if (this.detector != null) {
        this.detector.dispose();
      }

      if (params.STATE.isFlagChanged || params.STATE.isBackendChanged) {
        await this.setBackendAndEnvFlags(params.STATE.flags, params.STATE.backend);
      }

      try {
        this.detector = await this.createDetector();
      } catch (error) {
        this.detector = undefined;
        alert(error);
      }

      params.STATE.isFlagChanged = false;
      params.STATE.isBackendChanged = false;
      params.STATE.isModelChanged = false;
    }
  }

  async setBackendAndEnvFlags(flagConfig: any, backend: string) {
    if (flagConfig == null) {
      return;
    } else if (typeof flagConfig !== 'object') {
      throw new Error(
        `An object is expected, while a(n) ${typeof flagConfig} is found.`);
    }

    // Check the validation of flags and values.
    for (const flag in flagConfig) {
      // TODO: check whether flag can be set as flagConfig[flag].
      if (!(flag in params.TUNABLE_FLAG_VALUE_RANGE_MAP)) {
        throw new Error(`${flag} is not a tunable or valid environment flag.`);
      }
      if (params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]) === -1) {
        throw new Error(
          `${flag} value is expected to be in the range [${
            params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag]}], while ${flagConfig[flag]}` +
          ' is found.');
      }
    }

    tf.env().setFlags(flagConfig);

    const [runtime, $backend] = backend.split('-');

    if (runtime === 'tfjs') {
      await this.resetBackend($backend);
    }
  }

  async resetBackend(backendName: string) {
    const ENGINE = tf.engine();
    if (!(backendName in ENGINE.registryFactory)) {
      throw new Error(`${backendName} backend is not registed.`);
    }

    if (backendName in ENGINE.registry) {
      const backendFactory = tf.findBackendFactory(backendName);
      tf.removeBackend(backendName);
      tf.registerBackend(backendName, backendFactory);
    }

    await tf.setBackend(backendName);
  }

  beginEstimatePosesStats() {
    this.startInferenceTime = (performance || Date).now();
  }


  endEstimatePosesStats() {
    const endInferenceTime = (performance || Date).now();
    this.inferenceTimeSum += this.endInferenceTime - this.startInferenceTime;
    ++this.numInferences;

    const panelUpdateMilliseconds = 1000;
    if (this.endInferenceTime - this.lastPanelUpdate >= panelUpdateMilliseconds) {
      this.averageInferenceTime = this.inferenceTimeSum / this.numInferences;
      this.inferenceTimeSum = 0;
      this.numInferences = 0;
      this.lastPanelUpdate = endInferenceTime;
    }
  }

  async renderResult() {
    if (this.camera && this.camera.video.readyState < 2) {
      const cameraVideo = this.camera.video;
      await new Promise((resolve) => {
        cameraVideo.onloadeddata = () => {
          resolve(this.video);
        };
      });
    }
    let poses = null;
    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (this.detector != null) {
      // FPS only counts the time it takes to finish estimatePoses.
      this.beginEstimatePosesStats();
      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      if (this.camera) {
        try {
          poses = await this.detector.estimatePoses(
            this.camera.video,
            {maxPoses: params.STATE.modelConfig.maxPoses, flipHorizontal: false}
          );
        } catch (error) {
          this.detector.dispose();
          this.detector = undefined;
          console.error(error);
        }
        this.endEstimatePosesStats();
        if (!params.STATE.isModelChanged) {
          this.updatePoses(poses);
          if (this.onPoseUpdate) {
            this.onPoseUpdate(poses);
          }
        }
      }
    }
  }

  private updatePoses(poses: Pose[] | null | undefined) {
    if (poses && poses.length > 0) {
      this.poses = poses;
    }
  }

  poseKeypoint(poseIndex = 0, poseName: string, keypoint3D = true) {
    if (this.poses && this.poses.length && this.poses[poseIndex]) {
      if (keypoint3D && this.poses[poseIndex] && this.poses[poseIndex].keypoints3D) {
        // @ts-ignore
        return this.poses[poseIndex].keypoints3D.find(keypoint => keypoint.name ? keypoint.name === poseName : false);
      }
    }
    return undefined;
  }


  async renderPrediction() {
    await this.checkGuiUpdate();
    if (!params.STATE.isModelChanged) {
      await this.renderResult();
    }
    this.rafId = requestAnimationFrame(() => {
      this.renderPrediction()
    });
  };

  async init() {
    this.camera = await Camera.setupCamera(params.STATE.camera, this.video);
    await this.setBackendAndEnvFlags(params.STATE.flags, params.STATE.backend);
    this.detector = await this.createDetector('BlazePose');
    this.renderPrediction();
  };

}

export class Camera {
  private static video: HTMLVideoElement;
  constructor(public video: HTMLVideoElement) {
  }

  /**
   * Initiate a Camera instance and wait for the camera stream to be ready.
   * @param cameraParam From app `STATE.camera`.
   */
  static async setupCamera(cameraParam: any, video = this.video) {
    this.video = video;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
    }
    const {targetFPS, sizeOption} = cameraParam;
    const $size = params.VIDEO_SIZE[sizeOption];
    const width = this.video ? this.video.clientWidth : isMobile() ? params.VIDEO_SIZE['640 X 480'].width : $size.width;
    const height = this.video ? this.video.clientHeight : isMobile() ? params.VIDEO_SIZE['640 X 480'].height : $size.height;
    console.log('setupCamera', this.video.clientWidth, width, height, isMobile());
    const videoConfig = {
      'audio': false,
      'video': {
        facingMode: 'user',
        width: width,
        height: height,
        frameRate: {
          ideal: targetFPS,
        }
      }
    };
    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    if (this.video) {
      const camera = new Camera(this.video);
      camera.video.srcObject = stream;
      await new Promise((resolve) => {
        camera.video.onloadedmetadata = () => {
          resolve(this.video);
        };
      });
      camera.video.play();
      const videoWidth = camera.video.videoWidth;
      const videoHeight = camera.video.videoHeight;
      camera.video.width = videoWidth;
      camera.video.height = videoHeight;
      return camera;
    }
    return undefined;
  }
}

export class ThreeArVideo {
  stats?: Stats;
  detector?: PoseDetector;
  camera?: VideoCamera;
  rafId = 0;
  startInferenceTime = 0;
  inferenceTimeSum = 0;
  numInferences = 0;
  lastPanelUpdate = 0;

  constructor(public source: HTMLVideoElement, public video: HTMLVideoElement, public canvas: HTMLCanvasElement) {
    this.init(source, video, canvas);

  }

  async createDetector(mode = params.STATE.model) {
    console.log('createDetector a', mode);
    console.log('createDetector b', posedetection.SupportedModels.BlazePose);
    switch (mode) {
      case posedetection.SupportedModels.PoseNet:
        return posedetection.createDetector(params.STATE.model, {
          quantBytes: 4,
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: {width: 500, height: 500},
          multiplier: 0.75
        });

      case posedetection.SupportedModels.BlazePose:
        const runtime = params.STATE.backend.split('-')[0];
        alert('BlazePose')
        if (runtime === 'mediapipe') {
          return posedetection.createDetector(params.STATE.model, {
            runtime,
            modelType: params.STATE.modelConfig.type,
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`
          });
        } else if (runtime === 'tfjs') {
          return posedetection.createDetector(
            params.STATE.model, {runtime, modelType: params.STATE.modelConfig.type});
        }
        return undefined;
      case posedetection.SupportedModels.MoveNet:
        const modelType = params.STATE.modelConfig.type == 'lightning' ?
          posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING :
          posedetection.movenet.modelType.SINGLEPOSE_THUNDER;
        return posedetection.createDetector(params.STATE.model, {modelType});
    }
    return undefined;
  }

  async checkGuiUpdate() {
    if (params.STATE.isModelChanged || params.STATE.isFlagChanged || params.STATE.isBackendChanged) {
      params.STATE.isModelChanged = true;

      window.cancelAnimationFrame(this.rafId);

      this.detector?.dispose();

      if (params.STATE.isFlagChanged || params.STATE.isBackendChanged) {
        await this.setBackendAndEnvFlags(params.STATE.flags, params.STATE.backend);
      }

      this.detector = await this.createDetector(params.STATE.model);
      params.STATE.isFlagChanged = false;
      params.STATE.isBackendChanged = false;
      params.STATE.isModelChanged = false;
      console.log('checkGuiUpdate');
    }
  }

  beginEstimatePosesStats() {
    this.startInferenceTime = (performance || Date).now();
  }

  endEstimatePosesStats() {
    const endInferenceTime = (performance || Date).now();
    this.inferenceTimeSum += endInferenceTime - this.startInferenceTime;
    ++this.numInferences;

    const panelUpdateMilliseconds = 1000;
    if (endInferenceTime - this.lastPanelUpdate >= panelUpdateMilliseconds) {
      const averageInferenceTime = this.inferenceTimeSum / this.numInferences;
      this.inferenceTimeSum = 0;
      this.numInferences = 0;
      if ((this.stats as any)?.customFpsPanel) {
        (this.stats as any).customFpsPanel.update(
          1000.0 / averageInferenceTime, 120 /* maxValue */);
      }
      this.lastPanelUpdate = endInferenceTime;
    }
  }

  async renderResult() {
    // FPS only counts the time it takes to finish estimatePoses.
    this.beginEstimatePosesStats();

    if (this.camera?.video && this.detector) {
      const poses = await this.detector.estimatePoses(
        this.camera.video,
        {maxPoses: params.STATE.modelConfig.maxPoses, flipHorizontal: false});
      this.endEstimatePosesStats();

      this.camera.drawCtx();

      // The null check makes sure the UI is not in the middle of changing to a
      // different model. If during model change, the result is from an old
      // model, which shouldn't be rendered.
      if (poses.length > 0 && !params.STATE.isModelChanged) {
        this.camera.drawResults(poses);
      }
    }


  }

  async checkUpdate() {
    await this.checkGuiUpdate();

    requestAnimationFrame(() => {
      this.checkUpdate();
    });
  };

  async updateVideo(video: HTMLVideoElement) {
    console.log('updateVideo', video);
    if (this.camera) {
      // Clear reference to any previous uploaded video.
      URL.revokeObjectURL(this.camera.video.currentSrc);
      this.camera.source = video;

      // Wait for video to be loaded.
      this.camera.video.load();
      const cameraVideo = this.camera.video;
      await new Promise((resolve) => {
        cameraVideo.onseeked = () => {
          resolve(this.video);
        };
      });

      const camera = this.camera;
      const videoWidth = camera.video.videoWidth;
      const videoHeight = camera.video.videoHeight;
      // Must set below two lines, otherwise video element doesn't show.
      this.camera.video.width = videoWidth;
      this.camera.video.height = videoHeight;
      this.camera.canvas.width = videoWidth;
      this.camera.canvas.height = videoHeight;
    }


  }

  async runFrame() {
    if (this.video.paused) {
      // video has finished.
      if (this.camera) {
        this.camera.mediaRecorder?.stop();
        this.camera.clearCtx();
        this.camera.video.style.visibility = 'visible';
      }
      return;
    }
    await this.renderResult();
    this.rafId = requestAnimationFrame(() => {
      this.runFrame();
    });
  }

  async run() {
    if (this.camera && this.detector) {
      // Warming up pipeline.
      const [runtime, $backend] = params.STATE.backend.split('-');

      if (runtime === 'tfjs') {
        const warmUpTensor = tf.fill([this.camera.video.height, this.camera.video.width, 3], 0, 'float32');

        await this.detector.estimatePoses(
          // @ts-ignore
          warmUpTensor,
          {maxPoses: params.STATE.modelConfig.maxPoses, flipHorizontal: false});
        warmUpTensor.dispose();
        // this.statusElement.innerHTML = 'Model is warmed up.';
      }

      this.camera.video.style.visibility = 'hidden';
      this.video.pause();
      this.video.currentTime = 0;
      this.video.play();
      this.camera.mediaRecorder?.start();
      const cameraVideo = this.camera.video;
      await new Promise((resolve) => {
        cameraVideo.onseeked = () => {
          resolve(this.video);
        };
      });

      await this.runFrame();
    }

  }

  init(source: HTMLVideoElement, video: HTMLVideoElement, canvas: HTMLCanvasElement) {

    this.stats = this.setupStats();
    this.source.addEventListener('timeupdate', () => {

    });
    this.createDetector().then((detector) => {
      this.detector = detector;
      this.camera = new VideoCamera(source, video, canvas);
      this.setBackendAndEnvFlags(params.STATE.flags, params.STATE.backend).then(() => {
        this.updateVideo(video);
        this.checkUpdate();
        this.run();
      });
    });

  };


  async showBackendConfigs(folderController: any) {
    // Clean up backend configs for the previous model.
    const fixedSelectionCount = 0;
    while (folderController.__controllers.length > fixedSelectionCount) {
      folderController.remove(
        folderController
          .__controllers[folderController.__controllers.length - 1]);
    }
    const backends = params.MODEL_BACKEND_MAP[params.STATE.model];
    // The first element of the array is the default backend for the model.
    params.STATE.backend = backends[0];
    const backendController =
      folderController.add(params.STATE, 'backend', backends);
    backendController.name('runtime-backend');
    backendController.onChange(async (backend: string) => {
      params.STATE.isBackendChanged = true;
      await this.showFlagSettings(folderController, backend);
    });
    await this.showFlagSettings(folderController, params.STATE.backend);
  }

  showModelConfigs(folderController: { __controllers: string | any[]; remove: (arg0: any) => void; }, type?: any) {
    // Clean up model configs for the previous model.
    // The first constroller under the `folderController` is the model
    // selection.
    const fixedSelectionCount = 1;
    while (folderController.__controllers.length > fixedSelectionCount) {
      folderController.remove(
        folderController
          .__controllers[folderController.__controllers.length - 1]);
    }

    switch (params.STATE.model) {
      case posedetection.SupportedModels.PoseNet:
        this.addPoseNetControllers(folderController);
        break;
      case posedetection.SupportedModels.MoveNet:
        this.addMoveNetControllers(folderController, type);
        break;
      case posedetection.SupportedModels.BlazePose:
        this.addBlazePoseControllers(folderController, type);
        break;
      default:
        console.error(`Model ${params.STATE.model} is not supported.`);
    }


  }


// The PoseNet model config folder contains options for PoseNet config
// settings.
  addPoseNetControllers(modelConfigFolder: { remove?: (arg0: any) => void; add?: any; }) {
    params.STATE.modelConfig = {...params.POSENET_CONFIG};

    modelConfigFolder.add(params.STATE.modelConfig, 'maxPoses', [1, 2, 3, 4, 5]);
    modelConfigFolder.add(params.STATE.modelConfig, 'scoreThreshold', 0, 1);
  }

// The MoveNet model config folder contains options for MoveNet config
// settings.
  addMoveNetControllers(modelConfigFolder: { remove?: (arg0: any) => void; add?: any; }, type: null | undefined) {
    params.STATE.modelConfig = {...params.MOVENET_CONFIG};
    params.STATE.modelConfig.type = type != null ? type : 'lightning';

    // Set multipose defaults on initial page load.
    if (params.STATE.modelConfig.type === 'multipose') {
      params.STATE.modelConfig.enableTracking = true;
      params.STATE.modelConfig.scoreThreshold = 0.2;
    }

    const typeController = modelConfigFolder.add(
      params.STATE.modelConfig, 'type', ['lightning', 'thunder', 'multipose']);
    typeController.onChange((type: string) => {
      // Set isModelChanged to true, so that we don't render any result during
      // changing models.
      params.STATE.isModelChanged = true;
      if (type === 'multipose') {
        // Defaults to enable tracking for multi pose.
        if (params.enableTrackingController) {
          params.enableTrackingController.setValue(true);
        }
        // Defaults to a lower scoreThreshold for multi pose.
        if (params.scoreThresholdController) {
          params.scoreThresholdController.setValue(0.2);
        }
      } else {
        params.enableTrackingController.setValue(false);
      }
    });

    const customModelController =
      modelConfigFolder.add(params.STATE.modelConfig, 'customModel');
    customModelController.onFinishChange((_: any) => {
      params.STATE.isModelChanged = true;
    });

    params.scoreThresholdController =
      modelConfigFolder.add(params.STATE.modelConfig, 'scoreThreshold', 0, 1);

    params.enableTrackingController = modelConfigFolder.add(
      params.STATE.modelConfig,
      'enableTracking',
    );
    params.enableTrackingController.onChange((_: any) => {
      // Set isModelChanged to true, so that we don't render any result during
      // changing models.
      params.STATE.isModelChanged = true;
    })
  }


  addBlazePoseControllers(modelConfigFolder: any, type: null | undefined) {
    console.log('addBlazePoseControllers', modelConfigFolder);
    params.STATE.modelConfig = {...params.BLAZEPOSE_CONFIG};
    params.STATE.modelConfig.type = type != null ? type : 'full';

    const typeController = modelConfigFolder.add(
      params.STATE.modelConfig, 'type', ['lite', 'full', 'heavy']);
    typeController.onChange((_: any) => {
      // Set isModelChanged to true, so that we don't render any result during
      // changing models.
      params.STATE.isModelChanged = true;
    });

    modelConfigFolder.add(params.STATE.modelConfig, 'scoreThreshold', 0, 1);

    console.log();

    const render3DController = modelConfigFolder.add(params.STATE.modelConfig, 'render3D');
    render3DController.onChange((render3D: any) => {
    });
  }

  async initDefaultValueMap() {
    // Clean up the cache to query tunable flags' default values.
    params.TUNABLE_FLAG_DEFAULT_VALUE_MAP = {};
    params.STATE.flags = {};
    for (const backend in params.BACKEND_FLAGS_MAP) {
      for (let index = 0; index < params.BACKEND_FLAGS_MAP[backend].length;
           index++) {
        const flag = params.BACKEND_FLAGS_MAP[backend][index];
        params.TUNABLE_FLAG_DEFAULT_VALUE_MAP[flag] = await tf.env().getAsync(flag);
      }
    }

    // Initialize STATE.flags with tunable flags' default values.
    for (const flag in params.TUNABLE_FLAG_DEFAULT_VALUE_MAP) {
      if (params.BACKEND_FLAGS_MAP[params.STATE.backend].indexOf(flag) > -1) {
        params.STATE.flags[flag] = params.TUNABLE_FLAG_DEFAULT_VALUE_MAP[flag];
      }
    }
  }

  getTunableRange(flag: string) {
    const defaultValue = params.TUNABLE_FLAG_DEFAULT_VALUE_MAP[flag];
    if (flag === 'WEBGL_FORCE_F16_TEXTURES') {
      return [false, true];
    } else if (flag === 'WEBGL_VERSION') {
      const tunableRange = [];
      for (let value = 1; value <= defaultValue; value++) {
        tunableRange.push(value);
      }
      return tunableRange;
    } else if (flag === 'WEBGL_FLUSH_THRESHOLD') {
      const tunableRange = [-1];
      for (let value = 0; value <= 2; value += 0.25) {
        tunableRange.push(value);
      }
      return tunableRange;
    } else if (typeof defaultValue === 'boolean') {
      return defaultValue ? [false, true] : [false];
    } else if (params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag] != null) {
      return params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag];
    } else {
      return [defaultValue];
    }
  }

  showBackendFlagSettings(folderController: { add: (arg0: any, arg1: any, arg2: undefined) => any; }, backendName: string) {
    const tunableFlags = params.BACKEND_FLAGS_MAP[backendName];
    for (let index = 0; index < tunableFlags.length; index++) {
      const flag = tunableFlags[index];
      const flagName = params.TUNABLE_FLAG_NAME_MAP[flag] || flag;

      // When tunable (bool) and range (array) attributes of `flagRegistry` is
      // implemented, we can apply them to here.
      const flagValueRange = this.getTunableRange(flag);
      // Heuristically consider a flag with at least two options as tunable.
      if (flagValueRange.length < 2) {
        console.warn(
          `The ${flag} is considered as untunable, ` +
          `because its value range is [${flagValueRange}].`);
        continue;
      }

      let flagController;
      if (typeof flagValueRange[0] === 'boolean') {
        // Show checkbox for boolean flags.
        // @ts-ignore
        flagController = folderController.add(params.STATE.flags, flag);
      } else {
        // Show dropdown for other types of flags.
        flagController =
          folderController.add(params.STATE.flags, flag, flagValueRange);

        // Because dat.gui always casts dropdown option values to string, we need
        // `stringValueMap` and `onFinishChange()` to recover the value type.
        if (params.stringValueMap[flag] == null) {
          params.stringValueMap[flag] = {};
          for (let index = 0; index < flagValueRange.length; index++) {
            const realValue = flagValueRange[index];
            const stringValue = String(flagValueRange[index]);
            params.stringValueMap[flag][stringValue] = realValue;
          }
        }
        flagController.onFinishChange((stringValue: string | number) => {
          params.STATE.flags[flag] = params.stringValueMap[flag][stringValue];
        });
      }
      flagController.name(flagName).onChange(() => {
        params.STATE.isFlagChanged = true;
      });
    }
  }

  async showFlagSettings(folderController: any, backendName: string) {
    await this.initDefaultValueMap();

    // Clean up flag settings for the previous backend.
    // The first constroller under the `folderController` is the backend
    // setting.
    const fixedSelectionCount = 1;
    while (folderController.__controllers.length > fixedSelectionCount) {
      folderController.remove(
        folderController
          .__controllers[folderController.__controllers.length - 1]);
    }

    // Show flag settings for the new backend.
    this.showBackendFlagSettings(folderController, backendName);
  }

  setupStats() {
    const stats = new Stats();
    (stats as any).customFpsPanel = stats.addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
    stats.showPanel((stats as any).domElement.children.length - 1);

    const parent = document.getElementById('stats');
    parent?.appendChild((stats as any).domElement);

    const statsPanes = parent?.querySelectorAll('canvas');
    if (statsPanes) {
      for (let i = 0; i < statsPanes.length; ++i) {
        statsPanes[i].style.width = '140px';
        statsPanes[i].style.height = '80px';
      }
    }

    return stats;
  }

  async resetBackend(backendName: string) {
    const ENGINE = tf.engine();
    if (!(backendName in ENGINE.registryFactory)) {
      throw new Error(`${backendName} backend is not registed.`);
    }

    if (backendName in ENGINE.registry) {
      const backendFactory = tf.findBackendFactory(backendName);
      tf.removeBackend(backendName);
      tf.registerBackend(backendName, backendFactory);
    }

    await tf.setBackend(backendName);
  }

  async setBackendAndEnvFlags(flagConfig: { [x: string]: any; } | null, backend: { split: (arg0: string) => [any, any]; }) {
    if (flagConfig == null) {
      return;
    } else if (typeof flagConfig !== 'object') {
      throw new Error(
        `An object is expected, while a(n) ${typeof flagConfig} is found.`);
    }

    // Check the validation of flags and values.
    for (const flag in flagConfig) {
      // TODO: check whether flag can be set as flagConfig[flag].
      if (!(flag in params.TUNABLE_FLAG_VALUE_RANGE_MAP)) {
        throw new Error(`${flag} is not a tunable or valid environment flag.`);
      }
      if (params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]) === -1) {
        throw new Error(
          `${flag} value is expected to be in the range [${
            params.TUNABLE_FLAG_VALUE_RANGE_MAP[flag]}], while ${flagConfig[flag]}` +
          ' is found.');
      }
    }

    tf.env().setFlags(flagConfig);

    const [runtime, $backend] = backend.split('-');

    if (runtime === 'tfjs') {
      await this.resetBackend($backend);
    }
  }
}

export class VideoCamera {
  ctx?: CanvasRenderingContext2D | null;
  params: any;
  mediaRecorder?: MediaRecorder;

  constructor(
    public source: HTMLVideoElement | undefined,
    public video: HTMLVideoElement,
    public canvas: HTMLCanvasElement
  ) {
    this.ctx = this.canvas.getContext('2d');

    const stream = this.canvas.captureStream();
    // const options = {mimeType: 'video/webm; codecs=vp9'};
    const options = {};
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = (e) => {
      console.log('mediaRecorder ondataavailable', e);
      this.handleDataAvailable(e)
    };

  }


  drawCtx() {
    this.ctx?.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    console.log('drawCtx');
  }

  clearCtx() {
    this.ctx?.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param poses A list of poses to render.
   */
  drawResults(poses: any[]) {
    for (const pose of poses) {
      this.drawResult(pose);
    }
  }

  /**
   * Draw the keypoints and skeleton on the video.
   * @param pose A pose with keypoints to render.
   */
  drawResult(pose: any) {
    if (pose.keypoints != null) {
      this.drawKeypoints(pose.keypoints);
      this.drawSkeleton(pose.keypoints);
    }
  }

  /**
   * Draw the keypoints on the video.
   * @param keypoints A list of keypoints.
   */
  drawKeypoints(keypoints: any[]) {
    if (this.ctx) {
      const keypointInd =
        posedetection.util.getKeypointIndexBySide(params.STATE.model);
      this.ctx.fillStyle = 'White';
      this.ctx.strokeStyle = 'White';
      this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

      for (const i of keypointInd.middle) {
        this.drawKeypoint(keypoints[i]);
      }

      this.ctx.fillStyle = 'Green';
      for (const i of keypointInd.left) {
        this.drawKeypoint(keypoints[i]);
      }

      this.ctx.fillStyle = 'Orange';
      for (const i of keypointInd.right) {
        this.drawKeypoint(keypoints[i]);
      }
    }

  }

  drawKeypoint(keypoint: any) {
    // If score is null, just show the keypoint.
    const score = keypoint.score != null ? keypoint.score : 1;
    const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

    if (this.ctx && score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, params.DEFAULT_RADIUS, 0, 2 * Math.PI);
      this.ctx.fill(circle);
      this.ctx.stroke(circle);
    }
  }

  /**
   * Draw the skeleton of a body on the video.
   * @param keypoints A list of keypoints.
   */
  drawSkeleton(keypoints: any[]) {
    if (this.ctx) {
      this.ctx.fillStyle = 'White';
      this.ctx.strokeStyle = 'White';
      this.ctx.lineWidth = params.DEFAULT_LINE_WIDTH;

      posedetection.util.getAdjacentPairs(params.STATE.model).forEach(([
                                                                         i, j
                                                                       ]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        // If score is null, just show the keypoint.
        const score1 = kp1.score != null ? kp1.score : 1;
        const score2 = kp2.score != null ? kp2.score : 1;
        const scoreThreshold = params.STATE.modelConfig.scoreThreshold || 0;

        if (this.ctx && score1 >= scoreThreshold && score2 >= scoreThreshold) {
          this.ctx.beginPath();
          this.ctx.moveTo(kp1.x, kp1.y);
          this.ctx.lineTo(kp2.x, kp2.y);
          this.ctx.stroke();
        }
      });
    }

  }

  start() {
    this.mediaRecorder?.start();
  }

  stop() {
    this.mediaRecorder?.stop();
  }

  handleDataAvailable(event: any) {
    if (event.data.size > 0) {
      const recordedChunks = [event.data];

      // Download.
      const blob = new Blob(recordedChunks, {type: 'video/webm'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      (a as any).href = url;
      (a as any).download = 'pose.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

}


