declare module '*.scss' {
    const content: { [className: string]: string }
    export = content
}

interface Process {
    browser: boolean
}

declare var process: Process
