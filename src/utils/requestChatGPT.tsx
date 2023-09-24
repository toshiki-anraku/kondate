import OpenAI from "openai";
import { addLocalData } from "./localdata";
import { redirect } from "next/navigation";

export async function requestChatGPT(requestData) {
  // プロンプトを生成
  const requestPrompt = await generatePrompt(requestData);
  // ChatGPTのAPIを実行
  const recipe = await fetchRecipeData(requestPrompt);
  // 取得したレシピをJsonへ追加し、history.json内でのindexを取得
  const localData = await addLocalData(JSON.parse(recipe));
  // レシピ画面へ遷移
  redirect(`/${localData.length - 1}`);
}

// ChatGPTへのプロンプトを生成
const generatePrompt = (requestData) => {
  console.log(requestData);
  const prompt = `
      # 作成項目
      "情報"の内容を元におすすめのレシピを作成します。以下の項目について具体的な数字、名称、文章を作成して下さい。
      分量、焼き加減（例：中火で5分）が分かりやすいように教えて下さい。クックパッドのような情報が欲しいです。

      ## 情報
      出力形式のrequestに格納して下さい。
      "request": ${requestData},

      ## レシピ
      - レシピ名
          - レシピがイメージし易い名称
      - レシピの説明
          - レシピの簡単な説明文
      - 食材
          - 使用する食材の "食材名称 分量" を配列に格納
      - 作り方（調理手順）
          - 調理手順を火加減（弱火、中火、強火）、加熱時間（◯分）
      - レシピの助言（tipe）
          - ワンポイントアドバイスや、隠し味に関する記述

      # 出力形式
      データは次の形式のJSON文字列で返して下さい。
      {
        "request": {
          "ingredients": ["食材1", "食材2", "食材3"],
          "genre": "料理のジャンル"
        },
        "response": {
          "recipeName": "レシピ名",
          "description": "レシピの説明",
          "ingredients": ["食材1 分量", "食材2 分量", "食材3 分量"],
          "instructions": [
            "1. 調理手順1",
            "2. 調理手順2",
            "3. 調理手順3",
            "4. 調理手順3"
          ],
          "tips": "レシピの助言（tips）"
        }
      },

      # 出力
    `;

  return prompt;
};

// ChatGPT APIの実装
const fetchRecipeData = async (prompt) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const errorMessage = "エラーが発生したためもう一度やり直してください";

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = chatCompletion.choices[0].message.content;
    console.log(answer);

    return answer ?? errorMessage;
  } catch (error) {
    console.log(error);
  }

  return errorMessage;
};
