"use client";

import { useMemo, useRef, useState } from "react";

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

const accounts: Account[] = [
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
    initials: "莓",
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
];

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
  const [round, setRound] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [results, setResults] = useState<{ account: Account; choice: Verdict; correct: boolean }[]>([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const startPoint = useRef({ x: 0, y: 0 });
  const account = accounts[round];
  const finished = started && round >= accounts.length;

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

  function restart() {
    setRound(0);
    setResults([]);
    setStarted(true);
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
          <div className="camp-intro">
            <div><span className="camp-swatch copper-swatch" /><strong>榴槤黨</strong><small>泛稱：榴營、榴派、榴友</small></div>
            <div><span className="camp-swatch berry-swatch" /><strong>葡萄柚黨</strong><small>泛稱：柚營、柚派、柚友</small></div>
          </div>
          <button className="primary-button" onClick={() => setStarted(true)}>開始調查 <span>→</span></button>
          <p className="fiction-note">所有人物、政黨、貼文與數據皆為虛構。</p>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="results-shell">
        <section className="results-card">
          <div className="brand"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></div>
          <p className="eyebrow">調查結束</p>
          <div className="score-ring"><strong>{score}</strong><span>／{accounts.length}</span></div>
          <h1>{score === accounts.length ? "細節全被你看見了。" : "答案，藏在行為的組合裡。"}</h1>
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
        <div className="brand"><span className="brand-mark">C</span>Crowds<span className="brand-dot">●</span></div>
        <div className="progress-wrap">
          <span>{round + 1} / {accounts.length}</span>
          <div className="progress"><i style={{ width: `${((round + 1) / accounts.length) * 100}%` }} /></div>
        </div>
        <button className="help-button" aria-label="查看玩法" title="左滑疑似協同、右滑一般使用者、下滑行銷號">?</button>
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
            <span className="inspect-note">留言也是線索</span>
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
            <div className="profile-tabs"><strong>串文</strong><span>回覆</span><span>媒體</span></div>
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
