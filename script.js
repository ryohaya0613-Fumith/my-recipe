// --- Firebase 設定 ---
const firebaseConfig = {
  apiKey: "AIzaSyDuh-M4-269gVj6NfLDygS3h6FIXB-sXVY",
  authDomain: "recepi-41c15.firebaseapp.com",
  projectId: "recepi-41c15",
  storageBucket: "recepi-41c15.firebasestorage.app",
  messagingSenderId: "505789635256",
  appId: "1:505789635256:web:02298c09f3ce25430df24d"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionRef = db.collection('myRecipes');

// --- 全40レシピの初期データ ---
const initialRecipes = [
    { id: 1, title: "豚バラ白菜の味噌あん", meat: "豚", tier: "1", ingredients: ["豚バラ", "白菜"], seasoningGroups: [], steps: "豚バラを炒める\n白菜を加えて蒸し焼き\n味噌・みりん・酒で調味し軽くとろみ付け。", memo: "" },
    { id: 2, title: "タコライス", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "トマト", "サルサ", "チーズ"], seasoningGroups: [], steps: "ひき肉炒めてシーズニング\nご飯にレタス・チーズ・肉・トマト・サルサ。", memo: "" },
    { id: 3, title: "カレー", meat: "豚", tier: "1", ingredients: ["豚こま", "人参", "玉ねぎ"], seasoningGroups: [], steps: "具材炒める\n水で煮る\nルー投入。", memo: "ケチャップ＋ソース可" },
    { id: 4, title: "肉巻き（めんつゆ）", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜"], seasoningGroups: [], steps: "野菜を肉で巻く\n焼く\nめんつゆで軽く煮絡め。", memo: "" },
    { id: 5, title: "肉巻き（梅）", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜", "梅"], seasoningGroups: [], steps: "野菜＋梅を巻く\n焼く。", memo: "チーズ可" },
    { id: 6, title: "親子丼", meat: "鶏", tier: "1", ingredients: ["鶏肉", "玉ねぎ", "卵"], seasoningGroups: [], steps: "鶏と玉ねぎ炒める\nめんつゆ入れる\n溶き卵でとじる。", memo: "" },
    { id: 7, title: "ハンバーグ", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "玉ねぎ", "卵", "パン粉"], seasoningGroups: [], steps: "肉・玉ねぎ・卵・パン粉こねる\n焼く。", memo: "シソ可" },
    { id: 8, title: "イタリアンハンバーグ", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "トマト缶", "人参", "チーズ"], seasoningGroups: [], steps: "ハンバーグ焼く\nトマト缶＋人参煮込む\nチーズをのせる。", memo: "" },
    { id: 9, title: "青椒肉絲", meat: "豚", tier: "1", ingredients: ["豚肉", "ピーマン", "タケノコ"], seasoningGroups: [], steps: "豚・ピーマン・タケノコ炒め\n調味する。", memo: "" },
    { id: 10, title: "肉じゃが", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜"], seasoningGroups: [], steps: "肉焼く\n野菜と煮る。", memo: "" },
    { id: 11, title: "麻婆茄子", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "なす"], seasoningGroups: [], steps: "具材炒め\n味付け\nとろみをつける。", memo: "豚こま可" },
    { id: 12, title: "回鍋肉", meat: "豚", tier: "1", ingredients: ["豚肉", "キャベツ"], seasoningGroups: [], steps: "豚とキャベツ炒め\n味付け。", memo: "" },
    { id: 13, title: "麻婆豆腐", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "豆腐"], seasoningGroups: [], steps: "ひき肉炒め\n調味\n豆腐入れる\nとろみをつける。", memo: "" },
    { id: 14, title: "限界飯", meat: "豚", tier: "1", ingredients: ["豚肉"], seasoningGroups: [], steps: "全部焼く\nごま油をかける。", memo: "疲れた時用" },
    { id: 15, title: "豚こま南蛮", meat: "豚", tier: "1", ingredients: ["豚こま", "卵", "マヨネーズ"], seasoningGroups: [], steps: "片栗粉豚焼き\n甘酢を絡める\nゆで卵マヨをのせる。", memo: "ゆで卵は普通推奨" },
    { id: 16, title: "豆腐包み", meat: "豚", tier: "1", ingredients: ["豆腐", "豚肉"], seasoningGroups: [], steps: "豆腐に豚巻く\n焼く\n調味。", memo: "" },
    { id: 17, title: "ピーマン巻き", meat: "豚", tier: "1", ingredients: ["ピーマン", "チーズ", "マヨネーズ", "豚肉"], seasoningGroups: [], steps: "ピーマンにチーズマヨつめる\n豚巻きにする\n焼く。", memo: "動画あり" },
    { id: 18, title: "ポークストロガノフ", meat: "豚", tier: "1", ingredients: ["豚肉", "玉ねぎ", "マッシュルーム"], seasoningGroups: [], steps: "豚・玉ねぎ・マッシュルーム炒め\n調味。", memo: "ビーフ可" },
    { id: 19, title: "ナス豚味噌", meat: "豚", tier: "1", ingredients: ["豚肉", "なす"], seasoningGroups: [], steps: "豚炒め取り出す\nなす多め油で炒める\n味噌ダレ作成\n戻して絡め。", memo: "" },
    { id: 20, title: "豚ナス巻き", meat: "豚", tier: "1", ingredients: ["なす", "豚肉"], seasoningGroups: [], steps: "なすスライス\n豚挟む\n焼く。", memo: "" },
    { id: 21, title: "鶏レモン", meat: "鶏", tier: "1", ingredients: ["鶏肉", "玉ねぎ", "レモン"], seasoningGroups: [], steps: "片栗粉鶏揚げ焼き\n玉ねぎ追加\nレモンで調味。", memo: "" },
    { id: 22, title: "から揚げ", meat: "鶏", tier: "2", ingredients: ["鶏肉", "にんにく", "生姜"], seasoningGroups: [], steps: "醤油・にんにく・生姜漬け\n片栗粉まぶす\n揚げる。", memo: "" },
    { id: 23, title: "油淋鶏", meat: "鶏", tier: "2", ingredients: ["鶏肉", "ネギ"], seasoningGroups: [], steps: "鶏揚げ\nネギソースかける。", memo: "動画あり" },
    { id: 24, title: "サバの甘辛煮", meat: "その他", tier: "2", ingredients: ["サバ"], seasoningGroups: [], steps: "サバを下処理\n甘辛で煮る。", memo: "" },
    { id: 25, title: "チキンのトマト煮", meat: "鶏", tier: "2", ingredients: ["鶏肉", "トマト缶"], seasoningGroups: [], steps: "鶏焼く\nトマト缶入れる\n煮込む。", memo: "" },
    { id: 26, title: "酢豚", meat: "豚", tier: "2", ingredients: ["豚肉", "野菜"], seasoningGroups: [], steps: "片栗粉豚焼く\n野菜炒める\n甘酢あん絡める。", memo: "" },
    { id: 27, title: "鮭のムニエル", meat: "その他", tier: "2", ingredients: ["鮭", "バター"], seasoningGroups: [], steps: "バター焼き\n醤油で味付け。", memo: "人参レンチン" },
    { id: 28, title: "鮭のホイル焼き", meat: "その他", tier: "2", ingredients: ["鮭", "野菜"], seasoningGroups: [], steps: "具材包む\n焼く。", memo: "" },
    { id: 29, title: "鶏煮込み", meat: "鶏", tier: "2", ingredients: ["鶏肉"], seasoningGroups: [], steps: "全部入れて90分煮る。", memo: "柚子胡椒◎" },
    { id: 30, title: "参鶏湯", meat: "鶏", tier: "2", ingredients: ["鶏肉"], seasoningGroups: [], steps: "全部入れて90分煮る。", memo: "柚子胡椒◎" },
    { id: 31, title: "グラタン", meat: "鶏", tier: "2", ingredients: ["鶏肉", "グラタンの素"], seasoningGroups: [], steps: "箱通り作る\nオーブンで焼く。", memo: "" },
    { id: 32, title: "味噌ダレチキン", meat: "鶏", tier: "2", ingredients: ["鶏肉"], seasoningGroups: [], steps: "動画参照。", memo: "" },
    { id: 33, title: "とんかつ", meat: "豚", tier: "3", ingredients: ["豚肉", "パン粉"], seasoningGroups: [], steps: "叩く\n衣つける\n揚げる。", memo: "翌日かつ丼" },
    { id: 34, title: "チキン南蛮", meat: "鶏", tier: "3", ingredients: ["鶏肉", "卵", "タルタルソース"], seasoningGroups: [], steps: "揚げ\n甘酢絡める\nタルタルかける。", memo: "" },
    { id: 35, title: "ロールキャベツ", meat: "ひき肉", tier: "3", ingredients: ["ひき肉", "キャベツ"], seasoningGroups: [], steps: "タネ作る\n巻く\n煮る。", memo: "" },
    { id: 36, title: "豚の角煮", meat: "豚", tier: "3", ingredients: ["豚バラブロック"], seasoningGroups: [], steps: "下茹で\n煮込む。", memo: "うめぇ" },
    { id: 37, title: "メンチカツ", meat: "ひき肉", tier: "3", ingredients: ["ひき肉", "パン粉"], seasoningGroups: [], steps: "タネ作る\n揚げる。", memo: "" },
    { id: 38, title: "ハムかつ", meat: "その他", tier: "3", ingredients: ["ハム", "チーズ", "パン粉"], seasoningGroups: [], steps: "ハムチーズ衣つける\n揚げる。", memo: "" },
    { id: 39, title: "マリーミーチキン", meat: "鶏", tier: "3", ingredients: ["鶏肉"], seasoningGroups: [], steps: "動画参照。", memo: "" },
    { id: 40, title: "ローストビーフ", meat: "その他", tier: "3", ingredients: ["牛ブロック肉"], seasoningGroups: [], steps: "焼き固め\n低温加熱。", memo: "赤ワイン" }
];

