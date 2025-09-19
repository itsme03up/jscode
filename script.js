// コード実行機能
function runCode(exampleId) {
    const codeElement = document.getElementById(exampleId);
    const outputElement = document.getElementById(exampleId + '-output');

    if (!codeElement || !outputElement) return;

    const code = codeElement.textContent;

    // console.logをキャプチャするための仕組み
    const originalLog = console.log;
    let output = '';

    console.log = function(...args) {
        output += args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
        originalLog.apply(console, args);
    };

    try {
        // コードを実行
        eval(code);
        outputElement.textContent = output || '実行完了（出力なし）';
        outputElement.classList.add('has-content');
    } catch (error) {
        outputElement.textContent = 'エラー: ' + error.message;
        outputElement.style.borderColor = '#e53e3e';
        outputElement.style.backgroundColor = '#fed7d7';
    }

    // console.logを元に戻す
    console.log = originalLog;
}

// 学習コンテンツを動的に追加
document.addEventListener('DOMContentLoaded', function() {
    addLessons();
});

function addLessons() {
    const basicsSection = document.getElementById('basics');

    // 関数の例を追加
    const functionsLesson = `
        <div class="lesson-card">
            <h3>関数</h3>
            <div class="code-example">
                <pre><code id="functions-example">// 関数の定義と呼び出し
function greet(name) {
    return "こんにちは、" + name + "さん！";
}

// アロー関数
const add = (a, b) => a + b;

console.log(greet("花子"));
console.log(add(5, 3));</code></pre>
                <button onclick="runCode('functions-example')">実行</button>
            </div>
            <div class="output" id="functions-example-output"></div>
        </div>
    `;

    // 配列の例を追加
    const arraysLesson = `
        <div class="lesson-card">
            <h3>配列</h3>
            <div class="code-example">
                <pre><code id="arrays-example">// 配列の操作
const fruits = ["りんご", "バナナ", "オレンジ"];

// 要素を追加
fruits.push("ぶどう");

// 配列をループ
fruits.forEach((fruit, index) => {
    console.log(\`\${index + 1}: \${fruit}\`);
});

console.log("配列の長さ:", fruits.length);</code></pre>
                <button onclick="runCode('arrays-example')">実行</button>
            </div>
            <div class="output" id="arrays-example-output"></div>
        </div>
    `;

    basicsSection.insertAdjacentHTML('beforeend', functionsLesson);
    basicsSection.insertAdjacentHTML('beforeend', arraysLesson);
}