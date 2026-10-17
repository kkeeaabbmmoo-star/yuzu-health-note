# walk_events.json（お散歩・ウォーキング情報）

アプリの「🚶 お散歩・ウォーキング情報」ページは起動時にこのファイルを読み込みます。
このJSONを編集して push するだけで内容を更新できます（アプリの再公開は不要。SWはネット優先なので次回起動時に反映）。

```
{
  "updated": "YYYY-MM-DD",          // 画面の「最終更新」に表示
  "items": [ {
    "id": "一意なID",
    "kind": "event|group|info|app", // event=大会・イベント / group=サークル・協会 / info=情報サイト / app=仲間探しアプリ
    "icon": "🍁",                    // 任意
    "title": "名前",
    "badges": ["当日申込可","毎月"],  // 任意。カードの小さいラベル
    "date": "YYYY-MM-DD",            // 任意。開催日（eventは推奨）
    "end": "YYYY-MM-DD",             // 任意。最終日。end(なければdate)を過ぎると「終了」としてグレー表示・下に移動
    "dateText": "表示用の日時",
    "place": "場所", "access": "アクセス", "fee": "参加費", "apply": "申込方法",
    "course": ["コース1行目", "..."],
    "schedule": [ {"date":"YYYY-MM-DD","text":"内容","tentative":true} ], // 任意。例会の予定（過ぎた日は自動で非表示）
    "contact": "問合せ（TEL/メール）",
    "url": "https://...",
    "note": "注意書き"
  } ]
}
```