let recipes = []; 
let currentRecipe = null;
let currentSort = 'default';
let rouletteTargetRecipe = null;
let shoppingMemoIds = []; // 買い物メモ用の配列

// --- データの読み込み (Firestoreから取得) ---
function loadRecipes() {
    collectionRef.onSnapshot((snapshot) => {
        if (snapshot.empty) {
            setupInitialData();
        } else {
            recipes = snapshot.docs.map(doc => ({ ...doc.data() }));
            renderList();
            if (currentRecipe) {
                const updated = recipes.find(r => r.id === currentRecipe.id);
                if (updated) updateDetailView(updated);
            }
            // メモ画面が表示中なら更新
            if (document.getElementById('memo-view') && document.getElementById('memo-view').style.display === 'block') {
                renderMemo();
            }
        }
    }, (error) => {
        console.error("Firestore読み込みエラー:", error);
    });
}

async function setupInitialData() {
    console.log("初期データをFirestoreに保存中...");
    const batch = db.batch();
    initialRecipes.forEach(recipe => {
        const docRef = collectionRef.doc(recipe.id.toString());
        const cleanData = Object.assign({}, {
            ...recipe,
            cookCount: 0,
            isFavorite: false,
            seasoningGroups: recipe.seasoningGroups || []
        });
        batch.set(docRef, cleanData);
    });
    await batch.commit();
}

