import Link from "next/link";
import { getLocalData } from "@/utils/localdata";
import { requestChatGPT } from "@/utils/requestChatGPT";

export default async function Recipe(req) {
  const historyData = await getLocalData();

  const recipeData = await historyData[req.params.recipeId];

  const handleSubmit = async () => {
    "use server";
    await requestChatGPT(recipeData.request);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4"></p>
      <p className="text-2xl font-bold mb-4">レシピ</p>
      <div>
        {/* レシピ情報を表示 */}
        <h2 className="text-xl font-semibold mb-2">
          {recipeData.response.recipeName}
        </h2>
        <p className="text-gray-600 mb-2">{recipeData.response.description}</p>
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
      {/* 再提案ボタン */}
      <form action={handleSubmit}>
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4">
          同じ食材・ジャンルで別のレシピを提案依頼
        </button>
      </form>
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
