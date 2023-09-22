"use client";
import Link from "next/link";

function handleResuggest() {
  // 再提案の処理を実装
}

export default function Recipe() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4">レシピ</p>
      <div>
        <h1>準備物</h1>
        <p>----</p>
        <p>----</p>
        <p>----</p>
        <p>----</p>
        <h1>手順</h1>
        <p>----</p>
        <p>----</p>
        <p>----</p>
        <p>----</p>
      </div>
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
