"use client";

import { useMemo, useRef, useState } from "react";
import { extraAccounts } from "./data/accounts-extra";

type Verdict = "human" | "coordinated" | "marketing";
type Camp = "copper" | "berry" | "none";

type Comment = {
  name: string;
  handle: string;
  body: string;
  likes: number;
  camp?: Camp;
};

type Account = {
  id: number;
  name: string;
  handle: string;
  initials: string;
  avatar: string;
  camp: Camp;
  campLabel: string;
  bio: string;
  joined: string;
  followers: string;
  following: string;
  activity: string;
  post: string;
  time: string;
  likes: number;
  replies: number;
  reposts: number;
  comments: Comment[];
  history: { body: string; time: string; likes: number }[];
  answer: Verdict;
  reveal: string[];
};

const starterAccounts: Account[] = [
  {
    id: 1,
    name: "巷口觀察員",
    handle: "@lane_watcher88",
    initials: "巷",
    avatar: "avatar-copper",
    camp: "copper",
    campLabel: "榴營支持者",
    bio: "基隆人。白天修冷氣，晚上看球。政治文很多，廢文更多。",
    joined: "2021 年 6 月加入",
    followers: "1,284",
    following: "639",
    activity: "本週發文 18 次 · 活躍時間不固定",
    post:
      "柚營又在說要改革，先把我家巷口那個坑補起來好嗎？三個月了，我家的機車每天都在練越野。🙂",
    time: "上午 8:43",
    likes: 327,
    replies: 38,
    reposts: 21,
    comments: [
      { name: "小海", handle: "@seafood_keelung", body: "我知道那個坑，昨天又變大了。", likes: 41 },
      { name: "柚柚星期天", handle: "@grapefruit_sun", body: "修路跟柚營有什麼關係？不要什麼都扯政治。", likes: 26, camp: "berry" },
      { name: "巷口觀察員", handle: "@lane_watcher88", body: "好啦我承認，主要是今天摔到便當很氣。", likes: 112, camp: "copper" },
    ],
    history: [
      { body: "今天修到一台比我年紀還大的冷氣，師傅看到都沉默。", time: "昨天", likes: 89 },
      { body: "女兒第一次自己游完 50 公尺。晚上加菜！", time: "3 天前", likes: 204 },
      { body: "榴營這次的交通政策寫得有夠空，支持歸支持，該罵還是要罵。", time: "5 天前", likes: 71 },
    ],
    answer: "human",
    reveal: ["長期且多元的生活紀錄", "會公開批評自己支持的陣營", "留言互動能接續具體生活情境"],
  },
  {
    id: 2,
    name: "島嶼新聲",
    handle: "@newvoice_771",
    initials: "新",
    avatar: "avatar-berry",
    camp: "berry",
    campLabel: "柚營支持者",
    bio: "理性中立｜拒絕舊政治｜葡萄柚黨是唯一選擇",
    joined: "2026 年 8 月加入",
    followers: "8,921",
    following: "12",
    activity: "今日發文 63 次 · 平均間隔 7 分鐘",
    post:
      "全台灣都醒了！只有葡萄柚黨敢說真話。認同請轉發，今晚讓所有人看見人民的選擇！#拔掉榴刺",
    time: "凌晨 3:14",
    likes: 4_812,
    replies: 146,
    reposts: 2_904,
    comments: [
      { name: "人民眼睛", handle: "@eyes_772", body: "全台灣都醒了！只有葡萄柚黨敢說真話。", likes: 933, camp: "berry" },
      { name: "前進現在", handle: "@go_773", body: "認同請轉發，今晚讓所有人看見人民的選擇！", likes: 721, camp: "berry" },
      { name: "阿清", handle: "@ching_daily", body: "為什麼你們三個帳號名字跟內容都這麼像？", likes: 18 },
    ],
    history: [
      { body: "真正的民意正在沸騰！轉發就是改變的開始！#拔掉榴刺", time: "凌晨 3:07", likes: 3610 },
      { body: "沉默就是縱容。讓所有人看見人民的選擇！#拔掉榴刺", time: "凌晨 3:00", likes: 4022 },
      { body: "複製這段文字，讓真相突破封鎖！#拔掉榴刺", time: "凌晨 2:53", likes: 2998 },
    ],
    answer: "coordinated",
    reveal: ["帳號剛建立卻突然取得大量互動", "固定七分鐘發文一次", "多個相似帳號複製同一句型"],
  },
  {
    id: 3,
    name: "政經顯微鏡",
    handle: "@truth_scope",
    initials: "鏡",
    avatar: "avatar-gold",
    camp: "none",
    campLabel: "自稱中立",
    bio: "不站隊，只站真相。免費投資講座與限量能量咖啡請點連結👇",
    joined: "2024 年 11 月加入",
    followers: "34.2K",
    following: "3,104",
    activity: "每日發文約 24 次 · 九成貼文附導購連結",
    post:
      "震驚！榴營、柚營都不敢讓你知道的三個數字。看到第二個我手都在抖，完整解析放留言。",
    time: "下午 1:20",
    likes: 1_107,
    replies: 92,
    reposts: 304,
    comments: [
      { name: "政經顯微鏡", handle: "@truth_scope", body: "完整報告＋限量咖啡組合在這裡：crowds.example/deal", likes: 74 },
      { name: "羅小姐", handle: "@lo_lo", body: "點進去怎麼是購物網站？數字在哪裡？", likes: 129 },
      { name: "幸運生活家", handle: "@lucky_shop168", body: "我喝三天精神真的有差，推薦！", likes: 6 },
    ],
    history: [
      { body: "醫師不會主動告訴你的早餐秘密，今天最後 50 組。", time: "昨天", likes: 890 },
      { body: "房價背後的真相曝光！先加入免費群組。", time: "昨天", likes: 1204 },
      { body: "兩邊都一樣爛，但懂的人已經開始喝這杯。", time: "2 天前", likes: 762 },
    ],
    answer: "marketing",
    reveal: ["情緒標題與內容不相符", "大量貼文導向同一購物頁", "政治話題主要被用來吸引流量"],
  },
  {
    id: 4,
    name: "柚派但怕酸",
    handle: "@grapefruit_not_sour",
    initials: "柚",
    avatar: "avatar-pink",
    camp: "berry",
    campLabel: "柚營支持者",
    bio: "設計系延畢邊緣｜貓叫阿財｜柚派但會自己挑刺",
    joined: "2020 年 2 月加入",
    followers: "846",
    following: "1,102",
    activity: "本週發文 9 次 · 常在通勤與深夜出現",
    post:
      "我支持柚營，但今天那張政策圖到底誰排的？字小到像在考視力，設計系看到先記一支警告。",
    time: "晚上 11:48",
    likes: 684,
    replies: 51,
    reposts: 33,
    comments: [
      { name: "阿哲做字", handle: "@font_jer", body: "那個行距我真的不行。", likes: 93 },
      { name: "柚派但怕酸", handle: "@grapefruit_not_sour", body: "政策可能是好的，但我的眼睛是無辜的。", likes: 210, camp: "berry" },
      { name: "榴槤一枚", handle: "@one_durian", body: "連自己人都看不下去笑死。", likes: 37, camp: "copper" },
    ],
    history: [
      { body: "阿財今天把我的期末模型坐扁，牠現在是共同作者。", time: "昨天", likes: 302 },
      { body: "有人知道公館哪裡還買得到描圖紙嗎，真的急。", time: "4 天前", likes: 17 },
      { body: "葡萄柚黨住房政策方向可以，但青年租屋那段根本沒寫清楚。", time: "6 天前", likes: 94 },
    ],
    answer: "human",
    reveal: ["發文內容跨越政治、學業與生活", "支持立場並非毫無保留", "與朋友的互動具有連續脈絡"],
  },
  {
    id: 5,
    name: "榴聲直送",
    handle: "@durian_now_41",
    initials: "銅",
    avatar: "avatar-copper-dark",
    camp: "copper",
    campLabel: "榴營支持者",
    bio: "正義不會沉默。追蹤我，讓被消音的聲音傳出去。",
    joined: "2026 年 7 月加入",
    followers: "12.8K",
    following: "41",
    activity: "近 30 日發文 1,906 次 · 每日凌晨固定停更 4 小時",
    post:
      "酸柚別再裝睡！最新民調證明九成青年都支持榴槤黨，主流媒體卻集體噤聲。轉起來，別讓真相消失！",
    time: "下午 4:41",
    likes: 6_201,
    replies: 302,
    reposts: 4_188,
    comments: [
      { name: "榴聲高雄", handle: "@durian_now_43", body: "主流媒體集體噤聲，別讓真相消失！", likes: 1202, camp: "copper" },
      { name: "榴聲桃園", handle: "@durian_now_44", body: "酸柚別再裝睡！九成青年都支持榴槤黨！", likes: 987, camp: "copper" },
      { name: "資料慢慢看", handle: "@read_data", body: "請問民調是哪一家做的？樣本數呢？", likes: 36 },
    ],
    history: [
      { body: "九成店家都受不了柚營！媒體不敢報！", time: "下午 4:36", likes: 5103 },
      { body: "九成家長已經做出選擇！再不轉就來不及！", time: "下午 4:31", likes: 4741 },
      { body: "九成上班族都怒了！主流媒體繼續裝睡！", time: "下午 4:26", likes: 4908 },
    ],
    answer: "coordinated",
    reveal: ["帳號群採用連號名稱與相同頭像格式", "高頻率、固定模板與整齊作息", "引用無法查證且不斷變換對象的九成民調"],
  },
  {
    id: 6,
    name: "小葵不能輸",
    handle: "@aoi_forever",
    initials: "葵",
    avatar: "avatar-violet",
    camp: "none",
    campLabel: "偶像應援帳號",
    bio: "小葵出道 8 年老粉｜演唱會心得很多｜雷隊友更多",
    joined: "2018 年 9 月加入",
    followers: "2,310",
    following: "884",
    activity: "本月發文 74 次 · 活動日前後明顯增加",
    post: "說小葵現場不穩的人耳朵是拿來掛口罩的嗎？昨天那顆高音明明漂亮到我旁邊大哥直接升天。",
    time: "凌晨 12:26",
    likes: 1_486,
    replies: 119,
    reposts: 206,
    comments: [
      { name: "今天也葵", handle: "@aoi_today", body: "大哥只是站太久腳麻啦，但高音真的穩。", likes: 284 },
      { name: "路過聽團仔", handle: "@livehouse_cat", body: "我在二樓，副歌第一句確實飄了一點。", likes: 61 },
      { name: "小葵不能輸", handle: "@aoi_forever", body: "好啦第一句有一咪咪，我現在心情平復了。", likes: 390 },
    ],
    history: [
      { body: "搶到高雄場第二排，我的人生今天正式有用了。", time: "4 天前", likes: 922 },
      { body: "求救，台中高鐵附近哪裡能補妝？我粉餅碎成考古遺址。", time: "2 週前", likes: 76 },
      { body: "上次簽名會控場很亂，官方真的要改善。", time: "1 個月前", likes: 318 },
    ],
    answer: "human",
    reveal: ["多年且可追溯的追星與生活紀錄", "情緒激烈後仍能修正說法", "發文高峰和真實活動日期相符"],
  },
  {
    id: 7,
    name: "熱搜雷達台",
    handle: "@hot_scope_now",
    initials: "熱",
    avatar: "avatar-sunset",
    camp: "none",
    campLabel: "娛樂話題帳號",
    bio: "全網最快娛樂消息｜合作請私訊｜完整影片都在首頁",
    joined: "2023 年 5 月加入",
    followers: "112K",
    following: "27",
    activity: "每日發文 35–60 次 · 標題常在一小時內改寫",
    post: "千萬網紅米粒深夜取消追蹤經紀人！兩人疑似正式決裂，背後原因讓粉絲全看傻。",
    time: "上午 10:02",
    likes: 8_804,
    replies: 411,
    reposts: 1_903,
    comments: [
      { name: "慢慢吃瓜", handle: "@melon_slow", body: "她昨天直播不是說系統自己退追嗎？", likes: 933 },
      { name: "熱搜雷達台", handle: "@hot_scope_now", body: "完整版解析已上架，點首頁看 12 分鐘真相。", likes: 204 },
      { name: "不是米粉", handle: "@not_ricefan", body: "影片前十分钟都在介紹你們的面膜。", likes: 705 },
    ],
    history: [
      { body: "米粒與經紀人感情其實超好？一個畫面揭密！", time: "1 小時前", likes: 4220 },
      { body: "米粒團隊爆內鬨？知情人士只說了四個字。", time: "2 小時前", likes: 6104 },
      { body: "看娛樂新聞也能養出水煮蛋肌，今日面膜買二送一。", time: "昨天", likes: 889 },
    ],
    answer: "marketing",
    reveal: ["同一事件被反覆改寫成互相矛盾的標題", "所謂完整消息導向置入影片", "娛樂爭議主要被用作導購入口"],
  },
  {
    id: 8,
    name: "圈內人不睡",
    handle: "@inside_tea_08",
    initials: "內",
    avatar: "avatar-ink",
    camp: "none",
    campLabel: "匿名爆料帳號",
    bio: "業內八年。不能說名字，但懂的都懂。",
    joined: "2026 年 8 月加入",
    followers: "19.4K",
    following: "8",
    activity: "建立 11 天 · 與 14 個爆料帳號同步發文",
    post: "那位總說自己不接業配的清純系網紅，今晚八點會翻車。先截圖，晚點別說我沒提醒。",
    time: "下午 7:31",
    likes: 5_202,
    replies: 263,
    reposts: 2_218,
    comments: [
      { name: "圈內人早起", handle: "@inside_tea_09", body: "八點準時，證據已備份。", likes: 1008 },
      { name: "圈內人吃飯", handle: "@inside_tea_10", body: "先截圖，晚點別說沒提醒。", likes: 872 },
      { name: "查證一下", handle: "@verify_first", body: "你們帳號都同一天建立，頭像也只有編號不同。", likes: 44 },
    ],
    history: [
      { body: "今晚八點，某位百萬創作者準備道歉。", time: "下午 7:30", likes: 3901 },
      { body: "證據不是沒有，只是時候未到。", time: "下午 7:29", likes: 2776 },
      { body: "清純人設要塌了。轉發留存。", time: "下午 7:28", likes: 4130 },
    ],
    answer: "coordinated",
    reveal: ["多個連號帳號在同分鐘預告同一事件", "模糊指控沒有可核對資訊", "帳號群的建立日期、格式與節奏高度一致"],
  },
  {
    id: 9,
    name: "老闆我真的吃不下",
    handle: "@full_tainan",
    initials: "飽",
    avatar: "avatar-ocean",
    camp: "none",
    campLabel: "台南吃貨",
    bio: "不是美食家，只是一個胃容量常被高估的台南人。",
    joined: "2019 年 3 月加入",
    followers: "612",
    following: "530",
    activity: "每週 2–5 篇 · 多在午晚餐時段",
    post: "拜託不要再說這家是隱藏版，排 70 分鐘進去吃一碗普通到會被記憶自動刪除的麵，我真的會生氣。",
    time: "下午 2:17",
    likes: 909,
    replies: 83,
    reposts: 49,
    comments: [
      { name: "阿芬", handle: "@fenfen_eat", body: "你上次不是說湯頭不錯？", likes: 18 },
      { name: "老闆我真的吃不下", handle: "@full_tainan", body: "湯可以，麵不行，而且今天等到靈魂出竅。", likes: 122 },
      { name: "隔壁桌", handle: "@next_table", body: "今天店員少兩個，老闆有先公告啦。", likes: 66 },
    ],
    history: [
      { body: "媽媽煮的滷肉，外面店家請先不要挑戰。", time: "3 天前", likes: 71 },
      { body: "同一家二訪，湯依然很香，但麵真的不是我的菜。", time: "2 週前", likes: 49 },
      { body: "今天跑完 5K，合理兌換兩顆肉圓。", time: "1 個月前", likes: 103 },
    ],
    answer: "human",
    reveal: ["評論包含前後一致又有保留的個人經驗", "會回應其他顧客補充的現場資訊", "帳號有長期生活、運動與飲食脈絡"],
  },
  {
    id: 10,
    name: "逆齡晴姐",
    handle: "@sunny_ageback",
    initials: "晴",
    avatar: "avatar-gold",
    camp: "none",
    campLabel: "健康生活創作者",
    bio: "52 歲活成 35 歲｜免費體質檢測｜加入晴姐的健康家族",
    joined: "2022 年 1 月加入",
    followers: "68.1K",
    following: "5,881",
    activity: "每日 12 篇 · 每篇留言區皆有相同購買連結",
    post: "我停掉早餐後，身體竟然年輕了整整 17 歲！不是節食，是大多數人都不知道的細胞開關。",
    time: "上午 6:30",
    likes: 3_709,
    replies: 248,
    reposts: 1_122,
    comments: [
      { name: "逆齡晴姐", handle: "@sunny_ageback", body: "留言『年輕』，助教傳你體質表和專屬優惠。", likes: 310 },
      { name: "小玉", handle: "@jade_55", body: "所以到底是什麼細胞開關？有研究來源嗎？", likes: 192 },
      { name: "健康家族 17", handle: "@sunny_family17", body: "跟著晴姐三週，褲子真的鬆了！", likes: 12 },
    ],
    history: [
      { body: "喝水時間錯了，比不喝更可怕。答案放社群。", time: "昨天", likes: 2804 },
      { body: "醫院不會教你的深層排空法，今晚直播公開。", time: "2 天前", likes: 3991 },
      { body: "健康家族本月最後 20 席，不收入會費，只需購買啟動組。", time: "3 天前", likes: 711 },
    ],
    answer: "marketing",
    reveal: ["誇大且無來源的健康效果", "互動最終都導向同一套產品與社群", "見證帳號採用制式名稱且活動單一"],
  },
  {
    id: 11,
    name: "租屋受害日記",
    handle: "@rent_hurt_201",
    initials: "租",
    avatar: "avatar-lime",
    camp: "none",
    campLabel: "居住議題帳號",
    bio: "替每個被房東欺負的人說話｜匿名投稿開放",
    joined: "2026 年 6 月加入",
    followers: "25.7K",
    following: "201",
    activity: "每日固定 09:00、12:00、18:00、21:00 發文",
    post: "某連鎖租屋平台又刪負評！請大家統一留言『拒絕黑箱』，今晚九點一起灌爆評分。",
    time: "晚上 8:57",
    likes: 3_408,
    replies: 522,
    reposts: 2_017,
    comments: [
      { name: "租屋受害日記 202", handle: "@rent_hurt_202", body: "收到，九點統一留言『拒絕黑箱』。", likes: 744 },
      { name: "租屋受害日記 203", handle: "@rent_hurt_203", body: "評分一星，文字不要自行更改。", likes: 698 },
      { name: "租客小林", handle: "@lin_rents", body: "請問被刪的是哪則？截圖看起來是另一個平台。", likes: 57 },
    ],
    history: [
      { body: "今晚九點任務：一星＋拒絕黑箱。", time: "下午 6:00", likes: 2401 },
      { body: "中午任務完成率 72%，還沒留言的請補上。", time: "下午 12:00", likes: 1802 },
      { body: "今日素材包已更新，下載後依序發布。", time: "上午 9:00", likes: 1109 },
    ],
    answer: "coordinated",
    reveal: ["明確指揮大量帳號在固定時間採取相同行動", "連號帳號複製任務文字", "被指控事件的截圖與對象對不上"],
  },
  {
    id: 12,
    name: "十三局下半",
    handle: "@inning_13",
    initials: "球",
    avatar: "avatar-ocean",
    camp: "none",
    campLabel: "棒球迷",
    bio: "爪迷二十年｜輸球會氣，隔天還是進場｜帶兒子坐外野",
    joined: "2016 年 4 月加入",
    followers: "1,903",
    following: "744",
    activity: "球季每週 20–40 篇 · 冬季大幅下降",
    post: "八局一出局還點短打，教練是不是把勝率塞進便當盒一起吃掉了？我真的看到血壓跟比分一起飛。",
    time: "晚上 10:41",
    likes: 2_008,
    replies: 167,
    reposts: 118,
    comments: [
      { name: "外野烤香腸", handle: "@leftfield_bbq", body: "當下跑者腳傷，轉播後來有說。", likes: 233 },
      { name: "十三局下半", handle: "@inning_13", body: "剛看到，收回一半怒氣，剩下那半是前兩局留下的。", likes: 501 },
      { name: "數據派小凱", handle: "@war_is_fun", body: "其實那個情境短打期望值只差一點點。", likes: 87 },
    ],
    history: [
      { body: "兒子第一次接到界外球，我本人叫得比全壘打大聲。", time: "上週", likes: 881 },
      { body: "輸歸輸，新人今天那球守得漂亮。", time: "2 週前", likes: 340 },
      { body: "休賽季開始，這個帳號暫時轉型曬便當。", time: "去年 11 月", likes: 221 },
    ],
    answer: "human",
    reveal: ["活躍頻率會隨球季自然變化", "得知新資訊後願意部分修正", "長期紀錄包含觀賽、家庭與休賽季生活"],
  },
  {
    id: 13,
    name: "幣圈導航犬",
    handle: "@coin_dog_888",
    initials: "幣",
    avatar: "avatar-ink",
    camp: "none",
    campLabel: "投資資訊帳號",
    bio: "不是投資建議｜跟單連結享終身手續費折扣｜每日財富密碼",
    joined: "2025 年 10 月加入",
    followers: "77.3K",
    following: "83",
    activity: "行情劇烈時每小時 10–20 篇 · 舊預測經常刪除",
    post: "最後提醒：神秘巨鯨已進場，這枚小幣今晚不漲十倍我直播吃鍵盤。錯過的人明天只能拍大腿。",
    time: "晚上 9:12",
    likes: 4_209,
    replies: 369,
    reposts: 1_886,
    comments: [
      { name: "幣圈導航犬", handle: "@coin_dog_888", body: "交易所註冊碼放首頁，進群看進出場點位。", likes: 201 },
      { name: "被套阿明", handle: "@ming_hodl", body: "你上週那枚跌 70% 的貼文怎麼不見了？", likes: 612 },
      { name: "財富自由 12", handle: "@free_money12", body: "老師帶單真的準，我已經回本！", likes: 19 },
    ],
    history: [
      { body: "精準命中！早上有跟的都懂。", time: "下午 4:30", likes: 5100 },
      { body: "市場恐慌就是機會，開戶連結限時加碼。", time: "上午 11:18", likes: 2903 },
      { body: "免費群今晚關門，下一次開放等牛市。", time: "昨天", likes: 1822 },
    ],
    answer: "marketing",
    reveal: ["靠誇張預測製造錯失恐懼", "透過註冊碼與跟單取得商業利益", "刪除失敗預測、只保留命中紀錄"],
  },
  {
    id: 14,
    name: "開箱公道伯",
    handle: "@fair_review_51",
    initials: "評",
    avatar: "avatar-sunset",
    camp: "none",
    campLabel: "3C 評測帳號",
    bio: "拒絕業配，只講缺點。投稿信箱開放。",
    joined: "2026 年 7 月加入",
    followers: "14.6K",
    following: "51",
    activity: "與 9 個評測帳號在新品發布後 3 分鐘內同步更新",
    post: "新出的 BreezePhone 根本電子垃圾，鏡頭一開就過熱。買的人不是盤，是整座遊樂園。",
    time: "下午 2:03",
    likes: 6_880,
    replies: 418,
    reposts: 3_011,
    comments: [
      { name: "開箱公道嬸", handle: "@fair_review_52", body: "實測結論一致：電子垃圾。", likes: 1002 },
      { name: "開箱公道弟", handle: "@fair_review_53", body: "鏡頭一開就過熱，千萬別買。", likes: 891 },
      { name: "小鄭修手機", handle: "@cheng_fix", body: "你照片裡是去年的舊機，鏡頭排列不一樣。", likes: 377 },
    ],
    history: [
      { body: "BreezePhone 災情素材下載：統一使用第二張。", time: "下午 2:02", likes: 2080 },
      { body: "新品上市就是割韭菜，準備轉發。", time: "下午 2:01", likes: 1773 },
      { body: "競品 CoolPhone 本週特價，懂選擇的人都換了。", time: "昨天", likes: 3402 },
    ],
    answer: "coordinated",
    reveal: ["多帳號同步使用相同結論與照片", "示意照片其實是不同型號", "公開素材包並持續替單一競品宣傳"],
  },
  {
    id: 15,
    name: "兩點還沒睡",
    handle: "@mom_awake_2am",
    initials: "媽",
    avatar: "avatar-pink",
    camp: "none",
    campLabel: "育兒日常",
    bio: "一個四歲、一個八個月｜不接團購｜情緒穩定是都市傳說",
    joined: "2020 年 8 月加入",
    followers: "3,402",
    following: "1,933",
    activity: "每天 1–6 篇 · 夜間發文多但時間不固定",
    post: "再有人跟我說『寶寶睡了妳就跟著睡』，我就邀請他來洗奶瓶、曬衣服、找消失的奶嘴。講得像睡眠是蝦皮隔日到貨。",
    time: "凌晨 2:11",
    likes: 5_881,
    replies: 306,
    reposts: 709,
    comments: [
      { name: "爸爸也醒著", handle: "@dad_no_sleep", body: "奶嘴在妳左邊口袋，我剛剛看到。", likes: 1204 },
      { name: "兩點還沒睡", handle: "@mom_awake_2am", body: "找到。撤回對全世界 3% 的敵意。", likes: 1803 },
      { name: "新手阿姨", handle: "@auntie_asks", body: "原來這句真的不能講，筆記。", likes: 488 },
    ],
    history: [
      { body: "哥哥今天第一次幫妹妹蓋被子，和平維持了 14 秒。", time: "昨天", likes: 2100 },
      { body: "兒科回診完成，身高曲線有追上來，鬆一口氣。", time: "上週", likes: 811 },
      { body: "這款奶瓶我家會漏，不代表你家也會，附上我用的尺寸。", time: "2 週前", likes: 507 },
    ],
    answer: "human",
    reveal: ["深夜發文能對應具體且連續的家庭生活", "親友留言可以自然補充當下情境", "分享產品經驗時主動說明限制而非導購"],
  },
  {
    id: 16,
    name: "旅行偷偷省",
    handle: "@trip_secret_save",
    initials: "旅",
    avatar: "avatar-lime",
    camp: "none",
    campLabel: "旅遊攻略帳號",
    bio: "一天只花 500 玩遍世界｜訂房、網卡、行李箱折扣都在連結樹",
    joined: "2023 年 2 月加入",
    followers: "91.5K",
    following: "104",
    activity: "每日 8–15 篇 · 舊旅遊照會搭配不同城市重複使用",
    post: "去大阪還住飯店就虧大了！這間藏在車站 3 分鐘的夢幻民宿，一晚只要 399，窗外還直接看到雪山。",
    time: "下午 5:24",
    likes: 7_901,
    replies: 501,
    reposts: 2_330,
    comments: [
      { name: "地圖是朋友", handle: "@map_friend", body: "大阪市區哪裡看得到這座雪山？照片像是瑞士。", likes: 1902 },
      { name: "旅行偷偷省", handle: "@trip_secret_save", body: "示意圖而已，實際房型請從首頁專屬連結確認。", likes: 97 },
      { name: "省錢小隊 06", handle: "@save_trip06", body: "用版主連結訂最便宜！", likes: 22 },
    ],
    history: [
      { body: "東京 399 住宿被搶光？這裡還有最後三間。", time: "昨天", likes: 6808 },
      { body: "首爾人私藏的海景列車，照片太美不敢相信。", time: "2 天前", likes: 7201 },
      { body: "出國沒有這張卡等於每天多花一杯咖啡。", time: "3 天前", likes: 3440 },
    ],
    answer: "marketing",
    reveal: ["用錯置或未標示的照片吸引點擊", "價格與內容必須經過分潤連結才能查看", "稀缺話術和重複素材是主要發文模式"],
  },
  {
    id: 17,
    name: "即時路況最前線",
    handle: "@road_live_301",
    initials: "路",
    avatar: "avatar-ocean",
    camp: "none",
    campLabel: "即時資訊帳號",
    bio: "全台突發大小事｜比新聞更快｜請大家幫忙轉傳",
    joined: "2026 年 8 月加入",
    followers: "31.2K",
    following: "301",
    activity: "15 個同名帳號輪流發布 · 每分鐘最多 24 篇",
    post: "快訊！北部大停電，聽說今晚十點後全面斷網。請先把這則消息傳給所有家人，避免失聯！",
    time: "晚上 8:19",
    likes: 9_010,
    replies: 833,
    reposts: 7_622,
    comments: [
      { name: "即時路況 302", handle: "@road_live_302", body: "已證實，今晚十點後全面斷網，快轉家人。", likes: 1800 },
      { name: "台電客服資訊", handle: "@power_info", body: "公告僅有單一街區施工，沒有全區停電或斷網通知。", likes: 2410 },
      { name: "即時路況 305", handle: "@road_live_305", body: "官方通常最後才承認，先轉再說。", likes: 804 },
    ],
    history: [
      { body: "素材更新：把『局部施工』改成『北部大停電』。", time: "晚上 8:18", likes: 311 },
      { body: "所有分站 8:20 前完成發布。", time: "晚上 8:17", likes: 206 },
      { body: "舊淹水影片可繼續使用，不要露出日期。", time: "昨晚", likes: 519 },
    ],
    answer: "coordinated",
    reveal: ["帳號群有明確排程與素材修改指令", "把局部施工誇大為跨區災情", "面對正式澄清仍要求先轉傳再查證"],
  },
  {
    id: 18,
    name: "社畜今天也活著",
    handle: "@office_survivor",
    initials: "班",
    avatar: "avatar-violet",
    camp: "none",
    campLabel: "上班族日常",
    bio: "行銷企劃第五年｜會議過敏｜假日學陶藝",
    joined: "2017 年 11 月加入",
    followers: "788",
    following: "901",
    activity: "平日午休與下班後較活躍 · 假日內容轉為興趣",
    post: "面試說公司像一個家，進去才發現是那種過年會逼問薪水、還叫你幫忙洗碗的家。看到這句真的快逃。",
    time: "下午 12:36",
    likes: 4_331,
    replies: 287,
    reposts: 902,
    comments: [
      { name: "前同事小美", handle: "@mei_escape", body: "你去年還真的留下來洗尾牙的碗。", likes: 603 },
      { name: "社畜今天也活著", handle: "@office_survivor", body: "不要公開我人生最軟弱的一晚。", likes: 1001 },
      { name: "人資不是人", handle: "@hr_question", body: "也有真心照顧人的小公司啦，但面試可以多問加班制度。", likes: 390 },
    ],
    history: [
      { body: "第一次拉坏成功，老師說它是杯子，我願意相信老師。", time: "週日", likes: 212 },
      { body: "專案上線，雖然被改 37 版但成品比想像中好。", time: "上週", likes: 146 },
      { body: "新同事問得很細不是雷，是人家真的想把事情做好。", time: "2 週前", likes: 93 },
    ],
    answer: "human",
    reveal: ["抱怨能連回具體工作與朋友互動", "假日活動和日常節奏自然", "並非對所有公司或同事一概否定"],
  },
  {
    id: 19,
    name: "阿毛選物所",
    handle: "@mao_picks",
    initials: "毛",
    avatar: "avatar-pink",
    camp: "none",
    campLabel: "寵物商店帳號",
    bio: "店貓阿毛監製｜每篇商品文都會標示廣告｜台中可面交",
    joined: "2021 年 7 月加入",
    followers: "11.8K",
    following: "403",
    activity: "每週 4–7 篇 · 約半數為商品或店務內容",
    post: "阿毛試躺新睡墊三分鐘後直接翻肚，身為老闆我宣布測試通過；身為飼主我宣布牠對紙箱也是這個反應。#廣告",
    time: "下午 3:09",
    likes: 1_704,
    replies: 92,
    reposts: 117,
    comments: [
      { name: "橘貓協會", handle: "@orange_union", body: "請問可以拆洗嗎？我家那位會吐。", likes: 29 },
      { name: "阿毛選物所", handle: "@mao_picks", body: "外套可拆，內墊只能手洗，我拍細節給你，不急著買。", likes: 103 },
      { name: "阿毛本人", handle: "@mao_the_cat", body: "喵。", likes: 488 },
    ],
    history: [
      { body: "本週六店休，帶阿毛回診，急單請不要下。", time: "昨天", likes: 611 },
      { body: "睡墊合作測試中，優缺點整理好才上架。#廣告", time: "上週", likes: 337 },
      { body: "紙箱到貨，產品暫時失寵。", time: "2 週前", likes: 1200 },
    ],
    answer: "marketing",
    reveal: ["帳號目的確實包含販售商品", "商業內容有清楚標示且能回答限制", "行銷帳號不一定造假或惡意"],
  },
  {
    id: 20,
    name: "全網都在看",
    handle: "@everyone_watch_61",
    initials: "看",
    avatar: "avatar-ink",
    camp: "none",
    campLabel: "網紅評論帳號",
    bio: "記錄網路不想讓你忘記的事｜拒絕洗白",
    joined: "2026 年 8 月加入",
    followers: "22.2K",
    following: "61",
    activity: "與 18 個帳號共享貼文句型 · 每輪留言間隔 20 秒",
    post: "美妝網紅蘇打姐道歉只是演戲。全網都看出來了，品牌現在不解約就是支持欺騙。留言區刷『拒絕洗白』。",
    time: "晚上 9:41",
    likes: 7_731,
    replies: 1_204,
    reposts: 4_006,
    comments: [
      { name: "全網都懂", handle: "@everyone_watch_62", body: "拒絕洗白。品牌不解約就是支持欺騙。", likes: 1402 },
      { name: "全網清醒", handle: "@everyone_watch_63", body: "拒絕洗白。已到品牌頁面留言。", likes: 1250 },
      { name: "把影片看完", handle: "@watch_context", body: "她道歉的是標示疏漏，你們貼的卻是另一件事。", likes: 166 },
    ],
    history: [
      { body: "第二輪開始，統一到三個合作品牌留言。", time: "晚上 9:40", likes: 1002 },
      { body: "第一輪文案：品牌不解約就是支持欺騙。", time: "晚上 9:39", likes: 903 },
      { body: "蘇打姐舊影片切片包已上傳，優先使用 06 號。", time: "晚上 9:38", likes: 744 },
    ],
    answer: "coordinated",
    reveal: ["帳號群分輪次前往品牌頁面施壓", "留言文案逐字一致且由上游提供", "剪輯素材把不同事件混成同一指控"],
  },
];

