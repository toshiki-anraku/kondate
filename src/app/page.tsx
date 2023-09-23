"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  // テキスト入力とプルダウンメニューの状態を管理するためのstateを設定
  const [textValue, setTextValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const router = useRouter();

  // データを送信する関数
  const handleDataSubmit = async () => {
    // ChatGPT APIを呼び出してデータを取得
    // const recipeData = await fetchRecipeData(); // 仮の関数名、実際のAPI呼び出しを実装してください

    // データの処理

    // レシピ画面に遷移 TODO: デモ用に遷移
    router.push("/0");

    // レシピ画面への遷移とデータの渡し方
    // router.push({
    //   pathname: "/recipes-display",
    //   query: { recipeData }, // レシピデータを渡す
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4">献立の提案を依頼する</p>
      <div className="flex space-x-4 mb-4">
        {/* テキスト入力ボックス */}
        <input
          type="text"
          className="p-2 border border-gray-300 rounded"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="食材を入力してください"
        />
        {/* プルダウンメニュー */}
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="option1">中華</option>
          <option value="option2">洋食</option>
          <option value="option3">和食</option>
        </select>
        {/* データ送信ボタン */}
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleDataSubmit}
        >
          提案依頼
        </button>
      </div>
      <Link href="/history" passHref legacyBehavior>
        <a className="text-blue-500 underline">履歴を見る</a>
      </Link>
    </div>
  );
}
