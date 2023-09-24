import Link from "next/link";
import { getLocalData } from "@/utils/localdata";

export default async function History() {
  const historyData = await getLocalData();

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
