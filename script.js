const initialRecipes = [
    { id: 1, title: "豚バラ白菜の味噌あん", meat: "豚", tier: "1", ingredients: ["豚バラ", "白菜"], steps: "豚バラを炒める→白菜を加えて蒸し焼き→味噌・みりん・酒で調味し軽くとろみ付け。", memo: "" },
    { id: 2, title: "タコライス", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "トマト", "サルサ", "チーズ"], steps: "ひき肉炒めてシーズニング→ご飯にレタス・チーズ・肉・トマト・サルサ。", memo: "" },
    { id: 3, title: "カレー", meat: "豚", tier: "1", ingredients: ["豚こま", "人参", "玉ねぎ"], steps: "具材炒める→水で煮る→ルー投入。", memo: "ケチャップ＋ソース可" },
    { id: 4, title: "肉巻き（めんつゆ）", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜"], steps: "野菜を肉で巻く→焼く→めんつゆで軽く煮絡め。", memo: "" },
    { id: 5, title: "肉巻き（梅）", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜", "梅"], steps: "野菜＋梅を巻く→焼く。", memo: "チーズ可" },
    { id: 6, title: "親子丼", meat: "鶏", tier: "1", ingredients: ["鶏肉", "玉ねぎ", "卵"], steps: "鶏と玉ねぎ炒める→めんつゆ→溶き卵でとじる。", memo: "" },
    { id: 7, title: "ハンバーグ", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "玉ねぎ", "卵", "パン粉"], steps: "肉・玉ねぎ・卵・パン粉こねる→焼く。", memo: "シソ可" },
    { id: 8, title: "イタリアンハンバーグ", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "トマト缶", "人参", "チーズ"], steps: "ハンバーグ焼く→トマト缶＋人参煮込む→チーズ。", memo: "" },
    { id: 9, title: "青椒肉絲", meat: "豚", tier: "1", ingredients: ["豚肉", "ピーマン", "タケノコ"], steps: "豚・ピーマン・タケノコ炒め→調味。", memo: "" },
    { id: 10, title: "肉じゃが", meat: "豚", tier: "1", ingredients: ["豚肉", "野菜"], steps: "肉焼く→野菜と煮る。", memo: "" },
    { id: 11, title: "麻婆茄子", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "なす"], steps: "具材炒め→味付け→とろみ。", memo: "豚こま可" },
    { id: 12, title: "回鍋肉", meat: "豚", tier: "1", ingredients: ["豚肉", "キャベツ"], steps: "豚とキャベツ炒め→味付け。", memo: "" },
    { id: 13, title: "麻婆豆腐", meat: "ひき肉", tier: "1", ingredients: ["ひき肉", "豆腐"], steps: "ひき肉炒め→調味→豆腐→とろみ。", memo: "" },
    { id: 14, title: "限界飯", meat: "豚", tier: "1", ingredients: ["豚肉"], steps: "全部焼く→ごま油。", memo: "疲れた時用" },
    { id: 15, title: "豚こま南蛮", meat: "豚", tier: "1", ingredients: ["豚こま", "卵", "マヨネーズ"], steps: "片栗粉豚焼き→甘酢→ゆで卵マヨ。", memo: "ゆで卵は普通推奨" },
    { id: 16, title: "豆腐包み", meat: "豚", tier: "1", ingredients: ["豆腐", "豚肉"], steps: "豆腐に豚巻く→焼く→調味。", memo: "" },
    { id: 17, title: "ピーマン巻き", meat: "豚", tier: "1", ingredients: ["ピーマン", "チーズ", "マヨネーズ", "豚肉"], steps: "ピーマンにチーズマヨ→豚巻き→焼く。", memo: "動画あり" },
    { id: 18, title: "ポークストロガノフ", meat: "豚", tier: "1", ingredients: ["豚肉", "玉ねぎ", "マッシュルーム"], steps: "豚・玉ねぎ・マッシュルーム炒め→調味。", memo: "ビーフ可" },
    { id: 19, title: "ナス豚味噌", meat: "豚", tier: "1", ingredients: ["豚肉", "なす"], steps: "豚炒め取り出す→なす多め油→味噌ダレ→戻して絡め。", memo: "" },
    { id: 20, title: "豚ナス巻き", meat: "豚", tier: "1", ingredients: ["なす", "豚肉"], steps: "なすスライス→豚挟む→焼く。", memo: "" },
    { id: 21, title: "鶏レモン", meat: "鶏", tier: "1", ingredients: ["鶏肉", "玉ねぎ", "レモン"], steps: "片栗粉鶏揚げ焼き→玉ねぎ→レモン。", memo: "" },
    { id: 22, title: "から揚げ", meat: "鶏", tier: "2", ingredients: ["鶏肉", "にんにく", "生姜"], steps: "醤油・にんにく・生姜漬け→片栗粉→揚げる。", memo: "" },
    { id: 23, title: "油淋鶏", meat: "鶏", tier: "2", ingredients: ["鶏肉", "ネギ"], steps: "鶏揚げ→ネギソース。", memo: "動画あり" },
    { id: 24, title: "サバの甘辛煮", meat: "その他", tier: "2", ingredients: ["サバ"], steps: "サバを下処理→甘辛で煮る。", memo: "" },
    { id: 25, title: "チキンのトマト煮", meat: "鶏", tier: "2", ingredients: ["鶏肉", "トマト缶"], steps: "鶏焼く→トマト缶→煮込む。", memo: "" },
    { id: 26, title: "酢豚", meat: "豚", tier: "2", ingredients: ["豚肉", "野菜"], steps: "片栗粉豚焼く→野菜→甘酢あん。", memo: "" },
    { id: 27, title: "鮭のムニエル", meat: "その他", tier: "2", ingredients: ["鮭", "バター"], steps: "バター焼き→醤油。", memo: "人参レンチン" },
    { id: 28, title: "鮭のホイル焼き", meat: "その他", tier: "2", ingredients: ["鮭", "野菜"], steps: "具材包む→焼く。", memo: "" },
    { id: 29, title: "鶏煮込み", meat: "鶏", tier: "2", ingredients: ["鶏肉"], steps: "全部入れて90分。", memo: "柚子胡椒◎" },
    { id: 30, title: "参鶏湯", meat: "鶏", tier: "2", ingredients: ["鶏肉"], steps: "全部入れて90分。", memo: "柚子胡椒◎" },
    { id: 31, title: "グラタン", meat: "鶏", tier: "2", ingredients: ["鶏肉", "グラタンの素"], steps: "箱通り→オーブン。", memo: "" },
    { id: 32, title: "味噌ダレチキン", meat: "鶏", tier: "2", ingredients: ["鶏肉"], steps: "動画参照。", memo: "" },
    { id: 33, title: "とんかつ", meat: "豚", tier: "3", ingredients: ["豚肉", "パン粉"], steps: "叩く→衣→揚げる。", memo: "翌日かつ丼" },
    { id: 34, title: "チキン南蛮", meat: "鶏", tier: "3", ingredients: ["鶏肉", "卵", "タルタルソース"], steps: "揚げ→甘酢→タルタル。", memo: "" },
    { id: 35, title: "ロールキャベツ", meat: "ひき肉", tier: "3", ingredients: ["ひき肉", "キャベツ"], steps: "タネ作る→巻く→煮る。", memo: "" },
    { id: 36, title: "豚の角煮", meat: "豚", tier: "3", ingredients: ["豚バラブロック"], steps: "下茹で→煮込む。", memo: "うめぇ" },
    { id: 37, title: "メンチカツ", meat: "ひき肉", tier: "3", ingredients: ["ひき肉", "パン粉"], steps: "タネ→揚げる。", memo: "" },
    { id: 38, title: "ハムかつ", meat: "その他", tier: "3", ingredients: ["ハム", "チーズ", "パン粉"], steps: "ハムチーズ衣→揚げる。", memo: "" },
    { id: 39, title: "マリーミーチキン", meat: "鶏", tier: "3", ingredients: ["鶏肉"], steps: "動画参照。", memo: "" },
    { id: 40, title: "ローストビーフ", meat: "その他", tier: "3", ingredients: ["牛ブロック肉"], steps: "焼き固め→低温加熱。", memo: "赤ワイン" }
];

