export const imageSet = (id: string) => import.meta.env.DEV ? undefined : [480, 800, 1200].map(width => `/responsive/${id}-${width}.webp ${width}w`).join(', ')
export const portraitSet = import.meta.env.DEV ? undefined : '/responsive/portrait-480.webp 480w, /responsive/portrait-800.webp 800w'
export const portraitSizes = '(max-width: 767px) calc(100vw - 40px), 340px'
export const cardSizes = '(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 44vw, 30vw'
export const featureSizes = '(max-width: 767px) calc(100vw - 40px), 50vw'
export const studySizes = '(max-width: 767px) calc(100vw - 40px), (max-width: 1500px) 88vw, 1328px'
