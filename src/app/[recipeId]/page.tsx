"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Recipe() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

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
        setLoading(false); // データ読み込み完了後にローディングを解除
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    // JSONデータを読み込む関数を呼び出す
    fetchHistoryData();
  }, []);

  const recipeData = historyData[params.recipeId];

  function handleResuggest() {
    // 再提案の処理を実装
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4"></p>
      <p className="text-2xl font-bold mb-4">レシピ</p>
      {/* ローディング中はローディングメッセージを表示 */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* レシピ情報を表示 */}
          <h2 className="text-xl font-semibold mb-2">
            {recipeData.response.recipeName}
          </h2>
          <p className="text-gray-600 mb-2">
            {recipeData.response.description}
          </p>
          <h3 className="text-lg font-semibold mb-2">材料</h3>
          <ul className="list-disc list-inside mb-2">
            {recipeData.response.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">作り方</h3>
          <ol className="list-decimal list-inside mb-2">
            {recipeData.response.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <p className="text-gray-600 mb-2">{recipeData.response.tips}</p>
        </div>
      )}
      {/* 再提案ボタン */}
      <button
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        onClick={handleResuggest}
      >
        再提案
      </button>
      {/* 履歴を見るリンク */}
      <Link href="/history" passHref legacyBehavior>
        <a className="text-blue-500 underline">履歴を見る</a>
      </Link>
      {/* トップページへの戻るリンク */}
      <Link href="/" passHref legacyBehavior>
        <a className="text-blue-500 underline">トップへ戻る</a>
      </Link>
    </div>
  );
}