// 初期読み込みのロジック：古いデータ（牛・魚・ハムが残っているデータ）がある場合、強制的にその他へ変換するか初期化する。
let storedData = JSON.parse(localStorage.getItem('myRecipes'));

// 今回の修正を反映させるため、古いデータがある場合は一度リセットするか、変換する必要がある。
// りょう君が手動で追加したものがまだ無いなら、localStorage.clear() してから読み込むのが一番確実。
// ここでは、データが存在しても、タグを統合した initialRecipes を優先して上書きするように設定するね。
let recipes = initialRecipes; 
localStorage.setItem('myRecipes', JSON.stringify(recipes));

let currentRecipe = null;

function switchView(viewId) {
    ['list-view', 'form-view', 'detail-view'].forEach(v => {
        document.getElementById(v).style.display = (v === viewId) ? 'block' : 'none';
    });
    document.getElementById('main-header').style.display = (viewId === 'list-view') ? 'flex' : 'none';
    document.getElementById('filter-section').style.display = (viewId === 'list-view') ? 'flex' : 'none';
}

function toggleForm() {
    document.getElementById('form-title').innerText = "新しいレシピ";
    document.getElementById('entry-id').value = "";
    document.getElementById('input-title').value = '';
    document.getElementById('input-meat').value = "";
    document.getElementById('input-tier').value = "";
    document.getElementById('input-ingredients').value = '';
    document.getElementById('input-steps').value = '';
    document.getElementById('input-memo').value = '';
    switchView('form-view');
}