// --- 買い物メモ機能 ---
function showMemoView() {
    switchView('memo-view');
    renderMemo();
}

function addToMemoFromDetail() {
    if (currentRecipe) addToMemo(currentRecipe.id);
}

function addToMemo(id) {
    if (!shoppingMemoIds.includes(id)) {
        shoppingMemoIds.push(id);
        alert("買い物メモに追加したよ！");
    } else {
        alert("すでに追加されているよ");
    }
}

function removeFromMemo(id) {
    shoppingMemoIds = shoppingMemoIds.filter(mid => mid !== id);
    renderMemo();
}

function renderMemo() {
    const emptyMsg = document.getElementById('memo-empty-msg');
    const content = document.getElementById('memo-content');
    const aggList = document.getElementById('memo-aggregated-ingredients');
    const recipeList = document.getElementById('memo-recipe-list');

    if (shoppingMemoIds.length === 0) {
        emptyMsg.style.display = 'block';
        content.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    content.style.display = 'block';

    const selectedRecipes = recipes.filter(r => shoppingMemoIds.includes(r.id));

    // 材料の集計（×個数ロジック）
    const ingredientMap = {};
    selectedRecipes.forEach(r => {
        r.ingredients.forEach(ing => {
            const name = ing.trim();
            if (name) ingredientMap[name] = (ingredientMap[name] || 0) + 1;
        });
    });

    aggList.innerHTML = '';
    Object.keys(ingredientMap).forEach(name => {
        const count = ingredientMap[name];
        const li = document.createElement('li');
        li.innerText = count > 1 ? `${name} ×${count}` : name;
        aggList.appendChild(li);
    });

    recipeList.innerHTML = '';
    selectedRecipes.forEach(r => {
        const item = document.createElement('div');
        item.style = "display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:10px; background:#f9f9f9; border-radius:8px;";
        item.innerHTML = `
            <span>${r.title}</span>
            <button onclick="removeFromMemo(${r.id})" style="background:#ff4d4d; color:white; border:none; padding:5px 10px; border-radius:5px;">メモから削除</button>
        `;
        recipeList.appendChild(item);
    });
}

// --- フィルタ・ソート ---
function clearFilters() {
    document.getElementById('filter-tier').value = "";
    document.getElementById('filter-meat').value = "";
    document.getElementById('filter-fav').checked = false;
    currentSort = 'default';
    document.getElementById('sort-btn').innerText = '📊 回数順に並び替え: 標準';
    renderList();
}

function toggleSort() {
    const btn = document.getElementById('sort-btn');
    if (currentSort === 'default') { currentSort = 'desc'; btn.innerText = '📊 回数順に並び替え: 多い順'; }
    else if (currentSort === 'desc') { currentSort = 'asc'; btn.innerText = '📊 回数順に並び替え: 少ない順'; }
    else { currentSort = 'default'; btn.innerText = '📊 回数順に並び替え: 標準'; }
    renderList();
}

// --- カウンター・お気に入り ---
async function updateCount(diff) {
    if (!currentRecipe) return;
    try {
        await collectionRef.doc(currentRecipe.id.toString()).update({
            cookCount: firebase.firestore.FieldValue.increment(diff)
        });
    } catch (e) {
        console.error("カウント更新エラー:", e);
    }
}

async function toggleFavorite(id, event) {
    if (event) event.stopPropagation();
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        await collectionRef.doc(id.toString()).update({
            isFavorite: !recipe.isFavorite
        });
    }
}