const accounts: Account[] = [...starterAccounts, ...(extraAccounts as Account[])];

const ROUND_SIZES = [10, 15, 20] as const;
const DEFAULT_ROUND_SIZE = ROUND_SIZES[0];

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildDeck(roundSize: number) {
  const verdicts = shuffled<Verdict>(["human", "coordinated", "marketing"]);
  const baseCount = Math.floor(roundSize / verdicts.length);
  const remainder = roundSize % verdicts.length;
  const selected = verdicts.flatMap((verdict, index) => {
    const count = baseCount + (index < remainder ? 1 : 0);
    return shuffled(accounts.filter((account) => account.answer === verdict)).slice(0, count);
  });
  return shuffled(selected)
    .slice(0, roundSize)
    .map((account) => {
      const optionalComments = shuffled(account.comments.slice(1));
      const optionalCount = Math.random() < 0.5 ? 1 : 2;
      return {
        ...account,
        comments: [account.comments[0], ...optionalComments.slice(0, optionalCount)],
      };
    });
}

const verdictLabels: Record<Verdict, string> = {
  human: "一般使用者",
  coordinated: "疑似協同行動",
  marketing: "行銷／內容農場",
};

function compactNumber(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K` : String(value);
}

function CampBadge({ camp, label }: { camp: Camp; label: string }) {
  return <span className={`camp-badge camp-${camp}`}>{label}</span>;
}

function Avatar({ account, small = false }: { account: Account; small?: boolean }) {
  return <span className={`avatar ${account.avatar} ${small ? "avatar-small" : ""}`}>{account.initials}</span>;
}

function MiniAvatar({ comment }: { comment: Comment }) {
  return <span className={`mini-avatar camp-${comment.camp ?? "none"}`}>{comment.name.slice(0, 1)}</span>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [roundSize, setRoundSize] = useState<number>(DEFAULT_ROUND_SIZE);
  const [deck, setDeck] = useState<Account[]>(accounts.slice(0, DEFAULT_ROUND_SIZE));
  const [round, setRound] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [results, setResults] = useState<{ account: Account; choice: Verdict; correct: boolean }[]>([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const startPoint = useRef({ x: 0, y: 0 });
  const account = deck[round];
  const finished = started && round >= deck.length;

  const score = useMemo(() => results.filter((result) => result.correct).length, [results]);

  function resetPanels() {
    setCommentsOpen(false);
    setProfileOpen(false);
    setDrag({ x: 0, y: 0, active: false });
  }

  function choose(choice: Verdict) {
    if (!account) return;
    setResults((current) => [...current, { account, choice, correct: choice === account.answer }]);
    setRound((current) => current + 1);
    resetPanels();
  }

  function pointerDown(event: React.PointerEvent<HTMLElement>) {
    startPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ x: 0, y: 0, active: true });
  }

  function pointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!drag.active) return;
    setDrag({ x: event.clientX - startPoint.current.x, y: event.clientY - startPoint.current.y, active: true });
  }

  function pointerUp() {
    if (!drag.active) return;
    if (drag.y > 115 && Math.abs(drag.y) > Math.abs(drag.x)) choose("marketing");
    else if (drag.x < -95) choose("coordinated");
    else if (drag.x > 95) choose("human");
    else setDrag({ x: 0, y: 0, active: false });
  }

  function prepareGame() {
    setDeck(buildDeck(roundSize));
    setRound(0);
    setResults([]);
    setStarted(true);
    setHelpOpen(false);
    resetPanels();
  }

  function startGame() {
    prepareGame();
    setIntroOpen(true);
  }

  function restart() {
    prepareGame();
    setIntroOpen(false);
  }

  function goHome() {
    setStarted(false);
    setRound(0);
    setResults([]);
    setHelpOpen(false);
    setIntroOpen(false);
    resetPanels();
  }

  if (!started) {
    return (
      <main className="landing-shell">
        <section className="landing-card">
          <div className="brand brand-large"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></div>
          <p className="eyebrow">一場社群觀察遊戲</p>
          <h1>你看見的是一個人，<br />還是一套劇本？</h1>
          <p className="landing-copy">查看貼文、留言與個人主頁，在有限線索中判斷帳號。立場激烈不等於造假，粉絲很多也不等於可信。</p>
          <p className="deck-note"><strong>50</strong> 個虛構帳號題庫 · 每局隨機抽題</p>
          <fieldset className="round-picker">
            <legend>這一局想玩幾題？</legend>
            <div>
              {ROUND_SIZES.map((size) => (
                <button
                  type="button"
                  className={roundSize === size ? "is-selected" : ""}
                  aria-pressed={roundSize === size}
                  onClick={() => setRoundSize(size)}
                  key={size}
                >
                  <strong>{size}</strong><span>題</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="camp-intro">
            <div><span className="camp-swatch copper-swatch" /><strong>榴槤黨</strong><small>泛稱：榴營、榴派、榴友</small></div>
            <div><span className="camp-swatch berry-swatch" /><strong>葡萄柚黨</strong><small>泛稱：柚營、柚派、柚友</small></div>
          </div>
          <button className="primary-button" onClick={startGame}>開始調查 <span>→</span></button>
          <p className="fiction-note">所有人物、政黨、貼文與數據皆為虛構。</p>
        </section>
      </main>
    );
  }

  if (introOpen) {
    return (
      <main className="briefing-shell">
        <section className="briefing-card">
          <button className="brand home-brand" onClick={goHome} aria-label="回到 Crowds 首頁"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></button>
          <p className="eyebrow">開始調查之前</p>
          <h1>這個帳號，<br />最接近哪一種？</h1>
          <p className="briefing-copy">本局共有 <strong>{deck.length} 題</strong>。請根據文章內容與帳號線索，判斷這則貼文的帳號最可能屬於以下哪一種類型。</p>
          <div className="briefing-verdicts">
            <div className="briefing-verdict briefing-coordinated"><span>←</span><p><strong>疑似協同行動</strong><small>多個帳號有計畫地共同操作</small></p></div>
            <div className="briefing-verdict briefing-marketing"><span>↓</span><p><strong>行銷／內容農場</strong><small>以導購、流量或名單蒐集為優先</small></p></div>
            <div className="briefing-verdict briefing-human"><span>→</span><p><strong>一般使用者</strong><small>具有連續而自然的生活脈絡</small></p></div>
          </div>
          <p className="comment-reminder"><strong>留言也可以看看。</strong>點擊愛心或留言數，就能查看互動內容；點頭像則能進入個人主頁。</p>
          <button className="primary-button" onClick={() => setIntroOpen(false)}>開始第一題 <span>→</span></button>
          <p className="fiction-note">所有人物、帳號、政黨、貼文、留言與數據皆為虛構。</p>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="results-shell">
        <section className="results-card">
          <button className="brand home-brand" onClick={goHome} aria-label="回到 Crowds 首頁"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></button>
          <p className="eyebrow">調查結束</p>
          <div className="score-ring"><strong>{score}</strong><span>／{deck.length}</span></div>
          <h1>{score === deck.length ? "細節全被你看見了。" : "答案，藏在行為的組合裡。"}</h1>
          <p className="results-lede">仔細找找，答案或許就在細節裡面。</p>
          <div className="result-list">
            {results.map((result) => (
              <details className={result.correct ? "result-correct" : "result-wrong"} key={result.account.id}>
                <summary>
                  <Avatar account={result.account} small />
                  <span><strong>{result.account.name}</strong><small>你選：{verdictLabels[result.choice]}</small></span>
                  <b>{result.correct ? "✓" : "×"}</b>
                </summary>
                <div className="reveal-panel">
                  <p>答案：<strong>{verdictLabels[result.account.answer]}</strong></p>
                  <ul>{result.account.reveal.map((clue) => <li key={clue}>{clue}</li>)}</ul>
                </div>
              </details>
            ))}
          </div>
          <button className="primary-button" onClick={restart}>再玩一次 <span>↻</span></button>
        </section>
      </main>
    );
  }

  const rotation = Math.max(-5, Math.min(5, drag.x / 30));
  const cardStyle = { transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)` };
  const leftStrength = Math.min(1, Math.max(0, -drag.x / 95));
  const rightStrength = Math.min(1, Math.max(0, drag.x / 95));
  const downStrength = Math.min(1, Math.max(0, drag.y / 115));

  return (
    <main className="game-shell">
      <header className="topbar">
        <button className="brand home-brand" onClick={goHome} aria-label="回到 Crowds 首頁"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></button>
        <div className="progress-wrap">
          <span>{round + 1} / {deck.length}</span>
          <div className="progress"><i style={{ width: `${((round + 1) / deck.length) * 100}%` }} /></div>
        </div>
        <div className={`help-wrap ${helpOpen ? "is-open" : ""}`}>
          <button
            className="help-button"
            aria-label="查看解題方式"
            aria-expanded={helpOpen}
            aria-controls="solve-help"
            onClick={() => setHelpOpen((open) => !open)}
          >?</button>
          <div className="help-popover" id="solve-help" role="tooltip">
            <strong>怎麼判斷？</strong>
            <p>先看貼文，再點頭像檢查加入時間、發文節奏與歷史。</p>
            <ul>
              <li>不要只看語氣或立場</li>
              <li>比對留言是否像真人互動</li>
              <li>找多個線索形成的模式</li>
            </ul>
            <small>左：疑似協同 · 下：行銷 · 右：一般使用者</small>
          </div>
        </div>
      </header>

      <section className="play-area">
        <div className="swipe-hint swipe-left" style={{ opacity: leftStrength }}>疑似協同</div>
        <div className="swipe-hint swipe-right" style={{ opacity: rightStrength }}>一般使用者</div>
        <div className="swipe-hint swipe-down" style={{ opacity: downStrength }}>行銷帳號</div>

        <article
          className={`post-card ${drag.active ? "dragging" : ""}`}
          style={cardStyle}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") choose("coordinated");
            if (event.key === "ArrowRight") choose("human");
            if (event.key === "ArrowDown") choose("marketing");
          }}
        >
          <div className="post-topline">
            <button className="account-link" onPointerDown={(event) => event.stopPropagation()} onClick={() => setProfileOpen(true)}>
              <Avatar account={account} />
              <span className="account-title"><strong>{account.name}</strong><small>{account.handle} · {account.time}</small></span>
            </button>
            <CampBadge camp={account.camp} label={account.campLabel} />
          </div>
          <p className="post-copy">{account.post}</p>
          <div className="post-actions">
            <button onPointerDown={(event) => event.stopPropagation()} onClick={() => setCommentsOpen((open) => !open)}><span>♡</span>{compactNumber(account.likes)}</button>
            <button onPointerDown={(event) => event.stopPropagation()} onClick={() => setCommentsOpen((open) => !open)}><span>◯</span>{account.replies}</button>
            <span><b>↻</b>{compactNumber(account.reposts)}</span>
          </div>
          {commentsOpen && (
            <div className="comments" onPointerDown={(event) => event.stopPropagation()}>
              {account.comments.map((comment) => (
                <div className="comment" key={`${comment.handle}-${comment.body}`}>
                  <MiniAvatar comment={comment} />
                  <div><strong>{comment.name} <small>{comment.handle}</small></strong><p>{comment.body}</p><span>♡ {comment.likes}</span></div>
                </div>
              ))}
            </div>
          )}
          <p className="drag-instruction">拖曳卡片做出判斷</p>
        </article>
      </section>

      <nav className="verdict-bar" aria-label="帳號分類">
        <button className="verdict coordinated" onClick={() => choose("coordinated")}><span>←</span><b>疑似協同</b><small>多帳號共同操作</small></button>
        <button className="verdict marketing" onClick={() => choose("marketing")}><span>↓</span><b>行銷帳號</b><small>流量與導購優先</small></button>
        <button className="verdict human" onClick={() => choose("human")}><span>→</span><b>一般使用者</b><small>像真實生活紀錄</small></button>
      </nav>

      {profileOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${account.name} 的個人主頁`}>
          <section className="profile-sheet">
            <header className="sheet-header">
              <button onClick={() => setProfileOpen(false)} aria-label="回到貼文">←</button>
              <strong>個人主頁</strong>
              <span>•••</span>
            </header>
            <div className="profile-hero">
              <Avatar account={account} />
              <div><h2>{account.name}</h2><p>{account.handle}</p></div>
              <CampBadge camp={account.camp} label={account.campLabel} />
            </div>
            <p className="profile-bio">{account.bio}</p>
            <div className="profile-stats"><span><strong>{account.followers}</strong> 粉絲</span><span><strong>{account.following}</strong> 追蹤中</span></div>
            <div className="account-facts"><span>◷ {account.joined}</span><span>▥ {account.activity}</span></div>
            <div className="profile-tabs"><strong>串文</strong><span>回覆</span></div>
            <div className="profile-feed">
              {account.history.map((post) => (
                <article key={post.body}><Avatar account={account} small /><div><strong>{account.name} <small>· {post.time}</small></strong><p>{post.body}</p><span>♡ {post.likes}</span></div></article>
              ))}
            </div>
            <button className="close-profile" onClick={() => setProfileOpen(false)}>回到這一題</button>
          </section>
        </div>
      )}
    </main>
  );
}
