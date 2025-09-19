import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  title: string;
  initialCode: string;
  description?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  initialCode,
  description
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    // console.logをキャプチャするための仕組み
    const originalLog = console.log;
    let capturedOutput = '';

    console.log = (...args) => {
      capturedOutput += args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ') + '\n';
      originalLog.apply(console, args);
    };

    try {
      // 非同期コードの場合の処理
      if (code.includes('async') || code.includes('await') || code.includes('Promise')) {
        const asyncFunction = new Function(`
          return (async () => {
            ${code}
          })();
        `);

        await asyncFunction();
        await new Promise(resolve => setTimeout(resolve, 100)); // 少し待つ
      } else {
        // 通常のコードを実行
        eval(code);
      }

      setOutput(capturedOutput || '実行完了（出力なし）');
    } catch (error) {
      setOutput(`エラー: ${(error as Error).message}`);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'コピー済み' : 'コピー'}
            </Button>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4" />
              {isRunning ? '実行中...' : '実行'}
            </Button>
          </div>
        </CardTitle>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="ここにJavaScriptコードを入力してください..."
          />
        </div>

        {output && (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">実行結果:</h4>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {output}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};