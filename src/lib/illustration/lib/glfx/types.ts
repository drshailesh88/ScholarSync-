/**
 * Type definitions for glfx.js
 *
 * glfx.js is a WebGL image effects library that provides real-time
 * image processing capabilities using GPU acceleration.
 *
 * @see https://evanw.github.io/glfx.js/
 */

/**
 * Represents a WebGL texture created from an image or canvas element
 */
export interface GlfxTexture {
  /**
   * Loads the texture from an HTML element
   */
  loadContentsOf(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;

  /**
   * Destroys the texture and frees WebGL resources
   */
  destroy(): void;
}

/**
 * The main glfx.js canvas that provides WebGL-accelerated image processing
 */
export interface GlfxCanvas extends HTMLCanvasElement {
  /**
   * Creates a texture from an image, canvas, or video element
   */
  texture(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): GlfxTexture;

  /**
   * Draws a texture to the canvas, preparing it for filter application
   */
  draw(texture: GlfxTexture, width?: number, height?: number): GlfxCanvas;

  /**
   * Updates the canvas to show the current state
   */
  update(): GlfxCanvas;

  /**
   * Gets the current contents as a data URL
   */
  toDataURL(type?: string, quality?: number): string;

  // ============================================
  // ADJUST FILTERS - Color and brightness adjustments
  // ============================================

  /**
   * Adjusts brightness and contrast
   * @param brightness -1 to 1 (0 = no change)
   * @param contrast -1 to 1 (0 = no change)
   */
  brightnessContrast(brightness: number, contrast: number): GlfxCanvas;

  /**
   * Adjusts hue and saturation
   * @param hue -1 to 1 (-1 = 180deg counter-clockwise, 1 = 180deg clockwise)
   * @param saturation -1 to 1 (-1 = grayscale, 0 = no change)
   */
  hueSaturation(hue: number, saturation: number): GlfxCanvas;

  /**
   * Remaps the statistical distribution of colors using a normal distribution
   * @param strength 0 to 1
   */
  denoise(strength: number): GlfxCanvas;

  /**
   * Adds random noise to the image
   * @param amount 0 to 1
   */
  noise(amount: number): GlfxCanvas;

  /**
   * Reduces the color palette to a set number of colors
   * @param centerX 0 to 1
   * @param centerY 0 to 1
   * @param radius 0 to 1
   * @param amount 0 to 1
   */
  sepia(amount: number): GlfxCanvas;

  /**
   * Adjusts vibrance (intelligent saturation that avoids over-saturating skin tones)
   * @param amount -1 to 1
   */
  vibrance(amount: number): GlfxCanvas;

  /**
   * Adds a vignette effect (darkening around the edges)
   * @param size 0 to 1 (proportion of the image that will be darkened)
   * @param amount 0 to 1 (0 = no change, 1 = completely black)
   */
  vignette(size: number, amount: number): GlfxCanvas;

  /**
   * Adjusts the curves using polynomial coefficients
   * @param red Array of red channel curve values
   * @param green Array of green channel curve values
   * @param blue Array of blue channel curve values
   */
  curves(
    red: [number, number, number],
    green: [number, number, number],
    blue: [number, number, number]
  ): GlfxCanvas;

  /**
   * Photo filter adjustment
   * @param r Red component 0-1
   * @param g Green component 0-1
   * @param b Blue component 0-1
   * @param strength 0-1
   */
  colorHalftone(centerX: number, centerY: number, angle: number, size: number): GlfxCanvas;

  // ============================================
  // BLUR FILTERS - Various blur effects
  // ============================================

  /**
   * Applies a triangle blur (fast approximation of gaussian blur)
   * @param radius The radius of the blur in pixels
   */
  triangleBlur(radius: number): GlfxCanvas;

  /**
   * Applies a zoom blur effect
   * @param centerX The x coordinate of the blur center (0 to 1)
   * @param centerY The y coordinate of the blur center (0 to 1)
   * @param strength The strength of the blur (0 to 1)
   */
  zoomBlur(centerX: number, centerY: number, strength: number): GlfxCanvas;

  /**
   * Applies a tilt-shift blur effect (simulates miniature/toy effect)
   * @param startY The y coordinate of the top of the focused area (0 to 1)
   * @param endY The y coordinate of the bottom of the focused area (0 to 1)
   * @param blurRadius The maximum blur radius in pixels
   * @param gradientRadius The size of the gradient transition in pixels
   */
  tiltShift(startY: number, endY: number, blurRadius: number, gradientRadius: number): GlfxCanvas;

