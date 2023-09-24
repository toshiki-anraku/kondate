import Configuration from "openai";
import OpenAIApi from "openai";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import path from "path";
import { addLocalData } from "./localdata";
import { redirect } from "next/navigation";

export async function requestChatGPT(requestData) {
  // プロンプトを生成
  const requestText = await generatePrompt(requestData);
  // ChatGPTのAPIを実行
  // const recipe = await fetchRecipeData(requestText);
  const recipe = {
    request: {
      ingredients: ["鶏もも肉", "醤油", "砂糖"],
      genre: "和食",
    },
    response: {
      recipeName: "鶏の照り焼き",
      description: "鶏の照り焼きは、簡単に作れる和食の代表的な料理です。",
      ingredients: ["鶏もも肉 2枚", "醤油 大さじ3", "砂糖 大さじ2"],
      instructions: [
        "1. 鶏もも肉を焼きます。中火で約5分間、両面がきつね色になるまで焼きます。",
        "2. 醤油と砂糖を混ぜてタレを作ります。",
        "3. 鶏肉にタレを塗り、弱火で約10分間煮ます。タレがとろみがつくまで煮ます。",
        "4. 照り焼きが完成しました。",
      ],
      tips: "鶏肉はしっかり焼き、タレをからめると美味しさが引き立ちます。",
    },
  };
  // 取得したレシピをJsonへ追加し、history.json内でのindexを取得
  const localData = await addLocalData(recipe);

  // レシピ画面へ遷移
  redirect(`/${localData.length - 1}`);
}

// ChatGPTへのプロンプトを生成
const generatePrompt = (requestData) => {
  const prompt = `
      # 命令
      あなたはプロの料理人です。料理の知識量は最高で全世界の料理を知り尽くします。
      食材とジャンルの"情報"を提供するので、おすすめのレシピを伝授して欲しいです。
      以下の制約条件を厳密に守ってロールプレイを行ってください。

      ## 制約条件
      - JSON形式で出力すること
      - JSON以外は一切不要

      # 条件
      - 作り方を教える際は、分量、焼き加減（例：中火で5分）を明確に教えて下さい。
      - クックパッドのような情報が欲しいです。
      - 以下返却時のjsonのフォーマット例です。
      ---
        {
          "request": {
            "ingredients": ["鶏もも肉", "醤油", "砂糖"],
            "genre": "和食"
          },
          "response": {
            "recipeName": "鶏の照り焼き",
            "description": "鶏の照り焼きは、簡単に作れる和食の代表的な料理です。",
            "ingredients": ["鶏もも肉 2枚", "醤油 大さじ3", "砂糖 大さじ2"],
            "instructions": [
              "1. 鶏もも肉を焼きます。中火で約5分間、両面がきつね色になるまで焼きます。",
              "2. 醤油と砂糖を混ぜてタレを作ります。",
              "3. 鶏肉にタレを塗り、弱火で約10分間煮ます。タレがとろみがつくまで煮ます。",
              "4. 照り焼きが完成しました。"
            ],
            "tips": "鶏肉はしっかり焼き、タレをからめると美味しさが引き立ちます。"
          }
        },
      ---

      # 情報
          "request": ${requestData},

      # 出力
    `;

  return prompt;
};

// ChatGPT APIの実装 //TODO: APIを完成させればプロトタイプとしては完成
const fetchRecipeData = async (text) => {
  const NEXT_PUBLIC_OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  // const configuration = new Configuration({
  //   apiKey: NEXT_PUBLIC_OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);

  const openai = new OpenAI({
    apiKey: NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const errorMessage = "エラーが発生したためもう一度やり直してください";
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });
    const answer = response.data.choices[0].message?.content; //④返答（レスポンス）の取得
    console.log(answer);
    return answer ?? errorMessage;
  } catch (error) {
    console.log(error);
  }
  return errorMessage;
};
