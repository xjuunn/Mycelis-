
export const useConsoleLog = () => {
    const builder = new ConsoleBuilder();

    function log() {
        const { text, styles } = builder.build();
        console.log(text, ...styles);
    }

    return {
        builder, log
    };
}

export class ConsoleBuilder {

    text: string = `${new Date().toLocaleTimeString()}: `;
    styles: string[] = [];

    createConsoleSpan(span: ConsoleSpan) {
        this.text += '%c' + span.text;
        let style = '';
        if (span.color) style += `color:${resolveConsoleColor(span.color)};`;
        if (span.bg) style += `background:${resolveConsoleColor(span.bg)};`;
        if (span.bold) style += 'font-weight: bold;';
        if (span.underline) style += 'text-decoration: underline;';
        this.styles.push(style)
        return this;
    }

    addBackground(bg: keyof typeof ConsoleColor): ConsoleBuilder {
        if (this.styles.length == 0) return this;
        let style = this.styles.pop();
        if (!style) return this;
        style += `background:${resolveConsoleColor(ConsoleColor[bg])};`;
        this.styles.push(style);
        return this;
    }

    default(text: string, bold: boolean = false, underline: boolean = false) {
        return this.createConsoleSpan({
            text, bold, underline,
            color: ConsoleColor["base-content"]
        })
    }


    success(text: string, bold: boolean = false, underline: boolean = false) {
        return this.createConsoleSpan({
            text, bold, underline,
            color: ConsoleColor.success
        })
    }


    error(text: string, bold: boolean = false, underline: boolean = false) {
        return this.createConsoleSpan({
            text, bold, underline,
            color: ConsoleColor.error
        })
    }

    build() {
        const text = this.text;
        const styles = this.styles;
        return {
            text, styles
        }
    }
}

const getCssVar = (varName: string) => {
    if (typeof window === 'undefined') return ''
    return getComputedStyle(document.documentElement).getPropertyValue(varName)
}

export const resolveConsoleColor = (color: ConsoleColor) => {
    return color.startsWith('--') ? getCssVar(color) : color
}

export type ConsoleSpan = {
    text?: string,
    color?: ConsoleColor,
    bg?: ConsoleColor,
    bold?: boolean,
    underline?: boolean
}

export enum ConsoleColor {
    "primary" = "--color-primary",
    "primary-content" = "--color-primary-content",
    "secondary" = "--color-secondary",
    "secondary-content" = "--color-secondary-content",
    "accent" = "--color-accent",
    "accent-content" = "--color-accent-content",
    "neutral" = "--color-neutral",
    "neutral-content" = "--color-neutral-content",
    "base-100" = "--color-base-100",
    "base-200" = "--color-base-200",
    "base-300" = "--color-base-300",
    "base-content" = "--color-base-content",
    "info" = "--color-info",
    "info-content" = "--color-info-content",
    "success" = "--color-success",
    "success-content" = "--color-success-content",
    "warning" = "--color-warning",
    "warning-content" = "--color-warning-content",
    "error" = "--color-error",
    "error-content" = "--color-error-content",
}

export type ConsoleItem = ConsoleSpan[]



