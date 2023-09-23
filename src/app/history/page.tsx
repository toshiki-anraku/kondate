"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // JSONファイルを読み込む関数を定義
    const fetchHistoryData = async () => {
      try {
        const response = await fetch("/json/history.json"); // JSONファイルのパス
        if (!response.ok) {
          throw new Error("JSONファイルの読み込みに失敗しました。");
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    // JSONデータを読み込む関数を呼び出す
    fetchHistoryData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">履歴</h1>
        <Link href="/" passHref legacyBehavior>
          <a className="text-blue-500 underline">トップへ戻る</a>
        </Link>
      </div>
      <ul>
        {historyData.map((item, index) => (
          <li key={index} className="mb-4">
            <Link href={`${index}`} passHref legacyBehavior>
              <a className="block p-4 border border-gray-300 rounded hover:bg-gray-100">
                レシピ名: {item.response.recipeName}, ジャンル:{" "}
                {item.request.genre}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
