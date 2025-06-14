export interface BlurryGradientItemProps {
  /**
   * The color of the gradient item.
   * Accepts any valid CSS color value. including gradients. (e.g., 'linear-gradient(#FBF1F7, #B27CEE)')
   */
  color: string
  /**
   * Optional css `top` for the gradient item.
   */
  top?: number | string
  /**
   * Optional css `left` for the gradient item.
   */
  left?: number | string
  /**
   * Optional css `width` for the gradient item.
   */
  width?: number | string
  /**
   * Optional css `height` for the gradient item.
   */
  height?: number | string
  /**
   * Optional css `animation-duration` for the gradient item.
   */
  speed?: string
  /**
   * Optional css `transform` for the gradient item when animating starts.
   */
  transformFrom?: string
  /**
   * Optional css `transform` for the gradient item when animating ends.
   */
  transformTo?: string
}