function updateFavBtnStyle(isFav) {
    const favBtn = document.getElementById('detail-fav-btn');
    if (favBtn) {
        favBtn.innerText = isFav ? "★" : "☆";
        favBtn.classList.toggle('active', isFav);
    }
}

// --- ビュー切り替え ---
function switchView(viewId) {
    ['list-view', 'form-view', 'detail-view', 'memo-view'].forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = (v === viewId) ? 'block' : 'none';
    });
    const header = document.getElementById('main-header');
    const filter = document.getElementById('filter-section');
    if (header) header.style.display = (viewId === 'list-view') ? 'flex' : 'none';
    if (filter) filter.style.display = (viewId === 'list-view') ? 'flex' : 'none';
    window.scrollTo(0, 0);
}

function showList() { currentRecipe = null; switchView('list-view'); }
function closeForm() { currentRecipe ? showDetail(currentRecipe) : showList(); }

// --- 描画 ---
function renderList() {
    const tierF = document.getElementById('filter-tier').value;
    const meatF = document.getElementById('filter-meat').value;
    const favOnly = document.getElementById('filter-fav').checked;
    const listEl = document.getElementById('recipe-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    let filtered = recipes.filter(r => (!tierF || r.tier === tierF) && (!meatF || r.meat === meatF) && (!favOnly || r.isFavorite));

    if (currentSort === 'desc') filtered.sort((a, b) => (b.cookCount || 0) - (a.cookCount || 0));
    else if (currentSort === 'asc') filtered.sort((a, b) => (a.cookCount || 0) - (b.cookCount || 0));
    else filtered.sort((a, b) => Number(a.tier) - Number(b.tier));

    filtered.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        div.innerHTML = `
            <div class="item-left">
                <span style="cursor:pointer; font-size:1.2rem; margin-right:5px;" onclick="event.stopPropagation(); addToMemo(${recipe.id})">🛒</span>
                <span class="star-btn ${recipe.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id}, event)">${recipe.isFavorite ? '★' : '☆'}</span>
            </div>
            <strong>${recipe.title}</strong>
            <div class="recipe-info">
                <span class="badge tier-${recipe.tier}">Tier ${recipe.tier}</span>
                <span class="badge bg-${recipe.meat}">${recipe.meat}</span>
            </div>
            <div class="cook-count-badge">🍳 ${recipe.cookCount || 0}</div>
        `;
        div.onclick = () => showDetail(recipe);
        listEl.appendChild(div);
    });
}

