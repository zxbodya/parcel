import { DiagnosticCodeHighlight } from '@parcel/diagnostic';

declare type CodeFramePadding = {
    before: number;
    after: number;
};
declare type CodeFrameOptionsInput = Partial<CodeFrameOptions>;
declare type CodeFrameOptions = {
    useColor: boolean;
    syntaxHighlighting: boolean;
    maxLines: number;
    padding: CodeFramePadding;
    terminalWidth: number;
    language?: string;
};
declare function codeFrame(code: string, highlights: Array<DiagnosticCodeHighlight>, inputOpts?: CodeFrameOptionsInput): string;

export default codeFrame;
