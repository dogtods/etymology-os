// ============================================
// Etymology OS Engine — Word Database
// ============================================

export const WORDS = {
  // === PORT family ===
  "import": {
    decomposition: {
      prefix: { morpheme: "im", meaning: "into" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry into",
    etymologicalMeaningJa: "中に運び入れる",
    modernDefinition: "To bring goods or services into a country from abroad",
    modernDefinitionJa: "外国から商品やサービスを持ち込むこと",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 1
  },
  "export": {
    decomposition: {
      prefix: { morpheme: "ex", meaning: "out" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry out",
    etymologicalMeaningJa: "外に運び出す",
    modernDefinition: "To send goods or services to another country for sale",
    modernDefinitionJa: "商品やサービスを他国に送り出すこと",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 1
  },
  "transport": {
    decomposition: {
      prefix: { morpheme: "trans", meaning: "across" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry across",
    etymologicalMeaningJa: "横切って運ぶ",
    modernDefinition: "To carry people or goods from one place to another",
    modernDefinitionJa: "人や物をある場所から別の場所へ運ぶこと",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },
  "portable": {
    decomposition: {
      prefix: null,
      root: { morpheme: "port", meaning: "to carry" },
      suffix: { morpheme: "able", meaning: "capable of" }
    },
    etymologicalMeaning: "Capable of being carried",
    etymologicalMeaningJa: "運ぶことができる",
    modernDefinition: "Able to be easily carried or moved",
    modernDefinitionJa: "簡単に持ち運べる",
    semanticDrift: 0.05,
    mnemonicStory: null,
    difficulty: 1
  },
  "report": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "back" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry back",
    etymologicalMeaningJa: "持ち帰る",
    modernDefinition: "To give a spoken or written account of something",
    modernDefinitionJa: "何かについて口頭または書面で説明すること",
    semanticDrift: 0.5,
    mnemonicStory: "情報を「持ち帰る」(re+port) → 見聞きしたことを持ち帰って伝える → 「報告する」。昔の使者が王に知らせを「運び戻した」イメージです。",
    difficulty: 2
  },
  "support": {
    decomposition: {
      prefix: { morpheme: "sub", meaning: "under" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry from underneath",
    etymologicalMeaningJa: "下から運ぶ・支える",
    modernDefinition: "To bear the weight of; to give assistance to",
    modernDefinitionJa: "重さを支える；援助する",
    semanticDrift: 0.3,
    mnemonicStory: "下(sub)から運ぶ(port) → 下から持ち上げて支える → 「支援する」。柱が建物を「下から支えている」場面を想像してください。",
    difficulty: 2
  },
  "deport": {
    decomposition: {
      prefix: { morpheme: "de", meaning: "away" },
      root: { morpheme: "port", meaning: "to carry" },
      suffix: null
    },
    etymologicalMeaning: "To carry away",
    etymologicalMeaningJa: "運び去る",
    modernDefinition: "To expel a foreigner from a country",
    modernDefinitionJa: "外国人を国外に追放すること",
    semanticDrift: 0.35,
    mnemonicStory: "離れた場所へ(de)運ぶ(port) → 人を強制的に国外へ運び出す → 「国外追放」。文字通り「運び去る」行為です。",
    difficulty: 3
  },

  // === STRUCT family ===
  "structure": {
    decomposition: {
      prefix: null,
      root: { morpheme: "struct", meaning: "to build" },
      suffix: { morpheme: "ure", meaning: "result/act" }
    },
    etymologicalMeaning: "The result of building",
    etymologicalMeaningJa: "建てた結果",
    modernDefinition: "The arrangement of and relations between parts of something complex",
    modernDefinitionJa: "複雑なものの部分間の配置と関係",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 1
  },
  "construct": {
    decomposition: {
      prefix: { morpheme: "con", meaning: "together" },
      root: { morpheme: "struct", meaning: "to build" },
      suffix: null
    },
    etymologicalMeaning: "To build together",
    etymologicalMeaningJa: "一緒に建てる",
    modernDefinition: "To build or make something",
    modernDefinitionJa: "何かを建設する・作る",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },
  "destruct": {
    decomposition: {
      prefix: { morpheme: "de", meaning: "down, un-" },
      root: { morpheme: "struct", meaning: "to build" },
      suffix: null
    },
    etymologicalMeaning: "To un-build, to tear down",
    etymologicalMeaningJa: "壊す・取り壊す",
    modernDefinition: "To cause destruction; to demolish",
    modernDefinitionJa: "破壊を引き起こす；取り壊す",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 2
  },
  "instruct": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "into" },
      root: { morpheme: "struct", meaning: "to build" },
      suffix: null
    },
    etymologicalMeaning: "To build into (someone's mind)",
    etymologicalMeaningJa: "心の中に建てる",
    modernDefinition: "To teach someone; to direct or command",
    modernDefinitionJa: "誰かに教える；指示する・命じる",
    semanticDrift: 0.45,
    mnemonicStory: "心の中に(in)知識を建てる(struct) → 知識の構築物を心に作り上げる → 「教える・指導する」。教育とは心の中にレンガを一つずつ積み上げること。",
    difficulty: 2
  },
  "obstruct": {
    decomposition: {
      prefix: { morpheme: "ob", meaning: "against" },
      root: { morpheme: "struct", meaning: "to build" },
      suffix: null
    },
    etymologicalMeaning: "To build against",
    etymologicalMeaningJa: "逆らって建てる",
    modernDefinition: "To block or get in the way of",
    modernDefinitionJa: "邪魔する・妨害する",
    semanticDrift: 0.4,
    mnemonicStory: "道に対して(ob)壁を建てる(struct) → 通路を塞ぐように何かを建てる → 「妨害する」。道路に壁を建てて通行を阻むイメージ。",
    difficulty: 3
  },
  "infrastructure": {
    decomposition: {
      prefix: { morpheme: "infra", meaning: "below" },
      root: { morpheme: "struct", meaning: "to build" },
      suffix: { morpheme: "ure", meaning: "result/act" }
    },
    etymologicalMeaning: "Built below / underlying structure",
    etymologicalMeaningJa: "下に建てられた構造",
    modernDefinition: "The basic physical systems of a country or organization",
    modernDefinitionJa: "国や組織の基本的な物理的システム",
    semanticDrift: 0.3,
    mnemonicStory: "下に(infra)建てた(struct)もの → 社会の「土台」となる建造物 → 道路、橋、電力など「見えない基盤」。",
    difficulty: 3
  },

  // === DICT family ===
  "dictate": {
    decomposition: {
      prefix: null,
      root: { morpheme: "dict", meaning: "to say" },
      suffix: { morpheme: "ate", meaning: "to make" }
    },
    etymologicalMeaning: "To make say",
    etymologicalMeaningJa: "言わせる",
    modernDefinition: "To say words aloud to be written down; to give orders",
    modernDefinitionJa: "書き取らせるように声に出して言う；命令する",
    semanticDrift: 0.3,
    mnemonicStory: null,
    difficulty: 2
  },
  "predict": {
    decomposition: {
      prefix: { morpheme: "pre", meaning: "before" },
      root: { morpheme: "dict", meaning: "to say" },
      suffix: null
    },
    etymologicalMeaning: "To say before",
    etymologicalMeaningJa: "前もって言う",
    modernDefinition: "To say what will happen in the future",
    modernDefinitionJa: "将来何が起こるかを言う",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },
  "contradict": {
    decomposition: {
      prefix: { morpheme: "contra", meaning: "against" },
      root: { morpheme: "dict", meaning: "to say" },
      suffix: null
    },
    etymologicalMeaning: "To say against",
    etymologicalMeaningJa: "反対に言う",
    modernDefinition: "To deny the truth of a statement; to be inconsistent with",
    modernDefinitionJa: "発言の真実を否定する；矛盾する",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 2
  },
  "verdict": {
    decomposition: {
      prefix: { morpheme: "ver", meaning: "truth" },
      root: { morpheme: "dict", meaning: "to say" },
      suffix: null
    },
    etymologicalMeaning: "To say the truth",
    etymologicalMeaningJa: "真実を言う",
    modernDefinition: "A decision on a disputed issue in a court of law",
    modernDefinitionJa: "法廷における争点についての判決",
    semanticDrift: 0.45,
    mnemonicStory: "真実を(ver)言う(dict) → 裁判で真実を宣言する → 「評決・判決」。陪審員が「真実を語る」瞬間です。",
    difficulty: 3
  },

  // === SPEC family ===
  "inspect": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "into" },
      root: { morpheme: "spec", meaning: "to look" },
      suffix: null
    },
    etymologicalMeaning: "To look into",
    etymologicalMeaningJa: "中を見る",
    modernDefinition: "To look at something closely to assess its quality or condition",
    modernDefinitionJa: "品質や状態を評価するために何かを注意深く見ること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },
  "spectator": {
    decomposition: {
      prefix: null,
      root: { morpheme: "spec", meaning: "to look" },
      suffix: { morpheme: "ator", meaning: "one who" }
    },
    etymologicalMeaning: "One who looks",
    etymologicalMeaningJa: "見る人",
    modernDefinition: "A person who watches an event",
    modernDefinitionJa: "イベントを見る人；観客",
    semanticDrift: 0.05,
    mnemonicStory: null,
    difficulty: 2
  },
  "circumspect": {
    decomposition: {
      prefix: { morpheme: "circum", meaning: "around" },
      root: { morpheme: "spec", meaning: "to look" },
      suffix: null
    },
    etymologicalMeaning: "To look around",
    etymologicalMeaningJa: "周りを見る",
    modernDefinition: "Wary and unwilling to take risks; cautious",
    modernDefinitionJa: "用心深く、リスクを取りたがらない；慎重な",
    semanticDrift: 0.6,
    mnemonicStory: "周り(circum)を見回す(spec) → 行動前に全方向を確認する → 「慎重な」。崖の端で360度見渡してから一歩を踏み出す人のように。",
    difficulty: 4
  },
  "perspective": {
    decomposition: {
      prefix: { morpheme: "per", meaning: "through" },
      root: { morpheme: "spec", meaning: "to look" },
      suffix: { morpheme: "ive", meaning: "tending to" }
    },
    etymologicalMeaning: "Looking through (thoroughly)",
    etymologicalMeaningJa: "通して見ること",
    modernDefinition: "A particular attitude or way of regarding something",
    modernDefinitionJa: "物事を見る特定の態度や見方",
    semanticDrift: 0.4,
    mnemonicStory: "通して(per)見る(spec) → あるレンズを通して世界を見る → 「視点・見方」。同じ景色でも見る角度で全く違って見える。",
    difficulty: 3
  },
  "spectrum": {
    decomposition: {
      prefix: null,
      root: { morpheme: "spec", meaning: "to look" },
      suffix: { morpheme: "trum", meaning: "instrument/result" }
    },
    etymologicalMeaning: "Thing for looking / an appearance",
    etymologicalMeaningJa: "見えるもの・現れ",
    modernDefinition: "A band of colors or range of related qualities",
    modernDefinitionJa: "色の帯、または関連する特性の範囲",
    semanticDrift: 0.5,
    mnemonicStory: "見る(spec)ためのもの → 光を分解すると見える虹色の帯 → 「スペクトル」。ニュートンがプリズムで光を「見た」時の発見。",
    difficulty: 3
  },
  "respect": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "back, again" },
      root: { morpheme: "spec", meaning: "to look" },
      suffix: null
    },
    etymologicalMeaning: "To look back at, to look again",
    etymologicalMeaningJa: "振り返って見る・再び見る",
    modernDefinition: "A feeling of admiration; to admire someone",
    modernDefinitionJa: "尊敬の気持ち；誰かを称賛すること",
    semanticDrift: 0.55,
    mnemonicStory: "もう一度(re)見る(spec) → 何度も振り返って見たくなるほど素晴らしい人 → 「尊敬する」。通り過ぎた後も思わず振り返る。",
    difficulty: 2
  },

  // === JECT family ===
  "inject": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "into" },
      root: { morpheme: "ject", meaning: "to throw" },
      suffix: null
    },
    etymologicalMeaning: "To throw into",
    etymologicalMeaningJa: "中に投げ込む",
    modernDefinition: "To introduce a substance into the body with a syringe",
    modernDefinitionJa: "注射器で体内に物質を注入すること",
    semanticDrift: 0.3,
    mnemonicStory: null,
    difficulty: 1
  },
  "project": {
    decomposition: {
      prefix: { morpheme: "pro", meaning: "forward" },
      root: { morpheme: "ject", meaning: "to throw" },
      suffix: null
    },
    etymologicalMeaning: "To throw forward",
    etymologicalMeaningJa: "前方に投げる",
    modernDefinition: "A planned piece of work; to estimate or forecast",
    modernDefinitionJa: "計画された仕事；推定する・予想する",
    semanticDrift: 0.5,
    mnemonicStory: "前(pro)に投げ出す(ject) → 未来に向けてアイデアを投げ出す → 「計画・プロジェクト」。将来への構想を「投影」するイメージ。",
    difficulty: 2
  },
  "reject": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "back" },
      root: { morpheme: "ject", meaning: "to throw" },
      suffix: null
    },
    etymologicalMeaning: "To throw back",
    etymologicalMeaningJa: "投げ返す",
    modernDefinition: "To dismiss as inadequate or unacceptable",
    modernDefinitionJa: "不適切または受け入れがたいとして退けること",
    semanticDrift: 0.25,
    mnemonicStory: null,
    difficulty: 1
  },
  "subject": {
    decomposition: {
      prefix: { morpheme: "sub", meaning: "under" },
      root: { morpheme: "ject", meaning: "to throw" },
      suffix: null
    },
    etymologicalMeaning: "Thrown under",
    etymologicalMeaningJa: "下に投げられた",
    modernDefinition: "A topic; a person under authority; to cause to undergo",
    modernDefinitionJa: "話題；権力下にある人；～を受けさせる",
    semanticDrift: 0.65,
    mnemonicStory: "下に(sub)投げられた(ject) → 権力の「下に置かれた」人=臣民 → 議論の「下に置かれた」テーマ=主題。支配者の足元に投げられた存在。",
    difficulty: 3
  },

  // === DUCT family ===
  "conduct": {
    decomposition: {
      prefix: { morpheme: "con", meaning: "together" },
      root: { morpheme: "duc", meaning: "to lead" },
      suffix: null
    },
    etymologicalMeaning: "To lead together",
    etymologicalMeaningJa: "一緒に導く",
    modernDefinition: "To organize and carry out; behavior; to direct an orchestra",
    modernDefinitionJa: "組織的に実行する；行動；オーケストラを指揮する",
    semanticDrift: 0.35,
    mnemonicStory: null,
    difficulty: 2
  },
  "produce": {
    decomposition: {
      prefix: { morpheme: "pro", meaning: "forward" },
      root: { morpheme: "duc", meaning: "to lead" },
      suffix: null
    },
    etymologicalMeaning: "To lead forward",
    etymologicalMeaningJa: "前方に導き出す",
    modernDefinition: "To make or manufacture; to create",
    modernDefinitionJa: "製造する；作り出す",
    semanticDrift: 0.4,
    mnemonicStory: "前(pro)に導き出す(duc) → 存在しなかったものを世に導き出す → 「生産する」。工場のラインから製品を「前へ」送り出す。",
    difficulty: 2
  },
  "reduce": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "back" },
      root: { morpheme: "duc", meaning: "to lead" },
      suffix: null
    },
    etymologicalMeaning: "To lead back",
    etymologicalMeaningJa: "後ろに導く",
    modernDefinition: "To make smaller or less in amount",
    modernDefinitionJa: "量や大きさを小さくすること",
    semanticDrift: 0.5,
    mnemonicStory: "後ろ(re)に導く(duc) → 元の状態に引き戻す → 量を「引き下げる」。膨らんだ風船の空気を元に戻すように。",
    difficulty: 2
  },
  "introduce": {
    decomposition: {
      prefix: { morpheme: "intro", meaning: "inward" },
      root: { morpheme: "duc", meaning: "to lead" },
      suffix: null
    },
    etymologicalMeaning: "To lead inward",
    etymologicalMeaningJa: "内側に導く",
    modernDefinition: "To bring something into use for the first time; to present someone",
    modernDefinitionJa: "初めて使用に供する；誰かを紹介する",
    semanticDrift: 0.3,
    mnemonicStory: null,
    difficulty: 1
  },
  "deduce": {
    decomposition: {
      prefix: { morpheme: "de", meaning: "down, from" },
      root: { morpheme: "duc", meaning: "to lead" },
      suffix: null
    },
    etymologicalMeaning: "To lead down from (premises to conclusion)",
    etymologicalMeaningJa: "前提から結論へ導く",
    modernDefinition: "To arrive at a conclusion by reasoning",
    modernDefinitionJa: "推論によって結論に達すること",
    semanticDrift: 0.3,
    mnemonicStory: "上(前提)から下(結論)へ(de)論理的に導く(duc) → 「演繹・推理する」。シャーロック・ホームズの推理法。",
    difficulty: 3
  },

  // === RUPT family ===
  "disrupt": {
    decomposition: {
      prefix: { morpheme: "dis", meaning: "apart" },
      root: { morpheme: "rupt", meaning: "to break" },
      suffix: null
    },
    etymologicalMeaning: "To break apart",
    etymologicalMeaningJa: "バラバラに壊す",
    modernDefinition: "To interrupt the normal course of an activity",
    modernDefinitionJa: "活動の正常な流れを妨げること",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 2
  },
  "corrupt": {
    decomposition: {
      prefix: { morpheme: "cor", meaning: "thoroughly" },
      root: { morpheme: "rupt", meaning: "to break" },
      suffix: null
    },
    etymologicalMeaning: "Thoroughly broken",
    etymologicalMeaningJa: "完全に壊れた",
    modernDefinition: "Morally dishonest; to cause to become dishonest",
    modernDefinitionJa: "道徳的に不正な；不正にさせる",
    semanticDrift: 0.45,
    mnemonicStory: "完全に(cor)壊れた(rupt) → 道徳が完全に壊れた状態 → 「腐敗した」。心のモラルが粉砕された人。",
    difficulty: 3
  },
  "interrupt": {
    decomposition: {
      prefix: { morpheme: "inter", meaning: "between" },
      root: { morpheme: "rupt", meaning: "to break" },
      suffix: null
    },
    etymologicalMeaning: "To break between",
    etymologicalMeaningJa: "間を壊す",
    modernDefinition: "To stop the continuous progress of something",
    modernDefinitionJa: "何かの連続的な進行を止めること",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 1
  },
  "erupt": {
    decomposition: {
      prefix: { morpheme: "e", meaning: "out" },
      root: { morpheme: "rupt", meaning: "to break" },
      suffix: null
    },
    etymologicalMeaning: "To break out",
    etymologicalMeaningJa: "外に壊れ出る",
    modernDefinition: "To burst out suddenly; (of a volcano) to become active",
    modernDefinitionJa: "突然噴き出す；（火山が）噴火する",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 2
  },

  // === TRACT family ===
  "attract": {
    decomposition: {
      prefix: { morpheme: "ad", meaning: "toward" },
      root: { morpheme: "tract", meaning: "to pull" },
      suffix: null
    },
    etymologicalMeaning: "To pull toward",
    etymologicalMeaningJa: "引き寄せる",
    modernDefinition: "To cause to come to a place or participate",
    modernDefinitionJa: "人を引きつける・魅了する",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 1
  },
  "subtract": {
    decomposition: {
      prefix: { morpheme: "sub", meaning: "under, away" },
      root: { morpheme: "tract", meaning: "to pull" },
      suffix: null
    },
    etymologicalMeaning: "To pull away from underneath",
    etymologicalMeaningJa: "下から引き取る",
    modernDefinition: "To take away a number or amount from another",
    modernDefinitionJa: "ある数や量から別のものを差し引くこと",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 1
  },
  "extract": {
    decomposition: {
      prefix: { morpheme: "ex", meaning: "out" },
      root: { morpheme: "tract", meaning: "to pull" },
      suffix: null
    },
    etymologicalMeaning: "To pull out",
    etymologicalMeaningJa: "引き出す",
    modernDefinition: "To remove or take out by effort or force",
    modernDefinitionJa: "努力や力で取り出す・抽出すること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 2
  },
  "contract": {
    decomposition: {
      prefix: { morpheme: "con", meaning: "together" },
      root: { morpheme: "tract", meaning: "to pull" },
      suffix: null
    },
    etymologicalMeaning: "To pull together",
    etymologicalMeaningJa: "一緒に引く",
    modernDefinition: "A written legal agreement; to decrease in size; to catch a disease",
    modernDefinitionJa: "書面による法的合意；大きさが縮む；病気にかかる",
    semanticDrift: 0.55,
    mnemonicStory: "一緒に(con)引き合う(tract) → 二者が互いを引きつけ合って結ぶ約束 → 「契約」。また、筋肉が内側に引き合い → 「収縮する」。",
    difficulty: 3
  },
  "distract": {
    decomposition: {
      prefix: { morpheme: "dis", meaning: "away" },
      root: { morpheme: "tract", meaning: "to pull" },
      suffix: null
    },
    etymologicalMeaning: "To pull away",
    etymologicalMeaningJa: "引き離す",
    modernDefinition: "To prevent someone from concentrating on something",
    modernDefinitionJa: "集中を妨げること",
    semanticDrift: 0.25,
    mnemonicStory: "離れた方向に(dis)注意を引っ張る(tract) → 「気を散らす」。",
    difficulty: 2
  },

  // === VERT family ===
  "convert": {
    decomposition: {
      prefix: { morpheme: "con", meaning: "completely" },
      root: { morpheme: "vert", meaning: "to turn" },
      suffix: null
    },
    etymologicalMeaning: "To turn completely",
    etymologicalMeaningJa: "完全に回す",
    modernDefinition: "To change in form, character, or function",
    modernDefinitionJa: "形、性質、機能を変えること",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 2
  },
  "revert": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "back" },
      root: { morpheme: "vert", meaning: "to turn" },
      suffix: null
    },
    etymologicalMeaning: "To turn back",
    etymologicalMeaningJa: "元に戻す",
    modernDefinition: "To return to a previous state or practice",
    modernDefinitionJa: "以前の状態や慣行に戻ること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 2
  },
  "introvert": {
    decomposition: {
      prefix: { morpheme: "intro", meaning: "inward" },
      root: { morpheme: "vert", meaning: "to turn" },
      suffix: null
    },
    etymologicalMeaning: "Turned inward",
    etymologicalMeaningJa: "内側に向いた",
    modernDefinition: "A shy, quiet person who prefers being alone",
    modernDefinitionJa: "一人でいることを好む内向的で静かな人",
    semanticDrift: 0.3,
    mnemonicStory: "内側に(intro)向く(vert) → 心のエネルギーが内側に向いている人 → 「内向的な人」。",
    difficulty: 2
  },
  "extrovert": {
    decomposition: {
      prefix: { morpheme: "extro", meaning: "outward" },
      root: { morpheme: "vert", meaning: "to turn" },
      suffix: null
    },
    etymologicalMeaning: "Turned outward",
    etymologicalMeaningJa: "外側に向いた",
    modernDefinition: "An outgoing, socially confident person",
    modernDefinitionJa: "社交的で自信のある外向的な人",
    semanticDrift: 0.3,
    mnemonicStory: "外側に(extro)向く(vert) → 心のエネルギーが外の世界に向いている人 → 「外向的な人」。",
    difficulty: 2
  },

  // === FORM family ===
  "transformation": {
    decomposition: {
      prefix: { morpheme: "trans", meaning: "across" },
      root: { morpheme: "form", meaning: "shape" },
      suffix: { morpheme: "ation", meaning: "act/process" }
    },
    etymologicalMeaning: "The act of shaping across (changing form)",
    etymologicalMeaningJa: "形を横切って変える行為",
    modernDefinition: "A thorough or dramatic change in form or appearance",
    modernDefinitionJa: "形や外見の徹底的または劇的な変化",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 2
  },
  "reform": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "again" },
      root: { morpheme: "form", meaning: "shape" },
      suffix: null
    },
    etymologicalMeaning: "To shape again",
    etymologicalMeaningJa: "再び形作る",
    modernDefinition: "To make changes in order to improve something",
    modernDefinitionJa: "改善のために変更を加えること",
    semanticDrift: 0.2,
    mnemonicStory: null,
    difficulty: 2
  },
  "conform": {
    decomposition: {
      prefix: { morpheme: "con", meaning: "together, with" },
      root: { morpheme: "form", meaning: "shape" },
      suffix: null
    },
    etymologicalMeaning: "To shape together / to shape with",
    etymologicalMeaningJa: "一緒に形作る",
    modernDefinition: "To comply with rules, standards, or laws",
    modernDefinitionJa: "規則、基準、法律に従うこと",
    semanticDrift: 0.4,
    mnemonicStory: "一緒に(con)同じ形(form)になる → 周りと同じ形に合わせる → 「従う・適合する」。金型に合わせて同じ形になるイメージ。",
    difficulty: 3
  },
  "inform": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "into" },
      root: { morpheme: "form", meaning: "shape" },
      suffix: null
    },
    etymologicalMeaning: "To shape (the mind) from within",
    etymologicalMeaningJa: "心の中を形作る",
    modernDefinition: "To give someone facts or information",
    modernDefinitionJa: "誰かに事実や情報を与えること",
    semanticDrift: 0.45,
    mnemonicStory: "心の中に(in)知識の形(form)を作る → 相手の心に情報の輪郭を描く → 「知らせる」。空白だった心に形を与える行為。",
    difficulty: 2
  },

  // === MIT/MISS family ===
  "transmit": {
    decomposition: {
      prefix: { morpheme: "trans", meaning: "across" },
      root: { morpheme: "mit", meaning: "to send" },
      suffix: null
    },
    etymologicalMeaning: "To send across",
    etymologicalMeaningJa: "向こう側に送る",
    modernDefinition: "To pass on from one person or place to another",
    modernDefinitionJa: "一人または場所から別の場所へ伝えること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 2
  },
  "submit": {
    decomposition: {
      prefix: { morpheme: "sub", meaning: "under" },
      root: { morpheme: "mit", meaning: "to send" },
      suffix: null
    },
    etymologicalMeaning: "To send under (to place under authority)",
    etymologicalMeaningJa: "下に送る（権威の下に置く）",
    modernDefinition: "To accept or yield to authority; to present for consideration",
    modernDefinitionJa: "権威に従う；検討のために提出する",
    semanticDrift: 0.4,
    mnemonicStory: "下に(sub)送り出す(mit) → 自分を権威の下に差し出す → 「服従する・提出する」。書類を上司の机の「下」に差し出すイメージ。",
    difficulty: 2
  },
  "permit": {
    decomposition: {
      prefix: { morpheme: "per", meaning: "through" },
      root: { morpheme: "mit", meaning: "to send" },
      suffix: null
    },
    etymologicalMeaning: "To send through (to let pass)",
    etymologicalMeaningJa: "通して送る（通過させる）",
    modernDefinition: "To allow; an official document giving permission",
    modernDefinitionJa: "許可する；許可証",
    semanticDrift: 0.3,
    mnemonicStory: "通して(per)送る(mit) → 障壁を通過させる → 「許可する」。門番が「通してよし」と言うイメージ。",
    difficulty: 2
  },

  // === PATH family ===
  "empathy": {
    decomposition: {
      prefix: { morpheme: "em", meaning: "in" },
      root: { morpheme: "path", meaning: "feeling" },
      suffix: { morpheme: "y", meaning: "state of" }
    },
    etymologicalMeaning: "The state of feeling in (another person)",
    etymologicalMeaningJa: "他者の中の感情を感じること",
    modernDefinition: "The ability to understand and share the feelings of another",
    modernDefinitionJa: "他者の感情を理解し共有する能力",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 2
  },
  "sympathy": {
    decomposition: {
      prefix: { morpheme: "syn", meaning: "together" },
      root: { morpheme: "path", meaning: "feeling" },
      suffix: { morpheme: "y", meaning: "state of" }
    },
    etymologicalMeaning: "Feeling together",
    etymologicalMeaningJa: "一緒に感じること",
    modernDefinition: "Feelings of pity and sorrow for someone's misfortune",
    modernDefinitionJa: "誰かの不幸に対する憐れみと悲しみの気持ち",
    semanticDrift: 0.25,
    mnemonicStory: null,
    difficulty: 2
  },
  "apathy": {
    decomposition: {
      prefix: { morpheme: "a", meaning: "without" },
      root: { morpheme: "path", meaning: "feeling" },
      suffix: { morpheme: "y", meaning: "state of" }
    },
    etymologicalMeaning: "Without feeling",
    etymologicalMeaningJa: "感情なしに",
    modernDefinition: "Lack of interest, enthusiasm, or concern",
    modernDefinitionJa: "興味、熱意、関心の欠如；無関心",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 3
  },

  // === CRED family ===
  "incredible": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "not" },
      root: { morpheme: "cred", meaning: "to believe" },
      suffix: { morpheme: "ible", meaning: "capable of" }
    },
    etymologicalMeaning: "Not capable of being believed",
    etymologicalMeaningJa: "信じられないほどの",
    modernDefinition: "Impossible to believe; extraordinary",
    modernDefinitionJa: "信じられないほどの；素晴らしい",
    semanticDrift: 0.35,
    mnemonicStory: "信じる(cred)ことが出来(ible)ない(in) → 信じられないほど素晴らしい → 「信じ難い」「素晴らしい」。驚きの両面を持つ言葉。",
    difficulty: 2
  },

  // === GEN family ===
  "generate": {
    decomposition: {
      prefix: null,
      root: { morpheme: "gen", meaning: "birth, kind" },
      suffix: { morpheme: "ate", meaning: "to make" }
    },
    etymologicalMeaning: "To make something be born",
    etymologicalMeaningJa: "何かを生み出す",
    modernDefinition: "To cause something to arise or come about",
    modernDefinitionJa: "何かを生み出す・発生させること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },

  // === COGN family ===
  "recognize": {
    decomposition: {
      prefix: { morpheme: "re", meaning: "again" },
      root: { morpheme: "cogn", meaning: "to know" },
      suffix: { morpheme: "ize", meaning: "to make" }
    },
    etymologicalMeaning: "To know again",
    etymologicalMeaningJa: "再び知る",
    modernDefinition: "To identify someone or something from having encountered them before",
    modernDefinitionJa: "以前出会ったことがある人や物を識別すること",
    semanticDrift: 0.1,
    mnemonicStory: null,
    difficulty: 1
  },
  "incognito": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "not" },
      root: { morpheme: "cogn", meaning: "to know" },
      suffix: { morpheme: "ito", meaning: "state" }
    },
    etymologicalMeaning: "In a state of not being known",
    etymologicalMeaningJa: "知られていない状態で",
    modernDefinition: "Having one's true identity concealed",
    modernDefinitionJa: "本当の身元を隠している状態",
    semanticDrift: 0.15,
    mnemonicStory: null,
    difficulty: 3
  },

  // === PEND family ===
  "suspend": {
    decomposition: {
      prefix: { morpheme: "sus", meaning: "from below" },
      root: { morpheme: "pend", meaning: "to hang" },
      suffix: null
    },
    etymologicalMeaning: "To hang from below",
    etymologicalMeaningJa: "下から吊るす",
    modernDefinition: "To temporarily stop; to hang from above",
    modernDefinitionJa: "一時的に停止する；上から吊るす",
    semanticDrift: 0.35,
    mnemonicStory: "下から(sus)吊るす(pend) → 宙に浮いた状態 → 「中断する」「吊るす」。時間が宙に浮いて止まっているイメージ。",
    difficulty: 2
  },
  "independent": {
    decomposition: {
      prefix: { morpheme: "in", meaning: "not" },
      root: { morpheme: "pend", meaning: "to hang" },
      suffix: { morpheme: "ent", meaning: "being" }
    },
    etymologicalMeaning: "Not hanging from (anything)",
    etymologicalMeaningJa: "何にも吊られていない",
    modernDefinition: "Free from outside control; not depending on another",
    modernDefinitionJa: "外部からの支配を受けない；他に頼らない",
    semanticDrift: 0.45,
    mnemonicStory: "何にも(in)ぶら下がって(pend)いない(ent) → 誰の支えにも頼らず自立 → 「独立した」。自分の足でしっかり立つ。",
    difficulty: 2
  },

  // === VOC family ===
  "vocabulary": {
    decomposition: {
      prefix: null,
      root: { morpheme: "voc", meaning: "voice, to call" },
      suffix: { morpheme: "ary", meaning: "collection" }
    },
    etymologicalMeaning: "A collection of things called/named",
    etymologicalMeaningJa: "名付けられたものの集まり",
    modernDefinition: "The body of words used in a particular language",
    modernDefinitionJa: "特定の言語で使用される語彙の全体",
    semanticDrift: 0.25,
    mnemonicStory: null,
    difficulty: 1
  },
  "provoke": {
    decomposition: {
      prefix: { morpheme: "pro", meaning: "forward" },
      root: { morpheme: "voc", meaning: "to call" },
      suffix: null
    },
    etymologicalMeaning: "To call forward",
    etymologicalMeaningJa: "前方に呼び出す",
    modernDefinition: "To stimulate or incite someone to do or feel something",
    modernDefinitionJa: "誰かを刺激して何かをさせたり感じさせたりすること",
    semanticDrift: 0.45,
    mnemonicStory: "前方に(pro)呼び出す(voc) → 相手の感情を前面に呼び出す → 「挑発する」。隠れている怒りを表に「呼び出す」行為。",
    difficulty: 3
  },
  "advocate": {
    decomposition: {
      prefix: { morpheme: "ad", meaning: "to" },
      root: { morpheme: "voc", meaning: "to call" },
      suffix: { morpheme: "ate", meaning: "one who" }
    },
    etymologicalMeaning: "One called to (assist)",
    etymologicalMeaningJa: "助けに呼ばれた人",
    modernDefinition: "A person who publicly supports a cause; to recommend publicly",
    modernDefinitionJa: "大義を公に支持する人；公に推薦すること",
    semanticDrift: 0.35,
    mnemonicStory: "～のために(ad)声を上げる(voc)人 → 弁護のために法廷に「呼ばれた」人 → 「擁護者・提唱者」。",
    difficulty: 3
  },

  // === Additional high-drift words for interesting mnemonic stories ===
  "salary": {
    decomposition: {
      prefix: null,
      root: { morpheme: "sal", meaning: "salt" },
      suffix: { morpheme: "ary", meaning: "relating to" }
    },
    etymologicalMeaning: "Related to salt",
    etymologicalMeaningJa: "塩に関する",
    modernDefinition: "A fixed regular payment for work",
    modernDefinitionJa: "仕事に対する固定的な定期的支払い",
    semanticDrift: 0.85,
    mnemonicStory: "古代ローマの兵士は塩(sal)で給料を支払われていました。塩は当時「白い金」と呼ばれるほど貴重品。「塩代」→「給料」へ。'He is worth his salt'（彼は給料に値する）という表現もここから。",
    difficulty: 2
  },
  "candidate": {
    decomposition: {
      prefix: null,
      root: { morpheme: "cand", meaning: "white, to glow" },
      suffix: { morpheme: "ate", meaning: "one who" }
    },
    etymologicalMeaning: "One who is white/glowing",
    etymologicalMeaningJa: "白く輝く者",
    modernDefinition: "A person who applies for a job or is nominated for election",
    modernDefinitionJa: "仕事に応募する人または選挙に立候補する人",
    semanticDrift: 0.8,
    mnemonicStory: "古代ローマで公職に立候補する人は、清廉さを示すために白い(candidus)トーガを着ました。「白い服の人」→「立候補者」。candleやcandidも同じ語源！",
    difficulty: 3
  },
  "disaster": {
    decomposition: {
      prefix: { morpheme: "dis", meaning: "bad, apart" },
      root: { morpheme: "aster", meaning: "star" },
      suffix: null
    },
    etymologicalMeaning: "Bad star (ill-starred event)",
    etymologicalMeaningJa: "悪い星",
    modernDefinition: "A sudden accident or natural catastrophe causing great damage",
    modernDefinitionJa: "大きな被害をもたらす突然の事故や自然災害",
    semanticDrift: 0.7,
    mnemonicStory: "悪い(dis)星(aster)の下で生まれた出来事。昔の人は大災害を「星の配置が悪い」せいだと信じていました。asterisk(*)、astronomy（天文学）も同じ星の家族。",
    difficulty: 2
  },
  "muscle": {
    decomposition: {
      prefix: null,
      root: { morpheme: "musc", meaning: "little mouse" },
      suffix: { morpheme: "le", meaning: "diminutive" }
    },
    etymologicalMeaning: "Little mouse",
    etymologicalMeaningJa: "小さなネズミ",
    modernDefinition: "A body tissue that can contract to produce movement",
    modernDefinitionJa: "収縮して動きを生み出す体の組織；筋肉",
    semanticDrift: 0.9,
    mnemonicStory: "ラテン語musculus = 「小さなネズミ」。腕の筋肉が動く様子がまるで皮膚の下を「小さなネズミ」が走り回っているように見えたから。次に力こぶを作る時、ネズミを探してみて！",
    difficulty: 2
  },
  "sinister": {
    decomposition: {
      prefix: null,
      root: { morpheme: "sinister", meaning: "left (hand)" },
      suffix: null
    },
    etymologicalMeaning: "Left / on the left side",
    etymologicalMeaningJa: "左・左側の",
    modernDefinition: "Giving the impression that something harmful is going to happen",
    modernDefinitionJa: "何か有害なことが起こりそうな印象を与える；不吉な",
    semanticDrift: 0.85,
    mnemonicStory: "左手(sinister)は古代ローマで不吉とされていました。占い師が鳥の飛ぶ方角を見る時、左から来るのは悪い前兆。「左の」→「不吉な」→「邪悪な」。",
    difficulty: 4
  }
};

// Get all word keys
export function getAllWords() {
  return Object.keys(WORDS);
}

// Get words by difficulty
export function getWordsByDifficulty(level) {
  return Object.entries(WORDS)
    .filter(([_, data]) => data.difficulty === level)
    .map(([word]) => word);
}

// Get words with high semantic drift
export function getHighDriftWords(threshold = 0.4) {
  return Object.entries(WORDS)
    .filter(([_, data]) => data.semanticDrift >= threshold)
    .map(([word, data]) => ({ word, ...data }));
}

// Get words by root
export function getWordsByRoot(rootKey) {
  return Object.entries(WORDS)
    .filter(([_, data]) => data.decomposition.root?.morpheme === rootKey)
    .map(([word, data]) => ({ word, ...data }));
}
