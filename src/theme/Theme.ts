export interface AppTheme {
    dark: boolean;
    colors: {
        background: string;
        card: string;
        text: string;
        subtext: string;
        primary: string;
        border: string;
        error: string;
    };
    spacing: {
        spacer4: number;
        spacer6: number;
        spacer8: number;
        spacer10: number;
        spacer12: number;
        spacer16: number;
    };
    typography: {
        small: number;
        medium: number;
        large: number;
    };
}