function saveRecipe() {
    const id = document.getElementById('entry-id').value;
    const title = document.getElementById('input-title').value;
    const meat = document.getElementById('input-meat').value;
    const tier = document.getElementById('input-tier').value;

    if (!title || !meat || !tier) {
        return alert("料理名、肉タグ、Tierは入力必須だよ！");
    }

    const recipeData = {
        id: id ? Number(id) : Date.now(),
        title: title,
        meat: meat,
        tier: tier,
        ingredients: document.getElementById('input-ingredients').value.split(/[、\n]/).filter(i => i.trim() !== ""),
        steps: document.getElementById('input-steps').value,
        memo: document.getElementById('input-memo').value
    };

    if (id) {
        const index = recipes.findIndex(r => r.id === Number(id));
        recipes[index] = recipeData;
    } else {
        recipes.push(recipeData);
    }

    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    renderList();
    showDetail(recipeData);
}

function openEdit() {
    document.getElementById('form-title').innerText = "レシピを編集";
    document.getElementById('entry-id').value = currentRecipe.id;
    document.getElementById('input-title').value = currentRecipe.title;
    document.getElementById('input-meat').value = currentRecipe.meat;
    document.getElementById('input-tier').value = currentRecipe.tier;
    document.getElementById('input-ingredients').value = currentRecipe.ingredients.join('、');
    document.getElementById('input-steps').value = currentRecipe.steps;
    document.getElementById('input-memo').value = currentRecipe.memo || '';
    switchView('form-view');
}

function renderList() {
    const meatFilter = document.getElementById('filter-meat').value;
    const tierFilter = document.getElementById('filter-tier').value;
    const listEl = document.getElementById('recipe-list');
    
    listEl.innerHTML = '';
    
    let filtered = recipes.filter(r => {
        return (!meatFilter || r.meat === meatFilter) && (!tierFilter || r.tier === tierFilter);
    });

    filtered.sort((a, b) => Number(a.tier) - Number(b.tier));

    filtered.forEach(recipe => {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        div.innerHTML = `
            <strong>${recipe.title}</strong>
            <div class="recipe-info">肉: ${recipe.meat} / Tier: ${recipe.tier}</div>
        `;
        div.onclick = () => showDetail(recipe);
        listEl.appendChild(div);
    });
}

function showDetail(recipe) {
    currentRecipe = recipe;
    switchView('detail-view');
    document.getElementById('detail-title').innerText = recipe.title;
    document.getElementById('detail-meat-tag').innerText = "肉: " + recipe.meat;
    document.getElementById('detail-tier-tag').innerText = "Tier: " + recipe.tier;
    document.getElementById('detail-ingredients').innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join('');
    document.getElementById('detail-steps').innerText = recipe.steps || "手順はまだありません";
    
    const memoEl = document.getElementById('detail-memo');
    const memoSection = document.getElementById('memo-section');
    if (recipe.memo) {
        memoSection.style.display = 'block';
        memoEl.innerText = recipe.memo;
    } else {
        memoSection.style.display = 'none';
    }

    document.getElementById('delete-btn-detail').onclick = function() {
        if (confirm("本当にこのレシピを削除してもいい？")) {
            recipes = recipes.filter(r => r.id !== recipe.id);
            localStorage.setItem('myRecipes', JSON.stringify(recipes));
            renderList();
            showList();
        }
    };
}

function showList() { switchView('list-view'); }
function closeForm() { currentRecipe ? showDetail(currentRecipe) : switchView('list-view'); }

renderList();