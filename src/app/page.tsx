import Link from "next/link";
import { requestChatGPT } from "@/utils/requestChatGPT";

export default function Home() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    // textValueをスペース区切りで配列に
    const textArray = data.get("textValue").toString().split(/\s+/);

    const requestData = {
      ingredients: textArray,
      genre: data.get("selectedOption"),
    };

    await requestChatGPT(requestData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-2xl font-bold mb-4">献立の提案を依頼する</p>
      <form action={handleSubmit} className="flex space-x-4 mb-4">
        {/* テキスト入力ボックス */}
        <input
          type="text"
          className="p-2 border border-gray-300 rounded"
          name="textValue"
          placeholder="食材を入力してください"
        />
        {/* プルダウンメニュー */}
        <select
          className="p-2 border border-gray-300 rounded"
          name="selectedOption"
        >
          <option value="">選択してください</option>
          <option value="中華">中華</option>
          <option value="洋食">洋食</option>
          <option value="和食">和食</option>
        </select>
        {/* データ送信ボタン */}
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="submit"
        >
          提案依頼
        </button>
      </form>
      <Link href="/history" passHref legacyBehavior>
        <a className="text-blue-500 underline">履歴を見る</a>
      </Link>
    </div>
  );
}