  /**
   * Applies a lens blur effect (hexagonal bokeh)
   * @param radius The radius of the blur
   * @param brightness -1 to 1 (0 = no change to brightness)
   * @param angle The angle of the hexagonal bokeh shape in radians
   */
  lensBlur(radius: number, brightness: number, angle: number): GlfxCanvas;

  // ============================================
  // WARP/DISTORTION FILTERS
  // ============================================

  /**
   * Applies a swirl distortion effect
   * @param centerX The x coordinate of the swirl center (0 to 1)
   * @param centerY The y coordinate of the swirl center (0 to 1)
   * @param radius The radius of the swirl effect
   * @param angle The angle of the swirl in radians
   */
  swirl(centerX: number, centerY: number, radius: number, angle: number): GlfxCanvas;

  /**
   * Applies a bulge/pinch distortion effect
   * @param centerX The x coordinate of the bulge center (0 to 1)
   * @param centerY The y coordinate of the bulge center (0 to 1)
   * @param radius The radius of the bulge effect
   * @param strength -1 to 1 (positive = bulge outward, negative = pinch inward)
   */
  bulgePinch(centerX: number, centerY: number, radius: number, strength: number): GlfxCanvas;

  /**
   * Applies perspective transformation
   * @param before Array of 4 [x,y] coordinates of the source corners
   * @param after Array of 4 [x,y] coordinates of the destination corners
   */
  perspective(
    before: [[number, number], [number, number], [number, number], [number, number]],
    after: [[number, number], [number, number], [number, number], [number, number]]
  ): GlfxCanvas;

  /**
   * Applies a matrix warp transformation
   */
  matrixWarp(
    matrix: number[],
    inverse: boolean,
    useTextureSpace: boolean
  ): GlfxCanvas;

  // ============================================
  // FUN FILTERS
  // ============================================

  /**
   * Applies an ink sketch effect
   * @param strength 0 to 1
   */
  ink(strength: number): GlfxCanvas;

  /**
   * Applies edge detection
   */
  edgeWork(radius: number): GlfxCanvas;

  /**
   * Applies a dot screen effect
   * @param centerX 0 to 1
   * @param centerY 0 to 1
   * @param angle Angle in radians
   * @param size Dot size in pixels
   */
  dotScreen(centerX: number, centerY: number, angle: number, size: number): GlfxCanvas;

  /**
   * Applies a hexagonal pixelation effect
   * @param centerX 0 to 1
   * @param centerY 0 to 1
   * @param scale Pixel scale
   */
  hexagonalPixelate(centerX: number, centerY: number, scale: number): GlfxCanvas;

  /**
   * Unsharp mask for sharpening
   * @param radius The blur radius for the mask
   * @param strength The strength of the sharpening effect
   */
  unsharpMask(radius: number, strength: number): GlfxCanvas;
}

/**
 * The glfx module exported from the library
 */
export interface GlfxModule {
  /**
   * Creates a new WebGL-enabled canvas for image processing
   * @throws Error if WebGL is not supported
   */
  canvas(): GlfxCanvas;
}

/**
 * Filter preset configuration
 */
export interface FilterPreset {
  name: string;
  description: string;
  apply: (canvas: GlfxCanvas) => GlfxCanvas;
}

/**
 * Adjustment filter parameters
 */
export interface AdjustmentParams {
  brightness?: number;
  contrast?: number;
  hue?: number;
  saturation?: number;
  vibrance?: number;
  sepia?: number;
}

/**
 * Blur filter parameters
 */
export interface BlurParams {
  type: 'triangle' | 'zoom' | 'tiltShift' | 'lens';
  radius?: number;
  centerX?: number;
  centerY?: number;
  strength?: number;
  startY?: number;
  endY?: number;
  gradientRadius?: number;
  brightness?: number;
  angle?: number;
}

/**
 * Distortion filter parameters
 */
export interface DistortionParams {
  type: 'swirl' | 'bulgePinch';
  centerX: number;
  centerY: number;
  radius: number;
  strength?: number;
  angle?: number;
}

/**
 * Vignette filter parameters
 */
export interface VignetteParams {
  size: number;
  amount: number;
}
