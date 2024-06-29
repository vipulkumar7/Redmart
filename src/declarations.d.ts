declare module '*.webp'
declare module '*jpg'
declare module '*.png'
declare module '*.gif'
declare module '*.svg' {
    const content: string
    export default content
}
