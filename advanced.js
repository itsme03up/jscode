// 上級編のコード実行機能
function runAdvancedCode(exampleId) {
    const codeElement = document.getElementById(exampleId);
    const outputElement = document.getElementById(exampleId + '-output');

    if (!codeElement || !outputElement) return;

    const code = codeElement.textContent;

    // console.logをキャプチャ
    const originalLog = console.log;
    let output = '';

    console.log = function(...args) {
        output += args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
        originalLog.apply(console, args);
    };

    try {
        // 非同期コードの場合は特別な処理
        if (code.includes('async') || code.includes('await') || code.includes('Promise')) {
            // 非同期コードを実行
            const asyncFunction = new Function(`
                return (async () => {
                    ${code}
                })();
            `);

            asyncFunction().then(() => {
                outputElement.textContent = output || '非同期処理完了';
                outputElement.classList.add('has-content');
            }).catch(error => {
                outputElement.textContent = 'エラー: ' + error.message;
                outputElement.style.borderColor = '#e53e3e';
                outputElement.style.backgroundColor = '#fed7d7';
            });
        } else {
            // 通常のコードを実行
            eval(code);
            outputElement.textContent = output || '実行完了';
            outputElement.classList.add('has-content');
        }
    } catch (error) {
        outputElement.textContent = 'エラー: ' + error.message;
        outputElement.style.borderColor = '#e53e3e';
        outputElement.style.backgroundColor = '#fed7d7';
    }

    // console.logを元に戻す
    console.log = originalLog;
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript上級編が読み込まれました');
});