import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { CodeEditor } from './components/CodeEditor';
import { Code, BookOpen, Zap, Trophy } from 'lucide-react';

function App() {
  const lessons = {
    basics: [
      {
        title: "変数と型",
        description: "JavaScriptの基本的な変数宣言と型について学びましょう",
        code: `// 変数の宣言
let name = "太郎";
const age = 25;
var city = "東京";

console.log("名前:", name);
console.log("年齢:", age);
console.log("都市:", city);

// 型の確認
console.log("nameの型:", typeof name);
console.log("ageの型:", typeof age);`
      },
      {
        title: "配列の操作",
        description: "配列の作成と基本的な操作方法を学びましょう",
        code: `// 配列の作成
const fruits = ["りんご", "バナナ", "オレンジ"];

// 要素を追加
fruits.push("ぶどう");
console.log("追加後:", fruits);

// 配列をループ
fruits.forEach((fruit, index) => {
    console.log(\`\${index + 1}: \${fruit}\`);
});

console.log("配列の長さ:", fruits.length);`
      }
    ],
    functions: [
      {
        title: "関数の基本",
        description: "関数の定義と呼び出し方法を学びましょう",
        code: `// 通常の関数
function greet(name) {
    return "こんにちは、" + name + "さん！";
}

// アロー関数
const add = (a, b) => a + b;
const multiply = (x, y) => {
    const result = x * y;
    return result;
};

console.log(greet("花子"));
console.log("5 + 3 =", add(5, 3));
console.log("4 × 6 =", multiply(4, 6));`
      },
      {
        title: "高階関数",
        description: "map、filter、reduceなどの高階関数を使いこなしましょう",
        code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map: 各要素を変換
const doubled = numbers.map(n => n * 2);
console.log("2倍:", doubled);

// filter: 条件に合う要素を抽出
const evens = numbers.filter(n => n % 2 === 0);
console.log("偶数:", evens);

// reduce: 配列を単一の値に集約
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("合計:", sum);

// 組み合わせ
const result = numbers
    .filter(n => n > 5)
    .map(n => n * n)
    .reduce((acc, n) => acc + n, 0);
console.log("5より大きい数の二乗の合計:", result);`
      }
    ],
    objects: [
      {
        title: "オブジェクトの基本",
        description: "オブジェクトの作成とプロパティの操作を学びましょう",
        code: `// オブジェクトリテラル
const person = {
    name: "田中太郎",
    age: 30,
    city: "東京",
    greet() {
        return \`私の名前は\${this.name}です。\${this.age}歳です。\`;
    }
};

console.log(person.greet());
console.log("住んでいる都市:", person.city);

// プロパティの追加
person.hobby = "読書";
console.log("趣味:", person.hobby);

// オブジェクトの分割代入
const { name, age } = person;
console.log(\`分割代入: \${name}, \${age}歳\`);`
      },
      {
        title: "クラスとインスタンス",
        description: "ES6のクラス構文を使ってオブジェクト指向プログラミングを学びましょう",
        code: `// クラスの定義
class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    speak() {
        return \`\${this.name}は\${this.type}です。\`;
    }

    move() {
        return \`\${this.name}が移動しています。\`;
    }
}

// 継承
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "犬");
        this.breed = breed;
    }

    speak() {
        return \`\${this.name}（\${this.breed}）がワンワンと鳴いています。\`;
    }
}

const dog = new Dog("ポチ", "柴犬");
console.log(dog.speak());
console.log(dog.move());`
      }
    ],
    advanced: [
      {
        title: "非同期処理 - Promise",
        description: "Promiseを使った非同期処理を学びましょう",
        code: `// Promise の基本
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "ユーザー" + userId });
            } else {
                reject(new Error("無効なユーザーID"));
            }
        }, 1000);
    });
}

// Promise の使用
console.log("データ取得開始...");
fetchUserData(1)
    .then(user => {
        console.log("取得成功:", user);
        return delay(500);
    })
    .then(() => {
        console.log("処理完了");
    })
    .catch(error => {
        console.error("エラー:", error.message);
    });`
      },
      {
        title: "async/await",
        description: "より読みやすい非同期処理の書き方を学びましょう",
        code: `// async/await を使った非同期処理
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(url) {
    console.log(\`\${url} からデータを取得中...\`);
    await delay(1000);
    return { data: "サンプルデータ", url };
}

async function processData() {
    try {
        console.log("処理開始");

        const result1 = await fetchData("api/users");
        console.log("結果1:", result1);

        const result2 = await fetchData("api/posts");
        console.log("結果2:", result2);

        console.log("すべての処理が完了しました");
    } catch (error) {
        console.error("エラーが発生:", error);
    }
}

processData();`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">JavaScript学習サイト</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#basics" className="text-gray-600 hover:text-blue-600 transition-colors">基礎</a>
              <a href="#functions" className="text-gray-600 hover:text-blue-600 transition-colors">関数</a>
              <a href="#objects" className="text-gray-600 hover:text-blue-600 transition-colors">オブジェクト</a>
              <a href="#advanced" className="text-gray-600 hover:text-blue-600 transition-colors">上級</a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            JavaScriptを楽しく学ぼう
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            インタラクティブなコード例と練習問題で、JavaScriptをマスターしましょう
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>段階的学習</CardTitle>
                <CardDescription>基礎から上級まで体系的に学習</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>実践的コード</CardTitle>
                <CardDescription>すぐに実行できるコード例</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>練習問題</CardTitle>
                <CardDescription>理解を深める実践問題</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* 学習コンテンツ */}
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">基礎</TabsTrigger>
            <TabsTrigger value="functions">関数</TabsTrigger>
            <TabsTrigger value="objects">オブジェクト</TabsTrigger>
            <TabsTrigger value="advanced">上級</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">JavaScript基礎</h3>
            {lessons.basics.map((lesson, index) => (
              <CodeEditor
                key={index}
                title={lesson.title}
                description={lesson.description}
                initialCode={lesson.code}
              />
            ))}
          </TabsContent>

          <TabsContent value="functions" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">関数とスコープ</h3>
            {lessons.functions.map((lesson, index) => (
              <CodeEditor
                key={index}
                title={lesson.title}
                description={lesson.description}
                initialCode={lesson.code}
              />
            ))}
          </TabsContent>

          <TabsContent value="objects" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">オブジェクトとクラス</h3>
            {lessons.objects.map((lesson, index) => (
              <CodeEditor
                key={index}
                title={lesson.title}
                description={lesson.description}
                initialCode={lesson.code}
              />
            ))}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">上級トピック</h3>
            {lessons.advanced.map((lesson, index) => (
              <CodeEditor
                key={index}
                title={lesson.title}
                description={lesson.description}
                initialCode={lesson.code}
              />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 JavaScript学習サイト. すべての権利を保有します。</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