function showDetail(recipe) {
    currentRecipe = recipe;
    switchView('detail-view');
    updateDetailView(recipe);
}

function updateDetailView(recipe) {
    document.getElementById('detail-title').innerText = recipe.title;
    document.getElementById('detail-cook-count').innerText = recipe.cookCount || 0;
    
    updateFavBtnStyle(recipe.isFavorite);
    const favBtn = document.getElementById('detail-fav-btn');
    if (favBtn) favBtn.onclick = () => toggleFavorite(recipe.id);
    
    document.getElementById('detail-tier-tag').innerText = "Tier " + recipe.tier;
    document.getElementById('detail-tier-tag').className = `badge tier-${recipe.tier}`;
    document.getElementById('detail-meat-tag').innerText = recipe.meat;
    document.getElementById('detail-meat-tag').className = `badge bg-${recipe.meat}`;
    
    document.getElementById('detail-ingredients').innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    
    const sContainer = document.getElementById('detail-seasoning-container');
    sContainer.innerHTML = "";
    if (recipe.seasoningGroups && recipe.seasoningGroups.length > 0) {
        recipe.seasoningGroups.forEach(g => {
            const box = document.createElement('div');
            box.className = 'seasoning-box';
            box.innerHTML = `<strong>${g.name || "調味料"}</strong><ul>${g.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
            sContainer.appendChild(box);
        });
    }
    
    const stepsArray = (recipe.steps || "").split('\n').filter(s => s.trim() !== "");
    document.getElementById('detail-steps-list').innerHTML = stepsArray.map(s => `<div class="step-item">${s}</div>`).join('');
    
    document.getElementById('memo-section').style.display = recipe.memo ? 'block' : 'none';
    document.getElementById('detail-memo').innerText = recipe.memo || '';

    document.getElementById('delete-btn-detail').onclick = async () => {
        if (confirm("削除していい？")) {
            await collectionRef.doc(recipe.id.toString()).delete();
            showList();
        }
    };
}

// --- フォーム関連 ---
function addSeasoningGroup(name = "", items = "") {
    const container = document.getElementById('seasoning-groups');
    const div = document.createElement('div');
    div.className = 'seasoning-group-item';
    div.innerHTML = `
        <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="input-group-name" placeholder="グループ名" value="${name}">
        <textarea class="input-group-items" placeholder="調味料（、で区切る）">${items}</textarea>
    `;
    container.appendChild(div);
}

function toggleForm() {
    document.getElementById('form-title').innerText = "レシピを追加";
    document.getElementById('entry-id').value = "";
    document.getElementById('input-title').value = '';
    document.getElementById('input-tier').value = "";
    document.getElementById('input-meat').value = "";
    document.getElementById('input-ingredients').value = '';
    document.getElementById('seasoning-groups').innerHTML = ""; 
    document.getElementById('input-steps').value = '';
    document.getElementById('input-memo').value = '';
    switchView('form-view');
}

function openEdit() {
    document.getElementById('form-title').innerText = "レシピを編集";
    document.getElementById('entry-id').value = currentRecipe.id;
    document.getElementById('input-title').value = currentRecipe.title;
    document.getElementById('input-tier').value = currentRecipe.tier;
    document.getElementById('input-meat').value = currentRecipe.meat;
    document.getElementById('input-ingredients').value = (currentRecipe.ingredients || []).join('、');
    document.getElementById('seasoning-groups').innerHTML = "";
    if (currentRecipe.seasoningGroups) {
        currentRecipe.seasoningGroups.forEach(g => addSeasoningGroup(g.name, g.items.join('、')));
    }
    document.getElementById('input-steps').value = currentRecipe.steps;
    document.getElementById('input-memo').value = currentRecipe.memo || '';
    switchView('form-view');
}

async function saveRecipe() {
    const id = document.getElementById('entry-id').value;
    const finalId = id ? Number(id) : Date.now();
    const groupEls = document.querySelectorAll('.seasoning-group-item');
    const seasoningGroups = Array.from(groupEls).map(el => ({
        name: el.querySelector('.input-group-name').value,
        items: el.querySelector('.input-group-items').value.split(/[、\n]/).filter(v => v.trim() !== "")
    })).filter(g => g.name || g.items.length > 0);

    const recipeData = {
        id: finalId,
        title: document.getElementById('input-title').value,
        tier: document.getElementById('input-tier').value,
        meat: document.getElementById('input-meat').value,
        ingredients: document.getElementById('input-ingredients').value.split(/[、\n]/).filter(i => i.trim() !== ""),
        seasoningGroups: seasoningGroups,
        steps: document.getElementById('input-steps').value,
        memo: document.getElementById('input-memo').value,
        isFavorite: currentRecipe ? currentRecipe.isFavorite : false,
        cookCount: currentRecipe ? currentRecipe.cookCount : 0
    };

    if (!recipeData.title || !recipeData.meat || !recipeData.tier) return alert("必須項目を入力してね！");

    try {
        await collectionRef.doc(finalId.toString()).set(Object.assign({}, recipeData));
        showDetail(recipeData);
    } catch (e) {
        console.error("保存エラー:", e);
    }
}

// --- ルーレット ---
function openRoulette() { document.getElementById('roulette-overlay').style.display = 'flex'; resetRoulette(); }
function resetRoulette() { document.getElementById('roulette-setup').style.display = 'block'; document.getElementById('roulette-result-area').style.display = 'none'; document.getElementById('roulette-result').innerText = '？？？'; }
function closeRoulette() { document.getElementById('roulette-overlay').style.display = 'none'; }
function startRoulette() {
    const selectedTiers = Array.from(document.querySelectorAll('.roulette-tier:checked')).map(cb => cb.value);
    const selectedMeats = Array.from(document.querySelectorAll('.roulette-meat:checked')).map(cb => cb.value);
    const favOnly = document.getElementById('roulette-fav-only').checked;
    let pool = recipes.filter(r => selectedTiers.includes(r.tier) && selectedMeats.includes(r.meat) && (!favOnly || r.isFavorite));
    if (pool.length === 0) return alert("条件に合うレシピがないよ！");
    document.getElementById('roulette-setup').style.display = 'none';
    document.getElementById('roulette-result-area').style.display = 'block';
    const resultEl = document.getElementById('roulette-result');
    const goToBtn = document.getElementById('go-to-recipe-btn');
    goToBtn.style.display = 'none';
    let count = 0;
    const interval = setInterval(() => {
        resultEl.innerText = pool[Math.floor(Math.random() * pool.length)].title;
        count++;
        if (count > 15) {
            clearInterval(interval);
            rouletteTargetRecipe = pool[Math.floor(Math.random() * pool.length)];
            resultEl.innerText = "✨ " + rouletteTargetRecipe.title + " ✨";
            goToBtn.style.display = 'inline-block';
        }
    }, 80);
}
function goToRouletteRecipe() { if (rouletteTargetRecipe) { showDetail(rouletteTargetRecipe); closeRoulette(); } }

// 起動
loadRecipes();